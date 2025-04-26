import { useEffect, useRef, useState } from "react";
import SpeakerIconMuted from "../ui/speaker-icon-muted";
import SpeakerIcon from "../ui/speaker-icon";
import PlayIcon from "../ui/play-icon";
import PauseIcon from "../ui/pause-icon";
import BackwardIcon from "../ui/backward-icon";
import ForwardIcon from "../ui/forward-icon";
import FullScreenIcon from "../ui/fullscreen-icon";

export default function VideoPlayer({ film_url }: { film_url: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const volumeSliderRef = useRef<HTMLInputElement>(null);
  const [currentTime, setCurrentTime] = useState<string>("00:00");
  const [duration, setDuration] = useState<string>("00:00");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [previousVolume, setPreviousVolume] = useState<number>(0.5);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const formatTime = (time: number): string => {
    let seconds = Math.floor(time % 60);
    let minutes = Math.floor(time / 60) % 60;
    const hours = Math.floor(time / 3600);
    if (seconds < 10) seconds = Number(`0${seconds}`);
    if (minutes < 10) minutes = Number(`0${minutes}`);
    return hours ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && progressBarRef.current) {
      const percent = (video.currentTime / video.duration) * 100;
      progressBarRef.current.style.width = `${percent}%`;
      setCurrentTime(formatTime(video.currentTime));
    }
  };

  const handleLoadedData = () => {
    const video = videoRef.current;
    if (video) {
      setDuration(formatTime(video.duration));
    }
  };

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (video) {
      video.volume = parseFloat(e.target.value);
    }
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;
    if (!document.fullscreenElement) {
      container.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handlePlaybackRateChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const video = videoRef.current;
    const newRate = parseFloat(e.target.value);
    if (video) {
      video.playbackRate = newRate;
      setPlaybackRate(newRate);
    }
  };

  const skipTime = (seconds: number) => {
    const video = videoRef.current;
    if (video) {
      video.currentTime += seconds;
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!videoRef.current) return;
      switch (e.code) {
        case "Space":
          e.preventDefault();
          togglePlayPause();
          break;
        case "ArrowLeft":
          e.preventDefault();
          skipTime(-10);
          break;
        case "ArrowRight":
          e.preventDefault();
          skipTime(10);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const container = containerRef.current;
    let timer: NodeJS.Timeout;

    const hideControls = () => {
      if (videoRef.current?.paused) return;
      timer = setTimeout(() => {
        container?.classList.remove("show-controls");
      }, 3000);
    };

    const showControls = () => {
      container?.classList.add("show-controls");
      clearTimeout(timer);
      hideControls();
    };

    container?.addEventListener("mousemove", showControls);
    hideControls();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      container?.removeEventListener("mousemove", showControls);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex w-full max-w-5xl aspect-video bg-black show-controls"
    >
      <video
        ref={videoRef}
        onClick={togglePlayPause}
        onDoubleClick={toggleFullscreen}
        onTimeUpdate={handleTimeUpdate}
        onLoadedData={handleLoadedData}
        className="w-full cursor-pointer"
        src={film_url}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent p-4">
        <div
          className="h-1 bg-white/50 cursor-pointer relative"
          onClick={(e) => {
            const rect = (e.target as HTMLElement).getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            if (videoRef.current) {
              const newTime = (clickX / rect.width) * videoRef.current.duration;
              videoRef.current.currentTime = newTime;
            }
          }}
        >
          <div
            ref={progressBarRef}
            className="h-1 bg-blue-500 w-0 absolute top-0 left-0"
          />
        </div>
        <div className="relative flex justify-between items-center mt-2">
          <div className="flex items-center space-x-2 md:w-[250px]">
            {isMuted ? (
              <SpeakerIconMuted
                onClick={() => {
                  const video = videoRef.current;
                  if (video) {
                    video.volume = previousVolume;
                    if (volumeSliderRef.current)
                      volumeSliderRef.current.value = previousVolume.toString();
                    setIsMuted(false);
                  }
                }}
                className="text-white cursor-pointer w-4 h-4 md:w-6 md:h-6"
              />
            ) : (
              <SpeakerIcon
                onClick={() => {
                  const video = videoRef.current;
                  if (video) {
                    setPreviousVolume(video.volume);
                    video.volume = 0;
                    if (volumeSliderRef.current)
                      volumeSliderRef.current.value = "0";
                    setIsMuted(true);
                  }
                }}
                className="text-white cursor-pointer w-4 h-4 md:w-6 md:h-6"
              />
            )}
            <input
              ref={volumeSliderRef}
              type="range"
              min="0"
              max="1"
              step="any"
              onChange={handleVolumeChange}
              defaultValue="0.5"
              className="accent-blue-500 w-[30px] md:w-[70px]"
            />
            <div className="text-white text-[8px] md:text-sm">
              {currentTime} / {duration}
            </div>
          </div>
          <div className="flex gap-4">
            <button onClick={() => skipTime(-10)} className="text-white">
              <BackwardIcon className="w-4 h-4 md:w-6 md:h-6" />
            </button>
            <button onClick={togglePlayPause} className="text-white">
              {isPlaying ? (
                <PlayIcon className="w-4 h-4 md:w-6 md:h-6" />
              ) : (
                <PauseIcon className="w-4 h-4 md:w-6 md:h-6" />
              )}
            </button>
            <button onClick={() => skipTime(10)} className="text-white">
              <ForwardIcon className="w-4 h-4 md:w-6 md:h-6" />
            </button>
          </div>
          <div className="flex items-center justify-end space-x-2 md:w-[250px]">
            <select
              value={playbackRate}
              onChange={handlePlaybackRateChange}
              className="text-white bg-black border border-white rounded text-[10px] md:text-lg"
            >
              <option value={0.5}>0.5x</option>
              <option value={1}>1x</option>
              <option value={1.5}>1.5x</option>
              <option value={2}>2x</option>
            </select>
            <button onClick={toggleFullscreen} className="text-white">
              <FullScreenIcon className="w-4 h-4 md:w-6 md:h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
