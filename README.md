# 🔍 Edge Detector - Android + OpenCV + OpenGL + TypeScript

A real-time edge detection Android application demonstrating integration between **Camera2 API**, **OpenCV (C++)**, **OpenGL ES 2.0**, **JNI**, and a **TypeScript web viewer**.

## 📸 Features Implemented

### Android Application
- ✅ **Camera2 API Integration** - Real-time camera frame capture using modern Camera2 API
- ✅ **Native C++ Processing** - OpenCV Canny edge detection via JNI bridge
- ✅ **OpenGL ES 2.0 Rendering** - Hardware-accelerated texture rendering with custom shaders
- ✅ **Toggle Mode** - Switch between raw camera feed and edge-detected output
- ✅ **FPS Counter** - Real-time performance monitoring
- ✅ **YUV420 Support** - Efficient image format processing

### TypeScript Web Viewer
- ✅ **Canvas-based Display** - Frame visualization with HTML5 Canvas
- ✅ **Base64 Input** - Load processed frames from base64 data
- ✅ **File Upload** - Upload and display images
- ✅ **Statistics Dashboard** - Real-time FPS, resolution, and processing time
- ✅ **Modular TypeScript** - Clean, type-safe implementation

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Android Application                     │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │   Camera2    │───▶│  JNI Bridge  │───▶│   OpenCV     │  │
│  │   Manager    │    │              │    │   (C++)      │  │
│  │   (Java)     │    │ native-lib.so│    │ Edge Detect  │  │
│  └──────────────┘    └──────────────┘    └──────────────┘  │
│         │                    │                    │          │
│         │                    ▼                    │          │
│         │            ┌──────────────┐             │          │
│         │            │ EdgeProcessor│             │          │
│         │            │  Canny Edge  │             │          │
│         │            │  Gaussian    │             │          │
│         │            └──────────────┘             │          │
│         │                                         │          │
│         ▼                                         ▼          │
│  ┌──────────────┐                       ┌──────────────┐   │
│  │  MainActivity│◀──────────────────────│ Processed    │   │
│  │   (Java)     │                       │  Frame Data  │   │
│  └──────────────┘                       └──────────────┘   │
│         │                                                    │
│         ▼                                                    │
│  ┌──────────────┐                                           │
│  │  GLRenderer  │                                           │
│  │  (OpenGL ES) │                                           │
│  │  Shaders     │                                           │
│  └──────────────┘                                           │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    TypeScript Web Viewer                     │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │  HTML/CSS    │───▶│  FrameViewer │───▶│   Canvas     │  │
│  │  Interface   │    │ (TypeScript) │    │   Renderer   │  │
│  └──────────────┘    └──────────────┘    └──────────────┘  │
│                              │                               │
│                              ▼                               │
│                      ┌──────────────┐                        │
│                      │  Statistics  │                        │
│                      │  Dashboard   │                        │
│                      └──────────────┘                        │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **Camera Capture**: Camera2 API captures YUV420 frames at 640x480
2. **JNI Bridge**: Frame data passed to native C++ via JNI
3. **OpenCV Processing**: 
   - Extract Y channel (grayscale)
   - Apply Gaussian blur (kernel size: 5x5)
   - Canny edge detection (thresholds: 50, 150)
4. **OpenGL Rendering**: Processed grayscale frames rendered as GL textures
5. **Web Export**: Frames can be exported as base64 and viewed in TypeScript web app

## 📁 Project Structure

```
flam/
├── app/                           # Android application
│   ├── build.gradle              # App-level build configuration
│   └── src/main/
│       ├── AndroidManifest.xml   # App manifest with permissions
│       ├── java/com/flam/edgedetector/
│       │   ├── MainActivity.java      # Main activity
│       │   ├── CameraManager.java     # Camera2 API manager
│       │   ├── GLRenderer.java        # OpenGL ES renderer
│       │   └── NativeProcessor.java   # JNI interface
│       ├── cpp/                   # Native C++ code
│       │   ├── CMakeLists.txt        # CMake build configuration
│       │   ├── native-lib.cpp        # JNI implementation
│       │   ├── edge_processor.h      # Edge processor header
│       │   └── edge_processor.cpp    # OpenCV edge detection
│       └── res/
│           ├── layout/
│           │   └── activity_main.xml # UI layout
│           └── values/
│               └── strings.xml       # String resources
├── web/                           # TypeScript web viewer
│   ├── package.json              # NPM dependencies
│   ├── tsconfig.json             # TypeScript configuration
│   ├── index.html                # Main HTML page
│   ├── styles.css                # Styling
│   └── src/
│       └── index.ts              # TypeScript main logic
├── build.gradle                   # Root build configuration
├── settings.gradle               # Gradle settings
└── README.md                     # This file
```

