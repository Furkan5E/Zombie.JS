let isGameOver = false;
let onMainMenu = true;
let onControlsMenu = false;
let isGameWon = false;

let waveNumber = 0;
let count = 0;
let spawnCooldown = 0;

let bulletsArray = [];
let zombiesArray = [];

let player = new Player();
let menu = new MainMenu();
let gameOver = new GameOver();
let gameWon = new GameWon();
let controls = new Controls();

function preload() { // load assets
  font = loadFont('assets/font.otf');

  heartImg = loadImage("assets/heart.png");
  playerImg = loadImage("assets/player.png");
  playerHurtImg = loadImage("assets/playerHurt.png");
  zombieImg = loadImage("assets/zombie.png");
  zombieHurtImg = loadImage("assets/zombieHurt.png");
  fastZombieImg = loadImage("assets/fastZombie.png");
  strongZombieImg = loadImage("assets/strongZombie.png");
  bossZombieImg = loadImage("assets/bossZombie.png");
  minionZombieImg = loadImage("assets/minionZombie.png");
  splitZombieImg = loadImage("assets/splitZombie.png");

  playerHurtSound = loadSound("sounds/playerHurt.wav");
  shootSound = loadSound("sounds/shoot.wav");
  zombieHurtSound = loadSound("sounds/zombieHurt.wav");
  splitSound = loadSound("sounds/split.wav");
  selectSound = loadSound("sounds/select.wav");
  backgroundMusic = loadSound("sounds/battleship.ogg")
}

function setup() {
  createCanvas(900, 600);
  backgroundMusic.loop();
}

function draw() {
  if (isGameOver || onMainMenu || isGameWon || onControlsMenu) {
    drawUI();
    return;
    // return so only menus are drawn
  }
  background("#b8b4b4");
  drawBullets();
  player.draw();
  drawUI();
  drawZombies();

  // spawn zombies in intervals, instead of all at once
  if (spawnCooldown > 0){
    spawnCooldown -= 1;
  }
  else if (spawnCooldown <= 0) {
    spawnCooldown = 60;
    spawnZombies();
  }
}

function drawBullets() {
  // update each bullet in array
  for (let i = bulletsArray.length-1; i>=0; i--) {
    let bullet = bulletsArray[i];
    if (bullet.timeAlive >= 120) {
      // remove bullets after delay
      bulletsArray.splice(i, 1);
    }

    bullet.draw();
  }
}

function drawZombies() {
  for (let i = zombiesArray.length - 1; i >= 0; i--) {
    let zombie = zombiesArray[i];
    zombie.draw();

    // if zombie dies remove from array
    if (zombie.health <= 0) {
      if (zombie instanceof SplitZombie)
        zombie.split();
      zombiesArray.splice(i, 1);
    }
  }
}

function spawnZombies() {
  if (waveNumber < wavesArray.length) {
    let currentWave = wavesArray[waveNumber];
    // checking each element of the nested waves array, in order to spawn coressponding zombies
    if (count < currentWave.length) {
      let zombieType = currentWave[count];
      if (zombieType === 1) { // normal
        let zombie = new Zombie();
        zombiesArray.push(zombie);
      } 
      else if (zombieType === 2) { // fast
        let zombie = new FastZombie();
        zombiesArray.push(zombie);
      } 
      else if (zombieType === 3) { // strong
        let zombie = new StrongZombie();
        zombiesArray.push(zombie);
      }
      else if (zombieType === 4) { // split
        let zombie = new SplitZombie(false);
        zombiesArray.push(zombie);
      }
      else if (zombieType === 0) { // boss
        let zombie = new BossZombie();
        zombiesArray.push(zombie);
      }

      count += 1;
    } 
    else {
      // update counters
      waveNumber += 1;
      count = 0;
    }
  }
  // check if player won the game
  else if (waveNumber >= wavesArray.length && zombiesArray.length === 0) {
    isGameWon = true;
  }
}

function drawUI() {
  // Game over screen
  if (isGameOver) {
    gameOver.draw();
  }
// main menu
  else if (onMainMenu) {
    menu.draw();
  }
// game won screen
  else if (isGameWon) {
    gameWon.draw();
  }

// controls menu
  else if (onControlsMenu) {
    controls.draw();
  }
  // display game UI elements
  else {
    for (let i = 0; i < player.health; i++) {
      // display player lives
      image(heartImg, i * 35, 1, 34, 34);
      noSmooth();

      textFont(font);
      textSize(100);
      fill("black");
      textSize(30);
      textAlign(LEFT);
      text("Wave " + (waveNumber + 1), 2, 60); // display wave number
    }
  }
}

function resetGame() { // set all variables to initial values
  bulletsArray = [];
  zombiesArray = [];
  waveNumber = 0;
  count = 0;
  player.health = 3;
  player.x = 250;
  player.y = 325;
  isGameOver = false;
}

function mousePressed() {
  // main Menu
  if (onMainMenu) {
    menu.mousePressed();
  }
  // game Won screen
  else if (isGameWon) {
    gameWon.mousePressed();
  }
  // game over screen
  else if(isGameOver) {
    gameOver.mousePressed();
  }
  // controls menu
  else if (onControlsMenu) {
    controls.mousePressed();
  }
  // game logic
  else {
    player.mousePressed();
  }
}
