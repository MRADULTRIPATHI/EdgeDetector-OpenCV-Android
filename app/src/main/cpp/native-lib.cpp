#include <jni.h>
#include <string>
#include <android/log.h>
#include "edge_processor.h"

#define LOG_TAG "NativeLib"
#define LOGI(...) __android_log_print(ANDROID_LOG_INFO, LOG_TAG, __VA_ARGS__)
#define LOGE(...) __android_log_print(ANDROID_LOG_ERROR, LOG_TAG, __VA_ARGS__)

extern "C" JNIEXPORT jbyteArray JNICALL
Java_com_flam_edgedetector_NativeProcessor_processFrame(
        JNIEnv* env,
        jclass /* this */,
        jbyteArray frameData,
        jint width,
        jint height) {

    // Get input data
    jbyte* inputBytes = env->GetByteArrayElements(frameData, nullptr);
    if (inputBytes == nullptr) {
        LOGE("Failed to get input byte array");
        return nullptr;
    }

    jsize inputLength = env->GetArrayLength(frameData);
    LOGI("Processing frame: %dx%d, input size: %d", width, height, inputLength);

    // Process frame using OpenCV
    EdgeProcessor processor;
    std::vector<uint8_t> outputData;
    
    bool success = processor.processYUV420(
        reinterpret_cast<uint8_t*>(inputBytes),
        inputLength,
        width,
        height,
        outputData
    );

    // Release input array
    env->ReleaseByteArrayElements(frameData, inputBytes, JNI_ABORT);

    if (!success || outputData.empty()) {
        LOGE("Frame processing failed");
        return nullptr;
    }

    // Create output byte array
    jbyteArray result = env->NewByteArray(outputData.size());
    if (result == nullptr) {
        LOGE("Failed to allocate output array");
        return nullptr;
    }

    env->SetByteArrayRegion(result, 0, outputData.size(),
                           reinterpret_cast<jbyte*>(outputData.data()));

    LOGI("Frame processed successfully, output size: %zu", outputData.size());
    return result;
}
