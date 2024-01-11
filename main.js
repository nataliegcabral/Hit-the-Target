let startBtn = document.querySelector('#start')

startBtn.addEventListener('click', function() {
	this.remove()

	let height = 0
	let width = 0
	let lifes = 1

	const area = document.querySelector('#area')
	function adjustGameArea() {
		width = area.clientWidth
		height = area.clientHeight 
	}

	const pop = new Audio('assets/audio/pop.mp3')
	

	i = 0
	let score = document.querySelector('.score')
	score.innerHTML = `Score: ${i}`

	adjustGameArea()

	function randomPosition() {

		if(document.getElementById('target')) {			
			if(lifes > 3) {
				clearInterval(createTarget, timerMin, timerSec)
				
				window.location.href = 'game-over.html'
				

			} else {
				document.getElementById('life' + lifes).src = 'assets/imagens/empty-heart.png'

				lifes++
			}

			document.getElementById('target').remove()

		}

		let positionX = parseInt(Math.random() * width) - 40
		let positionY = parseInt(Math.random() * height) + 130

		positionX = positionX < 0 ? 0 : positionX
		positionY = positionY < 0 ? 0 : positionY


		let target = document.createElement('span')
		target.innerHTML = `target`
		target.className = 'material-symbols-outlined'
		target.style.left = positionX + 10 + 'px'
		target.style.top = positionY + 'px'
		target.style.position = 'absolute'
		document.body.appendChild(target)
		target.id = 'target'

		target.addEventListener('mousedown', function() {
			this.remove()
			pop.play()
		
			i++
			score.innerHTML = `Score: ${i}`
			
		})

		localStorage.setItem("finalScore", i)
	}

	let createTarget = setInterval(function() {
		randomPosition()
	}, 1000)

	let min = 0
	let sec = 0

	let timerMin = setInterval(function() {
		min++
	}, 60000)

	let timerSec = setInterval(function () {

		sec++

		let time = document.querySelector('#time')

		if(sec < 10) {
			time.innerHTML = `${min}:0${sec}`
		} else {
			time.innerHTML = `${min}:${sec}`
		}
		
		if (sec > 59) {
			sec = 0
		}

		
	}, 1000)

})


