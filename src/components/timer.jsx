//import "../index.css";
import TimeDisplay from "./timeDisplay";
import InteractiveButton from "./timeButton";
//import ProgressBarTest from "./progressBar";
import SettingsContent from "./settingsContent";
import worker_script from "../scripts/worker";

import { useState, useEffect, useContext } from "react";

function Timer() {
    // Setting Context used
    const settings = useContext(SettingsContent);

    // Different State Handling
    const [timerRunning, setTimerState] = useState(false);
    const [minutesRemaining, setMinutesRemaining] = useState(
        settings.workingMinutes
    );
    const [secondsRemaining, setSecondsRemaining] = useState(
        settings.workingSeconds
    );
    /*
    const [progressBarValue, setProgressBarValue] = useState(0);
    const [progressBarTotal, setProgressBarTotal] = useState(
        settings.workingMinutes * 60 + settings.workingSeconds
    );
    */

    let myWorker = new Worker(worker_script);

    // Running Timer and Progress Bar

    useEffect(() => {
        if (timerRunning === true) {
            myWorker.postMessage({
                timerRunning: true,
                minutesRemaining: minutesRemaining,
                secondsRemaining: secondsRemaining,
            });
        }
        if (timerRunning === false) {
            myWorker.postMessage({
                timerRunning: false,
                minutesRemaining: minutesRemaining,
                secondsRemaining: secondsRemaining,
            });
            myWorker.terminate();
        }
    });

    useEffect(() => {
        myWorker.onmessage = (e) => {
            let minutesRemainingDisplay = e.data.minutesRemaining;
            let secondsRemainingDisplay = e.data.secondsRemaining;

            setMinutesRemaining(minutesRemainingDisplay);
            setSecondsRemaining(secondsRemainingDisplay);

            if (
                minutesRemainingDisplay === 0 &&
                secondsRemainingDisplay === 0
            ) {
                setTimerState(false);
                settings.setCycleNumber(settings.cycleNumber + 1);
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

    // Break Handling based on Break State
    useEffect(() => {
        // Long Break Handling
        if (settings.cycleNumber % 8 === 0) {
            setSecondsRemaining(settings.longBreakSeconds);
            setMinutesRemaining(settings.longBreakMinutes);
            /*
            setProgressBarTotal(
                settings.longBreakMinutes * 60 + settings.longBreakSeconds
            );
            */
        }
        // Short Break Handling
        else if (settings.cycleNumber % 2 === 0) {
            setSecondsRemaining(settings.shortBreakSeconds);
            setMinutesRemaining(settings.shortBreakMinutes);
            /*
            setProgressBarTotal(
                settings.shortBreakMinutes * 60 + settings.shortBreakSeconds
            );
            */
        }
        // Normal Study Time Check
        else {
            setSecondsRemaining(settings.workingSeconds);
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
                // Audio Used

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
        minutesRemaining,
        secondsRemaining,
        timerRunning,
    ]);

    // Timer Display Information
    let cycleDisplay = Math.ceil(settings.cycleNumber / 2);

    return (
        <div className="bg-slate-50">
            <TimeDisplay
                minutes={minutesRemaining}
                seconds={secondsRemaining}
            />
            <div className="timeButtonRow">
                <InteractiveButton
                    purpose="Start"
                    cycleState={settings.cycleNumber}
                    timerStateChanger={setTimerState}
                    cycleStateChanger={settings.setCycleNumber}
                />
                <InteractiveButton
                    purpose="Pause"
                    cycleState={settings.cycleNumber}
                    timerStateChanger={setTimerState}
                    cycleStateChanger={settings.setCycleNumber}
                />
                <InteractiveButton
                    purpose="Skip"
                    cycleState={settings.cycleNumber}
                    timerStateChanger={setTimerState}
                    cycleStateChanger={settings.setCycleNumber}
                />
            </div>
            <p>Current Cycle: {cycleDisplay}</p>
        </div>
    );
}

export default Timer;
