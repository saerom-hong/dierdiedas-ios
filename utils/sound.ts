import { createAudioPlayer } from 'expo-audio';

type Player = ReturnType<typeof createAudioPlayer>;

let correctSound: Player | null = null;
let wrongSound: Player | null = null;
let mainSound: Player | null = null;
let yaySound: Player | null = null;

export const loadSounds = async () => {
  try {
    // Create players for each sound asset
    correctSound = createAudioPlayer(require('../assets/sounds/correct.wav'));
    wrongSound = createAudioPlayer(require('../assets/sounds/wrong.wav'));
    mainSound = createAudioPlayer(require('../assets/sounds/main.wav'));
    if (mainSound) {
      // Enable looping for background/main sound
      mainSound.loop = true;
    }
    yaySound = createAudioPlayer(require('../assets/sounds/yay.wav'));
  } catch (error) {
    console.error('Error loading sounds:', error);
  }
};

export const playCorrectSound = async () => {
  try {
    if (correctSound) {
      await correctSound.seekTo(0);
      correctSound.play();
    }
  } catch (error) {
    console.error('Error playing correct sound:', error);
  }
};

export const playWrongSound = async () => {
  try {
    if (wrongSound) {
      await wrongSound.seekTo(0);
      wrongSound.play();
    }
  } catch (error) {
    console.error('Error playing wrong sound:', error);
  }
};

export const playMainSound = async () => {
  try {
    if (mainSound) {
      await mainSound.seekTo(0);
      mainSound.play();
    }
  } catch (error) {
    console.error('Error playing main sound:', error);
  }
};

export const playYaySound = async () => {
  try {
    if (yaySound) {
      await yaySound.seekTo(0);
      yaySound.play();
    }
  } catch (error) {
    console.error('Error playing yay sound:', error);
  }
};

export const stopMainSound = async () => {
  try {
    if (mainSound) {
      mainSound.pause();
      await mainSound.seekTo(0);
    }
  } catch (error) {
    console.error('Error stopping main sound:', error);
  }
};

export const unloadSounds = async () => {
  try {
    if (correctSound) {
      correctSound.remove();
      correctSound = null;
    }
    if (wrongSound) {
      wrongSound.remove();
      wrongSound = null;
    }
    if (mainSound) {
      mainSound.remove();
      mainSound = null;
    }
    if (yaySound) {
      yaySound.remove();
      yaySound = null;
    }
  } catch (error) {
    console.error('Error unloading sounds:', error);
  }
};
