let game = new GameHandler();

function setup() {
  createCanvas(900, 600);
  game.audio.playMusic(backgroundMusic);
}

function draw() {
  game.draw();
}

function mousePressed() {
  game.mousePressed();
}