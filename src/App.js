import "./index.css";
import TimeDisplay from "./components/timeDisplay";
import InteractiveButton from "./components/button";

import { useState, useEffect } from "react";

function App() {
	// Different State Handling
	const [timerRunning, setTimerState] = useState(false);
	const [cycleNumber, setCycleNumber] = useState(1);
	const [breakState, setBreakState] = useState("none");
	const [prevOnBreak, setPrevOnBreak] = useState(null);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(30);

	//function breakSettingHelper(cycleNumber,)

	// Break Handling based on Break State
	useEffect(() => {
		// Long Break Handling
		if (breakState === "long") {
			setSeconds(20);
			setMinutes(0);
		}
		// Short Break Handling
		else if (breakState === "short") {
			setSeconds(10);
			setMinutes(0);
		}

		// Normal Study Time Check
		else {
			setSeconds(30);
			setMinutes(0);
		}
	}, [onBreak]);

	return (
		<div className="app">
			<TimeDisplay
				timerStatus={timerRunning}
				minutes={minutes}
				seconds={seconds}
				onBreakState={onBreak}
				timerStateChanger={setTimerState}
				minuteChanger={setMinutes}
				secondChanger={setSeconds}
				onBreakChanger={setOnBreak}
			/>
			<div className="timeButtonRow">
				<InteractiveButton
					purpose="Start"
					cycleState={cycleNumber}
					timerStateChanger={setTimerState}
					cycleStateChanger={setCycleNumber}
					onBreakChanger={setOnBreak}
				/>
				<InteractiveButton
					purpose="Pause"
					cycleState={cycleNumber}
					timerStateChanger={setTimerState}
					cycleStateChanger={setCycleNumber}
					onBreakChanger={setOnBreak}
				/>
				<InteractiveButton
					purpose="Skip"
					cycleState={cycleNumber}
					timerStateChanger={setTimerState}
					cycleStateChanger={setCycleNumber}
					onBreakChanger={setOnBreak}
				/>
			</div>
			<p>Current Cycle: {cycleNumber}</p>
			<p>Break Status: {onBreak.toString()}</p>
		</div>
	);
}

export default App;
