class Player {
	constructor({ life }) {
		this.life = life
		this.cash = 500
	}

	update() {
		this.drawUI()
	}

	drawUI() {
		c.fillStyle = "black"
		c.strokeRect(canvas.width - 161, 19, 132, 52)
		c.fillStyle = "rgba(255, 255, 255, 0.8)"
		c.fillRect(canvas.width - 160, 20, 130, 50)

		c.fillStyle = "black"
		c.font = "24px arial"
		c.fillText("Health: " + this.life, canvas.width - 155, 40)

		c.fillStyle = "black"
		c.font = "24px arial"
		c.fillText("Cash: " + this.cash + "$", canvas.width - 155, 65)
	}
}