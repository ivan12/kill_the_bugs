function initializeWaves() {
    enemies = [];
    wave = 0;
    spawnWave();
}

function updateWaves() {
    if (enemies.length === 0 && waveIsRunning === true) {
        waveIsRunning = false;
        nextWaveTimer = WAVES_TIME;
        bossMaxHealth = wave * 5;
        return;
    }
    if (nextWaveTimer <= 0 && !waveIsRunning) {
        spawnWave();
    }

    if (nextWaveTimer > 0) {
        timeNextWave = setTimeout(() => {
            if (current_screen === 'RUN_GAME') {
                nextWaveTimer -= 0.1; // Atualizar o tempo restante para a próxima wave
            }
        }, 100);
    }
}

function spawnWave() {
    wave++;
    player.points = getRandomFibonacciNumber();
    safeZone.teamPoints = simulateTeamPoints(5);

    if (wave % 5 === 0 && !boss) {
        spawnBoss();
    } else {
        let numEnemiesPerWaves = Math.floor(Math.random() * 8) + 3;
        for (let i = 0; i < numEnemiesPerWaves; i++) {
            spawnEnemy();
        }
    }

    if (!boss) {
        wavesUntilZoneChange--;

        if (wavesUntilZoneChange <= 0 || safeZone.moveAnotherPlace) {
            // Change position Safe Zone
            safeZone.x = Math.random() * canvas.width;
            safeZone.y = Math.random() * canvas.height;

            // Reset counter time for the next wave
            wavesUntilZoneChange = wavesPerZoneChange;
        }
    }

    waveIsRunning = true;
}
