// === SOUND ELEMENTS ===
const coinflip1 = document.getElementById("coinflip1");
const narration1 = document.getElementById("narration1");
const coinflip2 = document.getElementById("coinflip2");
const narration2 = document.getElementById("narration2");
const coinspin = document.getElementById("coinspin");
const scSound = document.getElementById("scSound");
const gbSound = document.getElementById("gbSound");

// === VOLUME SETTINGS ===
coinflip1.volume = 0.9;
narration1.volume = 1.0;
coinflip2.volume = 0.9;
narration2.volume = 1.0;
coinspin.volume = 0.8;
scSound.volume = 0.8;
gbSound.volume = 0.8;

// === ELEMENT REFERENCES ===
const coin = document.getElementById('coin');
const text = document.getElementById('revealText');
const subText = document.getElementById('subText');
const boxes = document.getElementById('boxContainer');

// === CONTROL VARIABLES ===
let clickCount = 0;                   // Tracks coin clicks
let boxesAreVisible = false;          // Boxes visibility flag
let narration2HasEnded = false;       // Unlocks box sounds
let coinClickable = true;             // NEW: Controls whether the coin can be clicked

// === COIN FADE-IN ON LOAD ===
window.addEventListener('load', () => {
  setTimeout(() => coin.classList.add('fade-in'), 500);
});

// === MAIN COIN CLICK HANDLER ===
coin.addEventListener('click', () => {
  // Prevent click if coin is temporarily disabled
  if (!coinClickable) return;

  clickCount++;

  // === FIRST CLICK ===
  if (clickCount === 1) {
    coin.classList.add('anim');
    text.textContent = "To be crowned with riches, or swept in stitches—who among us stands when all are sown?";
    text.classList.add('show', 'move-up');
    subText.classList.remove('show');

    // === PLAY SOUNDS ===
    coinflip1.currentTime = 0;
    coinflip1.play();

    narration1.currentTime = 0;
    narration1.play();

    // === DISABLE COIN UNTIL Narration1 FINISHES ===
    coinClickable = false; // disable clicks
    narration1.addEventListener('ended', () => {
      coinClickable = true; // re-enable once narration ends
    }, { once: true }); // "once" ensures the listener only fires one time

    setTimeout(() => coin.classList.remove('anim'), 1000);
  }

  // === SECOND CLICK ===
  else if (clickCount === 2) {
    coin.classList.add('anim');
    text.textContent = "Tales of the Mute";
    subText.textContent = "Choose your path";
    subText.classList.add('show', 'move-up');

    // === PLAY SOUNDS ===
    coinflip2.currentTime = 0;
    coinflip2.play();
    narration2.currentTime = 0;
    narration2.play();

    setTimeout(() => {
      coinspin.currentTime = 0;
      coinspin.play();
    }, 1500);

    // Coin fall animation
    setTimeout(() => {
      coin.classList.remove('anim');
      coin.classList.add('fall');
    }, 1500);

    // Boxes appear visually
    setTimeout(() => {
      boxes.classList.add('show');
      boxesAreVisible = true;
    }, 2500);
  }
});

// === WHEN Narration2 ENDS ===
// Unlocks box hover sounds
narration2.addEventListener('ended', () => {
  narration2HasEnded = true;
});

// === BOX HOVER SOUND EFFECTS ===
const boxElements = document.querySelectorAll('.box');
boxElements.forEach((box, index) => {
  box.addEventListener('mouseenter', () => {
    // Only play if boxes are visible AND Narration2 has finished
    if (boxesAreVisible && narration2HasEnded) {
      if (index === 0) {
        scSound.pause();      // stop current instance to prevent overlap
        scSound.currentTime = 0;
        scSound.play();
      } else if (index === 1) {
        gbSound.pause();
        gbSound.currentTime = 0;
        gbSound.play();
      }
    }
  });
});