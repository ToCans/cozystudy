import { useEffect } from "react";

const TimeDisplay = ({
	timerStatus,
	minutes,
	seconds,
	onBreakState,
	timerStateChanger,
	minuteChanger,
	secondChanger,
	onBreakChanger,
}) => {
	const decrementTime = (timerStateChanger, onBreakState, onBreakChanger) => {
		// In the case that Seconds reaches Zero
		if (seconds === 0) {
			// In the case that minutes aren't but seconds are zero
			if (minutes !== 0) {
				secondChanger(59);
				minuteChanger(minutes - 1);
			}
			// When the timer fully reaches zero
			else {
				onBreakChanger(!onBreakState);
				timerStateChanger(false);
			}
		}
		// Timer decreases seconds by one
		else {
			secondChanger(seconds - 1);
		}
	};

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

	useEffect(() => {
		if (timerStatus === true) {
			const interval = setInterval(
				() => decrementTime(timerStateChanger, onBreakState, onBreakChanger),
				1000
			);
			return () => clearInterval(interval);
		}
	});

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
