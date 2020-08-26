class Slider {

    constructor() {

        this.contentSlider = document.getElementById("content-slider");
        this.next = document.getElementById("right");
        this.previous = document.getElementById("left");
        this.play = document.getElementById("play");
        this.pause = document.getElementById("pause");


        //images
        this.image = ["1", "2", "3", "4"];

        //textes
        this.text = [
            "Sélectionnez une station.",
            "Entrez vos informations.",
            "Validez et signez.",
            "C'est réservé !"]

        //indice numéro image
        this.i = document.getElementById("nb").innerHTML;

        //image suivante au clic
        this.next.addEventListener("click", () => {
            this.nextImg();
        });
        //image suivante au clavier
        document.addEventListener('keydown', (evt) => {
            if (evt.which === 39) {
                this.nextImg();
            }
        });

        //image précédente au clic
        this.previous.addEventListener("click", () => {
            this.previousImg();
        });
        //image précédente au clavier
        document.addEventListener('keydown', (evt) => {
            if (evt.which === 37) {
                this.previousImg()
            }
        });

        //play au clic
        this.play.addEventListener("click", () => {
            this.playSlider();
        })
        //pause au clic
        this.pause.addEventListener("click", () => {
            this.pauseSlider();
        })
        //lecture auto
        document.addEventListener('load', this.auto());

    }

    //image suivante
    nextImg() {
        if (this.i < this.image.length - 1) {
            this.i++;
        } else {
            this.i = 0;
        }
        this.contentSlider.innerHTML = "<img class=\"col-12\" id=\"img\" src=img/" + this.image[this.i] + ".png /> <p class=\"col-12\" id=\"text-slider\">" + this.text[this.i] + "</p> <p id=\"nb\">" + this.i + "</p>";
    }

    //image précédente
    previousImg() {
        if (this.i < this.image.length + 1 && this.i >= 1) {
            this.i--;
        } else {
            this.i = this.image.length - 1;
        }
        this.contentSlider.innerHTML = "<img class=\"col-12\" id=\"img\" src=img/" + this.image[this.i] + ".png /> <p class=\"col-12\" id=\"text-slider\">" + this.text[this.i] + "</p> <p id=\"nb\">" + this.i + "</p>";
    }

    //lecture auto
    auto() {
        this.autoPlay = setInterval(this.nextImg.bind(this), 5000);
    }

    //lecture au bouton play
    playSlider() {
        this.play.style.display = "none";
        this.pause.style.display = "block";
        this.auto();
    }

    //arret au bouton pause
    pauseSlider() {
        this.pause.style.display = "none";
        this.play.style.display = "block";
        clearInterval(this.autoPlay);
    }
}

const slider = new Slider;