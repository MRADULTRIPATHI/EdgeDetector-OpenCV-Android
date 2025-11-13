# OpenCV Android SDK Setup Guide

This project requires the OpenCV Android SDK to be downloaded separately.

## Download Instructions

1. **Visit OpenCV Releases**
   - Go to: https://opencv.org/releases/
   - Find "Android" section
   - Download the latest version (e.g., OpenCV 4.8.0 Android SDK)

2. **Extract the SDK**
   - Extract the downloaded zip file
   - You should have a folder structure like:
     ```
     opencv-android-sdk/
     ├── sdk/
     │   ├── native/
     │   │   └── jni/
     │   │       ├── abi-armeabi-v7a/
     │   │       ├── abi-arm64-v8a/
     │   │       └── ...
     │   └── ...
     └── ...
     ```

3. **Place in Project**
   - Rename the extracted folder to `opencv-sdk`
   - Move it to the project root directory:
     ```
     flam/
     ├── opencv-sdk/          ← Place here
     │   └── sdk/
     │       └── native/
     │           └── jni/
     ├── app/
     ├── web/
     └── ...
     ```

4. **Verify Setup**
   - Check that the path matches CMakeLists.txt:
     ```cmake
     set(OPENCV_DIR ${CMAKE_SOURCE_DIR}/../../../../../opencv-sdk)
     ```
   - If your structure is different, update the path in:
     `app/src/main/cpp/CMakeLists.txt`

## Alternative: Using OpenCV Manager

If you prefer using OpenCV Manager (not recommended for this project):

1. Install OpenCV Manager APK on your device
2. Modify the build to use dynamic linking
3. Update native code to initialize OpenCV via JavaCameraView

## Version Compatibility

- **Recommended**: OpenCV 4.8.0+
- **Minimum**: OpenCV 4.5.0
- **Android NDK**: r21 or later

## Troubleshooting

### Issue: CMake cannot find OpenCV
**Solution**: Verify the OPENCV_DIR path in CMakeLists.txt points to the correct location.

### Issue: Missing .so files
**Solution**: Ensure you downloaded the Android SDK, not the desktop version.

### Issue: Architecture mismatch
**Solution**: Check that your device architecture (arm64-v8a, armeabi-v7a, x86, x86_64) is included in the build.

## License Note

OpenCV is distributed under the Apache 2.0 license. By using OpenCV, you agree to comply with its license terms.
