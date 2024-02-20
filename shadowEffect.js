function drawLightingEffect() {
    const lightCenterRange = 50;
    const gradientLightRange = 350;
    // Cria um gradiente circular com um círculo no centro
    const gradient = ctx.createRadialGradient(
        player.x,
        player.y,
        lightCenterRange,
        player.x,
        player.y,
        gradientLightRange
    );
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0)'); // Branco no centro
    gradient.addColorStop(1, 'rgba(0, 0, 0, 1)'); // Preto nas bordas

    // Preenche o canvas com o gradiente usando a composição "source-over"
    ctx.fillStyle = gradient;
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
