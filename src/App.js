import "./index.css";
import TimeDisplay from "./components/timeDisplay";
import InteractiveButton from "./components/button";

import { useState, useEffect } from "react";

function App() {
	// Different State Handling
	const [timerRunning, setTimerState] = useState(false);
	const [cycleNumber, setCycleNumber] = useState(1);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(30);

	//function breakSettingHelper(cycleNumber,)
	const decrementTime = (cycleNumber, setTimerState, setCycleNumber) => {
		// In the case that Seconds reaches Zero
		if (seconds === 0) {
			// In the case that minutes aren't but seconds are zero
			if (minutes !== 0) {
				setSeconds(59);
				setMinutes(minutes - 1);
			}
			// When the timer fully reaches zero
			else {
				setCycleNumber(cycleNumber + 1);
				setTimerState(false);
			}
		}
		// Timer decreases seconds by one
		else {
			setSeconds(seconds - 1);
		}
	};

	// Running Timer
	useEffect(() => {
		if (timerRunning === true) {
			const interval = setInterval(
				() => decrementTime(cycleNumber, setTimerState, setCycleNumber),
				1000
			);
			return () => clearInterval(interval);
		}
	});

	// Break Handling based on Break State
	useEffect(() => {
		console.log("Here's the current cycle number",cycleNumber)
		// Long Break Handling
		if (cycleNumber % 8 === 0) {
			setSeconds(0);
			setMinutes(15);
		}
		// Short Break Handling
		else if (cycleNumber % 2 === 0) {
			setSeconds(0);
			setMinutes(5);
		}

		// Normal Study Time Check
		else {
			setSeconds(0);
			setMinutes(25);
		}
	}, [cycleNumber]);

	// Timer Display Information
	let cycleDisplay = Math.ceil(cycleNumber / 2)

	return (
		<div className="app">
			<TimeDisplay
				minutes={minutes}
				seconds={seconds}
			/>
			<div className="timeButtonRow">
				<InteractiveButton
					purpose="Start"
					cycleState={cycleNumber}
					timerStateChanger={setTimerState}
					cycleStateChanger={setCycleNumber}
				/>
				<InteractiveButton
					purpose="Pause"
					cycleState={cycleNumber}
					timerStateChanger={setTimerState}
					cycleStateChanger={setCycleNumber}
				/>
				<InteractiveButton
					purpose="Skip"
					cycleState={cycleNumber}
					timerStateChanger={setTimerState}
					cycleStateChanger={setCycleNumber}
				/>
			</div>
			<p>Current Cycle: {cycleDisplay}</p>
		</div>
	);
}

export default App;
