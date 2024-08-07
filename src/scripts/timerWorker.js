// worker.js

const workercode = () => {
    console.log("Worker Created!")
    let active = false
    let interval

    // On Message Handling from Timer
    onmessage = function (e) {
        // Defining Receiveed Data
        let minutesRemaining = e.data.minutesRemaining
        let secondsRemaining = e.data.secondsRemaining

        // Timer Running Handling
        if (e.data.timerRunning === true && active === false) {
            active = true
            interval = setInterval(() => {
                // 0 and -1 used as we want to show 0:00 in the timer display
                if (minutesRemaining === 0 && secondsRemaining === -1) {
                    active = false
                    clearInterval(interval)
                }
                // In the case that secondsRemaining reaches Zero
                else if (minutesRemaining !== 0 && secondsRemaining === 0) {
                    secondsRemaining = 59
                    minutesRemaining = minutesRemaining - 1
                    postMessage({
                        minutesRemaining: minutesRemaining,
                        secondsRemaining: secondsRemaining,
                    })
                }
                // Timer decreases secondsRemaining by one
                else {
                    secondsRemaining = secondsRemaining - 1
                    postMessage({
                        minutesRemaining: minutesRemaining,
                        secondsRemaining: secondsRemaining,
                    })
                }
            }, 1000)
        }
        // Timer Stop Handling
        else {
            active = false
            clearInterval(interval)
        }
    }
}

// Using Blob object for making worker
let code = workercode.toString()
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"))
const blob = new Blob([code], { type: "application/javascript" })
const worker_script = URL.createObjectURL(blob)

module.exports = worker_script
