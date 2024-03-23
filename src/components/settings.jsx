//import "../index.css";
import SettingsContent from "./settingsContent";
import { useContext } from "react";

const Settings = () => {
    const settings = useContext(SettingsContent);

    return (
        <div>
            <h1>Here are the settings!</h1>
            <div>
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
            <div>
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
            <div>
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
            <div>
                <label htmlFor="tabTimer">Show Time in Tab</label>
                <input
                    name="tabTimer"
                    type="checkbox"
                    checked={settings.showTabTimer}
                    onChange={(e) => settings.setTabTimer(e.target.checked)}
                />
            </div>
        </div>
    );
};

export default Settings;
