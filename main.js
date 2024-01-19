let timer = 0
let levelUl = document.querySelector('.level-ul')
let panel = document.querySelector('.panel')

const levels = [{
	levelName: 'easy',
	timer: 2000
}, {
	levelName: 'normal',
	timer: 1000
}, {
	levelName: 'hard',
	timer: 800
}];

levels.forEach(level => {
	let levelLi = document.createElement('li')
	levelLi.id = `${level.levelName}`
	levelLi.innerHTML = `${level.levelName}`
	levelUl.appendChild(levelLi)

	levelLi.addEventListener('click', () => {
		levelLi.parentElement.remove()
		createStartButton()

		let difficultyShow = document.createElement('p')
		difficultyShow.innerHTML = `${level.levelName}`
		difficultyShow.className = 'show-difficulty'
		panel.appendChild(difficultyShow)

		localStorage.setItem("difficultyLevel", level.levelName)

		return level.timer
	})


function createStartButton() {
	let divButton = document.createElement('div');
	divButton.className = 'button'
	divButton.innerHTML = `<button class="btn btn-primary btn-lg p-4" id="start">LET'S PLAY!</button>`
	area.appendChild(divButton)

let startBtn = document.getElementById('start');
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
				document.getElementById('life' + lifes).src = 'assets/images/empty-heart.png'

				lifes++
			}

			document.getElementById('target').remove()

		}

		let positionX = parseInt(Math.random() * width) - 50
		let positionY = parseInt(Math.random() * height) - 50

		positionX = positionX < 0 ? 0 : positionX
		positionY = positionY < 0 ? 0 : positionY

		let target = document.createElement('span')
		target.innerHTML = `target`
		target.className = 'material-symbols-outlined'
		target.style.left = positionX + 'px'
		target.style.top = positionY + 'px'
		target.style.position = 'absolute'
		area.appendChild(target)
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
	}, level.timer)
	console.log(level.timer)

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

}

});