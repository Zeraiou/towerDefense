class Explosion extends Sprite{
	constructor({ position, image, offset }) {
		super({ position, image, offset })
	}

	update(explosionIndex) {
		this.draw()
		super.updateFrames()
	}

	checkEndOfLoop() {
		return this.currentFrame === this.frameRate - 1 && this.framesPassed === this.frameBuffer - 1
	}
}