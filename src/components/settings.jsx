import "../index.css";
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
                        settings.setWorkingSeconds(settings.workingSeconds - 1)
                    }
                >
                    -
                </button>
                <p>Here are the Working seconds: {settings.workingSeconds}</p>
                <button
                    onClick={() =>
                        settings.setWorkingSeconds(settings.workingSeconds + 1)
                    }
                >
                    +
                </button>
            </div>
            <div className="settingsRow">
                <button
                    onClick={() =>
                        settings.setShortBreakSeconds(
                            settings.shortBreakSeconds - 1
                        )
                    }
                >
                    -
                </button>
                <p>
                    Here are the Short Break seconds:{" "}
                    {settings.shortBreakSeconds}
                </p>
                <button
                    onClick={() =>
                        settings.setShortBreakSeconds(
                            settings.shortBreakSeconds + 1
                        )
                    }
                >
                    +
                </button>
            </div>
            <div className="settingsRow">
                <button
                    onClick={() =>
                        settings.setLongBreakSeconds(
                            settings.longBreakSeconds - 1
                        )
                    }
                >
                    -
                </button>
                <p>
                    Here are the Long Break seconds: {settings.longBreakSeconds}
                </p>
                <button
                    onClick={() =>
                        settings.setLongBreakSeconds(
                            settings.longBreakSeconds + 1
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
