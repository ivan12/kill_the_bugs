function SpriteAnimation(ctx, image, width, height, frameCountX, frameCountY) {
    this.ctx = ctx;
    this.image = image;
    this.width = width;
    this.height = height;
    this.frameCountX = frameCountX;
    this.frameCountY = frameCountY;

    this.currentFrame = 0;
    this.totalFrames = frameCountX * frameCountY;
}

SpriteAnimation.prototype.draw = function (x, y, direction) {
    const frameX = this.currentFrame % this.frameCountX;
    const frameY = Math.floor(this.currentFrame / this.frameCountX);

    const sourceX = frameX * this.width;
    const sourceY = frameY * this.height;

    this.ctx.drawImage(
        this.image,
        sourceX,
        sourceY,
        this.width,
        this.height,
        x,
        y,
        this.width,
        this.height
    );

    if (direction === 'right') {
        this.currentFrame = (this.currentFrame + 1) % this.totalFrames;
    } else if (direction === 'left') {
        this.currentFrame = (this.currentFrame - 1 + this.totalFrames) % this.totalFrames;
    } else if (direction === 'up' || direction === 'down') {
        // logic up frame
    }
};
