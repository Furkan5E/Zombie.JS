class Text {
    constructor(x, y, textSize, label) {
        this.x = x;
        this.y = y;
        this.textSize = textSize;
        this.label = label; 
        this.color = "white";
        this.baseY = y;
    }

    animate() {
        this.y = this.baseY + sin(frameCount * 0.1) * 10;
    }

    draw() {
        textFont(font);
        fill(this.color);
        textAlign(CENTER, CENTER);
        textSize(this.textSize);
        text(this.label, this.x, this.y);
    }
}