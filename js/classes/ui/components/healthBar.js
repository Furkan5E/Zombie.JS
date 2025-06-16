class HealthBar {
    constructor(x = 0, y = 0, spacing = 35, size = 34) {
        this.x = x;
        this.y = y;
        this.spacing = spacing;
        this.size = size;
    }

    draw(lives) {
        noSmooth();
        for (let i = 0; i < lives; i++) {
            image(heartImg, this.x + i * this.spacing, this.y, this.size, this.size); 
        }
    }
}
