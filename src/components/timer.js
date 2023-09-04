import { useState, useEffect } from 'react';

const Timer = () => {
	const [minutes, setMinutes] = useState(25);
	const [seconds, setSeconds] = useState(0);
	const [displayMessage, setDisplayMessage] = useState(false);

	const decrementTime = () => {
		/* In the case that Seconds reaches Zero */
		if (seconds === 0) {
			/* In the case that minutes aren't but seconds are zero */
			if (minutes !== 0) {
				setSeconds(59);
				setMinutes(minutes - 1);
			} else {
				/* In the case that minutes and seconds are zero */
				if (displayMessage === true) {
					setSeconds(59);
					setMinutes(24);
				} else {
					setSeconds(59);
					setMinutes(4);
					setDisplayMessage(!displayMessage);
				}
			}
		} else {
			setSeconds(seconds - 1);
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
		const interval = setInterval(() => decrementTime(), 1000);
		return () => clearInterval(interval);
	});

	const timer = formattingCheck(minutes, seconds);
	const timerMinutes = timer[0];
	const timerSeconds = timer[1];

	return (
		<div className="timer">
			<div className="box">
				<h4>
					{timerMinutes}:{timerSeconds}
				</h4>
			</div>
		</div>
	);
};

export default Timer;
