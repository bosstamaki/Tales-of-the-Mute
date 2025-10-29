const playButton = document.getElementById("playButton");
const audioPlayer = document.getElementById("audioPlayer");
let isPlaying = false;

playButton.addEventListener("click", () => {
  if (!isPlaying) {
    audioPlayer.play();
    playButton.textContent = "⏸";
  } else {
    audioPlayer.pause();
    playButton.textContent = "▶";
  }
  isPlaying = !isPlaying;
});

const infoButton = document.getElementById("infoButton");
const explanationBox = document.getElementById("explanation-box");
let isVisible = false;

infoButton.addEventListener("click", () => {
  isVisible = !isVisible;
  explanationBox.classList.toggle("visible", isVisible);
});