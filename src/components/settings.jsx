//import "../index.css";
import SettingsContent from "./settingsContent";
import { useContext } from "react";

const Settings = () => {
    const settings = useContext(SettingsContent);

    return (
        <div className="settingsContainer">
            <h1>Here are the settings!</h1>
            <div className="settingsRow">
                <button
                    onClick={() =>
                        settings.setWorkingMinutes(settings.workingMinutes - 1)
                    }
                >
                    -
                </button>
                <p>Here are the Working minutes: {settings.workingMinutes}</p>
                <button
                    onClick={() =>
                        settings.setWorkingMinutes(settings.workingMinutes + 1)
                    }
                >
                    +
                </button>
            </div>
            <div className="settingsRow">
                <button
                    onClick={() =>
                        settings.setShortBreakMinutes(
                            settings.shortBreakMinutes - 1
                        )
                    }
                >
                    -
                </button>
                <p>
                    Here are the Short Break minutes:{" "}
                    {settings.shortBreakMinutes}
                </p>
                <button
                    onClick={() =>
                        settings.setShortBreakMinutes(
                            settings.shortBreakMinutes + 1
                        )
                    }
                >
                    +
                </button>
            </div>
            <div className="settingsRow">
                <button
                    onClick={() =>
                        settings.setLongBreakMinutes(
                            settings.longBreakMinutes - 1
                        )
                    }
                >
                    -
                </button>
                <p>
                    Here are the Long Break minutes: {settings.longBreakMinutes}
                </p>
                <button
                    onClick={() =>
                        settings.setLongBreakMinutes(
                            settings.longBreakMinutes + 1
                        )
                    }
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default Settings;
