import SettingsContent from "./settingsContent";
import { useContext } from "react";

const InteractiveButton = ({ purpose, minutesRemaining, secondsRemaining }) => {
    const settings = useContext(SettingsContent);
    // Start Button Handling
    if (purpose === "Start") {
        return (
            <button
                onClick={() => {
                    settings.timerWorker.postMessage({
                        timerRunning: true,
                        minutesRemaining: minutesRemaining,
                        secondsRemaining: secondsRemaining,
                    });
                }}
            >
                Start
            </button>
        );
    }
    // Pause Button Handling
    else if (purpose === "Pause") {
        return (
            <button
                onClick={() => {
                    settings.timerWorker.postMessage({
                        timerRunning: false,
                        minutesRemaining: null,
                        secondsRemaining: null,
                    });
                }}
            >
                Pause
            </button>
        );
    }
    // Skip Button Handling
    else {
        return (
            <button
                onClick={() => {
                    settings.timerWorker.postMessage({
                        timerRunning: false,
                        minutesRemaining: null,
                        secondsRemaining: null,
                    });
                    settings.setCycleNumber(settings.cycleNumber + 1);
                }}
            >
                Skip
            </button>
        );
    }
};

export default InteractiveButton;
