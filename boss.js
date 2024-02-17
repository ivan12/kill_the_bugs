function drawBoss() {
    if (boss) {
        let bossHeight = boss.height * (boss.health / bossMaxHealth);

        // draw boss
        ctx.stroke();
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(
            boss.x - boss.width / 2,
            boss.y - boss.height / 2 + (boss.height - bossHeight),
            boss.width,
            bossHeight
        );

        ctx.fillStyle = '#FF0000';
        ctx.rect(boss.x - boss.width / 2, boss.y - boss.height / 2, boss.width, boss.height);
        ctx.stroke();
        ctx.fillStyle = '#0F00F0';

        // show info boss
        ctx.fillStyle = '#FFF';
        ctx.fillText(`HOT FIX Vida: ${boss.health}`, 10, 60);
        ctx.stroke();
    }
}

function updateBoss() {
    if (boss) {
        // Random moves boss
        boss.x += (Math.random() - 0.5) * boss.speed;
        boss.y += (Math.random() - 0.5) * boss.speed;

        if (boss && canBossTakeDamage) {
            const dx = player.x - boss.x;
            const dy = player.y - boss.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < player.width / 2 + boss.width / 2) {
                boss.health -= 10;
                canBossTakeDamage = false;

                setTimeout(() => {
                    canBossTakeDamage = true;
                }, 1000);
            }
        }

        // Verify if boss is alive
        if (boss.health <= 0) {
            boss = null;
            wave++;
            // KILL THE HOTFIX KILL ALL CXs
            enemies = [];
        }
    }
}

function spawnBoss() {
    boss = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        width: 50,
        height: 50,
        speed: bossSpeed,
        health: bossMaxHealth,
    };
}
