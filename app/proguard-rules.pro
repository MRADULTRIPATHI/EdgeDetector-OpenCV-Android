# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in $ANDROID_HOME/tools/proguard/proguard-android.txt

# Keep native methods
-keepclasseswithmembernames class * {
    native <methods>;
}

# Keep JNI interface
-keep class com.flam.edgedetector.NativeProcessor { *; }

# OpenCV
-keep class org.opencv.** { *; }

# Keep line numbers for debugging
-keepattributes SourceFile,LineNumberTable
-renamesourcefileattribute SourceFile
