package com.flam.edgedetector;

import android.Manifest;
import android.content.pm.PackageManager;
import android.opengl.GLSurfaceView;
import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

public class MainActivity extends AppCompatActivity implements CameraManager.FrameCallback {
    private static final int CAMERA_PERMISSION_REQUEST = 100;

    private GLSurfaceView glSurfaceView;
    private GLRenderer glRenderer;
    private CameraManager cameraManager;
    private Button btnToggle;
    private TextView tvFps;

    private boolean isEdgeDetectionMode = true;
    private long frameCount = 0;
    private long lastFpsUpdate = 0;

    static {
        System.loadLibrary("native-lib");
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        glSurfaceView = findViewById(R.id.glSurfaceView);
        btnToggle = findViewById(R.id.btnToggle);
        tvFps = findViewById(R.id.tvFps);

        glSurfaceView.setEGLContextClientVersion(2);
        glRenderer = new GLRenderer(this);
        glSurfaceView.setRenderer(glRenderer);
        glSurfaceView.setRenderMode(GLSurfaceView.RENDERMODE_WHEN_DIRTY);

        btnToggle.setOnClickListener(v -> {
            isEdgeDetectionMode = !isEdgeDetectionMode;
            btnToggle.setText(isEdgeDetectionMode ? "Mode: Edge Detection" : "Mode: Raw Camera");
        });

        if (checkCameraPermission()) {
            initializeCamera();
        } else {
            requestCameraPermission();
        }
    }

    private boolean checkCameraPermission() {
        return ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA)
                == PackageManager.PERMISSION_GRANTED;
    }

    private void requestCameraPermission() {
        ActivityCompat.requestPermissions(this,
                new String[]{Manifest.permission.CAMERA},
                CAMERA_PERMISSION_REQUEST);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions,
                                           @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == CAMERA_PERMISSION_REQUEST) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                initializeCamera();
            } else {
                Toast.makeText(this, R.string.permission_required, Toast.LENGTH_LONG).show();
                finish();
            }
        }
    }

    private void initializeCamera() {
        cameraManager = new CameraManager(this, this);
        cameraManager.openCamera();
    }

    @Override
    public void onFrameAvailable(byte[] frameData, int width, int height) {
        byte[] processedData;
        
        if (isEdgeDetectionMode) {
            processedData = NativeProcessor.processFrame(frameData, width, height);
        } else {
            processedData = frameData;
        }

        glRenderer.updateTexture(processedData, width, height);
        glSurfaceView.requestRender();

        updateFps();
    }

    private void updateFps() {
        frameCount++;
        long currentTime = System.currentTimeMillis();
        
        if (currentTime - lastFpsUpdate >= 1000) {
            final float fps = frameCount * 1000.0f / (currentTime - lastFpsUpdate);
            runOnUiThread(() -> tvFps.setText(String.format("FPS: %.1f", fps)));
            
            frameCount = 0;
            lastFpsUpdate = currentTime;
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        glSurfaceView.onResume();
        if (cameraManager != null) {
            cameraManager.openCamera();
        }
    }

    @Override
    protected void onPause() {
        super.onPause();
        glSurfaceView.onPause();
        if (cameraManager != null) {
            cameraManager.closeCamera();
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (cameraManager != null) {
            cameraManager.closeCamera();
        }
    }
}
