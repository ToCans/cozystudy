const TimeDisplay = ({ minutes, seconds }) => {
	// Formatting Function Used for Timer
	const formattingCheck = (minutes, seconds) => {
		let timerMinutes;
		let timerSeconds;
		let timerDisplay;

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

	return <p className="text-9xl text-center">{time}</p>;
};

export default TimeDisplay;
