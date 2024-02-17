function initializeWaves() {
    for (let i = 0; i < wave * 3; i++) {
        spawnEnemy();
    }
}

function updateWaves() {
    if (enemies.length === 0 && nextWaveCalculateTime === false) {
        nextWaveCalculateTime = true;
        nextWaveTimer = WAVES_TIME; // reset time to next wave
        bossMaxHealth = wave * 5;
        return;
    }
}

// Spawn enemies in waves every 3 seconds
timeNextWave = setInterval(() => {
    if (current_screen === 'RUN_GAME') {
        if (nextWaveCalculateTime && nextWaveTimer <= 0) {
            wave++;
            player.points = getRandomFibonacciNumber();
            safeZone.teamPoints = simulateTeamPoints(5);

            if (wave % 5 === 0 && !boss) {
                spawnBoss();
                nextWaveCalculateTime = false;
            } else {
                for (let i = 0; i < wave * 5; i++) {
                    spawnEnemy();
                }
                nextWaveCalculateTime = false;
            }

            if (!boss) {
                wavesUntilZoneChange--;

                if (wavesUntilZoneChange <= 0 || safeZone.moveAnotherPlace) {
                    // change position Safe Zone
                    safeZone.x = Math.random() * canvas.width;
                    safeZone.y = Math.random() * canvas.height;

                    // reset counter time next wave
                    wavesUntilZoneChange = wavesPerZoneChange;
                }
            }
        }
    }
}, nextWaveTimer * 1000);

setInterval(() => {
    if (current_screen === 'RUN_GAME') {
        if (nextWaveTimer > 0) {
            nextWaveTimer -= 0.1;
        }
    }
}, 100);
