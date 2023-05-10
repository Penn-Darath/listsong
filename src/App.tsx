import { useEffect, useRef, useState } from "react";
import "./App.css";
import { FiPause, FiPlay, FiSkipBack, FiSkipForward } from "react-icons/fi";
import { Slider } from "@mui/material";

const data = [
  {
    id: 1,
    name: "ฉบับปรับปรุง",
    url: "/src/assets/spotifydown.com - ฉบับปรับปรุง.mp3",
  },
  {
    id: 2,
    name: "Enchanted",
    url: "/src/assets/spotifydown.com - Enchanted.mp3",
  },
  {
    id: 3,
    name: "Even For A Moment",
    url: "/src/assets/spotifydown.com - Even For A Moment.mp3",
  },
  {
    id: 4,
    name: "Love, Maybe",
    url: "/src/assets/spotifydown.com - Love, Maybe.mp3",
  },
  {
    id: 5,
    name: "One Day",
    url: "/src/assets/spotifydown.com - One Day.mp3",
  },
  {
    id: 6,
    name: "Sweet",
    url: "/src/assets/spotifydown.com - Sweet.mp3",
  },
  {
    id: 7,
    name: "Bloody Mary",
    url: "/src/assets/spotifydown.com - Bloody Mary.mp3",
  },
];

function App() {
  const [song, setSong] = useState(data[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [percent, setPercent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const loadingTimes = (time: number) => {
    return (
      Math.floor(time / 60) +
      ":" +
      ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const allTimes = (time: number) => {
    return (
      Math.floor(time / 60) +
      ":" +
      ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const onChange = (e: any) => {
    audioEl.current!.currentTime = (e.target.value * duration) / 100;
    setPercent(e.target.value);
  };

  const previosSong = () => {
    const index = data.indexOf(song);
    if (index === 0) {
      setSong(data[data.length - 1]);
      setIsPlaying(true);
      console.log(data[data.length - 1]);
    } else {
      setSong(data[index - 1]);
      setIsPlaying(true);
      console.log(data[index - 1]);
    }
  };

  const skipSong = () => {
    const index = data.indexOf(song);
    if (index === data.length - 1) {
      setSong(data[0]);
      setIsPlaying(true);
    } else {
      setSong(data[index + 1]);
      setIsPlaying(true);
      console.log(data[index + 1]);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      audioEl.current?.play();
    } else {
      audioEl.current?.pause();
    }
  }, [isPlaying, song]);

  const toggleAudio = () => {
    if (audioEl.current?.paused) {
      audioEl.current?.play();
      isPlaying ? setIsPlaying(false) : setIsPlaying(true);
    } else {
      audioEl.current?.pause();
      isPlaying ? setIsPlaying(false) : setIsPlaying(true);
    }
  };

  const chooseSong = (id: number) => {
    const found = data.find((song) => song.id === id);
    if (found) {
      setSong(found);
    }
    setIsPlaying(true);
  };

  const getCurrentDuration = (e: any) => {
    const percent = ((e.currentTarget.currentTime / duration) * 100).toFixed(0);
    setPercent(+percent);
    setCurrentTime(e.currentTarget.currentTime);

  };

  const audioEl = useRef<HTMLAudioElement>(null);
  return (
    <div className="h-screen w-screen bg-slate-300 pt-5 " style={{fontFamily: "monospace"}}>
      <div className="grid justify-center">
        <div className="text-center ">
          {data.map((s) => (
            <div key={s.id}>
              <button onClick={() => chooseSong(s.id)}>
                <p
                  className="py-2 font-extrabold mb-5 text-2xl hover:scale-125 duration-300 active:scale-105 px-4 rounded"
                  style={{
                    color: song.id === s.id ? "white" : "black",
                    backgroundColor: song.id === s.id ? "black" : "",
                    borderColor: song.id === s.id ? "white" : "",
                    borderWidth: song.id === s.id ? "3px" : "",
                    borderRadius: song.id === s.id ? "10px" : "",
                  }}
                >
                  {s.name}
                </p>
              </button>
            </div>
          ))}
        </div>
        <div className="grid  justify-center items-center w-fit text-3xl text-white bg-black rounded-lg">
          <div className="border-4 border-white w-full pb-8 pt-6 gap-x-5 px-24 rounded-lg">
          <div className="lg:w-[20vw] w-[50vw] overflow-hidden rounded-lg">
            <p className="text-xl w-full text-center pb-7 animate-x">
              {song.name}
              </p>
              <div className="flex text-base items-center justify-between gap-x-4">
                <div>{loadingTimes(currentTime)}</div>
                <Slider
                  className="MuiSlider-thumb"
                  color="secondary"
                  size="small"
                  style={{ width: "70%", height: "12px" }}
                  sx={{ color: "#EA8FEA" }}
                  aria-label="Volume"

                onChange={onChange}
                value={percent}
                />
                <div>{allTimes(duration)}</div>
                </div>
            <div className="flex justify-between ">
              <button
                className="hover:scale-110 duration-300 active:scale-x-150"
                onClick={previosSong}
              >
                <FiSkipBack />
              </button>
                <audio src={song.url} ref={audioEl} onLoadedData={(e) => {
                  setDuration(e.currentTarget.duration)
                }}
                  onTimeUpdate={getCurrentDuration}
                />
              <button
                className="hover:scale-110 duration-300 active:scale-x-150 text-5xl"
                onClick={toggleAudio}
              >
                {isPlaying ? <FiPause /> : <FiPlay />}
              </button>
              <button
                className="hover:scale-110 duration-300 active:scale-x-150"
                onClick={skipSong}
              >
                <FiSkipForward />
              </button>
            </div>
          </div>
          </div>
          </div>
      </div>
    </div>
  );
}

export default App;