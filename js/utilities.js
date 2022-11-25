function setTowerPositions(levelArr) {
	const towerPositions = []

	levelArr.forEach((towerPosition, index) => {
		if (towerPosition === 14) {
			const position = { x: 0, y: 0 }
			const xPosition = (index % 20) * 64
			const yPosition = (Math.floor(index / 20)) * 64

			position.x = xPosition
			position.y = yPosition
			towerPositions.push(new TowerPosition({ position }))
		}
	})

	return towerPositions
}