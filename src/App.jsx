import "./index.css";
import gearIcon from "./assets/icons/gear-svgrepo-com.svg";
import Timer from "./components/timer";
import Settings from "./components/settings";
import SettingsContent from "./components/settingsContent";
import "bootstrap/dist/css/bootstrap.css";

import { useState } from "react";

function App() {
    const [showSettings, setShowSettings] = useState(false);

    const [cycleNumber, setCycleNumber] = useState(1);
    const [workingMinutes, setWorkingMinutes] = useState(0);
    const [workingSeconds, setWorkingSeconds] = useState(25);
    const [shortBreakMinutes, setShortBreakMinutes] = useState(0);
    const [shortBreakSeconds, setShortBreakSeconds] = useState(5);
    const [longBreakMinutes, setLongBreakMinutes] = useState(0);
    const [longBreakSeconds, setLongBreakSeconds] = useState(15);

    const settingsToggle = () => {
        setShowSettings(!showSettings);
    };

    return (
        <div className="app">
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
                <div className="mainContainer">
                    <img
                        src={gearIcon}
                        onClick={settingsToggle}
                        alt="Gear Icon for Settings"
                    />
                    {showSettings === false ? <Timer /> : <Settings />}
                </div>
            </SettingsContent.Provider>
        </div>
    );
}

export default App;
