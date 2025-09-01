class Button {
    constructor(x, y, width, height, textSize, label, hover, onClick) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.onClick = onClick;
        this.text = new Text(x, y - 10, textSize, label);
        this.hover = hover;
    }

    draw() {
        //button hitbox debugging 
        //fill("red");
        //rectMode(CENTER);
        //rect(this.x, this.y, this.width, this.height);

        if (this.isMouseOver() && this.hover) {
            this.text.color = "yellow";
        }
        else if (this.hover){
            this.text.color = "white";
        }

        this.text.draw();
    }

    mousePressed() {
        if (this.isMouseOver()) {
            this.onClick();
        }
    }

    isMouseOver() {
        //button hitbox
        return mouseX > this.x - this.width / 2 && 
        mouseX < this.x + this.width / 2 &&
        mouseY > this.y - this.height / 2 &&
        mouseY < this.y + this.height / 2;
    }
}