const InteractiveButton = ({
	purpose,
	cycleState,
	onBreakState,
	timerStateChanger,
	cycleStateChanger,
	onBreakChanger,
}) => {
	// Start Button Handling
	if (purpose === "Start") {
		return <button onClick={() => timerStateChanger(true)}>Start</button>;
	}
	// Pause Button Handling
	else if (purpose === "Pause") {
		return <button onClick={() => timerStateChanger(false)}>Pause</button>;
	}
	// Skip Button Handling
	else {
		return (
			<button
				onClick={() => {
					timerStateChanger(false);
					onBreakChanger(!onBreakState);
				}}
			>
				Skip
			</button>
		);
	}
};

export default InteractiveButton;
