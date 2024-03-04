import { useEffect } from "react";

const TimeDisplay = ({
	minutes,
	seconds,
}) => {
	
	const formattingCheck = () => {
		let timerMinutes;
		let timerSeconds;

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

		return [timerMinutes, timerSeconds];
	};

	const timer = formattingCheck(minutes, seconds);

	return (
		<div className="timeDisplayContainer">
			<h4>
				{timer[0]}:{timer[1]}
			</h4>
		</div>
	);
};

export default TimeDisplay;
