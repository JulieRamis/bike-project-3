class Map {
    constructor() {
        this.frame = document.getElementById("frame");
        this.stationName = document.getElementById("station-name");
        this.stationAddress = document.getElementById("station-address");
        this.bikeStands = document.getElementById("bike-stands");
        this.bike = document.getElementById("available-bike");
        this.zoneForm = document.getElementById("form");
        this.statut = document.getElementById("statut");
        this.boutonResa = document.getElementById("bouton-resa");
        this.canvasZone = document.getElementById("canvas-zone");
        this.map();
        this.marker();
        this.myMap;

    }


    map() {
        this.myMap = L.map('mapid').setView([43.600000, 1.433333], 14);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoianVsaWUwMDAiLCJhIjoiY2s2cDVzbGpiMTlhbDNmcXNiNHY0MTg4MiJ9.W5A0F_Ii2UTm90G5rxY_LA'
        }).addTo(this.myMap);
    }

    marker() {
        console.log(this.myMap);
        let xhr = new XMLHttpRequest();

        let that = this;

        let url = "https://api.jcdecaux.com/vls/v1/stations?contract=Toulouse&apiKey=b2dc389930583fc8991132c7a6a76c5b48877d0f";



        //methodes du XMLHttpRequest 
        xhr.open("GET", url, true);

        xhr.addEventListener("load", function () {
            let stations = JSON.parse(xhr.responseText);






            stations.forEach(function (station) {


                if (station.status === "CLOSED" || station.available_bikes === 0) {
                    myIcon.options.iconUrl = "img/red.png";
                }

                else if (station.status == "OPEN" && station.available_bikes >= 1) {
                    myIcon.options.iconUrl = "img/green.png";
                }

                let marker = L.marker([station.position.lat, station.position.lng], { icon: myIcon }).addTo(that.myMap);


                marker.addEventListener("click", () => {
                    that.frame.style.display = "block";
                    that.stationAddress.textContent = station.address;
                    that.stationName.textContent = station.name;
                    that.bikeStands.textContent = station.available_bike_stands;
                    that.bike.textContent = station.available_bikes;

                    if (station.status == "CLOSED" || station.available_bikes == 0) {
                        that.statut.textContent = "Station fermée";
                        that.boutonResa.disabled = true;
                        that.canvasZone.style.display = "none";
                    }
                    else if (station.status == "OPEN" && station.available_bikes >= 1) {
                        that.statut.textContent = "Station ouverte";
                        that.boutonResa.disabled = false;

                    }

                });

            });

        });

        let myIcon = L.icon({
            iconUrl: ' ',

        })

        xhr.send();
    }

}
const g = new Map;











/*
let frame = document.getElementById("frame");
let stationName = document.getElementById("station-name");
let stationAddress = document.getElementById("station-address");
let bikeStands = document.getElementById("bike-stands");
let bike = document.getElementById("available-bike");
let statut = document.getElementById("statut");
let boutonResa = document.getElementById("bouton-resa");
let canvasZone = document.getElementById("canvas-zone");
const myMap = L.map('mapid').setView([43.600000, 1.433333], 14);


//map
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoianVsaWUwMDAiLCJhIjoiY2s2cDVzbGpiMTlhbDNmcXNiNHY0MTg4MiJ9.W5A0F_Ii2UTm90G5rxY_LA'
}).addTo(myMap);



//API JCDecaux

let xhr = new XMLHttpRequest();

let url = "https://api.jcdecaux.com/vls/v1/stations?contract=Toulouse&apiKey=b2dc389930583fc8991132c7a6a76c5b48877d0f";



//methodes du XMLHttpRequest
xhr.open("GET", url, true);

xhr.addEventListener("load", function () {
    let stations = JSON.parse(xhr.responseText);
    stations.forEach(function (station) {


        if (station.status == "CLOSED" || station.available_bikes == 0) {
            myIcon.options.iconUrl = "img/red.png";
        }
        else if (station.status == "OPEN" && station.available_bikes >= 1) {
            myIcon.options.iconUrl = "img/green.png";
        }

        let marker = L.marker([station.position.lat, station.position.lng], { icon: myIcon }).addTo(myMap);


        marker.addEventListener("click", () => {
            frame.style.display = "block";
            stationAddress.textContent = station.address;
            stationName.textContent = station.name;
            bikeStands.textContent = station.available_bike_stands;
            bike.textContent = station.available_bikes;

            if (station.status == "CLOSED" || station.available_bikes == 0) {
                statut.textContent = "Station fermée";
                boutonResa.disabled = true;
                canvasZone.style.display = "none";
            }
            else if (station.status == "OPEN" && station.available_bikes >= 1) {
                statut.textContent = "Station ouverte";
                boutonResa.disabled = false;

            }


        });


    });

});

let myIcon = L.icon({
    iconUrl: ' ',

})

xhr.send();
*/
