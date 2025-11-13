# 🚀 Quick Start Guide

This guide will help you get the Edge Detector project up and running quickly.

## 📋 Prerequisites Checklist

Before you begin, ensure you have:

- [ ] Android Studio (Arctic Fox or later)
- [ ] Android SDK (API 24+)
- [ ] Android NDK (r21 or later)
- [ ] Node.js 14+ and npm
- [ ] Git (for version control)

## 🔥 Fast Track Setup (5 Minutes)

### Step 1: Download OpenCV (Most Important!)

```bash
# 1. Visit: https://opencv.org/releases/
# 2. Download "OpenCV - 4.8.0 - Android"
# 3. Extract and rename to "opencv-sdk"
# 4. Move to project root: flam/opencv-sdk/
```

**Verify structure:**
```
flam/
├── opencv-sdk/
│   └── sdk/
│       └── native/
│           └── jni/
└── app/
```

### Step 2: Open in Android Studio

```bash
# 1. Launch Android Studio
# 2. Open Project → Navigate to flam/
# 3. Wait for Gradle sync (2-3 minutes)
```

### Step 3: Build and Run Android App

```bash
# 1. Connect Android device or start emulator
# 2. Click Run ▶️ button
# 3. Grant camera permission when prompted
# 4. See real-time edge detection!
```

### Step 4: Launch Web Viewer

```bash
cd web
npm install
npm run build
npm run serve

# Open browser: http://localhost:8000
# Click "Load Sample Frame" to test
```

## 🎯 What You Should See

### Android App
- ✅ Live camera feed with edge detection
- ✅ FPS counter showing 15-30 FPS
- ✅ Toggle button to switch modes
- ✅ Real-time OpenGL rendering

### Web Viewer
- ✅ Canvas displaying sample processed frame
- ✅ Statistics dashboard with metrics
- ✅ Upload/Base64 input functionality

## ⚡ Common Issues - Quick Fixes

### "OpenCV not found"
```bash
# Make sure opencv-sdk is in project root
# Check path in: app/src/main/cpp/CMakeLists.txt
```

### "Camera permission denied"
```bash
# Settings → Apps → Edge Detector → Permissions → Enable Camera
```

### "NDK not configured"
```bash
# File → Project Structure → SDK Location
# Install NDK from SDK Manager if missing
```

### "TypeScript build fails"
```bash
cd web
rm -rf node_modules
npm install
npm run build
```

## 📊 Testing the Integration

### Test 1: Android App
1. Launch app
2. Point camera at objects with edges (books, doorways, etc.)
3. Press "Toggle Mode" - should switch between raw/processed
4. Check FPS counter - should show 15+ FPS

### Test 2: Web Viewer
1. Open http://localhost:8000
2. Click "Load Sample Frame" - should display edge pattern
3. Upload an image - should render correctly
4. Check statistics - should update in real-time

### Test 3: End-to-End (Optional)
1. Take screenshot of Android edge detection
2. Save as PNG
3. Upload to web viewer
4. Verify rendering matches

## 🎓 Understanding the Flow

```
Camera → YUV420 Data → JNI → OpenCV (C++) → Canny Edge → JNI → OpenGL → Display
                                    ↓
                            Web Viewer (TypeScript)
```

## 📝 Git Repository

All changes are committed with proper history:

```bash
git log --oneline
# Shows modular commits for each feature
```

## 🆘 Need Help?

1. Check `README.md` for detailed documentation
2. See `OPENCV_SETUP.md` for OpenCV-specific issues
3. Review commit history for implementation details

## 🎉 Success Criteria

You've successfully completed the setup if:

- ✅ Android app runs without crashes
- ✅ Camera feed displays with edge detection
- ✅ FPS counter shows 10+ FPS
- ✅ Toggle mode works correctly
- ✅ Web viewer loads and displays frames
- ✅ Git repository has proper commit history

## ⏱️ Estimated Time

- **OpenCV Download**: 5 minutes
- **Android Studio Setup**: 5 minutes
- **First Build**: 3-5 minutes
- **Web Viewer Setup**: 2 minutes
- **Total**: ~15-20 minutes

## 🚀 Next Steps

After basic setup:

1. Experiment with different Canny thresholds in `edge_processor.cpp`
2. Try different camera resolutions in `CameraManager.java`
3. Add custom GLSL shader effects in `GLRenderer.java`
4. Enhance web viewer with WebSocket support

Happy Coding! 🎉
