
let fuel = 100; 
let score = 0;
let health = 100; 
let previousCarPosition = 0;
let horizontalSpeed = 0;
let verticalSpeed = 0;

const gameArea = document.querySelector('.CarGame'); 
const scoreDisplay = document.querySelector('.Score');
const car = document.querySelector('.car');
const container = document.querySelector('.max-area');
const fuelDisplay = document.querySelector('.fuel-percentage');
const healthDisplay = document.querySelector('.health-bar');
healthDisplay.textContent = `Health: ${health}`;
updateHealth(); 


const maxHorizontalCarPosition = 96 - (car.offsetWidth / container.offsetWidth) * 100;
const minCarPosition = 0;
const maxVerticalCarPosition = 96 - (car.offsetHeight / container.offsetHeight) * 100;
const minVerticalCarPosition = 0;
 


let carHorizontalPosition = 50; 
let carVerticalPosition = 0;
function setCarPosition() {
    car.style.left = carHorizontalPosition + '%';
    car.style.bottom = carVerticalPosition + '%';
}



function startGame() {
    player.start = true; 
    if (player.start) {
        setInterval(increaseScore, 1000);
    }
}

let canIncreaseFuel = true;
let canIncreaseHealth = true;

let fuelCooldownTimer = 0;
let healthCooldownTimer = 0;
function resetFuelCooldown() {
    fuelCooldownTimer = 0;
    document.getElementById('fuel-cooldown').textContent = 'Fuel';
}

function resetHealthCooldown() {
    healthCooldownTimer = 0;
    document.getElementById('heal-cooldown').textContent = 'Health';
}

function updateCooldownTimers() {
    if (fuelCooldownTimer > 0) {
        document.getElementById('fuel-cooldown').textContent = `Cooldown:${fuelCooldownTimer} sec`;
        fuelCooldownTimer--;
    }

    if (healthCooldownTimer > 0) {
        document.getElementById('heal-cooldown').textContent = `Cooldown:${healthCooldownTimer} sec`;
        healthCooldownTimer--;
    }
}
function increaseScore() {
    score += 1; 
    scoreDisplay.textContent = `Score: ${Math.floor(score)}`; 
}
function increaseFuel() {
    if (canIncreaseFuel && fuelCooldownTimer === 0) {
        document.getElementById('fuel-cooldown').textContent = ` Cooldown: 5 sec`;

        fuel += 20;
        if (fuel > 100) {
            fuel = 100;
        }
        updateFuel();
        canIncreaseFuel = false;
        fuelCooldownTimer = 5;

        setTimeout(() => {
            canIncreaseFuel = true;
            resetFuelCooldown();
        }, 10000);
    }
}

function increaseHealth() {
    if (canIncreaseHealth && healthCooldownTimer === 0) {
        document.getElementById('heal-cooldown').textContent = `Cooldown: 5 sec`;

        health += 30;
        if (health > 100) {
            health = 100;
        }
        healthDisplay.textContent = `${health}`;
        canIncreaseHealth = false;
        healthCooldownTimer = 5;

        setTimeout(() => {
            canIncreaseHealth = true;
            resetHealthCooldown();
        }, 10000); 
    }
}
function updateHealth() {
    const healthPercentage = (health / 100) * 100; 
    healthDisplay.textContent = `${health}%`;
}
function setHealth(percentage) {
    health = percentage;
    updateHealth();
}
function handleCollision() {
    health -= 1; 
    setHealth(health);

    healthDisplay.textContent = `${health}`;

    if (health <= 0.2) {
        gameOver();

    }
}
function updateFuel() {
    fuel -= 0.02; 

    if (fuel < 0) {
        fuel = 0; 
    }

    fuelDisplay.textContent = `${Math.floor(fuel)}%`;

    if (fuel === 0) {
        gameOver();
    }
}
resetFuelCooldown();
resetHealthCooldown();

