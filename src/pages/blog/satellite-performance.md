---
layout: ../../layouts/BlogPost.astro
title: Improving the Performance of a Haskell Satellite Decoder
date: 2025-03-22
description: A deep dive into optimizing a Haskell-based satellite decoder through profiling, FFT-based cross-correlation, and innovative signal processing techniques.
categories: ["Haskell", "Performance Optimization", "Signal Processing", "Satellite Decoding"]
---

I've recently been building a proof-of-concept [APT](https://www.sigidwiki.com/wiki/Automatic_Picture_Transmission_(APT)) decoder in [Haskell](https://www.haskell.org/).
The 30,000 foot picture of this is that NOAA satellites orbit the Earth, continuously transmitting images in radio signals.
These signals can be decoded to images, which can give you up-to-date satellite views of your area.

<figure class="my-4">
  <img src="/noaa19_short.png" alt="Decoded satellite image" class="rounded shadow" />
  <figcaption class="text-center text-sm mt-2">
    First successful image decoding with my proof-of-concept system
  </figcaption>
</figure>

My broader goal is to have a website that is updated continuously with new recordings.
The first step was to build a command line tool that converts `.wav` files to `.png`.
This was a great opportunity to explore the basics of Haskell and DSP, and I learned a lot!

But the tool I built was really slow--considerably slower than a Python version using Numpy and Scipy.
I knew that Haskell could be performant for things like this, so I wanted to see if I could optimize it.
This blog is a stream-of-consciousness recording of some work I did on this system.

## Profiling code execution

