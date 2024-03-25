import TimeDisplay from "./timeDisplay";
import InteractiveButton from "./timeButton";
import SettingsContent from "./settingsContent";
import { useState, useEffect, useContext } from "react";

function Timer() {
    // Setting Context used
    const settings = useContext(SettingsContent);
    // Different State Handling
    const [timerRunning, setTimerRunning] = useState(false);
    const [minutesRemaining, setMinutesRemaining] = useState(25);
    const [secondsRemaining, setSecondsRemaining] = useState(0);

    /*
    const [progressBarValue, setProgressBarValue] = useState(0);
    const [progressBarTotal, setProgressBarTotal] = useState(
        settings.workingMinutes * 60 + settings.workingSeconds
    );
    */

    // Running Timer and Progress Bar
    useEffect(() => {
        settings.timerWorker.onmessage = (e) => {
            console.log("Worker Message received");

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

    /*
    useEffect(() => {
        let progressBarValue =
            (1 -
                (minutesRemaining * 60 + secondsRemaining) / progressBarTotal) *
            100;
        setProgressBarValue(progressBarValue);
    }, [progressBarTotal, minutesRemaining, secondsRemaining]);
    */

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
            /*
            setProgressBarTotal(
                settings.longBreakMinutes * 60 + settings.longBreakSeconds
            );
            */
        }
        // Short Break Handling
        else if (settings.cycleNumber % 2 === 0) {
            setSecondsRemaining(0);
            setMinutesRemaining(settings.shortBreakMinutes);
            /*
            setProgressBarTotal(
                settings.shortBreakMinutes * 60 + settings.shortBreakSeconds
            );
            */
        }
        // Normal Study Time Check
        else {
            setSecondsRemaining(0);
            setMinutesRemaining(settings.workingMinutes);
            /*
            setProgressBarTotal(
                settings.workingMinutes * 60 + settings.workingSeconds
            );
            */
        }
        //setProgressBarValue(0);
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
                const breakFinishAudio = new Audio(
                    "https://github.com/ToCans/cozystudy/blob/main/src/assets/sounds/lowHighChime.mp3?raw=true"
                );
                breakFinishAudio.volume = 0.5;
                breakFinishAudio.play();
            }
            // Complete played for work finishing
            else {
                const workFinishAudio = new Audio(
                    "https://github.com/ToCans/cozystudy/blob/main/src/assets/sounds/complete.mp3?raw=true"
                );
                workFinishAudio.volume = 0.5;
                workFinishAudio.play();
            }
        }
    }, [
        settings.cycleNumber,
        timerRunning,
        minutesRemaining,
        secondsRemaining,
    ]);

    // Timer Display Information
    let cycleDisplay = Math.ceil(settings.cycleNumber / 2);

    return (
        <div className="bg-slate-400 container">
            <TimeDisplay
                minutes={minutesRemaining}
                seconds={secondsRemaining}
            />
            <div className="row">
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
            <p>Current Cycle: {cycleDisplay}</p>
        </div>
    );
}

export default Timer;
