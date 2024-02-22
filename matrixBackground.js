
// initialize matrixChars
for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * canvas.height;
    matrixChars[i] = [];
    for (let j = 0; j < Math.floor(Math.random() * 10) + 1; j++) {
        matrixChars[i][j] = matrixText[Math.floor(Math.random() * matrixText.length)];
    }
}

function drawMatrix() {
    ctx.fillStyle = '#00FF00';
    ctx.font = '16px Arial';

    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < matrixChars[i].length; j++) {
            const text = matrixChars[i][j];
            ctx.fillText(text, i * 20, drops[i] * 20 + j * 20);
        }
    }
}

function updateMatrix() {
    for (let i = 0; i < columns; i++) {
        if (Math.random() > 0.975 && matrixChars[i].length < 15) {
            matrixChars[i].push(matrixText[Math.floor(Math.random() * matrixText.length)]);
        }

        drops[i] = (drops[i] + 0.1) % (canvas.height / 20);
    }
}