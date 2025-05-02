let game = new GameHandler();

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
  game.draw();
}

function mousePressed() {
  game.mousePressed();
}
