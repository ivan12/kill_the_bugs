function initializeWaves() {
    // Spawn enemies in waves every 3 seconds
    setInterval(() => {
        if (current_screen === 'RUN_GAME') {
            if (wave % 5 === 0 && !boss) {
                spawnBoss();
            } else {
                for (let i = 0; i < wave * 2; i++) {
                    spawnEnemy();
                }
            }

            if (!boss) {
                wavesUntilZoneChange--;

                if (wavesUntilZoneChange <= 0) {
                    // Mudar a posição da Safe Zone
                    safeZone.x = Math.random() * canvas.width;
                    safeZone.y = Math.random() * canvas.height;

                    // Resetar o contador de waves até a mudança de zona
                    wavesUntilZoneChange = wavesPerZoneChange;
                }

                nextWaveTimer = WAVES_TIME; // Reiniciar o tempo para a próxima wave
                bossMaxHealth = wave * 5;
                wave++;
            }
        }
    }, nextWaveTimer * 1000);

    setInterval(() => {
        if (current_screen === 'RUN_GAME') {
            nextWaveTimer -= 0.1; // Atualizar o tempo restante para a próxima wave
        }
    }, 100);

    for (let i = 0; i < wave * 3; i++) {
        spawnEnemy();
    }
}
