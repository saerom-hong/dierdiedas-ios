import { Audio } from 'expo-av';

let correctSound: Audio.Sound | null = null;
let wrongSound: Audio.Sound | null = null;
let mainSound: Audio.Sound | null = null;
let yaySound: Audio.Sound | null = null;

export const loadSounds = async () => {
  try {
    // Load correct sound
    const { sound: correct } = await Audio.Sound.createAsync(
      require('../assets/sounds/correct.wav')
    );
    correctSound = correct;

    // Load wrong sound
    const { sound: wrong } = await Audio.Sound.createAsync(
      require('../assets/sounds/wrong.wav')
    );
    wrongSound = wrong;

    // Load main sound with looping enabled
    const { sound: main } = await Audio.Sound.createAsync(
      require('../assets/sounds/main.wav'),
      { isLooping: true }
    );
    mainSound = main;

    // Load yay sound
    const { sound: yay } = await Audio.Sound.createAsync(
      require('../assets/sounds/yay.wav')
    );
    yaySound = yay;
  } catch (error) {
    console.error('Error loading sounds:', error);
  }
};

export const playCorrectSound = async () => {
  try {
    if (correctSound) {
      await correctSound.replayAsync();
    }
  } catch (error) {
    console.error('Error playing correct sound:', error);
  }
};

export const playWrongSound = async () => {
  try {
    if (wrongSound) {
      await wrongSound.replayAsync();
    }
  } catch (error) {
    console.error('Error playing wrong sound:', error);
  }
};

export const playMainSound = async () => {
  try {
    if (mainSound) {
      await mainSound.replayAsync();
    }
  } catch (error) {
    console.error('Error playing main sound:', error);
  }
};

export const playYaySound = async () => {
  try {
    if (yaySound) {
      await yaySound.replayAsync();
    }
  } catch (error) {
    console.error('Error playing yay sound:', error);
  }
};

export const stopMainSound = async () => {
  try {
    if (mainSound) {
      await mainSound.stopAsync();
    }
  } catch (error) {
    console.error('Error stopping main sound:', error);
  }
};

export const unloadSounds = async () => {
  try {
    if (correctSound) {
      await correctSound.unloadAsync();
      correctSound = null;
    }
    if (wrongSound) {
      await wrongSound.unloadAsync();
      wrongSound = null;
    }
    if (mainSound) {
      await mainSound.unloadAsync();
      mainSound = null;
    }
    if (yaySound) {
      await yaySound.unloadAsync();
      yaySound = null;
    }
  } catch (error) {
    console.error('Error unloading sounds:', error);
  }
}; 