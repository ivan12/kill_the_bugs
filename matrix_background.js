function drawMatrix() {
    ctx.stroke();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0F0';
    ctx.font = '16px Arial';

    for (let i = 0; i < columns; i++) {
        const indexLetter =
            current_screen === 'RUN_GAME'
                ? Math.floor(Math.random() * matrixText.length)
                : matrixText.length - 1 - (i >= matrixText.length ? 1 : i);
        const text = matrixText[indexLetter];
        ctx.fillText(text, i * 20, drops[i] * 20);
    }
    ctx.stroke();
}

function updateMatrix() {
    for (let i = 0; i < columns; i++) {
        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i] += 0.2;
    }
}
