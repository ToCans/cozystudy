import "../index.css";
//import completeSound from "https://github.com/ToCans/cozystudy/blob/main/src/assets/complete.mp3?raw=true";
//import lowHighChimeSound from "https://github.com/ToCans/cozystudy/blob/main/src/assets/lowHighChime.mp3?raw=true";
import TimeDisplay from "./timeDisplay";
import InteractiveButton from "./timeButton";
import ProgressBarTest from "./progressBar";
import SettingsContent from "./settingsContent";

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
    const [progressBarValue, setProgressBarValue] = useState(0);
    const [progressBarTotal, setProgressBarTotal] = useState(
        settings.workingMinutes * 60 + settings.workingSeconds
    );

    // Used to Decrement the time
    const decrementTime = (cycleNumber, setTimerState, setCycleNumber) => {
        if (minutesRemaining === 0 && secondsRemaining === 0) {
            setTimerState(false);
            setCycleNumber(cycleNumber + 1);
        }
        // In the case that secondsRemaining reaches Zero
        else if (minutesRemaining !== 0 && secondsRemaining === 0) {
            setSecondsRemaining(59);
            setMinutesRemaining(minutesRemaining - 1);
        }
        // Timer decreases secondsRemaining by one
        else {
            setSecondsRemaining(secondsRemaining - 1);
        }
    };

    // Running Timer and Progress Bar
    useEffect(() => {
        if (timerRunning === true) {
            const interval = setInterval(() => {
                decrementTime(
                    settings.cycleNumber,
                    setTimerState,
                    settings.setCycleNumber
                );
            }, 1000);
            return () => clearInterval(interval);
        }
    });

    useEffect(() => {
        let progressBarValue =
            (1 -
                (minutesRemaining * 60 + secondsRemaining) / progressBarTotal) *
            100;
        setProgressBarValue(progressBarValue);
    }, [progressBarTotal, minutesRemaining, secondsRemaining]);

    // Break Handling based on Break State
    useEffect(() => {
        // Long Break Handling
        if (settings.cycleNumber % 8 === 0) {
            setSecondsRemaining(settings.longBreakSeconds);
            setMinutesRemaining(settings.longBreakMinutes);
            setProgressBarTotal(
                settings.longBreakMinutes * 60 + settings.longBreakSeconds
            );
        }
        // Short Break Handling
        else if (settings.cycleNumber % 2 === 0) {
            setSecondsRemaining(settings.shortBreakSeconds);
            setMinutesRemaining(settings.shortBreakMinutes);
            setProgressBarTotal(
                settings.shortBreakMinutes * 60 + settings.shortBreakSeconds
            );
        }
        // Normal Study Time Check
        else {
            setSecondsRemaining(settings.workingSeconds);
            setMinutesRemaining(settings.workingMinutes);
            setProgressBarTotal(
                settings.workingMinutes * 60 + settings.workingSeconds
            );
        }
        setProgressBarValue(0);
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
                //breakFinishAudio.volume = 0.5;
                breakFinishAudio.play();
            }
            // Complete played for work finishing
            else {
                const workFinishAudio = new Audio(
                    "https://github.com/ToCans/cozystudy/blob/main/src/assets/sounds/complete.mp3?raw=true"
                );
                //workFinishAudio.volume = 0.5;
                workFinishAudio.play();
            }
        }
    });

    // Timer Display Information
    let cycleDisplay = Math.ceil(settings.cycleNumber / 2);

    return (
        <div>
            <TimeDisplay
                minutes={minutesRemaining}
                seconds={secondsRemaining}
            />
            <ProgressBarTest
                progressBarValue={progressBarValue}
            ></ProgressBarTest>
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
