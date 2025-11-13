package com.flam.edgedetector;

public class NativeProcessor {
    /**
     * Process camera frame using OpenCV edge detection
     * @param frameData YUV420 image data
     * @param width Image width
     * @param height Image height
     * @return Processed grayscale image data
     */
    public static native byte[] processFrame(byte[] frameData, int width, int height);
}
