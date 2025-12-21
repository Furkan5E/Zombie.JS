let game;

function setup() {
  let canvas =createCanvas(900, 600);
  canvas.parent("canvas");
  game = new GameHandler();
  game.audio.playMusic();
}

function draw() {
  game.draw();
}

function mousePressed() {
  game.mousePressed();
}