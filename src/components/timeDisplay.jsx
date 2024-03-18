const TimeDisplay = ({ minutes, seconds }) => {
    const formattingCheck = (minutes, seconds) => {
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
        <p className="text-9xl">
            {timer[0]}:{timer[1]}
        </p>
    );
};

export default TimeDisplay;
