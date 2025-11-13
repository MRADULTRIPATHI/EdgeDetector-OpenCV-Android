#ifndef EDGE_PROCESSOR_H
#define EDGE_PROCESSOR_H

#include <opencv2/opencv.hpp>
#include <vector>

class EdgeProcessor {
public:
    EdgeProcessor();
    ~EdgeProcessor();

    /**
     * Process YUV420 frame and apply Canny edge detection
     * @param inputData YUV420 image data
     * @param dataSize Size of input data
     * @param width Image width
     * @param height Image height
     * @param outputData Output grayscale edge-detected image
     * @return true if successful
     */
    bool processYUV420(const uint8_t* inputData, size_t dataSize,
                      int width, int height,
                      std::vector<uint8_t>& outputData);

private:
    // Canny edge detection parameters
    static const int CANNY_THRESHOLD_1 = 50;
    static const int CANNY_THRESHOLD_2 = 150;
    static const int BLUR_SIZE = 5;
};

#endif // EDGE_PROCESSOR_H
