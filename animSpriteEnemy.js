function SpriteEnemyAnimation(ctx, image, width, height, frameCountX, frameCountY) {
    this.ctx = ctx;
    this.image = image;
    this.width = width;
    this.height = height;
    this.frameCountX = frameCountX;
    this.frameCountY = frameCountY;

    this.currentFrame = 0;
    this.totalFrames = frameCountX * frameCountY;
}

SpriteEnemyAnimation.prototype.draw = function (x, y, direction, speedAnim) {
    const frameX = this.currentFrame % this.frameCountX;
    const frameY = Math.floor(this.currentFrame / this.frameCountX);

    let sourceX, sourceY;

    if (direction === 'up') {
        sourceX = frameX * this.width;
        sourceY = 1 * this.height; // row 2
    } else if (direction === 'down') {
        sourceX = frameX * this.width;
        sourceY = 0 * this.height; // row 1
    } else if (direction === 'left') {
        sourceX = frameX * this.width;
        sourceY = 3 * this.height; // row 4
    } else if (direction === 'right') {
        sourceX = frameX * this.width;
        sourceY = 2 * this.height; // row 3
    }

    this.ctx.drawImage(
        this.image,
        sourceX,
        sourceY,
        this.width,
        this.height,
        x - this.width / 2,
        y - this.height / 2,
        this.width,
        this.height
    );

    this.currentFrame = (this.currentFrame + 1) % this.totalFrames;

    // Request the next animation frame with a delay based on speedAnim
    setTimeout(() => {
        this.draw(x, y, direction, speedAnim);
    }, 1000 / speedAnim);
};
