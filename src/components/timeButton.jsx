import SettingsContent from "./settingsContent";
import { useContext } from "react";

const InteractiveButton = ({ purpose, minutesRemaining, secondsRemaining }) => {
    const settings = useContext(SettingsContent);

    // Start Button Handling
    if (purpose === "Start") {
        return (
            <button
                id="startButton"
                onClick={() => {
                    settings.timerWorker.current.postMessage({
                        timerRunning: true,
                        minutesRemaining: minutesRemaining,
                        secondsRemaining: secondsRemaining,
                    });
                }}
                className="sm:text-2xl sm:w-20 text-xl w-16 border-solid border-2 rounded-lg bg-slate-100 m-0.5 p-1 hover:font-semibold opacity-100 select-none"
                style={{
                    borderColor: `${
                        settings.themes[settings.themeIndex].buttonProgressColor
                    }`,
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
                id="pauseButton"
                onClick={() => {
                    settings.timerWorker.current.postMessage({
                        timerRunning: false,
                        minutesRemaining: null,
                        secondsRemaining: null,
                    });
                }}
                className="sm:text-2xl sm:w-20 text-xl w-16 border-solid border-2 rounded-lg bg-slate-100 m-0.5 p-1  hover:font-semibold opacity-100 select-none"
                style={{
                    borderColor: `${
                        settings.themes[settings.themeIndex].buttonProgressColor
                    }`,
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
                id="skipButton"
                onClick={() => {
                    settings.timerWorker.current.postMessage({
                        timerRunning: false,
                        minutesRemaining: null,
                        secondsRemaining: null,
                    });
                    settings.setCycleNumber(settings.cycleNumber + 1);
                }}
                className="sm:text-2xl sm:w-20 text-xl w-16 border-solid border-2 rounded-lg bg-slate-100 m-0.5 p-1  hover:font-semibold opacity-100 select-none"
                style={{
                    borderColor: `${
                        settings.themes[settings.themeIndex].buttonProgressColor
                    }`,
                }}
            >
                Skip
            </button>
        );
    }
};

export default InteractiveButton;
