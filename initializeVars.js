const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

/* background image */
const backgroundImage = new Image(1000, 800); // Using optional size for image
backgroundImage.src = './imgs/bg.png';

const backgroundBossImage = new Image(1000, 800); // Using optional size for image
backgroundBossImage.src = './imgs/bgBoss.png';

const backgroundGameOverImage = new Image(1000, 800); // Using optional size for image
backgroundGameOverImage.src = './imgs/bgGameOver.png';

const SCREENS = {
    game_over: 'GAME_OVER',
    pause: 'PAUSE',
    run: 'RUN_GAME',
    start: 'START',
};

let current_screen = 'GAME_OVER';

const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    health: 100,
    height: 30,
    speed: 25,
    width: 30,
    points: getRandomFibonacciNumber(),
};

const safeZone = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    moveAnotherPlace: false,
    radius: 50,
    teamPoints: simulateTeamPoints(5),
};

let enemies = [];
let blurIntensity = 0;

let canTakeDamage = true;
let canRecoverLife = true;

/* Waves config */
let nextWaveCalculateTime = false;
let wave = 1;
const wavesPerZoneChange = 3;
const WAVES_TIME = 3;
let nextWaveTimer = WAVES_TIME;
let wavesUntilZoneChange = wavesPerZoneChange;

/* Config Boss */
let boss = null;
const bossSpeed = 20;
let bossMaxHealth = 50;
let canBossTakeDamage = true;

/* BG matrix */
const matrixText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const columns = canvas.width / 10;
const drops = 40;
const matrixChars = [];
