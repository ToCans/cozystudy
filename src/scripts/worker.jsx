// worker.js
const workercode = () => {
    onmessage = function (e) {
        let interval;
        let timerRunning = e.data.timerRunning;
        let minutesRemaining = e.data.minutesRemaining;
        let secondsRemaining = e.data.secondsRemaining;

        console.log(
            "We received:",
            interval,
            timerRunning,
            minutesRemaining,
            secondsRemaining
        );

        if (timerRunning === true) {
            interval = setInterval(() => {
                // In the case that secondsRemaining reaches Zero
                if (minutesRemaining !== 0 && secondsRemaining === 0) {
                    secondsRemaining = 59;
                    minutesRemaining = minutesRemaining - 1;
                }
                // Timer decreases secondsRemaining by one
                else {
                    secondsRemaining = secondsRemaining - 1;
                }
                postMessage({
                    minutesRemaining: minutesRemaining,
                    secondsRemaining: secondsRemaining,
                });
            }, 1000);
        }

        if (timerRunning === false) {
            clearInterval(interval);
        }
    };
};

let code = workercode.toString();
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));

const blob = new Blob([code], { type: "application/javascript" });
const worker_script = URL.createObjectURL(blob);

module.exports = worker_script;
