class TowerPosition {
	constructor({ position }) {
		this.position = position
		this.width = 64
		this.height = 64
		this.color = "rgba(255, 255, 255, 0.2)"

		this.used = false
	}

	draw() {
		c.fillStyle = this.color
		c.fillRect(this.position.x, this.position.y, this.width, this.height)
	}

	update(mouse) {
		if (!this.used) this.draw()

		if (this.detectMouseCollision(mouse)) this.color = "rgba(255, 255, 255, 0.5)"
		else this.color = "rgba(255, 255, 255, 0.2)"
	}

	detectMouseCollision(mouse) {
		return mouse.x >= this.position.x &&
			 		 mouse.x <= this.position.x + this.width &&
			 		 mouse.y >= this.position.y &&
			 		 mouse.y <= this.position.y + this.height
	}
}