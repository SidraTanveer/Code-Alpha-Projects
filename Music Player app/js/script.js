const song = document.getElementById("song");
const songImg = document.querySelector(".song-img");

song.addEventListener('play', () => {
    songImg.classList.add('playing');
});

song.addEventListener('pause', () => {
    songImg.classList.remove('playing');
});

song.addEventListener('ended', () => {
    songImg.classList.remove('playing');
});
