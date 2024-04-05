import TimeDisplay from "./timeDisplay";
import ProgressBar from "./progressBar";
import InteractiveButton from "./timeButton";
import SettingsContent from "./settingsContent";
import SoundButton from "./soundButton";
import breakFinishAudioClip from "../assets/sounds/complete.mp3";
import workFinishAudioClip from "../assets/sounds/lowHighChime.mp3";
import campfireAudioLoop from "../assets/sounds/campfireLoop.mp3";
import windAudioLoop from "../assets/sounds/windLoop.mp3";
import rainAudioLoop from "../assets/sounds/rainLoop.mp3";
import { useState, useEffect, useContext, useMemo } from "react";

function Timer() {
    // Setting Context used
    const settings = useContext(SettingsContent);

    // Different State Handling
    const [timerRunning, setTimerRunning] = useState(false);
    const [minutesRemaining, setMinutesRemaining] = useState(25);
    const [secondsRemaining, setSecondsRemaining] = useState(0);
    const [progressBarValue, setProgressBarValue] = useState(0);
    const [progressBarTotal, setProgressBarTotal] = useState(
        settings.workingMinutes * 60
    );
    const [audioPlaying, setAudioPlaying] = useState("None");

    // Audio Definitions
    const breakFinishAudio = useMemo(() => new Audio(breakFinishAudioClip), []);
    const workFinishAudio = useMemo(() => new Audio(workFinishAudioClip), []);
    const fireAudio = useMemo(() => new Audio(campfireAudioLoop), []);
    const windAudio = useMemo(() => new Audio(windAudioLoop), []);
    const rainAudio = useMemo(() => new Audio(rainAudioLoop), []);

    // Running Timer
    useEffect(() => {
        settings.timerWorker.onmessage = (e) => {
            if (
                e.data.minutesRemaining === 0 &&
                e.data.secondsRemaining === -1
            ) {
                setTimerRunning(false);
                settings.setCycleNumber(settings.cycleNumber + 1);
            } else {
                setTimerRunning(true);
                setMinutesRemaining(e.data.minutesRemaining);
                setSecondsRemaining(e.data.secondsRemaining);
            }
        };
    });

    //  Progress Bar Value Update
    useEffect(() => {
        let calculatedProgressBarValue =
            (1 -
                (minutesRemaining * 60 + secondsRemaining) / progressBarTotal) *
            100;

        setProgressBarValue(calculatedProgressBarValue);
    }, [minutesRemaining, secondsRemaining, progressBarTotal]);

    // For Showing Timer in Tab Info
    useEffect(() => {
        if (settings.showTabTimer) {
            document.title = `${minutesRemaining}:${secondsRemaining}`;
        } else {
            document.title = "CozyStudy";
        }
    }, [settings.showTabTimer, minutesRemaining, secondsRemaining]);

    // Break Handling based on Break State
    useEffect(() => {
        // Long Break Handling
        if (settings.cycleNumber % 8 === 0) {
            setSecondsRemaining(0);
            setMinutesRemaining(settings.longBreakMinutes);
            setProgressBarTotal(settings.longBreakMinutes * 60);
        }
        // Short Break Handling
        else if (settings.cycleNumber % 2 === 0) {
            setSecondsRemaining(0);
            setMinutesRemaining(settings.shortBreakMinutes);

            setProgressBarTotal(settings.shortBreakMinutes * 60);
        }
        // Normal Study Time Check
        else {
            setSecondsRemaining(0);
            setMinutesRemaining(settings.workingMinutes);
            setProgressBarTotal(settings.workingMinutes * 60);
        }
    }, [settings]);

    // End of Cycle Sound Handling
    useEffect(() => {
        if (
            minutesRemaining === 0 &&
            secondsRemaining === 0 &&
            timerRunning === true
        ) {
            // lowHighChime played for breaks finishing
            if (settings.cycleNumber % 2 === 0) {
                breakFinishAudio.volume = 0.5;
                breakFinishAudio.play();
            }
            // Complete played for work finishing
            else {
                workFinishAudio.volume = 0.5;
                workFinishAudio.play();
            }
        }
    }, [
        settings.cycleNumber,
        timerRunning,
        minutesRemaining,
        secondsRemaining,
        breakFinishAudio,
        workFinishAudio,
    ]);

    // Ambient Sounds Handling
    useEffect(() => {
        // Stopping Audio Function
        const stopAllAudio = () => {
            // Fire Audio Off
            fireAudio.pause();
            fireAudio.currentTime = 0;
            // Wind Audio Off
            windAudio.pause();
            windAudio.currentTime = 0;
            // Rain Audio Off
            rainAudio.pause();
            rainAudio.currentTime = 0;
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
            fireAudio.volume = 0.75;
            fireAudio.play();
            fireAudio.addEventListener("timeupdate", loopAudio, false);
        } else if (audioPlaying === "Wind") {
            stopAllAudio();
            windAudio.play();
            windAudio.volume = 0.7;
            windAudio.addEventListener("timeupdate", loopAudio, false);
        } else if (audioPlaying === "Rain") {
            stopAllAudio();
            rainAudio.volume = 0.5;
            rainAudio.play();
            rainAudio.addEventListener("timeupdate", loopAudio, false);
        } else {
            stopAllAudio();
        }
    }, [audioPlaying, fireAudio, windAudio, rainAudio]);

    // Timer Display Information
    let cycleDisplay = Math.ceil(settings.cycleNumber / 2);

    return (
        <div className="bg-slate-200 w-4/5 h-fit flex flex-col shadow-md rounded-lg mx-3 p-3 justify-center items-center">
            <TimeDisplay
                minutes={minutesRemaining}
                seconds={secondsRemaining}
            />
            <ProgressBar progressBarValue={progressBarValue} />
            <div className="row flex flex-row justify-center w-full">
                <InteractiveButton
                    purpose="Start"
                    minutesRemaining={minutesRemaining}
                    secondsRemaining={secondsRemaining}
                />
                <InteractiveButton
                    purpose="Pause"
                    minutesRemaining={minutesRemaining}
                    secondsRemaining={secondsRemaining}
                />
                <InteractiveButton
                    purpose="Skip"
                    minutesRemaining={minutesRemaining}
                    secondsRemaining={secondsRemaining}
                />
            </div>
            <p className="sm:text-xl text-center select-none">
                Current Cycle: {cycleDisplay}
            </p>
            <div className="row flex flex-row justify-center w-full space-x-2 m-1">
                <SoundButton
                    purpose="None"
                    audioPlayingSetter={setAudioPlaying}
                />
                <SoundButton
                    purpose="Fire"
                    audioPlayingSetter={setAudioPlaying}
                />
                <SoundButton
                    purpose="Wind"
                    audioPlayingSetter={setAudioPlaying}
                />
                <SoundButton
                    purpose="Rain"
                    audioPlayingSetter={setAudioPlaying}
                />
            </div>
        </div>
    );
}

export default Timer;
