import { useEffect, useState } from "react";
import { URL_BASE } from "@/config";

const useAudios = () => {
  const [tictacAudio, setTictacAudio] = useState<HTMLAudioElement | null>(null);
  const [successAudio, setSuccessAudio] = useState<HTMLAudioElement | null>(null);
  const [errorAudio, setErrorAudio] = useState<HTMLAudioElement | null>(null);


  useEffect(() => {
    if(typeof window === "undefined") return;
      setTictacAudio(new Audio(`${URL_BASE}/sounds/tic-tac.mp3`));
      setSuccessAudio(new Audio(`${URL_BASE}/sounds/success.mp3`));
      setErrorAudio(new Audio(`${URL_BASE}/sounds/error.mp3`));
  }, []);

  return { tictacAudio, successAudio, errorAudio };
};

export default useAudios;