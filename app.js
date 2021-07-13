const refs = {
    startBtn: document.getElementById('start'),
    screens: document.querySelectorAll('.screen'),
    timeList: document.getElementById('time-list'),
    timeEl: document.getElementById('time'),
    board: document.getElementById('board'),
    score: document.querySelector('.primary'),
};

let time = 0;
let score = 0;

refs.startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    refs.screens[0].classList.add('up');
});

refs.timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        refs.screens[1].classList.add('up');
        createRandomCircle()
        startGame();
  }
});

refs.board.addEventListener('click', evt => {
    if (evt.target.classList.contains('circle')) {
        score++;
        evt.target.remove();
        createRandomCircle();
    }
});

function startGame() {
    setInterval(decreaseTime, 1000)
    setTime(time);
};

function decreaseTime() {
    if (time === 0) {
        finishGame();
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`;
        }
        setTime(current);
    }
};

function setTime(value) {
    refs.timeEl.innerHTML = `00:${value}`;
};

function finishGame() {
    refs.timeEl.parentNode.classList.add('hide');
    refs.board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`;

};

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const { width, height } = refs.board.getBoundingClientRect();

    circle.classList.add('circle');

    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${getRandomNumber(0, (height - size))}px`;
    circle.style.left = `${getRandomNumber(0, (width - size))}px`;
    circle.style.backgroundColor = getRandomColor();

    refs.board.append(circle);
};

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
};

function getRandomColor() {
  return 'rgb(' + 
    (Math.floor(Math.random()*56)+150) + ', ' +
    (Math.floor(Math.random()*56)+150) + ', ' +
    (Math.floor(Math.random()*56)+150) +
    ')';
}