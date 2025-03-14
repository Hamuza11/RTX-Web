import { initWebGPU, render } from './webgpu.js';

const canvas = document.getElementById('canvas');
const gpu = await initWebGPU(canvas);

function frame() {
    render(gpu);
    requestAnimationFrame(frame);
}

frame();
