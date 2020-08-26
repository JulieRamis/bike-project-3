class Signature {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.rect = this.canvas.getBoundingClientRect();
        this.buttonCanvas = document.getElementById("bouton-canvas");
        this.boutonVal = document.getElementById("bouton-valid");
        this.ctx = this.canvas.getContext("2d");
        this.paint = false;
        this.draw();
        this.typeStart();
        this.typeDraw();
        this.stopDrawing();
        this.redraw();
    }

    startDrawing(offsetX, offsetY, pageX, pageY) {
        this.paint = true;
        this.ctx.strokeStyle = 'blue';
        this.ctx.lineWidth = 1;
        this.ctx.lineJoin = "round";
        this.ctx.beginPath();
        this.ctx.moveTo(offsetX, offsetY, pageX, pageY);

    }

    typeStart() {
        this.canvas.addEventListener('mousedown', e => {
            console.log(this);
            this.startDrawing(e.offsetX, e.offsetY);
        });
        this.canvas.addEventListener('touchstart', e => {
           
            this.startDrawing(e.touches[0].pageX, e.touches[0].pageY);
        });
    }



    draw(X, Y, eventType) {
        if (this.paint === true) {
            if (eventType === 'touchmove') {
                console.log(X);
                this.ctx.lineTo(X - this.rect.left, Y - this.rect.top); //adapte la position du tactile
            } else if (eventType === "mousemove"){
                this.ctx.lineTo(X, Y);
            }
            this.ctx.stroke();
            this.boutonVal.disabled = false;
        }
    }


    typeDraw() {
        this.canvas.addEventListener('mousemove', e => {
            this.draw(e.offsetX, e.offsetY, e.type); //récupère position souris
        });
        this.canvas.addEventListener('touchmove', e => { 
            console.log(e.touches[0].pageX);
            this.draw(e.touches[0].pageX, e.touches[0].pageY, e.type); //récupère position doigt
            e.preventDefault();
        });
    }


    stopDrawing() {
        window.addEventListener('mouseup', e => {
            this.paint = false;
        });
        window.addEventListener('touchend', e => {
            this.paint = false;
        });


    }

    redraw() {
        this.buttonCanvas.addEventListener('click', e => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.boutonVal.style.display = "none";
        });
    }

}

const canvas = new Signature;