import "../index.css";
import completeSound from "../assets/sounds/complete.mp3"
import lowHighChimeSound from "../assets/sounds/lowHighChime.mp3"
import TimeDisplay from "./timeDisplay";
import InteractiveButton from "./timeButton";

import { useState, useEffect } from "react";

function Timer() {
	// Different State Handling
	const [timerRunning, setTimerState] = useState(false);
	const [cycleNumber, setCycleNumber] = useState(1);
	const [minutes, setMinutes] = useState(25);
	const [seconds, setSeconds] = useState(0);

	//function breakSettingHelper(cycleNumber,)
	const decrementTime = (cycleNumber, setTimerState, setCycleNumber) => {
        if (minutes === 0 && seconds === 0) { 
            setTimerState(false);
            setCycleNumber(cycleNumber + 1);
        }
		// In the case that Seconds reaches Zero
		else if (minutes !== 0 && seconds === 0) {
            setSeconds(59);
            setMinutes(minutes - 1);
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
				() => {
                    decrementTime(cycleNumber, setTimerState, setCycleNumber)
                },
				1000
			);
			return () => clearInterval(interval);
		}
	});


	// Break Handling based on Break State
	useEffect(() => {
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

    // End of Cycle Sound Handling
    useEffect(() => { 
        if (minutes === 0 && seconds === 0 && timerRunning === true) {
            if (cycleNumber % 2 === 0) {
                // lowHighChime played for breaks finishing
                new Audio(lowHighChimeSound).play()
            }
            // complete played for work finishing
            else{
                new Audio(completeSound).play()
            }
        }
		
	});


	// Timer Display Information
	let cycleDisplay = Math.ceil(cycleNumber / 2)

	return (
		<div>
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

export default Timer;