setInterval(updateCooldownTimers, 1000); 
let leftKey = false;
let rightKey = false;
let upKey = false;
let downKey = false;
let isMovingForward = false;

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        leftKey = true;
        rightKey = false;
        horizontalSpeed = -1;
    } else if (event.key === 'ArrowRight') {
        rightKey = true;
        leftKey = false;
        horizontalSpeed = 1;
    } else if (event.key === 'ArrowUp') {
        upKey = true;
        downKey = false;
        verticalSpeed = 1;
    } else if (event.key === 'ArrowDown') {
        downKey = true;
        upKey = false;
        verticalSpeed = -1;
    } else if (event.key === 'U') {
        upKey = true;
        downKey = false;
        leftKey = true;
        rightKey = false;
        horizontalSpeed = -1;
        verticalSpeed = 1;
    } else if (event.key === 'O') {
        upKey = true;
        downKey = false;
        leftKey = false;
        rightKey = true;
        horizontalSpeed = 1;
        verticalSpeed = 1;
    } else if (event.key === 'L') {
        upKey = false;
        downKey = true;
        leftKey = true;
        rightKey = false;
        horizontalSpeed = -1;
        verticalSpeed = -1;
    } else if (event.key === 'J') {
        upKey = false;
        downKey = true;
        leftKey = false;
        rightKey = true;
        horizontalSpeed = 1;
        verticalSpeed = -1;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowLeft') {
        leftKey = false;
        horizontalSpeed = rightKey ? 1 : 0;
    } else if (event.key === 'ArrowRight') {
        rightKey = false;
        horizontalSpeed = leftKey ? -1 : 0;
    } else if (event.key === 'ArrowUp') {
        upKey = false;
        verticalSpeed = downKey ? -1 : 0;
    } else if (event.key === 'ArrowDown') {
        downKey = false;
        verticalSpeed = upKey ? 1 : 0;
    } else if (event.key === 'U' || event.key === 'O' || event.key === 'L' || event.key === 'J') {
        upKey = false;
        downKey = false;
        leftKey = false;
        rightKey = false;
        horizontalSpeed = 0;
        verticalSpeed = 0;
    }
});





let lastPosition = 0;
const currentCarPosition = getCurrentCarPosition();
updateScore(currentCarPosition);
function updateScore() {
    const scoreIncrease = 0.5; 
    score += scoreIncrease;

    updateBestScore(Math.floor(score));

    function updateBestScore(newScore) {
        const previousBestScore = localStorage.getItem('bestScore');
    
        if (!previousBestScore || newScore > parseFloat(previousBestScore)) {
            localStorage.setItem('bestScore', newScore);
        }
    }
    

    lastPosition = currentCarPosition;

    scoreDisplay.textContent = `Score: ${Math.floor(score)}`;
}
function updateBestScore(newScore) {
    const previousBestScore = localStorage.getItem('bestScore');

    if (!previousBestScore || newScore > parseFloat(previousBestScore)) {
        localStorage.setItem('bestScore', newScore);
    }
}

function updateCarPosition() {
    carHorizontalPosition += horizontalSpeed;
    carVerticalPosition += verticalSpeed;

    // Add boundaries to prevent the car from moving outside the game area
    carHorizontalPosition = Math.max(minCarPosition, Math.min(maxHorizontalCarPosition, carHorizontalPosition));
    carVerticalPosition = Math.max(minVerticalCarPosition, Math.min(maxVerticalCarPosition, carVerticalPosition));

    setCarPosition();
}

function getCurrentCarPosition() {
    const carStyle = getComputedStyle(car);
    return parseFloat(carStyle.bottom);
}

function animate() {
    updateFuel();
    updateCarPosition();
    const currentCarPosition = getCurrentCarPosition();
    updateScore(currentCarPosition);
    requestAnimationFrame(animate);
}
animate();

// Initial car position setup
setCarPosition();
// Get references to the line elements
const leftLine = document.querySelector('.leftline');
const rightLine = document.querySelector('.rightline');
const lines = document.querySelector('.lines');
const lines2 = document.querySelector('.lines2');

let leftLinePosition = 0;
let rightLinePosition = 0;
let linesPosition = 0;
let lines2Position = 0;

