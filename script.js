const wrapper =document.querySelector(".wrapper");
const music_img=wrapper.querySelector(".image img");
const music_name=wrapper.querySelector(".song-detail .name");
const music_artist=wrapper.querySelector(".song-detail .artist");
const main_audio=wrapper.querySelector("#main_audio");
const play_pause=wrapper.querySelector(".play_pause");
const prevBtn=wrapper.querySelector("#prev");
const nextBtn=wrapper.querySelector("#next");
const progressBar=wrapper.querySelector(".progess_bar");
const progressArea=wrapper.querySelector(".progress_area");
let currentTimeTag=wrapper.querySelector(".current");

let music_index =3;

window.addEventListener("load",()=>{
    loadMusic(music_index);
})

function loadMusic(indexNum){
    music_name.innerText=all_music[indexNum -1].name;
    music_artist.innerText=all_music[indexNum-1].artist;
    music_img.src=`Song_image/${all_music[indexNum-1].img}.jpg`;
    main_audio.src=`Song_List/${all_music[indexNum-1].src}.mp3`;
}

//play function

function playMusic(){
    wrapper.classList.add("paused");
    play_pause.querySelector('i').innerText="pause";
    main_audio.play();
}

//pause function
function pauseMusic(){
    wrapper.classList.remove("paused");
    play_pause.querySelector('i').innerText="play_arrow";
    main_audio.pause();
}

// next muxic function
function nextMusic(){
    music_index++;
    music_index >all_music.length ? music_index=1 : music_index=music_index;
    loadMusic(music_index);
    playMusic();
}

// prev muxic function
function prevMusic(){
    music_index--;
    music_index < 1 ? music_index=all_music.length : music_index=music_index;
    loadMusic(music_index);
    playMusic();
}
//for pause or play

play_pause.addEventListener("click",function(){
    const isMusicPaused=wrapper.classList.contains('paused');
    isMusicPaused ? pauseMusic() : playMusic();
})


//for next music
nextBtn.addEventListener("click",function(){
    nextMusic();
})

//for prev music
prevBtn.addEventListener("click",function(){
    prevMusic();
})


//update progressBar
main_audio.addEventListener("timeupdate",(e)=>{
    const currentTime =e.target.currentTime;
    const duration =e.target.duration;
    let progressWidth = (currentTime/duration)*100;

    //update bar
    progressBar.style.width=`${progressWidth}%`;

    main_audio.addEventListener("loadeddata",()=>{

        let totalDuration=wrapper.querySelector(".duration");
        let MusicCurrentDuration=main_audio.duration;
    
        let durationInMin = Math.floor(MusicCurrentDuration / 60);
        let durationInSec = Math.floor(MusicCurrentDuration % 60);
    
        if(durationInSec <10){
            durationInSec = `0${durationInSec}`;
        }
        //update time and duration
        totalDuration.innerText=`${durationInMin}:${durationInSec}`;
  //converted totaltime float value into exact seconds 
})
    //converted time float value into exact seconds 
        let timeInMin = Math.floor(currentTime / 60);
        let timeInSec = Math.floor(currentTime % 60);

        if(timeInSec <10){
            timeInSec = `0${timeInSec}`;
        }
        
        currentTimeTag.innerText=`${timeInMin}:${timeInSec}`;
})


var music_list =document.querySelector(".music_list");
var more_music =document.querySelector("#more_music");
var close =document.querySelector("#close");

more_music.addEventListener("click",function(){
    music_list.style.display="block";
})

close.addEventListener("click",function(){
    music_list.style.display="none";
})


//update progress Area to forward or backward

progressArea.addEventListener("click",(e)=>{
    let progressWidthVal=progressArea.clientWidth;
    let clickedOffSetX =e.offsetX;
    let songDuration =main_audio.duration;
    main_audio.currentTime=(clickedOffSetX / progressWidthVal) * songDuration;
    playMusic();
})

//repeat button

const repeatBtn=wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click" ,()=>{
    let getText=repeatBtn.innerText;

    switch(getText){
        case "repeat":
        repeatBtn.innerText="repeat_one";
        repeatBtn.setAttribute("title" ,"Song looped")
        break;
        case "repeat_one":
        repeatBtn.innerText="shuffle";
        repeatBtn.setAttribute("title" ,"Playback shuffled")
        break;
        case "shuffle":
        repeatBtn.innerText="repeat";
        repeatBtn.setAttribute("title" ,"Playlist looped")
        break;
    }
})

main_audio.addEventListener("ended" ,()=>{
    let getText=repeatBtn.innerText;

    switch(getText){
        case "repeat":
        nextMusic();
        break;
        case "repeat_one":
        main_audio.currentTime =0;
        loadMusic(music_index);
        playMusic()
        break;
        case "shuffle":
        let randomIndex = Math.floor((Math.random() * all_music.length) +1);
        do{
            randomIndex = Math.floor((Math.random() * all_music.length) +1);
        }while(music_index=randomIndex);

        music_index=randomIndex;
        loadMusic(music_index);
        playMusic();
        break;
    }
})