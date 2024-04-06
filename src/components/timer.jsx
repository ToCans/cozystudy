import TimeDisplay from "./timeDisplay";
import ProgressBar from "./progressBar";
import InteractiveButton from "./timeButton";
import SettingsContent from "./settingsContent";
import SoundButton from "./soundButton";

import { useState, useEffect, useContext } from "react";

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

    // Running Timer
    useEffect(() => {
        settings.timerWorker.current.onmessage = (e) => {
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
                settings.breakFinishAudio.current.volume = 0.5;
                settings.breakFinishAudio.current.play();
            }
            // Complete played for work finishing
            else {
                settings.workFinishAudio.current.volume = 0.5;
                settings.workFinishAudio.current.play();
            }
        }
    }, [
        settings.cycleNumber,
        timerRunning,
        minutesRemaining,
        secondsRemaining,
        settings.breakFinishAudio,
        settings.workFinishAudio,
    ]);

    // Ambient Sounds Handling
    useEffect(() => {
        // Stopping Audio Function
        const stopAllAudio = () => {
            // Fire Audio Off
            settings.fireAudio.current.pause();
            settings.fireAudio.current.currentTime = 0;
            // Wind Audio Off
            settings.windAudio.current.pause();
            settings.windAudio.current.currentTime = 0;
            // Rain Audio Off
            settings.rainAudio.current.pause();
            settings.rainAudio.current.currentTime = 0;
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
            settings.fireAudio.current.volume = 0.75;
            settings.fireAudio.current.play();
            settings.fireAudio.current.addEventListener(
                "timeupdate",
                loopAudio,
                false
            );
        } else if (audioPlaying === "Wind") {
            stopAllAudio();
            settings.windAudio.current.play();
            settings.windAudio.current.volume = 0.7;
            settings.windAudio.current.addEventListener(
                "timeupdate",
                loopAudio,
                false
            );
        } else if (audioPlaying === "Rain") {
            stopAllAudio();
            settings.rainAudio.current.volume = 0.5;
            settings.rainAudio.current.play();
            settings.rainAudio.current.addEventListener(
                "timeupdate",
                loopAudio,
                false
            );
        } else {
            stopAllAudio();
        }
    }, [
        audioPlaying,
        settings.fireAudio,
        settings.windAudio,
        settings.rainAudio,
    ]);

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
