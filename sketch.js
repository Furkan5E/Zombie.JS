let player = {
  x: 250,
  y: 325,
  speed: 5,
  health: 3
}

let gameOver = false;
let waveNumber = 0;
let zombieNumber = 0;

let bulletsArray = [];
let zombiesArray = [];

let heartImg;
let playerImg;
let zombieImg;
let fastZombieImg;
let strongZombieImg;

let wavesArray;
let font;

function preload() {
  wavesArray = loadJSON("waves.json");
  font = loadFont('/assets/font.otf');

  heartImg = loadImage("assets/heart.png");
  playerImg = loadImage("assets/player.png");
  zombieImg = loadImage("assets/zombie.png");
  fastZombieImg = loadImage("assets/fastZombie.png");
  strongZombieImg = loadImage("assets/strongZombie.png");
}

function setup() {
  createCanvas(900, 600);
  setInterval(spawnZombies, 500);
  wavesArray = wavesArray.waves;
}

function draw() {
  if (gameOver) {
    drawUI();
    return;
  }
  background("#b8b4b4");
  drawBullets();
  drawPlayer();
  movePlayer();
  drawUI();
  drawZombies();
}

function drawPlayer() {
  push();
  translate(player.x, player.y);
  rotate(atan2(mouseY - player.y, mouseX - player.x));
  noSmooth();
  imageMode(CENTER);
  image(playerImg, 0, 0, 305/3.2, 305/3.2);
  pop();
}

function movePlayer() {
  if (keyIsDown(65) && player.x > 24) {  // A key, left
    player.x -= player.speed;
  }
  if (keyIsDown(68) && player.x < 876) { // D key, right
    player.x += player.speed;
  }
  if (keyIsDown(87) && player.y > 24) { // W key, up
    player.y -= player.speed;
  }
  if (keyIsDown(83) && player.y < 576) { // S key, down
    player.y += player.speed;
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
    let dx = (player.x - zombie.x) / Math.sqrt((player.x - zombie.x)**2 + (player.y - zombie.y)**2);
    let dy = (player.y - zombie.y) / Math.sqrt((player.x - zombie.x)**2 + (player.y - zombie.y)**2);

    zombie.x += dx * zombie.speed;
    zombie.y += dy * zombie.speed;

    let angle = Math.atan2(dy, dx);
    push();
    translate(zombie.x, zombie.y);
    rotate(angle);
    noSmooth();
    imageMode(CENTER);
    image(zombie.img, 0, 0, zombie.size[0], zombie.size[1]);
    pop();

    if (dist(player.x, player.y, zombie.x, zombie.y) < zombie.size[0] / 1.5) {
      if (zombie.coolDown <= 0) {
        zombie.coolDown = 60;
        player.health -= 1;
        if (player.health <= 0) {
          gameOver = true;
        }
      }
    }
    if (zombie.coolDown > 0) {
      zombie.coolDown -= 1;
    }
    for (let x = bulletsArray.length - 1; x >= 0; x--) {
      let bullet = bulletsArray[x];
      if (dist(bullet.x, bullet.y, zombie.x, zombie.y) < zombie.size[0] / 2) {
        zombie.health -= 1;
        if (zombie.health <= 0) zombiesArray.splice(i, 1);
        bulletsArray.splice(x, 1);
      }
    }
  }
}

function spawnZombies() {
  if (waveNumber < wavesArray.length) {
    let currentWave = wavesArray[waveNumber];
    if (zombieNumber < currentWave.length) {
      let zombieType = currentWave[zombieNumber];
      if (zombieType === 1) { // normal
        getZombie(zombieImg, 3, [57, 44], 2); // image, health, size, speed
      } 
      else if (zombieType === 2) { // fast
        getZombie(fastZombieImg, 2, [51, 40], 3);
      } 
      else if (zombieType === 3) { // strong
        getZombie(strongZombieImg, 5, [61, 48], 1.5);
      }
      zombieNumber += 1;
    } 
    else {
      waveNumber += 1;
      zombieNumber = 0;
    }
  }
}

function getZombie(imgGiven, healthGiven, sizeGiven, speedGiven) {
  let zombie = {
    x: 920,
    y: Math.random() * 610,
    img: imgGiven,
    health: healthGiven,
    size: sizeGiven,  // image size is 154 by 120 px
    speed: speedGiven,
    coolDown: 0
  }
  zombiesArray.push(zombie);
}

function drawUI() {
  if (gameOver) {
    background("#000000");
    textFont(font);
    textSize(100);
    fill(255,255,255);
    textAlign(CENTER);
    textSize(100);
    text("GAME OVER", 450, 200);
    textSize(50);
    text("Press R to to play game again", 450, 250);
    resetGame();
  }
  for (let i = 0; i < player.health; i++) {
    image(heartImg, i * 35, 1, 34, 34);
    noSmooth();
  }
}

function resetGame() {
  if (keyIsDown(82)) { // R key
    bulletsArray = [];
    zombiesArray = [];
    waveNumber = 0;
    zombieNumber = 0;
    player.health = 3;
    player.x = 250;
    player.y = 325;

    gameOver = false;
  }
}

function mousePressed() {
  let angle = atan2(mouseY - player.y, mouseX - player.x);
  let bullet = {
    x: player.x + cos(angle) * 25,
    y: player.y + sin(angle) * 25,
    dx: cos(angle) * 10,
    dy: sin(angle) * 10,
    angle: angle
  }
  bulletsArray.push(bullet);
}