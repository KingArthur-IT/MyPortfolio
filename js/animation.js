class Mouse{
    constructor() {
        this.mouseDownPos = { x: 0, y: 0 };
        this.mouseUpPos = { x: 0, y: 0 };
        this.isDown = false;
        this.color = 0;
    }
}
class Particle{
    constructor(posX, posY) {
        this.pos = { x: posX, y: posY };
        this.spaceStep = 1;
        this.color = 0;
    }
    move(vx, vy, color, cnvW, cnvH, ctx, drawPath) {
        this.color = color; 

        if (drawPath) {
            ctx.strokeStyle = `hsl(${ this.color }, 100%, 50%)`;
            ctx.beginPath();
            ctx.moveTo(this.pos.x, this.pos.y);
            ctx.lineTo(this.pos.x + vx * this.spaceStep, this.pos.y - vy * this.spaceStep);
            ctx.stroke();
        }

        this.pos.x += this.spaceStep * vx;
        this.pos.y -= this.spaceStep * vy;   
        
        if (this.pos.x > cnvW) { this.pos.x -= cnvW; }
        if (this.pos.y > cnvH) { this.pos.y -= cnvH; }
        if (this.pos.x < 0) { this.pos.x += cnvW }
        if (this.pos.y < 0) { this.pos.y += cnvH; }
    }
    draw(ctx) {
        ctx.strokeStyle = `hsl(${this.color}, 100%, 20%)`;
        ctx.lineWidth = 3;
        ctx.beginPath();            
        ctx.moveTo(this.pos.x, this.pos.y);
        ctx.lineTo(this.pos.x + 1, this.pos.y + 1);
        ctx.stroke();
    }
}
class Cell{
    constructor(color) {
        this.pos = { x: 0.0, y: 0.0 };
        this.velocity = { x: 0.0, y: 0.0 };
        this.pressure = 0.0;
        this.color = color;
    }
    updateVelocity(mouse, forceRadius, velocityStep) {
        let dx = this.pos.x - mouse.mouseUpPos.x;
        let dy = this.pos.y - mouse.mouseUpPos.y;
        let distance = Math.sqrt(dy * dy + dx * dx);
            
        if (distance < forceRadius) {
            let magnitude = 1 - distance / forceRadius;            
            let mouseMoveX = mouse.mouseUpPos.x - mouse.mouseDownPos.x;
            let mouseMoveY = mouse.mouseUpPos.y - mouse.mouseDownPos.y;
            if (Math.abs(mouseMoveX) > 10.0) { mouseMoveX = Math.sign(mouseMoveX) * 10.0 };
            if (Math.abs(mouseMoveY) > 10.0) { mouseMoveY = Math.sign(mouseMoveY) * 10.0 };
            this.velocity.x += -velocityStep * magnitude * mouseMoveX; 
            this.velocity.y += velocityStep * magnitude * mouseMoveY;
            this.color = mouse.color;
        }
    }
}
class Grid{
    constructor() {
        this.width  = 0;
        this.height = 0;
        this.cols_count = 0;
        this.rows_count = 0;
        this.cell_size = 5;
        this.cells = [];
    }
    Initialize(w, h, initColor) {
        if (this.cells.length > 0) this.cells.length = 0;
        this.width  = w;
        this.height = h;
        this.cols_count = parseInt(this.width / this.cell_size);
        this.rows_count = parseInt(this.height / this.cell_size);
        for (let i = 0; i < parseInt(this.cols_count); i++){
            this.cells[i] = [];
            for (let j = 0; j < parseInt(this.rows_count); j++){
                this.cells[i][j] = new Cell(initColor);
                this.cells[i][j].pos.x = i * this.cell_size;
                this.cells[i][j].pos.y = j * this.cell_size;
            }
        }
    }
    calculatePressure(i, j) {
        let x = 0, y = 0;

        let colPrev = i - 1; let colNext = i + 1;
        let rowPrev = j - 1; let rowNext = j + 1;
        
        if (colPrev < 0)                    { colPrev = parseInt(this.cols_count) - 1; }
        if (colNext > parseInt(this.cols_count) - 1)  { colNext = 0; }
        if (rowPrev < 0)                    { rowPrev = parseInt(this.rows_count) - 1; }
        if (rowNext > parseInt(this.rows_count) - 1)  { rowNext = 0; }

        x =   this.cells[colPrev][rowNext].velocity.x * 0.5
            + this.cells[colPrev][j].velocity.x
            + this.cells[colPrev][rowPrev].velocity.x * 0.5
            - this.cells[colNext][rowNext].velocity.x * 0.5
            - this.cells[colNext][j].velocity.x
            - this.cells[colNext][rowPrev].velocity.x * 0.5;
        
        y =   this.cells[colPrev][rowNext].velocity.y * 0.5
            + this.cells[i][rowNext].velocity.y
            + this.cells[colPrev][rowNext].velocity.y * 0.5
            - this.cells[colPrev][rowPrev].velocity.y * 0.5
            - this.cells[i][rowPrev].velocity.y
            - this.cells[colNext][rowPrev].velocity.y * 0.5;
        return (x + y) * 0.25;
    } 
    recalculateVelocity(i, j) {
        let x = 0, y = 0;

        let colPrev = i - 1; let colNext = i + 1;
        let rowPrev = j - 1; let rowNext = j + 1;

        if (colPrev < 0)                    { colPrev = parseInt(this.cols_count - 1); }
        if (colNext > this.cols_count - 1)  { colNext = 0; }
        if (rowPrev < 0)                    { rowPrev = parseInt(this.rows_count - 1); }
        if (rowNext > this.rows_count - 1)  { rowNext = 0; }

        x =   this.cells[colPrev][rowNext].pressure * 0.5
            + this.cells[colPrev][j].pressure
            + this.cells[colPrev][rowPrev].pressure * 0.5
            - this.cells[colNext][rowNext].pressure * 0.5
            - this.cells[colNext][j].pressure
            - this.cells[colNext][rowPrev].pressure * 0.5;
        y =   this.cells[colPrev][rowNext].pressure * 0.5
            + this.cells[i][rowNext].pressure
            + this.cells[colNext][rowNext].pressure * 0.5
            - this.cells[colPrev][rowPrev].pressure * 0.5
            - this.cells[i][rowPrev].pressure
            - this.cells[colNext][rowPrev].pressure * 0.5;
        x *= 0.25; y *= 0.25;
        x += this.cells[i][j].velocity.x; y += this.cells[i][j].velocity.y;        
        x *= 0.985; y *= 0.985;
        return { x , y };
    }
    colorDiffusion() {
        for (let j = 1; j < parseInt(this.rows_count) - 1; j++){
                for (let i = 1; i < parseInt(this.cols_count) - 1; i++){
                let colorSum = this.cells[i][j].color
                    + this.cells[i - 1][j - 1].color
                    + this.cells[i - 1][j].color
                    + this.cells[i - 1][j + 1].color
                    + this.cells[i + 1][j - 1].color
                    + this.cells[i + 1][j].color
                    + this.cells[i + 1][j + 1].color
                    + this.cells[i][j - 1].color
                    + this.cells[i][j + 1].color;
                this.cells[i][j].color = colorSum /= 9;
            }
        }
    }
    loop(mouse, forceRadius) {
        for (let i = 0; i < parseInt(this.cols_count); i++) {
            for (let j = 0; j < parseInt(this.rows_count); j++) {
                if (mouse.isDown) {
                    this.cells[i][j].updateVelocity(mouse, forceRadius, 1);
                }
                this.cells[i][j].pressure = this.calculatePressure(i, j);
                this.cells[i][j].velocity = this.recalculateVelocity(i, j);
            }
        }
        this.colorDiffusion();
    }
}
class Simulation{
    constructor(cnv, ctx) {
        this.cnv = cnv;
        this.ctx = ctx;
        this.cfg = {
            bgColor: '#000',
            particleColor: 60,
            particlesCount: 1000,
            force_radius: 40
        }
    
        this.particles = [];
        this.mouse = new Mouse();        
        this.grid = new Grid();

        this.setCanvasSize();        
        this.Animation();

        window.onresize = () => {
            this.setCanvasSize();
        }
    }
    setCanvasSize() {
        this.Initialize();
        this.grid.width  = this.cnv.width  = innerWidth;
        this.grid.height = this.cnv.height = innerHeight;
        this.grid.cols_count = parseInt(this.grid.width / this.grid.cell_size);
        this.grid.rows_count = parseInt(this.grid.height / this.grid.cell_size);
    }
    Initialize() {
        if (this.particles.length > 0) this.particles.length = 0;
        this.grid.Initialize(innerWidth, innerHeight, this.cfg.particleColor);
        let spaceStep = Math.sqrt(this.grid.width * this.grid.height / this.cfg.particlesCount);
        let x = - spaceStep / 2; let y = spaceStep / 2;
        for (let i = 0; i < this.cfg.particlesCount; i++) {
            x += spaceStep;
            if (x > this.grid.width) {
                x = spaceStep / 2;
                y += spaceStep;
            }
            this.particles.push(new Particle(x, y));
        }
    }
    Animation() {
        this.clearCanvasAlpha(.25);
        this.grid.loop(this.mouse, this.cfg.force_radius);
        this.particles.forEach(i => {
            let col = parseInt(i.pos.x / this.grid.cell_size);
            let row = parseInt(i.pos.y / this.grid.cell_size);
            if (col > parseInt(this.grid.cols_count) - 1) col = parseInt(this.grid.cols_count) - 1;
            if (row > parseInt(this.grid.rows_count) - 1) row = parseInt(this.grid.rows_count) - 1;
            let vel = this.grid.cells[col][row].velocity;
            let c = this.grid.cells[col][row].color;
            i.move(vel.x, vel.y, c, this.grid.width, this.grid.height, this.ctx, true);
            i.draw(this.ctx);
        });
        window.requestAnimationFrame(() => this.Animation())
    }
    clearCanvasAlpha(a) {
        this.ctx.fillStyle = 'rgba(0,0,0,' + a + ')';        
        this.ctx.fillRect(0, 0, this.grid.width, this.grid.height);
    }
}
(function () {
    cnv = document.getElementById('header-canvas');
    ctx = this.cnv.getContext('2d');
    let simulation = new Simulation(cnv, ctx);

    window.addEventListener("mousedown", mouse_down_handler);
    window.addEventListener("mouseup", mouse_up_handler);
    cnv.addEventListener("mousemove", mouse_move_handler);

    function mouse_down_handler(e) {
        simulation.mouse.isDown = true;
        simulation.mouse.mouseDownPos.x = e.offsetX;
        simulation.mouse.mouseDownPos.y = e.offsetY;
        simulation.mouse.mouseUpPos.x = e.offsetX;
        simulation.mouse.mouseUpPos.y = e.offsetY;

        simulation.mouse.color = Math.random() * 360;
    }
    function mouse_up_handler() {
        simulation.mouse.isDown = false;
    }
    function mouse_move_handler(e) {
        if (simulation.mouse.isDown) {
            simulation.mouse.mouseUpPos.x = simulation.mouse.mouseDownPos.x;
            simulation.mouse.mouseUpPos.y = simulation.mouse.mouseDownPos.y;

            simulation.mouse.mouseDownPos.x = e.offsetX;
            simulation.mouse.mouseDownPos.y = e.offsetY;
        }
    }
}()); 