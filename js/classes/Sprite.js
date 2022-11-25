class Sprite {
	constructor({position, image, offset = { x: 0, y: 0 } }) {
		this.position = position
		this.image = new Image() 

		this.image.onload = () => {
			this.loaded = true
			this.width = this.image.width / this.frameRate
			this.height = this.image.height
		}

		this.image.src = image.imageSrc 
		this.frameRate = image.frameRate
		this.frameBuffer = image.frameBuffer

		this.loaded = false		
		this.currentFrame = 0
		this.framesPassed = 0
		this.loop = image.loop
		this.autoPlay = image.autoplay
		this.offset = offset
	}

	draw() {
		const cropbox = {
			position: {
				x: this.currentFrame * this.width,
				y: 0,
			},
			width: this.width,
			height: this.height,
		}

		c.drawImage(
			this.image, 
			cropbox.position.x,
			cropbox.position.y,
			cropbox.width,
			cropbox.height,
			this.position.x + this.offset.x, 
			this.position.y + this.offset.y,
			this.width,
			this.height)
	}

	updateFrames() {
		this.framesPassed++

		if (this.framesPassed === this.frameBuffer) {
			if (this.currentFrame < this.frameRate - 1) this.currentFrame++
			else if (this.loop) this.currentFrame = 0

			this.framesPassed = 0
		}
	}
}