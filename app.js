const refs = {
    startBtn: document.getElementById('start'),
    screens: document.querySelectorAll('.screen'),
    timeList: document.getElementById('time-list'),
    timeEl: document.getElementById('time'),
    board: document.getElementById('board'),
    score: document.querySelector('.primary'),
    finishBtn: document.getElementById('finish'),
};

let time = 0;
let score = 0;
let id = 0;

refs.startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    time = 0;
    score = 0;
    clearInterval(id);
    refs.screens[0].classList.add('up');
    refs.screens[2].classList.remove('up');
});

refs.finishBtn.addEventListener('click', (event) => {
    event.preventDefault();
    refs.screens[0].classList.remove('up');
    refs.screens[1].classList.remove('up');
    refs.screens[2].classList.remove('up');
});

refs.timeList.addEventListener('click', chooseTheTime);

refs.board.addEventListener('click', evt => {
    if (evt.target.classList.contains('circle')) {
        score++;
        evt.target.remove();
        createRandomCircle();
    }
});

function chooseTheTime(event) {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        refs.screens[1].classList.add('up');
        createRandomCircle()
        id =startGame();
    }
    return id;
};

function startGame() {
    id = setInterval(decreaseTime, 1000)
    setTime(time);
    return id;
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
    refs.score.textContent = `${score}`;
    refs.screens[2].classList.add('up');
};

function createRandomCircle() {
    const circle = document.createElement('div');
    circle.classList.add('circle');
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
};

function winTheGame() {
    function killCircle() {
        const circle = document.querySelector('.circle');

        if (circle) {
            circle.click();

        }
        if (time === 0) {
        clearInterval(id);
    }
    }
    let id = setInterval(killCircle, 120); 
}