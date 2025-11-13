/**
 * Edge Detector Web Viewer
 * TypeScript-based web interface for displaying processed frames
 */

interface FrameStats {
    resolution: { width: number; height: number };
    fps: number;
    processingTime: number;
    frameCount: number;
}

class FrameViewer {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private overlay: HTMLElement;
    private stats: FrameStats;
    private lastFrameTime: number = 0;
    private frameTimestamps: number[] = [];

    constructor() {
        this.canvas = document.getElementById('frameCanvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d')!;
        this.overlay = document.getElementById('noFrameOverlay')!;
        
        this.stats = {
            resolution: { width: 640, height: 480 },
            fps: 0,
            processingTime: 0,
            frameCount: 0
        };

        this.initializeEventListeners();
        this.updateStatsDisplay();
    }

    private initializeEventListeners(): void {
        const loadSampleBtn = document.getElementById('loadSampleBtn') as HTMLButtonElement;
        const loadBase64Btn = document.getElementById('loadBase64Btn') as HTMLButtonElement;
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;

        loadSampleBtn.addEventListener('click', () => this.loadSampleFrame());
        loadBase64Btn.addEventListener('click', () => this.loadFromBase64());
        fileInput.addEventListener('change', (e) => this.loadFromFile(e));
    }

    private loadSampleFrame(): void {
        console.log('Loading sample edge-detected frame...');
        
        // Generate a sample edge detection pattern
        const startTime = performance.now();
        
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw sample edge patterns (simulate Canny edge detection output)
        this.ctx.strokeStyle = '#FFFFFF';
        this.ctx.lineWidth = 2;

        // Draw some geometric edge patterns
        for (let i = 0; i < 10; i++) {
            this.ctx.beginPath();
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            const radius = 20 + Math.random() * 80;
            this.ctx.arc(x, y, radius, 0, Math.PI * 2);
            this.ctx.stroke();
        }

        // Draw grid pattern (common in edge detection)
        this.ctx.lineWidth = 1;
        for (let x = 0; x < this.canvas.width; x += 50) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
        for (let y = 0; y < this.canvas.height; y += 50) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }

        const endTime = performance.now();
        this.updateStats(endTime - startTime);
        this.hideOverlay();
    }

    private loadFromBase64(): void {
        const input = document.getElementById('base64Input') as HTMLTextAreaElement;
        const base64Data = input.value.trim();

        if (!base64Data) {
            alert('Please enter base64 image data');
            return;
        }

        const startTime = performance.now();
        const img = new Image();

        img.onload = () => {
            this.canvas.width = img.width;
            this.canvas.height = img.height;
            this.ctx.drawImage(img, 0, 0);
            
            this.stats.resolution = { width: img.width, height: img.height };
            const endTime = performance.now();
            this.updateStats(endTime - startTime);
            this.hideOverlay();
        };

        img.onerror = () => {
            alert('Failed to load image from base64 data');
        };

        // Handle both with and without data URL prefix
        if (base64Data.startsWith('data:')) {
            img.src = base64Data;
        } else {
            img.src = `data:image/png;base64,${base64Data}`;
        }
    }

    private loadFromFile(event: Event): void {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];

        if (!file) {
            return;
        }

        const startTime = performance.now();
        const reader = new FileReader();

        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                this.canvas.width = img.width;
                this.canvas.height = img.height;
                this.ctx.drawImage(img, 0, 0);
                
                this.stats.resolution = { width: img.width, height: img.height };
                const endTime = performance.now();
                this.updateStats(endTime - startTime);
                this.hideOverlay();
            };
            img.src = e.target?.result as string;
        };

        reader.readAsDataURL(file);
    }

    private updateStats(processingTime: number): void {
        this.stats.frameCount++;
        this.stats.processingTime = Math.round(processingTime);

        // Calculate FPS based on frame timestamps
        const now = Date.now();
        this.frameTimestamps.push(now);
        
        // Keep only timestamps from the last second
        this.frameTimestamps = this.frameTimestamps.filter(t => now - t < 1000);
        this.stats.fps = this.frameTimestamps.length;

        this.updateStatsDisplay();
    }

    private updateStatsDisplay(): void {
        const resolutionEl = document.getElementById('resolution')!;
        const fpsEl = document.getElementById('fps')!;
        const processingTimeEl = document.getElementById('processingTime')!;
        const frameCountEl = document.getElementById('frameCount')!;

        resolutionEl.textContent = `${this.stats.resolution.width} x ${this.stats.resolution.height}`;
        fpsEl.textContent = this.stats.fps.toString();
        processingTimeEl.textContent = `${this.stats.processingTime} ms`;
        frameCountEl.textContent = this.stats.frameCount.toString();
    }

    private hideOverlay(): void {
        this.overlay.classList.add('hidden');
    }
}

// Initialize the viewer when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Edge Detector Web Viewer initialized');
    new FrameViewer();
});
