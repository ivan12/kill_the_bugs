const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const center = { x: canvas.width / 2, y: canvas.height / 2 };

/* frame hate */
let deltaTime = 0;
let lastTimestamp = 0;
const targetFrameRate = 60; // Adjust this value to your desired frame rate
const frameDuration = 1000 / targetFrameRate;

/* background image */
const backgroundImage = new Image(1000, 800); // Using optional size for image
backgroundImage.src = './imgs/bg.png';

const backgroundBossImage = new Image(1000, 800); // Using optional size for image
backgroundBossImage.src = './imgs/bgBoss.png';

const startGameImage = new Image(408, 395); // Using optional size for image
startGameImage.src = './imgs/bgStart.png';

const backgroundGameOverImage = new Image(1000, 800); // Using optional size for image
backgroundGameOverImage.src = './imgs/bgGameOver.png';

const logoGameImage = new Image(408, 395); // Using optional size for image
logoGameImage.src = './imgs/logoGame.png';

const SCREENS = {
    game_over: 'GAME_OVER',
    pause: 'PAUSE',
    run: 'RUN_GAME',
    start: 'START',
};

let current_screen = 'START';

/* Player */
let isPlayerInSafezone = false;
let damageInterval = null;
const spritePlayerImage = new Image();
spritePlayerImage.src = './imgs/sprites/player.png';
const spritePlayer = new SpritePlayerAnimation(ctx, spritePlayerImage, 64, 64, 4, 4);

const player = {
    direction: 'right',
    health: 100,
    height: 64,
    isMoving: false,
    points: getRandomFibonacciNumber(),
    radius: 22,
    speed: 7,
    width: 64,
    x: canvas.width / 2,
    y: canvas.height / 2,
};

const safeZone = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    moveAnotherPlace: false,
    radius: 50,
    teamPoints: simulateTeamPoints(5),
};

let debug = false;

/* Enemies */
const spriteEnemyRedImage = new Image();
spriteEnemyRedImage.src = './imgs/sprites/bugRed.png';
const spriteEnemyRed = new SpriteEnemyAnimation(ctx, spriteEnemyRedImage, 38, 38, 4, 4);

const spriteEnemyYellowImage = new Image();
spriteEnemyYellowImage.src = './imgs/sprites/bugYellow.png';
const spriteEnemyYellow = new SpriteEnemyAnimation(ctx, spriteEnemyYellowImage, 38, 38, 4, 4);

const spriteEnemyGreenImage = new Image();
spriteEnemyGreenImage.src = './imgs/sprites/bugGreen.png';
const spriteEnemyGreen = new SpriteEnemyAnimation(ctx, spriteEnemyGreenImage, 38, 38, 4, 4);

const listSpritesEnemies = [spriteEnemyGreen, spriteEnemyYellow, spriteEnemyRed];

const colorsPriority = ['rgb(0,128,0)', 'rgb(192,192,192)', 'rgb(255,0,0)'];
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

/* INFOS */
let priorityDenied = false;
