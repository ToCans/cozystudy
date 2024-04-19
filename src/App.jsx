import "./index.css";
import "./App.css";
import { Analytics } from "@vercel/analytics/react";
import { PiGearLight, PiQuestionLight } from "react-icons/pi";
import { IconContext } from "react-icons";
import { useState, useRef, useEffect } from "react";
import breakFinishAudioClip from "./assets/sounds/complete.mp3";
import workFinishAudioClip from "./assets/sounds/lowHighChime.mp3";
import campfireAudioLoop from "./assets/sounds/campfireLoop.mp3";
import windAudioLoop from "./assets/sounds/windLoop.mp3";
import rainAudioLoop from "./assets/sounds/rainLoop.mp3";
import JapaneseHome from "./assets/backgrounds/JapaneseHome.jpg";
import DesertSunset from "./assets/backgrounds/DesertSunset.jpg";
import MountainSunrise from "./assets/backgrounds/MountainSunrise.jpg";
import RainForest from "./assets/backgrounds/RainForest.jpg";
import Shibuya from "./assets/backgrounds/Shibuya.jpg";
import WinterForest from "./assets/backgrounds/WinterForest.jpg";
import WinterMountain from "./assets/backgrounds/WinterMountain.jpg";
import Meadows from "./assets/backgrounds/Meadows.jpg";
import Timer from "./components/timer";
import Settings from "./components/settings";
import HelpPage from "./components/helpPage.jsx";
import SettingsContent from "./components/settingsContent";
import timerWorkerScript from "./scripts/timerWorker.js";

function App() {
    // States
    const [activePage, setActivePage] = useState("Timer");
    const [showTabTimer, setTabTimer] = useState(false);
    const [cycleNumber, setCycleNumber] = useState(1);
    const [workingMinutes, setWorkingMinutes] = useState(25);
    const [shortBreakMinutes, setShortBreakMinutes] = useState(5);
    const [longBreakMinutes, setLongBreakMinutes] = useState(15);
    const [audioPlaying, setAudioPlaying] = useState("None");
    const [backgroundImageIndex, setBackgroundImageIndex] = useState(0);
    const [themeIndex, setThemeIndex] = useState(0);

    // Audio Definitions
    const breakFinishAudio = useRef(new Audio(breakFinishAudioClip), []);
    const workFinishAudio = useRef(new Audio(workFinishAudioClip), []);
    const fireAudio = useRef(new Audio(campfireAudioLoop), []);
    const windAudio = useRef(new Audio(windAudioLoop), []);
    const rainAudio = useRef(new Audio(rainAudioLoop), []);

    // Themes
    const backgrounds = [
        { name: " Japanese Home", image: JapaneseHome },
        { name: " Meadows", image: Meadows },
        { name: " Desert Sunset", image: DesertSunset },
        { name: " Mountain Sunrise", image: MountainSunrise },
        { name: " Rain Forest", image: RainForest },
        { name: " Shibuya", image: Shibuya },
        { name: " Winter Forest", image: WinterForest },
        { name: " Winter Mountain", image: WinterMountain },
    ];

    // Theme Definitions
    const themes = [
        {
            name: " Default",
            timerColor: "#e2e8f0",
            timerTextColor: "#1e293b",
            buttonProgressColor: "#60a5fa",
        },
        {
            name: " Coffee",
            timerColor: "#fef3c7",
            timerTextColor: "#1e293b",
            buttonProgressColor: "#92400e",
        },
        {
            name: " Indigo",
            timerColor: "#a5b4fc",
            timerTextColor: "#f8fafc",
            buttonProgressColor: "#6366f1",
        },
    ];

    // Web Worker
    const timerWorker = useRef(new Worker(timerWorkerScript), []);

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
                    backgroundImageIndex,
                    themeIndex,
                    backgrounds,
                    themes,
                    setTabTimer,
                    setWorkingMinutes,
                    setShortBreakMinutes,
                    setLongBreakMinutes,
                    setCycleNumber,
                    setAudioPlaying,
                    setBackgroundImageIndex,
                    setThemeIndex,
                }}
            >
                <div className=" flex flex-row justify-end top-0 absolute w-full ">
                    <IconContext.Provider value={{ className: "topBarButton" }}>
                        <PiQuestionLight
                            className="size-12"
                            alt="Question Mark Icon for Questions"
                            onClick={() => {
                                if (activePage !== "HelpPage") {
                                    setActivePage("HelpPage");
                                } else {
                                    setActivePage("Timer");
                                }

                                timerWorker.current.postMessage({
                                    timerRunning: false,
                                    minutesRemaining: null,
                                    secondsRemaining: null,
                                });
                            }}
                        />
                    </IconContext.Provider>
                    <IconContext.Provider value={{ className: "topBarButton" }}>
                        <PiGearLight
                            className="size-12 "
                            alt="Gear Icon for Settings"
                            onClick={() => {
                                if (activePage !== "Settings") {
                                    setActivePage("Settings");
                                } else {
                                    setActivePage("Timer");
                                }

                                timerWorker.current.postMessage({
                                    timerRunning: false,
                                    minutesRemaining: null,
                                    secondsRemaining: null,
                                });
                            }}
                        />
                    </IconContext.Provider>
                </div>
                <div
                    className={
                        "flex flex-col justify-center items-center h-full  bg-no-repeat bg-cover bg-center"
                    }
                    style={{
                        backgroundImage: `url(${backgrounds[backgroundImageIndex].image})`,
                    }}
                >
                    {activePage === "Settings" ? <Settings /> : null}
                    {activePage === "HelpPage" ? <HelpPage /> : null}
                    {activePage === "Timer" ? <Timer /> : null}
                </div>
            </SettingsContent.Provider>
            <Analytics />
        </div>
    );
}

export default App;
