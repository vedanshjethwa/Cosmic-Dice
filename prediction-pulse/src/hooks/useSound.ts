import { Howl } from 'howler';

const sounds = {
  start: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'],
    volume: 0.5
  }),
  tap: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'],
    volume: 0.5
  }),
  win: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3'],
    volume: 0.7
  }),
  lose: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3'],
    volume: 0.5
  }),
  move: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/2573/2573-preview.mp3'],
    volume: 0.1
  })
};

export const useSound = () => {
  const playSound = (sound: keyof typeof sounds) => {
    sounds[sound].play();
  };

  return { playSound };
};