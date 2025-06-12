class Button {
    constructor(x, y, width, height, textSize, label, onClick) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.onClick = onClick;
        this.text = new Text(x, y - 10, textSize, label);
    }

    draw() {
        //button hitbox debugging 
        fill("red");
        rectMode(CENTER);
       // rect(this.x, this.y, this.width, this.height);

        this.text.draw()
    }

    mousePressed() {
        //button hitbox
        if (mouseX > this.x - this.width / 2 &&
            mouseX < this.x + this.width / 2 &&
            mouseY > this.y - this.height / 2 &&
            mouseY < this.y + this.height / 2) {
                this.onClick();
        }
    }
}

