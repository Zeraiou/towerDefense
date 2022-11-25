class Building extends Sprite{
	constructor({ position, image, offset }) {
		super({ position, image, offset })
		this.width = 128
		this.height = 64
		this.center = {
			x: this.position.x + (this.width / 2),
			y: this.position.y + (this.height / 2),
		}
		this.projectiles = []

		this.timePassed = 1

		this.radius = 200
		this.fullRadian = Math.PI * 2

		this.target = null
		this.showRange = false
	}

	drawHitbox() {
		c.fillStyle = "blue"
		c.fillRect(this.position.x, this.position.y, this.width, this.height)
	}

	update() {
		if (this.showRange) this.drawRange()
		this.draw()
		if (this.target !== null || this.currentFrame !== 0) super.updateFrames()

		this.selectTarget()
		if (this.currentFrame === 6 && 
				this.framesPassed === 0 &&
				enemies.length !== 0 && 
				this.target !== null) this.shoot()
	}

	shoot() {
		this.projectiles.push(new Projectile({ 
														position: { 
															x: this.center.x - 4, 
															y: this.position.y - 65
														},
														enemy: this.target,
														image: {
															imageSrc: "./assets/images/projectile.png",
															frameRate: 1,
															frameBuffer: 1,
															loop: true,
															autoplay: true
														},
														offset: {
															x: -16,
															y: -15
														}
	  }))
	}

	selectTarget() {
		this.target = null

		const enemiesAvailible = enemies.filter(enemy => {
			const xDistance = enemy.center.x - this.center.x
			const yDistance = enemy.center.y - this.center.y 

			const distance = Math.hypot(xDistance, yDistance)

			return distance < enemy.radius + this.radius
		})
		
		if (enemiesAvailible.length > 0) this.target = enemiesAvailible[0]
	}

	drawRange() {
		c.beginPath()
		c.fillStyle = "rgba(230, 240, 0, 0.3)"
		c.arc(this.center.x, this.center.y, this.radius, 0, this.fullRadian)
		c.fill()
	}

	detectMouseCollision(mouse) {
		return mouse.x >= this.position.x &&
			 		 mouse.x <= this.position.x + this.width &&
			 		 mouse.y >= this.position.y - 70 &&
			 		 mouse.y <= this.position.y - 80 + this.height
	}
}