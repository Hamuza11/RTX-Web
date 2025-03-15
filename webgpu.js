export async function initWebGPU(canvas) {
    if (!navigator.gpu) {
        alert("WebGPU not supported on this browser!");
        return null;
    }

    const adapter = await navigator.gpu.requestAdapter();
    const device = await adapter.requestDevice();

    const context = canvas.getContext('webgpu');
    const format = navigator.gpu.getPreferredCanvasFormat();

    context.configure({
        device: device,
        format: format
    });

    return { device, context };
}

export function render({ device, context }) {
    const encoder = device.createCommandEncoder();
    const textureView = context.getCurrentTexture().createView();
    
    const pass = encoder.beginRenderPass({
        colorAttachments: [{
            view: textureView,
            loadOp: 'clear',
            clearValue: { r: 255, g: 255, b: 255, a: 1 },
            storeOp: 'store'
        }]
    });

    pass.end();
    device.queue.submit([encoder.finish()]);
}
