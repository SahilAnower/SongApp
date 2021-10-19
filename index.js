const playBut = document.getElementById("playSong");
const gif = document.getElementById("gifimage");
const progressbar = document.getElementById("progressBar");
const prev = document.getElementById("prevBut");
const next = document.getElementById("nextBut");
let songitem = Array.from(document.getElementsByClassName("songitem"));
let audio=new Audio("./Songs/Ranjha-Shershaah.mp3");
let fl=0;
let songIndex = 0;
let sn=document.getElementById("sn");

let songList = [
    {
        number: "1",
        songName: "Ranjha",
        filePath: "./Songs/Ranjha-Shershaah.mp3",
        coverPath: "./Images/crop_480x480_1628084846.jpg.crdownload"
    },
    {
        number: "2",
        songName: "Raatan Lambiyan",
        filePath: "./Songs/Raataan Lambiyan - Shershaah 320 Kbps.mp3",
        coverPath: "./Images/Rataan-Lambiyan.jpg"
    },
    {
        number: "3",
        songName: "Story Of My Life",
        filePath: "./Songs/Story.mp3",
        coverPath: "./Images/Story.jpg"
    }
]

songitem.forEach((element, i) => {
    element.getElementsByClassName("num")[0].innerHTML = songList[i].number;
    element.getElementsByClassName("songName")[0].innerHTML = songList[i].songName;
    element.getElementsByTagName("img")[0].src = songList[i].coverPath;
})

playBut.addEventListener("click", () => {
    if(fl==0){
        alert("Please Select a Song First");
    }else{
        if (audio.paused) {
            audio.play();
            gif.style.opacity = 1;
            playBut.classList.remove("fa-play-circle");
            playBut.classList.add("fa-pause-circle");
    
        } else {
            audio.pause();
            gif.style.opacity = 0;
            playBut.classList.remove("fa-pause-circle");
            playBut.classList.add("fa-play-circle");
        }
    }
});

audio.addEventListener("timeupdate", () => {
    let progress = (parseInt)((audio.currentTime / audio.duration) * 100);
    progressbar.value = progress;
});

progressbar.addEventListener("change", () => {
    let progress = progressbar.value;
    let currDur = (progress * audio.duration) / 100;
    audio.currentTime = currDur;
});

const makeAllclear = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.classList.remove("fa-pause-circle");
        element.classList.add("fa-play-circle");
        element.classList.add("flag");
        audio.pause();
    });
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element, index) => {
    element.addEventListener("click", (e) => {
        if(e.target.classList.contains("flag")){
            // if not already playing
            makeAllclear();
            e.target.classList.remove("fa-play-circle");
            e.target.classList.add("fa-pause-circle");
            audio = new Audio(`${songList[index].filePath}`);
            fl=1;
            audio.play();
            gif.style.opacity = 1;
            playBut.classList.remove("fa-play-circle");
            playBut.classList.add("fa-pause-circle");
            audio.currentTime = 0;
            sn.innerHTML=songList[index].songName;
            e.target.classList.remove("flag");
            document.getElementById("bannerImage").src=songList[index].coverPath;
        }else{
            // if already playing
            if (e.target.classList.contains("fa-pause-circle")) {
                e.target.classList.remove("fa-pause-circle");
                e.target.classList.add("fa-play-circle");
                gif.style.opacity = 0;
                playBut.classList.remove("fa-pause-circle");
                playBut.classList.add("fa-play-circle");
                audio.pause();
            }
            // if paused while playing
            else {
                // makeAllclear();
                e.target.classList.remove("fa-play-circle");
                e.target.classList.add("fa-pause-circle");
                // audio = new Audio(`${songList[index].filePath}`);
                audio.play();
                gif.style.opacity = 1;
                playBut.classList.remove("fa-play-circle");
                playBut.classList.add("fa-pause-circle");
                // audio.currentTime = 0;
            }
        }
    })
})