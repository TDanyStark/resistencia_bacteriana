const executeAudio = (audio: HTMLAudioElement | null, volume: number = 0.4) => {
  if (audio) {
    audio.volume = volume;
    audio.currentTime = 0;
    audio.play();
  }
}

export default executeAudio;