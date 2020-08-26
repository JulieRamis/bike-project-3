class Reservation {
    constructor() {
        this.form = document.getElementById("form");
        this.nom = document.getElementById("nom");
        this.localNom = localStorage.getItem("nom");
        this.prenom = document.getElementById("prenom");
        this.localPrenom = localStorage.getItem("prenom");
        this.boutonResa = document.getElementById("bouton-resa");
        this.boutonVal = document.getElementById("bouton-valid");
        this.canvasZone = document.getElementById("canvas-zone");
        this.zoneTextConfirm = document.getElementById("text-confirm");
        this.zoneTimer = document.getElementById("text-timer");
        this.nom.value = this.localNom;
        this.prenom.value = this.localPrenom;
        this.initReservation();
        this.canvasVisibility();
        this.interval;
        this.test();
    };

    // action au click

    canvasVisibility() {
        this.boutonResa.addEventListener("click", (e) => {
            if (this.nom.value && this.prenom.value) {
                this.canvasZone.style.display = "block";
            }
        })
    };


    initReservation() {
        this.boutonVal.addEventListener("click", (e) => {
            if (this.nom.value && this.prenom.value) {
                clearInterval(this.interval);
                this.dateFin = new Date().getTime() + 20 * 60 * 1000;
                this.stockage();
                this.timer();
            }
        });
    }

    //stockage données local
    stockage() {
        localStorage.setItem("nom", this.nom.value);
        localStorage.setItem("prenom", this.prenom.value);
        sessionStorage.setItem("date", this.dateFin);
        const stationName = document.getElementById("station-name").innerHTML;
        sessionStorage.setItem("station", stationName);
    }

    timer() {
        //chrono
        this.interval = setInterval(() => {
            this.now = new Date().getTime();
            this.distance = this.dateFin - this.now;
            this.min = Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60));

            if (this.min < 10) this.min = '0' + this.min;
            this.sec = Math.floor((this.distance % (1000 * 60)) / 1000);

            if (this.sec < 10) this.sec = '0' + this.sec;

            this.zoneTextConfirm.innerHTML = "Vélo réservé à la station " + sessionStorage.getItem("station") + " par " + this.prenom.value + " " + this.nom.value;
            this.zoneTimer.innerHTML = "Temps restant : " + this.min + ":" + this.sec;


            this.finTimer();
        })


    }




    finTimer() {
        if (this.distance <= 0) {
            clearInterval(this.interval);
            this.zoneTimer.innerHTML = "Fin de la réservation";
        }

    }
    test() {
        if (sessionStorage.getItem("date") && sessionStorage.getItem("station")) {
            this.dateFin = sessionStorage.getItem("date");
            this.timer();
            this.finTimer();
        }
    }
}


const resa = new Reservation;