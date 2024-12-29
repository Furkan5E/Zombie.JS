let player = {
  x: 400,
  y: 300,
  speed: 5,
  hearts: 3
}

let gameOver = false;

let bullets = [];
let zombies = [];

let heartImg;
let playerImg;
let zombieImg;

function preload() {
  heartImg = loadImage("/Assets/heart.png");
  playerImg = loadImage("/Assets/player.png");
  zombieImg = loadImage("/Assets/zombie.png");
}

function setup() {
  createCanvas(900, 600);
  setInterval(spawnZombies, 1500);
}

function draw() {
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
  for (let i = bullets.length-1; i>=0; i--) {
    let bullet = bullets[i];
    bullet.x += bullet.xVelocity;
    bullet.y += bullet.yVelocity;

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
  for (let i = zombies.length - 1; i >= 0; i--) {
    let zombie = zombies[i];
      let speed = 2;
      
      let dx = (player.x - zombie.x) / Math.sqrt(( player.x - zombie.x)**2 + (player.y - zombie.y)**2);
      let dy = (player.y - zombie.y) / Math.sqrt(( player.x - zombie.x)**2 + (player.y - zombie.y)**2);

      zombie.x += dx * speed;
      zombie.y += dy * speed;

    let angle = Math.atan2(dy, dx);
    push();
    translate(zombie.x, zombie.y);
    rotate(angle);
    noSmooth();
    imageMode(CENTER);
    image(zombieImg, 0, 0, 154/2.7, 120/2.7);
    pop();
  }
  }

function spawnZombies() {
  let zombie = {
    x: 920,
    y: Math.random() * 610
  }
  zombies.push(zombie);
}

function drawUI() {
  for (let i = 0; i < player.hearts; i++) {
    image(heartImg, i * 35, 1, 34, 34);
    noSmooth();
  }
}

function mousePressed() {
  let angle = atan2(mouseY - player.y, mouseX - player.x);
  let bullet = {
    x: player.x + cos(angle) * 25,
    y: player.y + sin(angle) * 25,
    xVelocity: cos(angle) * 10,
    yVelocity: sin(angle) * 10,
    angle: angle
  }
  bullets.push(bullet);
}