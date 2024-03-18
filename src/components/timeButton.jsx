const InteractiveButton = ({
    purpose,
    cycleState,
    timerStateChanger,
    cycleStateChanger,
}) => {
    // Start Button Handling
    if (purpose === "Start") {
        return (
            <button
                onClick={() => {
                    console.log("Start Button Clicked");
                    timerStateChanger(true);
                }}
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
                    console.log("Pause Button Clicked");
                    timerStateChanger(false);
                }}
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
                    console.log("Stop Button Clicked");
                    timerStateChanger(false);
                    cycleStateChanger(cycleState + 1);
                }}
            >
                Skip
            </button>
        );
    }
};

export default InteractiveButton;
