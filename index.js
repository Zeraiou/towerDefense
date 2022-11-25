const canvas = document.querySelector('canvas')
canvas.width = 1280
canvas.height = 768

const c = canvas.getContext('2d')

let gameInterval = null

let framesPassed = 0


const background = new Image()

background.src = "./assets/images/backgroundLevel1.png"

const player = new Player({ life: 6 })

player.cash = 500
const enemies = []

let lastEnemyIndex = 0
let amountWaves = 0
spawnWaves(1)

function spawnWaves(amountOfEnemy) {
	for (let i = 0; i < amountOfEnemy; i++) {
		const offsetX = i * 150
		enemies.push(new Enemy({
			position: {
				x: waypointLevel1[0].x - offsetX, 
				y: waypointLevel1[0].y
			},
			index: i + lastEnemyIndex,
			image: {
				imageSrc: "./assets/images/orc.png",
				frameRate: 7,
				frameBuffer: 8,
				loop: true,
				autoplay: true
			},
			offset: {
				x: -4,
				y: 2,
			}
		}))
	}
	lastEnemyIndex += amountOfEnemy - 1
}

const explosionsArr = []

const buildingsArr = []
let activeTile = undefined

const towerPositionsArr = setTowerPositions(towerPositionsLevel1)

function animate() {
	gameInterval = window.requestAnimationFrame(animate)
	drawBackground()
	player.update()

	drawTowerPosition()

	for (let i = enemies.length - 1; i >= 0; i--) {
		enemies[i].update()
	}

	for (let i = explosionsArr.length - 1; i >= 0; i--) {
		explosionsArr[i].update(i)
		if (explosionsArr[i].checkEndOfLoop()) {
			explosionsArr.splice(i, 1)
		}
	}

	buildingsArr.forEach((building, buildingIndex) => {
		building.update()
		for (let i = building.projectiles.length - 1; i >= 0; i--) {
			building.projectiles[i].update(buildingIndex, i)
		}
	})

	checkPlayerLifeAmount()
	checkIfAllEnemiesDead()

	nextWaveSpawn()

	for (let i = enemies.length - 1; i >= 0; i--) {
		if (enemies[i].reachTheEnd === true) {
			player.life--
			enemies.splice(i, 1)
			continue
		}

		if (enemies[i].health <= 0) {
			player.cash += enemies[i].cashReward
			enemies.splice(i, 1)
		}
	}
}

function nextWaveSpawn() {
	framesPassed++
	if (framesPassed % 500 === 0 && amountWaves > 0) {
		framesPassed = 0
		amountWaves--
		spawnWaves(10)
	}
}

function drawBackground() {
	c.drawImage(background, 0, 0)
}

function drawTowerPosition() {
	towerPositionsArr.forEach(position => {
		position.update(mouse)
	})
}

function checkPlayerLifeAmount() {
	if (player.life <= 0) {
		c.fillStyle = "rgba(35, 0, 0, 0.5)"
		c.fillRect(0, 0, canvas.width, canvas.height)
		c.fillStyle = "black"
		c.font = "100px arial"
		c.fillText("GAME OVER", canvas.width / 2 - 300, canvas.height / 2 + 45)
		window.cancelAnimationFrame(gameInterval)
	}
}

function checkIfAllEnemiesDead() {
	if (enemies.length === 0 && amountWaves === 0) {
		c.fillStyle = "rgba(0, 50, 50, 0.5)"
		c.fillRect(0, 0, canvas.width, canvas.height)
		c.fillStyle = "black"
		c.font = "100px arial"
		c.fillText("LEVEL COMPLETED", canvas.width / 2 - 475, canvas.height / 2 + 45)
		window.cancelAnimationFrame(gameInterval)
	}
}

const mouse = {
	x: undefined,
	y: undefined
}

animate()

canvas.addEventListener("click", (event) => {
	if(activeTile !== null && !activeTile.used && player.cash >= 150) {
		
		const position = activeTile.position
		const currentBuildingY = position.y

		addTower(position)
		buildingsArr.sort((a, b) => {
			return a.position.y - b.position.y
		})
	}
})

function addTower(position) {
	player.cash -= 150
	buildingsArr.push(new Building({ 
					position, 
					image: {
						imageSrc: "./assets/images/tower.png",
						frameRate: 19,
						frameBuffer: 4,
						loop: true,
						autoplay: true,
					},
					offset: {
						x: 0,
						y: -80,
					}
			 	}))
			 	buildingsArr[buildingsArr.length - 1].showRange = true
				activeTile.used = true
}

window.addEventListener("mousemove", (event) => {
	mouse.x = event.clientX - 20
	mouse.y = event.clientY - 20

	verifyTowerPlacement()
	verifyTowerOvering()
})

function verifyTowerPlacement() {
	activeTile = null
	for (let i = 0; i < towerPositionsArr.length; i++) {
		if (towerPositionsArr[i].detectMouseCollision(mouse)) {
			activeTile = towerPositionsArr[i]
			break
		}
	}
}

function verifyTowerOvering() {
	buildingsArr.forEach(building => {
		building.showRange = false
		if (building.detectMouseCollision(mouse)) building.showRange = true
	})
}