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
				className="text-2xl border-solid border-2 border-indigo-600 rounded-lg bg-slate-100 m-0.5 p-1"
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
				className="text-2xl border-solid border-2 border-indigo-600 rounded-lg bg-slate-100 m-0.5 p-1"
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
				className="text-2xl border-solid border-2 border-indigo-600 rounded-lg bg-slate-100 m-0.5 p-1"
			>
				Skip
			</button>
		);
	}
};

export default InteractiveButton;
