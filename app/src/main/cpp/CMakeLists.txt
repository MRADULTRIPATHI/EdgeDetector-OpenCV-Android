cmake_minimum_required(VERSION 3.22.1)

project("native-lib")

set(CMAKE_CXX_STANDARD 14)
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Wall")

# Set OpenCV path (user should download OpenCV Android SDK)
set(OPENCV_DIR ${CMAKE_SOURCE_DIR}/../../../../../opencv-sdk)

# Find OpenCV package
find_package(OpenCV REQUIRED PATHS ${OPENCV_DIR}/sdk/native/jni)

include_directories(${OpenCV_INCLUDE_DIRS})

add_library(native-lib SHARED
        native-lib.cpp
        edge_processor.cpp)

target_link_libraries(native-lib
        ${OpenCV_LIBS}
        log
        jnigraphics
        android)
