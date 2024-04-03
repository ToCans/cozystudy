import "./index.css";
import { PiGearLight } from "react-icons/pi";

import { PiQuestionLight } from "react-icons/pi";
import Timer from "./components/timer";
import Settings from "./components/settings";
import SettingsContent from "./components/settingsContent";
import timerWorkerScript from "./scripts/timerWorker.js";
import { useState } from "react";

function App() {
    const [showSettings, setShowSettings] = useState(false);
    const [showTabTimer, setTabTimer] = useState(false);
    const [cycleNumber, setCycleNumber] = useState(1);
    const [workingMinutes, setWorkingMinutes] = useState(25);
    const [shortBreakMinutes, setShortBreakMinutes] = useState(5);
    const [longBreakMinutes, setLongBreakMinutes] = useState(15);
    const timerWorker = new Worker(timerWorkerScript);

    const settingsToggle = () => {
        setShowSettings(!showSettings);
    };

    return (
        <div className="bg-slate-400 h-screen w-screen overscroll-none">
            <SettingsContent.Provider
                value={{
                    showTabTimer,
                    workingMinutes,
                    shortBreakMinutes,
                    longBreakMinutes,
                    cycleNumber,
                    timerWorker,
                    setTabTimer,
                    setWorkingMinutes,
                    setShortBreakMinutes,
                    setLongBreakMinutes,
                    setCycleNumber,
                }}
            >
                <div className=" flex flex-row justify-end top-0 absolute w-full">
                    <PiQuestionLight
                        className="size-12 hover:stroke-2"
                        alt="Question Mark Icon for Questions"
                    />
                    <PiGearLight
                        className="size-12 hover:stroke-2"
                        alt="Gear Icon for Settings"
                        onClick={() => {
                            settingsToggle();
                            timerWorker.postMessage({
                                timerRunning: false,
                                minutesRemaining: null,
                                secondsRemaining: null,
                            });
                        }}
                    />
                </div>
                <div className="flex flex-col justify-center items-center h-full">
                    {showSettings === false ? <Timer /> : <Settings />}
                </div>
            </SettingsContent.Provider>
        </div>
    );
}

export default App;
