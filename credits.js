const cards = document.querySelectorAll(".card");
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");
const flipSounds = [
  document.getElementById("sound1"),
  document.getElementById("sound2"),
  document.getElementById("sound3")
];

// === MEMBER AUDIO FILES ===
// Each corresponds to a card in the same order as your HTML.
const memberAudios = [
  document.getElementById("carlAudio"),   // Card 1 – Carl
  document.getElementById("laurenzAudio"),// Card 2 – Laurenz
  document.getElementById("nathAudio"),   // Card 3 – Nathaniel
  document.getElementById("caseyAudio"),  // Card 4 – Casey
  document.getElementById("mikaAudio"),   // Card 5 – Mikaela
  document.getElementById("shelbyAudio")  // Card 6 – Shelby
];

let activeIndex = 2; // starts at Nathaniel’s card

// === OPTIONAL: Preload all sounds to avoid first-time lag ===
[...flipSounds, ...memberAudios].forEach(sound => sound.load());

// === PLAY RANDOM PAGE FLIP SOUND ===
function playRandomFlipSound() {
  const randomSound = flipSounds[Math.floor(Math.random() * flipSounds.length)];
  randomSound.currentTime = 0;
  randomSound.play();
}

// === STOP ALL MEMBER AUDIOS ===
function stopAllMemberAudios() {
  memberAudios.forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
  });
}

// === UPDATE CAROUSEL STATE ===
function updateCarousel() {
  cards.forEach((card, i) => {
    card.classList.remove("left", "right", "active");
    card.style.opacity = "0";
    card.style.zIndex = "1";

    const diff = i - activeIndex;

    if (diff === 0) {
      card.classList.add("active");
      card.style.opacity = "1";

      // === PLAY CORRESPONDING MEMBER AUDIO ===
      // (only if the user already interacted via click)
      stopAllMemberAudios();
      const voice = memberAudios[i];
      if (voice) {
        voice.currentTime = 0;
        voice.play();
      }
    } else if (diff === -1 || diff === cards.length - 1) {
      card.classList.add("left");
      card.style.opacity = "0.7";
    } else if (diff === 1 || diff === -(cards.length - 1)) {
      card.classList.add("right");
      card.style.opacity = "0.7";
    }
  });
}

// === NAVIGATION CONTROLS ===
leftArrow.addEventListener("click", () => {
  activeIndex = (activeIndex - 1 + cards.length) % cards.length;
  updateCarousel();
  playRandomFlipSound();
});

rightArrow.addEventListener("click", () => {
  activeIndex = (activeIndex + 1) % cards.length;
  updateCarousel();
  playRandomFlipSound();
});

// === INITIAL LOAD ===
updateCarousel();
