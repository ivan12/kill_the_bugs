function drawSafeZone() {
    ctx.stroke();
    const distanceToSafeZone = Math.sqrt(
        (player.x - safeZone.x) ** 2 + (player.y - safeZone.y) ** 2
    );
    const inSafezone = distanceToSafeZone < safeZone.radius;
    const color = inSafezone ? '#0F0' : '#808080';
    ctx.strokeStyle = color;
    ctx.lineWidth = inSafezone ? wavesUntilZoneChange : 2;
    ctx.beginPath();
    ctx.arc(safeZone.x, safeZone.y, safeZone.radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fillText('TEAM AREA', safeZone.x - 45, safeZone.y + 10);
    ctx.stroke();
}
