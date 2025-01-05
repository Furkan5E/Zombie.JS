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

function preload() {
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
    spawnCooldown = 60;
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
  if (isGameOver) {
    background("black");
    textFont(font);
    textSize(100);
    fill("white");
    textAlign(CENTER);
    textSize(100);
    text("GAME OVER :(", 450, 200);

    textSize(50);
    text("Press R to to play again", 450, 265);

    textSize(40);
    text("Return to Main Menu", 450, 410);

    if (keyIsDown(82)) // R key
      resetGame();
  }

  else if (onMainMenu) {
    background("black");
    textFont(font);
    textSize(100);
    fill("white");
    textAlign(CENTER);
    textSize(80);
    text("Zombie Showdown", 450, 200);

    textSize(55);
    text("Play", 450, 275);

    textSize(42);
    text("Controls", 450, 345);
  }

  else if (isGameWon) {
    background("black");
    textFont(font);
    textSize(100);
    fill(255,255,255);
    textAlign(CENTER);

    textSize(100);
    text("YOU WON!", 450, 200);

    textSize(50);
    text("You defeated the zombie horde!", 450, 260);
    text("Well done!", 450, 320);

    textSize(45);
    text("Press R to to play again", 450, 380);

    textSize(40);
    text("Return to Main Menu", 450, 500);
    
    if (keyIsDown(82))  { // R key
      resetGame();
      isGameWon = false;
    }
  }

  else if (onControlsMenu) {
    background("black");
    textFont(font);
    textSize(100);
    fill("white");
    textAlign(CENTER);

    textSize(75);
    text("Controls", 450, 80);

    textSize(45);
    text("WASD to move around", 450, 165);
    text("Use mouse to aim", 450, 240);
    text("left mouse button click to shoot", 450, 310);
    text("Don't let the zombies get you!", 450, 385);

    textSize(40);
    text("Return to Main Menu", 450, 500);
  }

  else {
    for (let i = 0; i < player.health; i++) {
      image(heartImg, i * 35, 1, 34, 34);
      noSmooth();

      textFont(font);
      textSize(100);
      fill("black");
      textSize(30);
      textAlign(LEFT);
      text("Wave " + (waveNumber + 1), 2, 60);
    }
  }
}

function resetGame() {
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
    if (mouseX <= 520 && mouseX >= 365 && mouseY <= 275 && mouseY >= 225) { // play button position
      onMainMenu = false;
      selectSound.play();
      resetGame();
    }
    else if (mouseX <= 548 && mouseX >= 343 && mouseY <= 347 && mouseY >= 308) { // controls button position
      onMainMenu = false;
      onControlsMenu = true;
      selectSound.play();
    }
  }
  // game Won screen
  else if (isGameWon) {
    if (mouseX <= 655 && mouseX >= 235 && mouseY <= 503 && mouseY >= 465) { // return to menu button position
      onMainMenu = true;
      isGameWon = false;
      selectSound.play();
    }
  }
  // game over screen
  else if(isGameOver) {
    if (mouseX <= 655 && mouseX >= 235 && mouseY <= 408 && mouseY >= 372) { // return to menu button position
      onMainMenu = true;
      isGameOver = false;
      selectSound.play();
    }
  }
  // controls menu
  else if (onControlsMenu) {
    if (mouseX <= 655 && mouseX >= 235 && mouseY <= 503 && mouseY >= 465) { // return to menu button position
      onMainMenu = true;
      onControlsMenu = false;
      selectSound.play();
    }
  }
  // game logic
  else if (player.attackCooldown <= 0) {
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
    shootSound.play();
  }
}
