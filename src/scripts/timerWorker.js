// worker.js

const workercode = () => {
    let active = false;
    let interval;

    // On Message Handling from Timer
    onmessage = function (e) {
        console.log("Worker Received a message of:", e.data);
        let minutesRemaining = e.data.minutesRemaining;
        let secondsRemaining = e.data.secondsRemaining;

        // Timer Running Handling
        if (e.data.timerRunning === true && active === false) {
            active = true;
            interval = setInterval(() => {
                // 0 and -1 used as we want to show 0:00 in the timer display
                if (minutesRemaining === 0 && secondsRemaining === -1) {
                    clearInterval(interval);
                }
                // In the case that secondsRemaining reaches Zero
                else if (minutesRemaining !== 0 && secondsRemaining === 0) {
                    secondsRemaining = 59;
                    minutesRemaining = minutesRemaining - 1;
                    postMessage({
                        minutesRemaining: minutesRemaining,
                        secondsRemaining: secondsRemaining,
                    });
                }
                // Timer decreases secondsRemaining by one
                else {
                    secondsRemaining = secondsRemaining - 1;
                    postMessage({
                        minutesRemaining: minutesRemaining,
                        secondsRemaining: secondsRemaining,
                    });
                }
            }, 1000);
        }
        // Timer Stop Handling
        else {
            active = false;
            clearInterval(interval);
        }
    };
};

// Using Blob object for making worker
let code = workercode.toString();
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));
const blob = new Blob([code], { type: "application/javascript" });
const worker_script = URL.createObjectURL(blob);

module.exports = worker_script;
