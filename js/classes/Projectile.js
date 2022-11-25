class Projectile extends Sprite{
	constructor({ position = { x: 0, y: 0 }, enemy, image, offset }) {
		super({position, image, offset})
		this.velocity = {
			x: 0,
			y: 0,
		}
		this.movementSpeed = 8
		this.radius = 5
		this.fullRadian = Math.PI * 2

		this.enemy = enemy
	}

	setDirectionOfTarget() {
		this.angle = Math.atan2(this.enemy.center.y - this.position.y, 
														this.enemy.center.x - this.position.x)
		this.velocity.x = Math.cos(this.angle) * this.movementSpeed
		this.velocity.y = Math.sin(this.angle) * this.movementSpeed
	}

	drawHitbox() {
		c.beginPath()
		c.arc(this.position.x, this.position.y, this.radius, 0, this.fullRadian)
		c.fillStyle = "rgba(0, 0, 0, 0.6)"
		c.fill()
	}

	update(buildingIndex, projectileIndex) {
		this.draw() 
		// this.drawHitbox() 
		super.updateFrames()

		this.updateVelocity()
		this.move()
		this.detectCollisionWithEnemy(buildingIndex, projectileIndex)
	}

	updateVelocity() {
		const angle = Math.atan2(this.enemy.center.y - this.position.y, 
														 this.enemy.center.x - this.position.x)
		this.velocity.x = Math.cos(angle) * this.movementSpeed
		this.velocity.y = Math.sin(angle) * this.movementSpeed
	}

	move() {
		this.position.x += this.velocity.x
		this.position.y += this.velocity.y
	}

	detectCollisionWithEnemy(buildingIndex, projectileIndex) {
		const xDistance = this.enemy.center.x - this.position.x
		const yDistance = this.enemy.center.y - this.position.y 

		const distance = Math.hypot(xDistance, yDistance)

		if (distance < this.enemy.radius + this.radius) {
			buildingsArr[buildingIndex].projectiles.splice(projectileIndex, 1)
			this.enemy.health -= 1
			explosionsArr.push(new Explosion({ 
															position: this.position, 
															image: {
																imageSrc: "./assets/images/explosion.png",
																frameRate: 4,
																frameBuffer: 2,
																loop: true,
																autoplay: true,
															},
															offset: {
																x: -39,
																y: -44
															}
			}))
		}
	}
}


	/* setTargetPosition() {
			this.targetPosition = {
				x: this.enemy.position.x,
				y: this.enemy.position.y
			}
		}

		updateFixedDirectionToTarget() {
			const angle = Math.atan2(this.targetPosition.y - this.position.y, 
															 this.targetPosition.x - this.position.x)
			this.velocity.x = Math.cos(angle) * this.movementSpeed
			this.velocity.y = Math.sin(angle) * this.movementSpeed
	} */