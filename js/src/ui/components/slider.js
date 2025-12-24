class Slider {
  constructor(x, y, w, h, min, max, value, label, onChange) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.min = min;
    this.max = max;
    this.value = value;
    this.label = label;
    this.onChange = onChange;

    this.dragging = false;
  }

  setValue(v) {
    this.value = constrain(v, this.min, this.max);
    if (this.onChange)
      this.onChange(this.value);
  }

  valueToX() {
    const t = (this.value - this.min) / (this.max - this.min);
    return this.x - this.w/2 + t * this.w;
  }

  xToValue(mx) {
    const left = this.x - this.w/2;
    const t = constrain((mx - left) / this.w, 0, 1);
    return this.min + t * (this.max - this.min);
  }

  draw() {
    //label
    fill("white");
    textAlign(CENTER, CENTER);
    textSize(32);
    text(this.label + ": " + Math.round(this.value * 100) + "%", this.x, this.y - 38);

    //track
    rectMode(CENTER);
    noStroke();
    fill("160");
    rect(this.x, this.y, this.w, this.h);
    //fill
    const t = (this.value - this.min) / (this.max - this.min);
    fill("green");
    rect(this.x - this.w/2 + (t*this.w)/2, this.y, t*this.w, this.h);

    //knob
    fill("white");
    circle(this.valueToX(), this.y, this.h * 1.8);
  }

  mousePressed() {
    const knobX = this.valueToX();
    const d = dist(mouseX, mouseY, knobX, this.y);

    //click knob or on bar
    const overBar =
      mouseX >= this.x - this.w/2 && mouseX <= this.x + this.w/2 &&
      mouseY >= this.y - this.h/2 && mouseY <= this.y + this.h/2;

    if (d <= this.h || overBar) {
      this.dragging = true;
      this.setValue(this.xToValue(mouseX));
    }
  }

  mouseDragged() {
    if (!this.dragging)
      return;
    this.setValue(this.xToValue(mouseX));
  }

  mouseReleased() {
    this.dragging = false;
  }
}