const lines2Positions = [200, 0, -200, -400]; 
const leftLinePositions = [200, 0, -200, -400];
const rightLinePositions = [200, 0, -200, -400];
const linesPositions = [200, 0, -200, -400];
function moveRoadLines() {
    for (let i = 0; i < lines2Positions.length; i++) {
        lines2Positions[i] += 5; 

        const screenHeight = window.innerHeight;
        if (lines2Positions[i] > screenHeight) {
            lines2Positions[i] = -100; 
        }

        const lines2Element = document.getElementById(`lines2-${i + 1}`);
        lines2Element.style.top = lines2Positions[i] + 'px';
    }
    for (let i = 0; i < leftLinePositions.length; i++) {
        leftLinePositions[i] += 5; 

        const screenHeight = window.innerHeight;
        if (leftLinePositions[i] > screenHeight) {
            leftLinePositions[i] = -100; 
        }

        const leftLinePositionsElement = document.getElementById(`leftline-${i + 1}`);
        leftLinePositionsElement.style.top = leftLinePositions[i] + 'px';
    }
    for (let i = 0; i < rightLinePositions.length; i++) {
        rightLinePositions[i] += 5; 

        const screenHeight = window.innerHeight;
        if (rightLinePositions[i] > screenHeight) {
            rightLinePositions[i] = -100; 
        }

        const rightLinePositionsElement = document.getElementById(`rightline-${i + 1}`);
        rightLinePositionsElement.style.top = rightLinePositions[i] + 'px';
    }///
    for (let i = 0; i < linesPositions.length; i++) {
        linesPositions[i] += 5; 

        const screenHeight = window.innerHeight;
        if (linesPositions[i] > screenHeight) {
            linesPositions[i] = -100; 
        }

        const linesPositionsElement = document.getElementById(`lines-${i + 1}`);
        linesPositionsElement.style.top = linesPositions[i] + 'px';
    }
}

setInterval(moveRoadLines, 16);


function createEnemyCars() {
    const numberOfEnemies = 10;
    const enemyCarsContainer = document.querySelector('.enemy-cars-container');
    const enemyCarImages = ['../gamepics/car1.png', '../gamepics/car3.png', '../gamepics/car4.png', '../gamepics/car5.png']; // Replace with your image filenames

    for (let i = 1; i <= numberOfEnemies; i++) {
        const enemyCar = document.createElement('img');
        enemyCar.src = `${enemyCarImages[Math.floor(Math.random() * enemyCarImages.length)]}`;
        enemyCar.classList.add('EnemyCar');
        enemyCar.id = `enemyCar${i}`;
        enemyCarsContainer.appendChild(enemyCar);

        const enemyCarWidth = 50; 
        const enemyCarHeight = 30;

        const enemyCarLeft = getRandomNumber(0, container.clientWidth - enemyCarWidth);
        const enemyCarTop = -getRandomNumber(100, 500); 

        enemyCar.style.left = `${enemyCarLeft}px`;
        enemyCar.style.top = `${enemyCarTop}px`;

        const enemyCarSpeed = getRandomNumber(1, 4);
        enemyCar.dataset.speed = enemyCarSpeed;
    }
}

createEnemyCars();
const enemyCars = document.querySelectorAll('.EnemyCar'); 

enemyCars.forEach((enemyCar) => {
enemyCar.style.left = `${getRandomNumber(0, container.clientWidth - enemyCar.clientWidth)}px`;
    enemyCar.style.top = `${-getRandomNumber(100, 300)}px`; 
});


function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

 function moveEnemyCars() {

    enemyCars.forEach((enemyCar) => {
        let enemyCarTop = parseInt(enemyCar.style.top);

        if (enemyCarTop >= container.clientHeight) {
            enemyCarTop = -getRandomNumber(100, 300);
            let enemyCarLeft = getRandomNumber(0, container.clientWidth - enemyCar.clientWidth);
            enemyCar.style.left = `${enemyCarLeft}px`;
        } else {
            enemyCarTop += parseInt(enemyCar.dataset.speed); 
        }

        enemyCar.style.top = `${enemyCarTop}px`;

        if (checkCollision(car, enemyCar)) {
            handleCollision();
        }
    });

    requestAnimationFrame(moveEnemyCars);
}


function checkCollision(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();

    return (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top
    );
}

moveEnemyCars();


const treeImages = [
    '../gamepics/tree1.png',
    '../gamepics/tree2.png',
    '../gamepics/tree3.png',

];

