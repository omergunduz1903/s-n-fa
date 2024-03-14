const takimlar = [
    { ad: "BEŞİKTAŞ", src: "images/besiktas.png",sampiyonluk: 16 , stad:"İnönü"},
    { ad: "FENERBAHÇE", src: "images/fenerbahce.png" ,sampiyonluk: 19,stad:"Saraçoğlu"},
    { ad: "GALATASARAY", src: "images/galatasaray.png", sampiyonluk: 23,stad:"Ali Sami Yen"},
    { ad: "TRABZONSPOR", src: "images/trabzonspor.png", sampiyonluk: 7, stad:"Avni Aker" },
];


const takim=document.getElementById("takim");
const btnBasla=document.getElementById("btnBasla");
const soru=document.getElementById("soru");
const secenekler=document.getElementById("secenekler");
const sonuc=document.getElementById("sonuc");


btnBasla.addEventListener("click",yaris);


let dogruCevap;
let secilenCevap;
let soruSayaci = 0;
let dogruSayac = 0;

function yaris(){
    if (soruSayaci >= 10) {
        sonuc.innerHTML = "Yarışma sona erdi. ";
        if (dogruSayac >= 5) {
            sonuc.innerHTML += "Fanatik!";
        } else {
            sonuc.innerHTML += "Yeni taraftar!";
        }
        return;
    }

    soru.innerHTML="";
    secenekler.innerHTML="";
    sonuc.innerHTML="";

    let rastgeleTakim = Math.floor(Math.random() * takimlar.length);
    takim.src = takimlar[rastgeleTakim].src;
    
    // Rastgele olarak hangi soruyu soracağımızı belirleyelim
    const soruSecimi = Math.random();
    if (soruSecimi < 0.5) {
        soru.innerHTML = takimlar[rastgeleTakim].ad + " kaç kez şampiyon olmuştur?";
        dogruCevap = takimlar[rastgeleTakim].sampiyonluk;
    } else {
        soru.innerHTML = takimlar[rastgeleTakim].ad + " hangi stadı kullanmaktadır?";
        dogruCevap = takimlar[rastgeleTakim].stad;
    }

    // Doğru cevabı içeren rastgele bir index oluşturalım
    const dogruCevapIndex = Math.floor(Math.random() * 4);

    // Seçeneklerin oluşturulması
    for (let i = 0; i < 4; i++) {
        const secenek = document.createElement("button");
        secenekler.appendChild(secenek);
        secenek.setAttribute("id", "secenek" + (i + 1));
        secenek.classList.add("secenek");
        
        if (i === dogruCevapIndex) {
            // Doğru cevap için
            if (soruSecimi < 0.5) {
                secenek.innerHTML = dogruCevap;
            } else {
                secenek.innerHTML = takimlar[rastgeleTakim].stad;
            }
            secenek.addEventListener("click", () => cevapKontrol(dogruCevap));
        } else {
            // Yanlış cevaplar için rastgele bir takımın stadyumunu kullan
            let rastgeleTakimIndex;
            do {
                rastgeleTakimIndex = Math.floor(Math.random() * takimlar.length);
            } while (rastgeleTakimIndex === rastgeleTakim); // Aynı takımın stadyumunu tekrar seçmeyi önle
            if (soruSecimi < 0.5) {
                secenek.innerHTML = takimlar[rastgeleTakimIndex].sampiyonluk;
            } else {
                secenek.innerHTML = takimlar[rastgeleTakimIndex].stad;
            }
            secenek.addEventListener("click", () => cevapKontrol(secenek.innerHTML));
        }
    }

    soruSayaci++;
}

function cevapKontrol(secilenCevap) {
    secilenCevap = secilenCevap;
    if (secilenCevap == dogruCevap) {
        sonuc.innerHTML = "Tebrikler! Doğru cevabı buldunuz!";
        dogruSayac++;
    } else {
        sonuc.innerHTML = "Üzgünüz, doğru cevap değil.";
    }

    // Soru sayacını kontrol et ve sınırı aştıysa yarışmayı sonlandır
    if (soruSayaci >= 10) {
        sonuc.innerHTML += "<br>Yarışma sona erdi. ";
        if (dogruSayac >= 5) {
            sonuc.innerHTML += " Sen Fanatik!";
        } else {
            sonuc.innerHTML += "Yeni taraftar!";
        }
    }
}
