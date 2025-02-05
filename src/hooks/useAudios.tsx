import { useEffect, useState } from "react";
import { URL_BASE } from "@/config";

const useAudios = () => {
  const [tictacAudio, setTictacAudio] = useState<HTMLAudioElement | null>(null);
  const [successAudio, setSuccessAudio] = useState<HTMLAudioElement | null>(null);
  const [errorAudio, setErrorAudio] = useState<HTMLAudioElement | null>(null);
  const [successEndAudio, setSuccessEndAudio] = useState<HTMLAudioElement | null>(null);
  const [confettiAudio, setConfettiAudio] = useState<HTMLAudioElement | null>(null);


  useEffect(() => {
    if(typeof window === "undefined") return;
      setTictacAudio(new Audio(`${URL_BASE}/sounds/tic-tac.mp3`));
      setSuccessAudio(new Audio(`${URL_BASE}/sounds/success.mp3`));
      setErrorAudio(new Audio(`${URL_BASE}/sounds/error.mp3`));
      setSuccessEndAudio(new Audio(`${URL_BASE}/sounds/success-end.mp3`));
      setConfettiAudio(new Audio(`${URL_BASE}/sounds/confetti.mp3`));
  }, []);

  return { tictacAudio, successAudio, errorAudio, successEndAudio, confettiAudio };
};

export default useAudios;