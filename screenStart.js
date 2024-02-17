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

    ctx.fillStyle = `rgba(0, 0, 0, ${globalAlpha})`;
    ctx.font = 'bold 30px Arial';

    const text = 'PRESS ENTER TO START';
    const textWidth = ctx.measureText(text).width;
    const textX = (canvas.width - textWidth) / 2;
    const textY = 350;

    ctx.fillText(text, textX, textY);
}

function drawStartScreen() {
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
