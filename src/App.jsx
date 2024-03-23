import "./index.css";
import gearIcon from "./assets/icons/gear.svg";
import questionIcon from "./assets/icons/question-circle.svg";
import Timer from "./components/timer";
import Settings from "./components/settings";
import SettingsContent from "./components/settingsContent";
import timerWorkerScript from "./scripts/timerWorker";
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
        <div className="bg-amber-200 h-screen w-screen">
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
                <div className="flex flex-col">
                    <div className="fixed top-0 w-11/12 flex flex-row justify-end">
                        <img
                            src={questionIcon}
                            className="size-10 m-1"
                            alt="Question Mark Icon for Questions"
                        />
                        <img
                            src={gearIcon}
                            className="size-10 m-1"
                            onClick={() => {
                                settingsToggle();
                                timerWorker.postMessage({
                                    timerRunning: false,
                                    minutesRemaining: null,
                                    secondsRemaining: null,
                                });
                            }}
                            alt="Gear Icon for Settings"
                        />
                    </div>
                    <div>
                        {showSettings === false ? <Timer /> : <Settings />}
                    </div>
                </div>
            </SettingsContent.Provider>
        </div>
    );
}

export default App;