function createTrees(side) {
    const numberOfTrees = 3; 
    const treesContainer = document.querySelector(`.${side}-trees`);

    const treeWidth = 100; 
    const treeHeight = 100; 

    const spaceBetweenTrees = 5;

    for (let i = 1; i <= numberOfTrees; i++) {
        const tree = document.createElement('img');

        const randomImagePath = treeImages[Math.floor(Math.random() * treeImages.length)];
        tree.src = randomImagePath;

        tree.classList.add('tree');
        tree.style.width = `${treeWidth}px`;
        tree.style.height = `${treeHeight}px`;
        tree.style.position = 'absolute';

        let treeTop = 100 + ((i - 1) % numberOfTrees) * (treeHeight + spaceBetweenTrees);

        if (side === 'left') {
            tree.style.left = '0';
        } else if (side === 'right') {
            tree.style.right = '0';
        }

        tree.style.top = `${treeTop}px`;

        treesContainer.appendChild(tree);

        const treeSpeed = 5; 
        tree.dataset.speed = treeSpeed;
    }
}




createTrees('left');
createTrees('right');

function moveTrees() {
    const trees = document.querySelectorAll('.tree');

    trees.forEach((tree) => {
        let treeTop = parseInt(tree.style.top);

        if (treeTop >= container.clientHeight) {
            treeTop = 10; 

            if (tree.style.left === '0') {
                tree.style.right = '0';
            } else if (tree.style.right === '0') {
                tree.style.left = '0';
            }
        } else {
            treeTop += parseInt(tree.dataset.speed); 
        }

        tree.style.top = `${treeTop}px`;
    });

    requestAnimationFrame(moveTrees);
}

moveTrees();

const musicTracks = [
    '../menuaudio/g1.mp3',
    '../menuaudio/g2.mp3',
    '../menuaudio/g3.mp3',
];

function toggleMusic() {
    const audioElement = document.getElementById('gameMusic');

    if (!audioElement.paused) {
        return;
    }

    const randomIndex = Math.floor(Math.random() * musicTracks.length);
    const randomTrack = musicTracks[randomIndex];


    audioElement.src = randomTrack;
    audioElement.load();
    audioElement.play();
}

window.addEventListener('keydown', toggleMusic);

function showPopupMessage() {
    const popup = document.getElementById('popup-message');
    popup.style.display = 'block';
  
    setTimeout(() => {
      popup.style.display = 'none';
    }, 5000); 
  }
  
    showPopupMessage();

const mysteryBox = document.getElementById('mystery-box');

mysteryBox.addEventListener('mouseover', () => {
    showMysteryBoxMessage();
});

function showMysteryBoxMessage() {
    const message = "Mystery Box! Press 'Q' for health or 'E' for fuel.";
    alert(message); 
}

document.addEventListener('keydown', (event) => {
    if (mysteryBoxIsVisible() && event.key === 'q') {
        increaseHealth();
        removeMysteryBox();
    } else if (mysteryBoxIsVisible() && event.key === 'e') {
        increaseFuel();
        removeMysteryBox();
    }
});

function mysteryBoxIsVisible() {
    const carRect = car.getBoundingClientRect();
    const mysteryBoxRect = mysteryBox.getBoundingClientRect();

    return (
        carRect.left < mysteryBoxRect.right &&
        carRect.right > mysteryBoxRect.left &&
        carRect.top < mysteryBoxRect.bottom &&
        carRect.bottom > mysteryBoxRect.top
    );
}



function removeMysteryBox() {
    mysteryBox.style.display = 'none'; 
}

function showMysteryBox() {
    const randomLeft = getRandomNumber(0, container.clientWidth - mysteryBox.offsetWidth);
    const randomTop = getRandomNumber(0, container.clientHeight - mysteryBox.offsetHeight);

    mysteryBox.style.left = `${randomLeft}px`;
    mysteryBox.style.top = `${randomTop}px`;

    mysteryBox.style.display = 'block';

    setTimeout(() => {
        mysteryBox.style.display = 'none';
        setTimeout(showMysteryBox, 10000); 
    }, 5000); 
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

setTimeout(showMysteryBox, 10000);
function gameOver() {
    window.location.href = '../menugame/menu.html?score=' + score;
    const currentScore = Math.floor(score);
    const newWebPageURL = `../menugame/menu.html?score=${currentScore}`;
    window.location.href = newWebPageURL;    
}



