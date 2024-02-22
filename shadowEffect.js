function drawLightingEffect() {
    const lightCenterRange = 50;
    const gradientLightRange = 350;
    
    // gradiente circular com círculo no centro
    const gradient = ctx.createRadialGradient(
        player.x,
        player.y,
        lightCenterRange,
        player.x,
        player.y,
        gradientLightRange
    );
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0)'); // Transparente no centro
    gradient.addColorStop(1, 'rgba(0, 0, 0, 1)'); // Preto nas bordas

    // Gradiente usando a composição "source-over"
    ctx.fillStyle = gradient;
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
