import "./index.css";
import { Analytics } from "@vercel/analytics/react";
import { PiGearLight } from "react-icons/pi";
import { PiQuestionLight } from "react-icons/pi";
import { useState, useRef, useEffect } from "react";
import breakFinishAudioClip from "./assets/sounds/complete.mp3";
import workFinishAudioClip from "./assets/sounds/lowHighChime.mp3";
import campfireAudioLoop from "./assets/sounds/campfireLoop.mp3";
import windAudioLoop from "./assets/sounds/windLoop.mp3";
import rainAudioLoop from "./assets/sounds/rainLoop.mp3";
import RainTrain from "./assets/backgrounds/rain_train.gif";
import CoffeeShop from "./assets/backgrounds/coffeeshop_worker.gif";
import GirlDog from "./assets/backgrounds/girl_dog.gif";
import StackedHouse from "./assets/backgrounds/stacked_houses.gif";
import CornerStore from "./assets/backgrounds/corner_store.gif";
import Timer from "./components/timer";
import Settings from "./components/settings";
import SettingsContent from "./components/settingsContent";
import timerWorkerScript from "./scripts/timerWorker.js";

function App() {
    // States
    const [showSettings, setShowSettings] = useState(false);
    const [showTabTimer, setTabTimer] = useState(false);
    const [cycleNumber, setCycleNumber] = useState(1);
    const [workingMinutes, setWorkingMinutes] = useState(25);
    const [shortBreakMinutes, setShortBreakMinutes] = useState(5);
    const [longBreakMinutes, setLongBreakMinutes] = useState(15);
    const [audioPlaying, setAudioPlaying] = useState("None");
    const [backgroundImageIndex, setBackgroundImageIndex] = useState(0);

    // Audio Definitions
    const breakFinishAudio = useRef(new Audio(breakFinishAudioClip), []);
    const workFinishAudio = useRef(new Audio(workFinishAudioClip), []);
    const fireAudio = useRef(new Audio(campfireAudioLoop), []);
    const windAudio = useRef(new Audio(windAudioLoop), []);
    const rainAudio = useRef(new Audio(rainAudioLoop), []);

    // Image Definitions
    const backgroundImageNames = [
        " Rain Train",
        " Coffee Shop",
        " Girl Dog",
        " Stacked House",
        " Corner Store",
    ];
    const backgroundImages = [
        RainTrain,
        CoffeeShop,
        GirlDog,
        StackedHouse,
        CornerStore,
    ];

    // Web Worker
    const timerWorker = useRef(new Worker(timerWorkerScript), []);

    // Functions
    const settingsToggle = () => {
        setShowSettings(!showSettings);
    };

    // Ambient Sounds Handling
    useEffect(() => {
        // Stopping Audio Function
        const stopAllAudio = () => {
            // Fire Audio Off
            fireAudio.current.pause();
            fireAudio.current.currentTime = 0;
            // Wind Audio Off
            windAudio.current.pause();
            windAudio.current.currentTime = 0;
            // Rain Audio Off
            rainAudio.current.pause();
            rainAudio.current.currentTime = 0;
        };

        function loopAudio() {
            var buffer = 0.35;
            if (this.currentTime > this.duration - buffer) {
                this.currentTime = 0;
                this.play();
            }
        }

        if (audioPlaying === "Fire") {
            stopAllAudio();
            fireAudio.current.volume = 0.75;
            fireAudio.current.play();
            fireAudio.current.addEventListener("timeupdate", loopAudio, false);
        } else if (audioPlaying === "Wind") {
            stopAllAudio();
            windAudio.current.play();
            windAudio.current.volume = 0.7;
            windAudio.current.addEventListener("timeupdate", loopAudio, false);
        } else if (audioPlaying === "Rain") {
            stopAllAudio();
            rainAudio.current.volume = 0.5;
            rainAudio.current.play();
            rainAudio.current.addEventListener("timeupdate", loopAudio, false);
        } else {
            stopAllAudio();
        }
    }, [audioPlaying, fireAudio, windAudio, rainAudio]);

    return (
        <div className=" h-screen w-screen overscroll-none ">
            <SettingsContent.Provider
                value={{
                    showTabTimer,
                    workingMinutes,
                    shortBreakMinutes,
                    longBreakMinutes,
                    cycleNumber,
                    timerWorker,
                    breakFinishAudio,
                    workFinishAudio,
                    fireAudio,
                    windAudio,
                    rainAudio,
                    audioPlaying,
                    backgroundImages,
                    backgroundImageNames,
                    backgroundImageIndex,
                    setTabTimer,
                    setWorkingMinutes,
                    setShortBreakMinutes,
                    setLongBreakMinutes,
                    setCycleNumber,
                    setAudioPlaying,
                    setBackgroundImageIndex,
                }}
            >
                <div className=" flex flex-row justify-end top-0 absolute w-full ">
                    <PiQuestionLight
                        className="size-12 fill-slate-200 stroke-2 hover:stroke-0"
                        alt="Question Mark Icon for Questions"
                    />
                    <PiGearLight
                        className="size-12 fill-slate-200 stroke-2 hover:stroke-0"
                        alt="Gear Icon for Settings"
                        onClick={() => {
                            settingsToggle();
                            timerWorker.current.postMessage({
                                timerRunning: false,
                                minutesRemaining: null,
                                secondsRemaining: null,
                            });
                        }}
                    />
                </div>
                <div
                    className={
                        "flex flex-col justify-center items-center h-full  bg-no-repeat bg-cover bg-center"
                    }
                    style={{
                        backgroundImage: `url(${backgroundImages[backgroundImageIndex]})`,
                    }}
                >
                    {showSettings === false ? <Timer /> : <Settings />}
                </div>
            </SettingsContent.Provider>
            <Analytics />
        </div>
    );
}

export default App;
