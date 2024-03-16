import "./index.css";
import gearIcon from "./assets/icons/gear.svg";
import questionIcon from "./assets/icons/question-circle.svg";
import Timer from "./components/timer";
import Settings from "./components/settings";
import SettingsContent from "./components/settingsContent";

import { useState } from "react";

function App() {
    const [showSettings, setShowSettings] = useState(false);

    const [cycleNumber, setCycleNumber] = useState(1);
    const [workingMinutes, setWorkingMinutes] = useState(25);
    const [workingSeconds, setWorkingSeconds] = useState(0);
    const [shortBreakMinutes, setShortBreakMinutes] = useState(5);
    const [shortBreakSeconds, setShortBreakSeconds] = useState(0);
    const [longBreakMinutes, setLongBreakMinutes] = useState(15);
    const [longBreakSeconds, setLongBreakSeconds] = useState(0);

    const settingsToggle = () => {
        setShowSettings(!showSettings);
    };

    return (
        <div className="bg-amber-100 h-screen w-screen">
            <SettingsContent.Provider
                value={{
                    workingMinutes,
                    workingSeconds,
                    shortBreakMinutes,
                    shortBreakSeconds,
                    longBreakMinutes,
                    longBreakSeconds,
                    cycleNumber,
                    setWorkingMinutes,
                    setWorkingSeconds,
                    setShortBreakMinutes,
                    setShortBreakSeconds,
                    setLongBreakMinutes,
                    setLongBreakSeconds,
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
                            onClick={settingsToggle}
                            alt="Gear Icon for Settings"
                        />
                    </div>
                    <div className="container flex flex-col w-1/2 h-1/2 items-center justify-center">
                        {showSettings === false ? <Timer /> : <Settings />}
                    </div>
                </div>
            </SettingsContent.Provider>
        </div>
    );
}

export default App;