I started by looking into profiling.
My project uses [Stack](https://docs.haskellstack.org/en), the Haskell build tool, so I looked around the documentation until I came across the [`--profile` flag](https://docs.haskellstack.org/en/stable/topics/debugging/).
This looks like what we want.
We just need some data with which to run this.
I have a couple example signal files in my repo already, so I tried the first one.

```bash
stack exec --profile -- satellite-exe noaa19_short.wav noaa19_short.png +RTS -p
```

After about five minutes, I gave up and killed it--way too slow.
Let's cut the file down to see if we can make this faster.
We'll slice the first 100,000 samples.
Python makes this sort of thing trivial.

```python
from scipy.io import wavfile
fs, data = wavfile.read("noaa19_short.wav")
wavfile.write("test.wav", fs, data[:100_000])
```

Now I'll rerun on the shortened signal.

```bash
stack exec --profile -- satellite-exe test.wav test.png +RTS -p
```

Great, we got that working!
It produced a file `satellite-exe.prof` in my current directory.
Let's take a look inside.

```
        Fri Mar 21 19:09 2025 Time and Allocation Profiling Report  (Final)

           satellite-exe +RTS -N -p -RTS test.wav test.png

        total time  =        1.19 secs   (3716 ticks @ 1000 us, 16 processors)
        total alloc = 8,503,896,752 bytes  (excludes profiling overheads)

COST CENTRE         MODULE                       SRC                                                   %time %alloc

>>=                 Data.Vector.Fusion.Util      src/Data/Vector/Fusion/Util.hs:36:3-18                 54.6   56.4
basicUnsafeIndexM   Data.Vector.Storable         src/Data/Vector/Storable.hs:(261,3)-(264,53)           18.1   17.7
basicUnsafeIndexM.\ Data.Vector.Storable         src/Data/Vector/Storable.hs:264:39-53                  14.1   15.7
primitive           Control.Monad.Primitive      Control/Monad/Primitive.hs:211:3-16                     1.5    0.1
basicUnsafeWrite.\  Data.Vector.Storable.Mutable src/Data/Vector/Storable/Mutable.hs:184:39-55           1.3    0.7
fmap                Data.Stream.Monadic          src/Data/Stream/Monadic.hs:(147,3)-(149,20)             1.3    1.1
basicUnsafeWrite    Data.Vector.Storable.Mutable src/Data/Vector/Storable/Mutable.hs:(182,3)-(184,55)    0.7    1.1
```

This seems plausible on first glance.
I'm guessing that first one has something to do with the many mapping operations we do on `Data.Vector`s.
Let's dive in a bit deeper.

I had to scroll down a good way, but finally we are getting into the real meat of our program.

```
                                                                    individual      inherited
COST CENTRE       MODULE   SRC                          no. entries %time  %alloc  %time %alloc

 main             Main     app/Main.hs:(37,1)-(49,51)   10759   0    0.0    0.0    99.5  100.0
  main.happyPath  Main     app/Main.hs:(40,5)-(49,51)   10760   1    0.0    0.0    99.5  100.0
```

Still, we're only seeing things that are inherited time, meaning time isn't being spent in calls themselves but beneath them.
Let's keep going until we see some non-zero values in individual column.

## Inefficient peak finding

One thing I noticed quickly is that peak finding (`Lib.findSyncPeaks`) is the biggest time sink (84.6% of computation time)!
Interesting, I would not have expected that.
I wonder what part of that function is taking so long.

Here we go, cross correlation, now we're really starting to spend some time.
There are two calls to `crossCorr`, each with 41.7% of the total computation time.
Our current method is an explicit cross correlation, which I could see being an inefficient way to do this.

Here's the function, for reference:

```haskell
-- | @crossCorr@ computes the cross-correlation between two vectors
crossCorr :: (Num a, Storable a) => Vector a -> Vector a -> Vector a
crossCorr fs xs = V.generate n getElem
  where
    n1 = V.length fs
    n2 = V.length xs
    n = max n1 n2 - min n1 n2 + 1
    getElem i = V.sum $ V.zipWith (*) fs (V.drop i xs)
```

Let's see what other methods would be better.
Scipy is often a good reference for this sort of thing.
The [documentation for `scipy.signal.correlate`](https://docs.scipy.org/doc/scipy/reference/generated/scipy.signal.correlate.html) says that they use a function, [`choose_conv_method`](https://docs.scipy.org/doc/scipy/reference/generated/scipy.signal.choose_conv_method.html) for selecting whether to use a direct or FFT approach.
I started looking into [`fftconvolve`](https://docs.scipy.org/doc/scipy/reference/generated/scipy.signal.fftconvolve.html), but then I noticed there is another function that is advertised as being better for arrays with different sizes, [`oaconvolve`](https://docs.scipy.org/doc/scipy/reference/generated/scipy.signal.oaconvolve.html).

>This is generally much faster than convolve for large arrays (n > ~500), and generally much faster than fftconvolve when one array is much larger than the other, but can be slower when only a few output values are needed or when the arrays are very similar in shape, and can only output float arrays (int or object array inputs will be cast to float).

Well, considering that we have a tiny filter compared to the size of our data, this sounds like what we want!
We're making progress.
This method is called the "overlap–add method".
It looks like it takes roughly $N \log_2(N) + N$ computations, where $N$ is the length of the sample.
If we have 2080 pixels per line and we are at an upsample factor of four, and we have roughly 500 pixels per column, this means we have to do roughly 23 multiplications per output sample, compared to the regular approach, which requires $m$, the size of the filter.
Since our filter in that case would be 40 $\times$ 4 = 160, this means we can save about 85% of the multiplications using this approach--great!
Of course, there will be some overhead in the FFT/IFFT, so we'll see how much we can actually save.

Finally, I was able to implement this in Haskell.
I got a working Python implementation in about 15 minutes, exactly following the [algorithm pseudocode from Wikipedia](https://en.wikipedia.org/wiki/Overlap%E2%80%93add_method#Pseudocode).
Rewriting it in Haskell took quite a while, probably a couple of hours.
This was my first time using the ST monad, but I figured out, in the end, how to write it.
Here's the function I wrote:

```haskell
-- | @oaCrossCorr@ compute the cross-correlation using the overlap-add FFT method
oaCrossCorr :: (RealFrac a, Storable a) => Vector a -> Vector a -> Vector a
oaCrossCorr fs xs =
  let m = V.length fs
      nX = V.length xs
      n = 8 * 2 ^ (ceiling (logBase 2.0 (fromIntegral m :: Double)) :: Int)
      stepSize = n - (m - 1)
      h = Signals.fftNReal n (V.reverse fs)
   in ST.runST $ do
        y <- VM.replicate (nX + m - 1) 0
        forM_ [0, stepSize .. nX - 1] $ \position -> do
          let segEnd = min (position + stepSize) nX
              segLen = segEnd - position
              seg = V.slice position segLen xs
              segFft = Signals.fftNReal n seg
              ySeg = Signals.ifftReal $ V.zipWith (*) segFft h
          forM_ [0 .. segLen + m - 2] $ \ix ->
            VM.modify y (+ (ySeg V.! ix)) (position + ix)
        V.freeze y <&> V.slice (m - 1) (nX - m + 1)
```

I swapped my implementation of cross correlation to this and re-ran the profiler.
Amazingly, this cut runtime for my original example image, `noaa19_short.wav` from 88 to 19 seconds--a **78% reduction in runtime!**
Unfortunately, my Python version only takes 6 seconds 😅, so we still have some work to do (parity requires a further ~70% reduction).

## Second improvement to peak finding

Another improvement came to me while reading the [`vector-fftw` documentation](https://hackage.haskell.org/package/vector-fftw-0.1.4.1/docs/Numeric-FFT-Vector-Invertible.html).
I realized that taking real signals, converting to complex double (with zero imaginary component), computing FFT, then multiplying and computing IFFT does double the number of calculations that we actually need.
Specifically, we can leverage the fact that all our inputs (filter and signal) are real to use the [real-to-complex transformations](https://hackage.haskell.org/package/vector-fftw-0.1.4.1/docs/Numeric-FFT-Vector-Invertible.html#g:4) instead of [complex-to-complex](https://hackage.haskell.org/package/vector-fftw-0.1.4.1/docs/Numeric-FFT-Vector-Invertible.html#g:3).
These are all optimized to account for the fact that real inputs produce symmetric outputs, so the second half doesn't need to be computed at all.
Since all our inputs are real, we only need to compute the first half!
Implementing that reduced the runtime to 16.7 seconds--not huge, but still an improvement.

## Signal processing pipeline

We have made a lot of progress, but we still have a lot to do here!
I started going back through the `.prof` file, but quickly became frustrated by the **deeply** nested structure of the file.
After searching for a minute, I came across [`profiterole`](https://github.com/ndmitchell/profiterole), a tool for restructuring these files.
That made the profiling results a lot easier to browse.

Going top-to-bottom through the program, I see that `main` correctly contains 99.9% of the runtime.
Inside that, there is the `happyPath`, which, again, contains 99.9% of the runtime.
Below that, there are three function calls that show up in the profile: `Wav.readWav` (7%), `Lib.decodeApt` (93%), and `Export.saveImg` (<0.1%).
Reading the file doesn't seem like it can easily be improved, and saving the image doesn't seem like it needs to be, so let's skip those and keep going, straight to `decodeApt`.

Inside `decodeApt`, there are a few main time sinks:

1. `Lib.decodeApt.processed` (59.5%)
2. `Lib.findSyncPeaks` (24.2%) - This is significantly reduced from before!
3. `Norm.rangeNorm` (6.9%)

Surprisingly to me, interpolation is negligible (1%).

Now, the biggest part of the computation time is this pipeline, which does some basic processing on the input signal.
I annotated each line with its fraction of the computation time.

```haskell
processed =
  samples
    & Norm.maxNorm                                --  5.9%
    & Signals.getEnvelope                         -- 29.0%
    & Signals.lowpassVec 1.5 fs Sync.wordsPerLine -- 11.7%
    & Signals.fourierResample nResampled          -- 11.1%
    & Norm.meanNorm                               --  1.8%
```

The biggest time contribution here is `getEnvelope`.
This shouldn't be a super costly operation.

## Get envelope

This function does some computations that might not be necessary.
Specifically, we're computing the full-size FFT, then processing all of it, then taking the inverse FFT.
The top-line results here show that `ifftMagnitude` takes 13.4%, `fftResult` takes 10.6%, and masking takes 5%.
We could refactor this to compute only the real FFT (which would be half the size), then multiply it by two and concatenate zeros at the end, and finally apply the full-size inverse FFT to get back the envelope.

Implementing this reduced runtime only marginally, down to about 15.5 seconds.

# Conclusion

Overall, we cut the runtime down a good bit--from 88 to 15 seconds!
I think this is a good checkpoint for now.
Hopefully in the future we can make this even faster.
Good learning experience for one day!
