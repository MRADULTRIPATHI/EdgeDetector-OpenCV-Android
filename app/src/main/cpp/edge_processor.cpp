#include "edge_processor.h"
#include <android/log.h>

#define LOG_TAG "EdgeProcessor"
#define LOGI(...) __android_log_print(ANDROID_LOG_INFO, LOG_TAG, __VA_ARGS__)
#define LOGE(...) __android_log_print(ANDROID_LOG_ERROR, LOG_TAG, __VA_ARGS__)

EdgeProcessor::EdgeProcessor() {
    LOGI("EdgeProcessor initialized");
}

EdgeProcessor::~EdgeProcessor() {
    LOGI("EdgeProcessor destroyed");
}

bool EdgeProcessor::processYUV420(const uint8_t* inputData, size_t dataSize,
                                  int width, int height,
                                  std::vector<uint8_t>& outputData) {
    try {
        // Extract Y channel (grayscale) from YUV420
        cv::Mat yPlane(height, width, CV_8UC1, const_cast<uint8_t*>(inputData));
        
        if (yPlane.empty()) {
            LOGE("Failed to create Y plane matrix");
            return false;
        }

        // Apply Gaussian blur to reduce noise
        cv::Mat blurred;
        cv::GaussianBlur(yPlane, blurred, cv::Size(BLUR_SIZE, BLUR_SIZE), 0);

        // Apply Canny edge detection
        cv::Mat edges;
        cv::Canny(blurred, edges, CANNY_THRESHOLD_1, CANNY_THRESHOLD_2);

        // Convert to output vector
        outputData.resize(edges.total());
        std::memcpy(outputData.data(), edges.data, edges.total());

        LOGI("Edge detection completed: %dx%d", width, height);
        return true;

    } catch (const cv::Exception& e) {
        LOGE("OpenCV exception: %s", e.what());
        return false;
    } catch (const std::exception& e) {
        LOGE("Standard exception: %s", e.what());
        return false;
    } catch (...) {
        LOGE("Unknown exception during processing");
        return false;
    }
}
