let fadeIn = true;
let globalAlpha = 1;

function drawTextInfo() {
    if (fadeIn) {
        globalAlpha += 0.02;
        if (globalAlpha >= 1) {
            fadeIn = false;
            setTimeout(() => {
                fadeIn = false;
                setTimeout(() => {
                    fadeIn = true;
                }, 5000);
            }, 5000);
        }
    } else {
        globalAlpha -= 0.02;
        if (globalAlpha <= 0.02) {
            fadeIn = true;
            setTimeout(() => {
                fadeIn = true;
                setTimeout(() => {
                    fadeIn = false;
                }, 5000);
            }, 5000);
        }
    }

    ctx.fillStyle = `rgba(255, 255, 255, ${globalAlpha})`;
    ctx.strokeStyle = `rgba(255, 255, 255, ${globalAlpha})`;
    ctx.font = 'bold 25px Arial';

    const text = 'PRESS ENTER TO START';
    const textWidth = ctx.measureText(text).width;
    const textX = (canvas.width - textWidth) / 2;
    const textY = 460;

    ctx.fillText(text, textX, textY);
    ctx.strokeText(text, textX, textY);
}

function drawStartScreen() {
    ctx.drawImage(logoGameImage, 300, 50, logoGameImage.width, logoGameImage.height);
    setInterval(drawTextInfo(), 80);
}

document.addEventListener('keydown', e => {
    if (current_screen === 'START') {
        switch (e.key) {
            case 'Enter':
                ctx.globalAlpha = 1;
                current_screen = 'RUN_GAME';
                break;
        }
    }
});
