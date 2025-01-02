let isGameOver = false;
let waveNumber = 0;
let zombieNumber = 0;
let spawnCooldown = 0;

let bulletsArray = [];
let zombiesArray = [];
let player = new Player();

let heartImg;
let playerImg;
let playerHurtImg;
let zombieImg;
let zombieHurtImg;
let fastZombieImg;
let strongZombieImg;
let bossZombieImg;
let minionZombieImg;
let splitZombieImg;

let wavesArray;
let font;

function preload() {
  wavesArray = loadJSON("waves.json");
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
}

function setup() {
  createCanvas(900, 600);
  wavesArray = wavesArray.waves;
}

function draw() {
  if (isGameOver) {
    drawUI();
    return;
  }
  background("#b8b4b4");
  drawBullets();
  player.draw();
  player.update();
  player.move();
  drawUI();
  drawZombies();

  if (spawnCooldown > 0){
    spawnCooldown -= 1;
  }
  else if (spawnCooldown <= 0) {
    spawnCooldown = 45;
    spawnZombies();
  }
}

function drawBullets() {
  for (let i = bulletsArray.length-1; i>=0; i--) {
    let bullet = bulletsArray[i];
    bullet.x += bullet.dx;
    bullet.y += bullet.dy;

    push();
    translate(bullet.x, bullet.y);
    rotate(bullet.angle);
    fill("yellow");
    strokeWeight(0);
    rect(0, -1, 14, 4.5);
    pop();
  }
}

function drawZombies() {
  for (let i = zombiesArray.length - 1; i >= 0; i--) {
    let zombie = zombiesArray[i];
    zombie.move();
    zombie.draw();
    zombie.update();
    zombie.collisionCheck();
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
    if (zombieNumber < currentWave.length) {
      let zombieType = currentWave[zombieNumber];
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
      zombieNumber += 1;
    } 
    else {
      waveNumber += 1;
      zombieNumber = 0;
    }
  }
  else if (waveNumber == wavesArray.length && zombiesArray.length === 0) {
    isGamewon = true;
  }
}

function drawUI() {
  if (isGameOver) {
    background("black");
    textFont(font);
    textSize(100);
    fill(255,255,255);
    textAlign(CENTER);
    textSize(100);
    text("GAME OVER", 450, 200);
    textSize(50);
    text("Press R to to play game again", 450, 250);
    if (keyIsDown(82)) // R key
      resetGame();
  }
  for (let i = 0; i < player.health; i++) {
    image(heartImg, i * 35, 1, 34, 34);
    noSmooth();
    textFont(font);
    textSize(100);
    fill(0,0,0);
    textSize(30);
    textAlign(LEFT);
    text("Wave " + (waveNumber + 1), 2, 60);
  }
}

function resetGame() {
  bulletsArray = [];
  zombiesArray = [];
  waveNumber = 0;
  zombieNumber = 0;
  player.health = 3;
  player.x = 250;
  player.y = 325;
  isGameOver = false;
}

function mousePressed() {
  if (player.attackCooldown <= 0) {
    player.attackCooldown = 6;
    let angle = atan2(mouseY - player.y, mouseX - player.x);
    let bullet = {
      x: player.x + cos(angle) * 25,
      y: player.y + sin(angle) * 25,
      dx: cos(angle) * 10,
      dy: sin(angle) * 10,
      angle: angle
    };
    bulletsArray.push(bullet);
  }
}
