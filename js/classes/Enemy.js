class Enemy extends Sprite{
	constructor({ position, index, maxHealth = 3, image, offset }) {
		super({ position, image, offset })
		this.index = index
		this.velocity = {
			x: 0,
			y: 0,
		},
		this.width = 100
		this.radius = 40 
		this.fullRadian = Math.PI * 2

		this.nextWaypoint = 1
		this.waypoint = waypointLevel1[this.nextWaypoint]
		this.lastWaypoint = waypointLevel1.length - 1

		this.center = {
			x: this.position.x + (this.radius),
			y: this.position.y + (this.radius),
		}

		this.movementSpeed = 3
		this.maxHealth = maxHealth
		this.health = this.maxHealth
		this.healthBarTotal = (this.health / this.maxHealth) * (this.width - 4)
		this.cashReward = 100

		this.reachTheEnd = false
	}

	drawHitbox() {
		c.beginPath()
		c.fillStyle = "rgba(230, 0, 0, 0.3)"
		c.arc(this.center.x, this.center.y, this.radius, 0, this.fullRadian)
		c.fill()
	}

	move() {
		this.position.x += this.velocity.x 
		this.position.y += this.velocity.y
	}

	updateVelocity() {
		const distanceY = this.waypoint.y - this.position.y
		const distanceX = this.waypoint.x - this.position.x 

		//angle in radian
		const angle = Math.atan2(distanceY, distanceX)

		this.velocity.x = Math.cos(angle) * this.movementSpeed
		this.velocity.y = Math.sin(angle) * this.movementSpeed
	}

	inspectPosition() {
		if (Math.round(this.position.x) >= this.waypoint.x - this.movementSpeed && 
				Math.round(this.position.x) <= this.waypoint.x + this.movementSpeed && 
				Math.round(this.position.y) >= this.waypoint.y - this.movementSpeed  &&
				Math.round(this.position.y) <= this.waypoint.y + this.movementSpeed) {
					if (this.nextWaypoint < this.lastWaypoint) {
						this.nextWaypoint++
						this.waypoint = waypointLevel1[this.nextWaypoint]
					}
					else {
						this.reachTheEnd = true
					}
		}
	}

	update(direction) {
		this.draw()
		this.drawHitbox()
		this.drawHealthBar()
		super.updateFrames()

		this.updateVelocity()
		this.move()
		this.inspectPosition()
		this.updateCenterPosition()
		this.updateHealthBarTotal()
	}

	drawHealthBar() {
		c.fillStyle = "black"
		c.fillRect(this.position.x, this.position.y - 15, this.width, 10)
		c.fillStyle = "red"
		c.fillRect(this.position.x + 2, this.position.y - 15 + 1, this.width - 4, 8)
		c.fillStyle = "green"
		c.fillRect(this.position.x + 2, this.position.y - 15 + 1, this.healthBarTotal, 8)
	}

	updateCenterPosition() {
		this.center = {
			x: this.position.x + (this.radius),
			y: this.position.y + (this.radius),
		}
	}

	updateHealthBarTotal() {
		this.healthBarTotal = (this.health / this.maxHealth) * (this.width - 4)
	}
}