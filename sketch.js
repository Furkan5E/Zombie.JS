let player = {
  x: 400,
  y: 300,
  speed: 5,
  health: 100
};

let score = 0;
let gameOver = false;

let bullets = [];

function setup() {
  createCanvas(900, 600);
}

function draw() {
  drawPlayer();
  drawGun();
  drawBullets();
  movePlayer();
}

function drawPlayer() {
  background("#b8b4b4");
  strokeWeight(3.5);
  fill(255, 255, 255);
  ellipse(player.x, player.y, 40);
}

function drawGun() {
  push();
  translate(player.x, player.y);
  rotate(atan2(mouseY - player.y, mouseX - player.x));

  fill("#343434");
  strokeWeight(2);
  rect(21.7, - 5, 25.5, 10);
  pop();
}

function movePlayer() {
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    player.x -= player.speed;
  }
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    player.x += player.speed;
  }
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    player.y -= player.speed;
  }
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    player.y += player.speed;
  }
}

function drawBullets() {
  for (let i = bullets.length-1; i >=0; i--) {
    bullet = bullets[i];
    bullet.x += bullet.xDirection;
    bullet.y += bullet.yDirection;
    strokeWeight(0);
    fill("yellow");
    rect(bullet.x, bullet.y, 10.5, 5.5);
  }
}

function mousePressed() {
  let angle = atan2(mouseY - player.y, mouseX - player.x);
  let bullet = {
    x: player.x + cos(angle) * 25,
    y: player.y + sin(angle) * 25,
    vx: cos(angle) * 10,
    vy: sin(angle) * 10
  };
  bullets.push(bullet);
}