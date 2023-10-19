import { VolumeHighIcon } from "@/icons/VolumeHighIcon";
import { VolumeLowIcon } from "@/icons/VolumeLowIcon";
import { VolumeMediumIcon } from "@/icons/VolumeMediumIcon";
import { VolumeZeroIcon } from "@/icons/VolumeZeroIcon";
import { usePlayerStore } from "@/store/playerStore";
import { useRef } from "react";
import { Slider } from "./Slider";

export const VolumeControl = () => {
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