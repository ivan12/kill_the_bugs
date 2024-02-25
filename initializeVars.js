/* System */
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const center = { x: canvas.width / 2, y: canvas.height / 2 };
let debug = false;

/* frame hate */
const targetFrameRate = 60;
const frameDuration = 1000 / targetFrameRate;
let deltaTime = 0;
let lastTimestamp = 0;

/* background image */
const backgroundImage = new Image(1000, 800);
backgroundImage.src = './imgs/bg.png';

const backgroundBossImage = new Image(1000, 800);
backgroundBossImage.src = './imgs/bgBoss.png';

const startGameImage = new Image(408, 395);
startGameImage.src = './imgs/bgStart.png';

const backgroundGameOverImage = new Image(1000, 800);
backgroundGameOverImage.src = './imgs/bgGameOver.png';

const logoGameImage = new Image(408, 395);
logoGameImage.src = './imgs/logoGame.png';

const SCREENS = {
    game_over: 'GAME_OVER',
    pause: 'PAUSE',
    run: 'RUN_GAME',
    start: 'START',
};

let current_screen = 'START';

/* Intervals timeout */
let blurInterval = null;
let recoveringInterval = null;
let takeDamageTimeout = null;

// Player life bar
const playerHealthBarHeight = 25;
const playerHealthBarWidth = 400;
const posXBar = 320;
const posYBar = 15;

/* Player */
let blurIntensity = 0;
let canRecoverLife = true;
let canTakeDamage = true;
let isPlayerInSafeZone = false;
let recoveryTimeout = 0;
let canTakeDamageTimout = 0;

const spritePlayerImage = new Image();
spritePlayerImage.src = './imgs/sprites/player.png';
const spritePlayer = new SpritePlayerAnimation(ctx, spritePlayerImage, 64, 64, 4, 4);

// points: getRandomFibonacciNumber()
const player = {
    direction: 'right',
    health: 100,
    height: 64,
    isMoving: false,
    isRecovering: false,
    points: 22,
    radius: 22,
    speed: 7,
    width: 64,
    x: canvas.width / 2,
    y: canvas.height / 2,
};

const safeZone = {
    moveAnotherPlace: false,
    radius: 50,
    teamPoints: simulateTeamPoints(5),
    x: canvas.width / 2,
    y: canvas.height / 2,
};

/* Enemies */
const colorsPriority = ['rgb(0,128,0)', 'rgb(192,192,192)', 'rgb(255,0,0)'];
let enemies = [];

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

/* Waves config */
const WAVES_TIME = 3;
const wavesPerZoneChange = 3;
let waveIsRunning = true;
let nextWaveTimer = WAVES_TIME;
let wave = 1;
let wavesUntilZoneChange = wavesPerZoneChange;

/* Config Boss */
const bossSpeed = 20;
let boss = null;
let bossMaxHealth = 50;
let canBossTakeDamage = true;

/* Background like matrix */
const columns = canvas.width / 10;
const drops = 40;
const matrixChars = [];
const matrixText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

/* INFOS feed to player */
let priorityDenied = false;
