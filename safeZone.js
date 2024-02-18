function drawSafeZone() {
    const distanceToSafeZone = Math.sqrt(
        (player.x - safeZone.x) ** 2 + (player.y - safeZone.y) ** 2
    );
    const inSafezone = distanceToSafeZone < safeZone.radius;
    const color = inSafezone ? '#0F0' : '#000';
    ctx.strokeStyle = color;
    ctx.lineWidth = inSafezone ? wavesUntilZoneChange : 2;
    ctx.beginPath();
    ctx.arc(safeZone.x, safeZone.y, safeZone.radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fillText(`TEAM ${boss ? '' : safeZone.teamPoints}`, safeZone.x - 45, safeZone.y + 10);
    ctx.font = 'bold 40px';
    ctx.stroke();
}

function updateSafeZone() {
    if (safeZone.teamPoints <= 0) {
        safeZone.x = Math.random() * canvas.width;
        safeZone.y = Math.random() * canvas.height;
        safeZone.teamPoints = simulateTeamPoints(5);
    }
}
