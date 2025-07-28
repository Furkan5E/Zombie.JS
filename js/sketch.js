let game = new GameHandler();

function setup() {
  let canvas =createCanvas(900, 600);
  canvas.parent("canvas");
  game.audio.playMusic(backgroundMusic);
}

function draw() {
  game.draw();
}

function mousePressed() {
  game.mousePressed();
}