## ⚙️ Setup Instructions

### Prerequisites

1. **Android Development**
   - Android Studio Arctic Fox or later
   - Android SDK (API 24+)
   - Android NDK (r21 or later)
   - JDK 8 or later

2. **OpenCV Android SDK**
   - Download OpenCV Android SDK from [opencv.org](https://opencv.org/releases/)
   - Extract to project root as `opencv-sdk/`
   - Update CMakeLists.txt path if needed

3. **TypeScript/Web**
   - Node.js 14+ and npm
   - TypeScript 5.0+

### Android Setup

1. **Clone/Setup Project**
   ```bash
   cd flam
   ```

2. **Download OpenCV**
   ```bash
   # Download OpenCV Android SDK 4.8.0 (or latest)
   # Extract to project root as opencv-sdk/
   # Directory structure should be: flam/opencv-sdk/sdk/native/jni/
   ```

3. **Open in Android Studio**
   - Open Android Studio
   - Select "Open an Existing Project"
   - Navigate to `flam/` directory
   - Wait for Gradle sync to complete

4. **Configure NDK**
   - File → Project Structure → SDK Location
   - Ensure Android NDK location is set
   - Recommended: NDK r21 or later

5. **Build Native Code**
   ```bash
   # From Android Studio, click Build → Make Project
   # Or via command line:
   ./gradlew assembleDebug
   ```

6. **Run on Device/Emulator**
   - Connect Android device (API 24+) or start emulator
   - Enable USB debugging
   - Click Run → Run 'app'
   - Grant camera permissions when prompted

### TypeScript Web Viewer Setup

1. **Install Dependencies**
   ```bash
   cd web
   npm install
   ```

2. **Build TypeScript**
   ```bash
   npm run build
   ```

3. **Serve Web Application**
   ```bash
   npm run serve
   # Or use any static file server
   # python -m http.server 8000
   ```

4. **Access Web Viewer**
   - Open browser: `http://localhost:8000`
   - Click "Load Sample Frame" to see demo
   - Upload processed frame images
   - Paste base64 frame data from Android app

## 🎮 Usage

### Android App

1. **Launch App** - Camera permission will be requested
2. **View Live Feed** - Real-time edge detection rendering
3. **Toggle Mode** - Press "Toggle Mode" to switch between:
   - Raw camera feed
   - Edge-detected output (Canny)
4. **Monitor FPS** - Bottom UI shows real-time FPS counter

### Web Viewer

1. **Sample Frame** - Click "Load Sample Frame" for demo
2. **Base64 Input** - Paste base64-encoded processed frame
3. **File Upload** - Upload PNG/JPG edge-detected images
4. **View Stats** - Monitor resolution, FPS, processing time

## 🔧 Technical Details

### OpenCV Processing Parameters

- **Image Format**: YUV420 (from Camera2)
- **Processing Resolution**: 640x480
- **Gaussian Blur**: 5x5 kernel
- **Canny Thresholds**: 50 (low), 150 (high)
- **Output**: Grayscale edge map

### OpenGL ES Implementation

- **Version**: OpenGL ES 2.0
- **Shaders**: Custom vertex + fragment shaders
- **Texture Format**: GL_LUMINANCE (grayscale)
- **Render Mode**: RENDERMODE_WHEN_DIRTY (on-demand)

### Performance

- **Target FPS**: 15-30 FPS (depends on device)
- **Processing Time**: ~20-50ms per frame
- **Memory**: Efficient zero-copy where possible

## 🐛 Troubleshooting

### OpenCV Not Found
```
Error: Could not find OpenCV
```
**Solution**: Download OpenCV Android SDK and place in `opencv-sdk/` at project root.

### CMake Build Fails
```
Error: ninja: error: 'opencv_java4.so', needed by 'libnative-lib.so'
```
**Solution**: Check `CMakeLists.txt` path to OpenCV and verify SDK structure.

### Camera Permission Denied
**Solution**: Go to Settings → Apps → Edge Detector → Permissions → Enable Camera

### Web Viewer TypeScript Errors
**Solution**: 
```bash
cd web
npm install typescript@latest
npm run build
```

## 📝 Git Commit Guidelines

This project follows modular commit practices:

```bash
# Example commit messages
git commit -m "feat: Add Camera2 API integration"
git commit -m "feat: Implement OpenCV Canny edge detection"
git commit -m "feat: Add OpenGL ES rendering pipeline"
git commit -m "feat: Create TypeScript web viewer"
git commit -m "docs: Add comprehensive README"
```

## 👤 Author

Mradul Tripathi
