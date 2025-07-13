//constants
const KEYS = {
  MOVE_UP: 87,    // W
  MOVE_DOWN: 83,  // S
  MOVE_LEFT: 65,  // A
  MOVE_RIGHT: 68, // D

  PAUSE: 80,      // P
  RESTART: 82,    // R
  MENU: 27        // Esc
};

//asset handling
let heartImg;
let moneyImg;
let playerImg;
let zombieImg;
let fastZombieImg;
let strongZombieImg;
let bossZombieImg;
let minionZombieImg;
let splitZombieImg;
let font;

let playerHurtSound;
let shootSound;
let zombieHurtSound;
let splitSound;
let selectSound;
let backgroundMusic;

function preload() { // load assets
  font = loadFont('assets/font.otf');

  heartImg = loadImage("assets/heart.png");
  moneyImg = loadImage("assets/money.png");
  playerImg = loadImage("assets/player.png");
  zombieImg = loadImage("assets/zombie.png");
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
