import { useEffect, useRef } from "react";

import { PauseIcon } from "@/icons/PauseIcon";
import { PlayIcon } from "@/icons/PlayIcon";
import { usePlayerStore } from "@/store/playerStore";
import { CurrentSong } from "./CurrentSong";
import { Slider } from "./Slider";
import { VolumeHighIcon } from "@/icons/VolumeHighIcon";
import { VolumeZeroIcon } from "@/icons/VolumeZeroIcon";
import { VolumeLowIcon } from "@/icons/VolumeLowIcon";
import { VolumeMediumIcon } from "@/icons/VolumeMediumIcon";

const VolumeControl = () => {
  const volume = usePlayerStore((state) => state.volume);
  const setVolume = usePlayerStore((state) => state.setVolume);
  const previousVolumeRef = useRef(volume);

  const isVolumeSilance = volume < 0.1;
  const handleClickVolume = () => {
    if (!isVolumeSilance) {
      previousVolumeRef.current = volume;
      setVolume(0);
    } else {
      setVolume(previousVolumeRef.current);
    }
  };

  return (
    <div className="flex justify-center gap-x-2 items-center ">
      <button className="opacity-70 hover:opacity-100 transition h-4 w-4 fill-current" onClick={handleClickVolume}>
        {isVolumeSilance && <VolumeZeroIcon />}
        {volume >= 0.1 && volume < 0.25 && <VolumeLowIcon />}
        {volume >= 0.25 && volume <= 0.5 && <VolumeMediumIcon />}
        {volume > 0.5 && <VolumeHighIcon />}
      </button>
      <Slider
        defaultValue={[volume * 100]}
        max={100}
        min={0}
        value={[volume * 100]}
        className="w-[95px]"
        onValueChange={(value) => {
          const [newVolume] = value;
          const volumeValue = newVolume / 100;
          setVolume(volumeValue);
        }}
      />
    </div>
  );
};

export const Player = () => {
  const { currentMusic, isPlaying, setIsPlaying, setCurrentMusic, volume } =
    usePlayerStore((state) => state);
  const audioRef = useRef();
  //   const volumeRef = useRef(0.5);

  useEffect(() => {
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    const { song, playlist, songs } = currentMusic;
    if (song) {
      const src = `/music/${playlist?.id}/0${song.id}.mp3`;
      audioRef.current.src = src;
      audioRef.current.volume = volume;
      audioRef.current.play();
    }
  }, [currentMusic]);

  const handleClick = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-row justify-between w-full px-4 z-50">
      <div>
        <CurrentSong currentMusic={currentMusic} />
      </div>
      <div className="grid place-content-center gap-4 flex-1">
        <div className="flex justify-center">
          <button className="bg-white rounded-full p-2" onClick={handleClick}>
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
        </div>
      </div>
      <div className="grid place-content-center">
        {/* <Slider
          defaultValue={[volumeRef.current * 100]}
          max={100}
          min={0}
          className="w-[95px]"
          onValueChange={(value) => {
            const [newVolume] = value;
            const volumeValue = newVolume / 100;
            volumeRef.current = volumeValue;
            audioRef.current.volume = volumeValue;
          }}
        /> */}
        <VolumeControl />
      </div>

      <audio ref={audioRef}></audio>
    </div>
  );
};
