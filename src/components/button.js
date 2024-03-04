const InteractiveButton = ({
	purpose,
	cycleState,
	timerStateChanger,
	cycleStateChanger,
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
					cycleStateChanger(cycleState + 1)
				}}
			>
				Skip
			</button>
		);
	}
};

export default InteractiveButton;
