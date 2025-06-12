class Text {
    constructor(x, y, textSize, label) {
        this.x = x;
        this.y = y;
        this.textSize = textSize;
        this.label = label; 
        this.color = "white";
    }

    draw() {
        textFont(font);
        fill(this.color);
        textAlign(CENTER, CENTER);
        textSize(this.textSize);
        text(this.label, this.x, this.y);
    }
}