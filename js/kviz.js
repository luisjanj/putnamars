// svi elementi
const start = document.getElementById("start");
const kviz = document.getElementById("kviz");
const pitanje = document.getElementById("pitanje");
const qImg = document.getElementById("qImg");
const izborA = document.getElementById("A");
const izborB = document.getElementById("B");
const izborC = document.getElementById("C");
const izborD = document.getElementById("D");
const brojac = document.getElementById("brojac");
const drugi = document.getElementById("drugi");
const progres = document.getElementById("progres");
const rezultatDiv = document.getElementById("rezultat");

// kreiranje pitanje
let pitanjes = [
    {
        pitanje : "Po udaljenosti od sunca Mars je?",
        imgSrc : "img/kurir.jpg",
        izborA : "Cetvrta planeta",
        izborB : "Peta planeta",
        izborC : "Sesta planeta",
        izborD : "Sedma planeta",
        tacno : "A"
    },{
        pitanje : "Kako se zovu Marsovi sateliti?",
        imgSrc : "img/header2.jpg",
        izborA : "Ganimed i Kalista",
        izborB : "Fobos i Dejmos",
        izborC : "Europa i Amalteja",
        izborD : "Enkelad i Titan",
        tacno : "B"
    },{
        pitanje : "Koliko dana traje godina na Marsu?",
        imgSrc : "img/mars.jpg",
        izborA : "254 dana",
        izborB : "867 dana",
        izborC : "425 dana",
        izborD : "687 Dana",
        tacno : "D"
    },{
        pitanje : "Najstupljeniji gas u atmosferi Marsa je?",
        imgSrc : "img/kurir.jpg",
        izborA : "Argon",
        izborB : "Kiseonik",
        izborC : "Azot",
        izborD : "Ugljen-dioksid",
        tacno : "D"
    },{
        pitanje : "Najvisa planina na Marsu je visoka oko?",
        imgSrc : "img/header2.jpg",
        izborA : "25km",
        izborB : "15km",
        izborC : "6km",
        izborD : "10km",
        tacno : "A"
    },{
        pitanje : "Najniza temperatura na Marsu ide do?",
        imgSrc : "img/mars.jpg",
        izborA : "-340°C",
        izborB : "-140°C",
        izborC : "-40°C",
        izborD : "-240°C",
        tacno : "B"
    },{
        pitanje : "Po velicini Mars je?",
        imgSrc : "img/kurir.jpg",
        izborA : "Cetvrta planeta",
        izborB : "Treca planeta",
        izborC : "Druga planeta",
        izborD : "Prva planeta",
        tacno : "C"
    },{
        pitanje : "Zbog kog elementa Mars ima crvenu boju?",
        imgSrc : "img/header2.jpg",
        izborA : "Gvozdje",
        izborB : "Bakar",
        izborC : "Kripton",
        izborD : "Nikl",
        tacno : "A"
    },{
        pitanje : "Period rotacije Marsa je?",
        imgSrc : "img/mars.jpg",
        izborA : "oko 16h",
        izborB : "oko 20h",
        izborC : "oko 24h",
        izborD : "oko 28h",
        tacno : "C"
    },{
        pitanje : "Prve fotografije sa Marsa poslala je sonda?",
        imgSrc : "img/kurir.jpg",
        izborA : "Mariner 4",
        izborB : "Mariner 5",
        izborC : "Mariner 6",
        izborD : "Mariner 7",
        tacno : "A"
    }
];

// varijable

const zadnjepitanje = pitanjes.length - 1;
let tokpitanja = 0;
let tok = 0;
const pitanjeVreme = 5; // 10s
const visina = 150; // 150px
const univerzal = visina / pitanjeVreme;
let tajmer;
let skor = 0;

// za pitanja
function renderpitanje(){
    let q = pitanjes[tokpitanja];
    
    pitanje.innerHTML = "<p>"+ q.pitanje +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    izborA.innerHTML = q.izborA;
    izborB.innerHTML = q.izborB;
    izborC.innerHTML = q.izborC;
    izborD.innerHTML = q.izborD;
}

start.addEventListener("click",startkviz);

// start kviza
function startkviz(){
    start.style.display = "none";
    renderpitanje();
    kviz.style.display = "block";
    renderprogres();
    renderbrojac();
    tajmer = setInterval(renderbrojac,3000); // 1000ms = 1s
}

// progres
function renderprogres(){
    for(let qIndex = 0; qIndex <= zadnjepitanje; qIndex++){
        progres.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// brojac

function renderbrojac(){
    if(tok <= pitanjeVreme){
        brojac.innerHTML = tok;
        drugi.style.width = tok * univerzal + "px";
        tok++
    }else{
        tok = 0;
        // promena boje u crvenu
        odgovorIsnetacno();
        if(tokpitanja < zadnjepitanje){
            tokpitanja++;
            renderpitanje();
        }else{
            // kraj kviza i prikaz skora
            clearInterval(tajmer);
            semafor();
        }
    }
}

// provera odgovora

function proveraOdgovora(odgovor){
    if( odgovor == pitanjes[tokpitanja].tacno){
        // odgovor tacno
        skor++;
        // promena boje u zelenu
        odgovorIstacno();
    }else{
        // odgovor netacno
        // promena boje u crvenu
        odgovorIsnetacno();
    }
    tok = 0;
    if(tokpitanja < zadnjepitanje){
        tokpitanja++;
        renderpitanje();
    }else{
        // kraj kviza i prikaz skora
        clearInterval(tajmer);
        semafor();
    }
}

// odgovor tacno
function odgovorIstacno(){
    document.getElementById(tokpitanja).style.backgroundColor = "#0f0";
}

// odgovor netacno
function odgovorIsnetacno(){
    document.getElementById(tokpitanja).style.backgroundColor = "#f00";
}

// skor semafor
function semafor(){
    rezultatDiv.style.display = "block";
    
    // izracunavanje procenta
    const skorPerCent = Math.round(100 * skor/pitanjes.length);
    
    // promena slike od procenta
    let img = (skorPerCent >= 80) ? "img/5.png" :
              (skorPerCent >= 60) ? "img/4.png" :
              (skorPerCent >= 40) ? "img/3.png" :
              (skorPerCent >= 20) ? "img/2.png" :
              "img/1.png";
    if (skorPerCent >= 80){
    rezultatDiv.innerHTML = "<img src="+ img +">";
    rezultatDiv.innerHTML += "<p>"+ skorPerCent +"%<br>Cestitamo!!!<br>Osvojili ste 5% popusta za put na Mars</p>";
        
    } else{
    rezultatDiv.innerHTML = "<img src="+ img +">";
    rezultatDiv.innerHTML += "<p>"+ skorPerCent +"%</p>";
    }
    
}





















