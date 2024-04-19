import SettingsContent from "./settingsContent";
import { useContext } from "react";

const TimeDisplay = ({ minutes, seconds }) => {
    // Setting Context used
    const settings = useContext(SettingsContent);

    // Formatting Function Used for Timer
    const formattingCheck = (minutes, seconds) => {
        let timerMinutes;
        let timerSeconds;
        let timerDisplay;

        // Timer Display
        if (minutes < 10) {
            timerMinutes = `0${minutes}`;
        } else {
            timerMinutes = minutes;
        }

        if (seconds < 10) {
            timerSeconds = `0${seconds}`;
        } else {
            timerSeconds = seconds;
        }

        timerDisplay = `${timerMinutes}:${timerSeconds}`;

        return timerDisplay;
    };

    const time = formattingCheck(minutes, seconds);

    return (
        <p
            className="sm:text-9xl text-center text-8xl m-1 select-none opacity-100"
            style={{
                color: `${settings.themes[settings.themeIndex].timerTextColor}`,
            }}
        >
            {time}
        </p>
    );
};

export default TimeDisplay;
