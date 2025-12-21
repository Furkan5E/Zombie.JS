//constants
const KEYS = {
  MOVE_UP: 87,    // W
  MOVE_DOWN: 83,  // S
  MOVE_LEFT: 65,  // A
  MOVE_RIGHT: 68, // D

  SHOP: 73,       // I
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
  font = loadFont('assets/misc/font.otf');

  heartImg = loadImage("assets/ui/heart.png");
  moneyImg = loadImage("assets/ui/money.png");
  playerImg = loadImage("assets/player/player.png");
  zombieImg = loadImage("assets/zombies/zombie.png");
  fastZombieImg = loadImage("assets/zombies/fastZombie.png");
  strongZombieImg = loadImage("assets/zombies/strongZombie.png");
  bossZombieImg = loadImage("assets/zombies/bossZombie.png");
  minionZombieImg = loadImage("assets/zombies/minionZombie.png");
  splitZombieImg = loadImage("assets/zombies/splitZombie.png");

  playerHurtSound = loadSound("sounds/sfx/playerHurt.wav");
  shootSound = loadSound("sounds/sfx/shoot.wav");
  zombieHurtSound = loadSound("sounds/sfx/zombieHurt.wav");
  splitSound = loadSound("sounds/sfx/split.wav");
  selectSound = loadSound("sounds/sfx/select.wav");
  gameTheme = loadSound("sounds/music/Constant Tension.wav");
  menuTheme = loadSound("sounds/music/Drums and Braams.wav");
}
