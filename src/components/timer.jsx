import { useState, useEffect, useContext, useRef } from "react"
import TimeDisplay from "./timeDisplay"
import ProgressBar from "./progressBar"
import InteractiveButton from "./timeButton"
import SettingsContent from "./settingsContent"
import SoundButtonRow from "./soundButtonRow"

function Timer() {
    const settings = useContext(SettingsContent)
    const [timerRunning, setTimerRunning] = useState(false)
    const [minutesRemaining, setMinutesRemaining] = useState(settings.workingMinutes)
    const [secondsRemaining, setSecondsRemaining] = useState(0)
    const [progressBarValue, setProgressBarValue] = useState(0)
    const progressBarTotalRef = useRef(settings.workingMinutes * 60)
    const minutesRemainingRef = useRef(minutesRemaining)
    const secondsRemainingRef = useRef(secondsRemaining)

    // Running Timer from Web Worker
    useEffect(() => {
        if (!settings.timerWorker.current) {
            return
        }

        settings.timerWorker.current.onmessage = (e) => {
            if (e.data.minutesRemaining === 0 && e.data.secondsRemaining === -1) {
                setTimerRunning(false)
                settings.setCycleNumber(settings.cycleNumber + 1)
            } else {
                //setTimerRunning(true)
                minutesRemainingRef.current = e.data.minutesRemaining
                secondsRemainingRef.current = e.data.secondsRemaining
                setMinutesRemaining(minutesRemainingRef.current)
                setSecondsRemaining(secondsRemainingRef.current)
            }
        }
    }, [settings])

    // For Showing Timer in Tab Info
    useEffect(() => {
        if (settings.showTabTimer === true) {
            document.title = `${settings.formatTime(
                minutesRemaining,
                secondsRemaining
            )} - CozyStudy`
        } else {
            document.title = "CozyStudy"
        }
    }, [minutesRemaining, secondsRemaining, settings])

    // Progress Bar Value Update
    useEffect(() => {
        let calculatedProgressBarValue =
            (1 - (minutesRemaining * 60 + secondsRemaining) / progressBarTotalRef.current) * 100
        setProgressBarValue(calculatedProgressBarValue)
    }, [minutesRemaining, secondsRemaining, progressBarTotalRef])

    // Timer Count set from Break Handling and Settings change
    useEffect(() => {
        if (settings.cycleNumber % 8 === 0) {
            setSecondsRemaining(0)
            setMinutesRemaining(settings.longBreakMinutes)
            progressBarTotalRef.current = settings.longBreakMinutes * 60
        } else if (settings.cycleNumber % 2 === 0) {
            setSecondsRemaining(0)
            setMinutesRemaining(settings.shortBreakMinutes)
            progressBarTotalRef.current = settings.shortBreakMinutes * 60
        } else {
            setSecondsRemaining(0)
            setMinutesRemaining(settings.workingMinutes)
            progressBarTotalRef.current = settings.workingMinutes * 60
        }
    }, [
        settings.cycleNumber,
        settings.longBreakMinutes,
        settings.shortBreakMinutes,
        settings.workingMinutes,
    ])

    // End of Cycle Sound Handling
    useEffect(() => {
        if (minutesRemainingRef.current === 0 && secondsRemainingRef.current === 0) {
            if (settings.cycleNumber % 2 === 0) {
                settings.breakFinishAudio.current.volume = 0.5
                settings.breakFinishAudio.current.play()
            } else {
                settings.workFinishAudio.current.volume = 0.5
                settings.workFinishAudio.current.play()
            }
        }
    }, [timerRunning, settings.cycleNumber, settings.breakFinishAudio, settings.workFinishAudio])

    let cycleDisplay = Math.ceil(settings.cycleNumber / 2)

    return (
        <div
            className="bg-slate-200 w-4/5 h-fit flex flex-col shadow-md rounded-lg mx-3 p-3 justify-center items-center opacity-95"
            style={{
                backgroundColor: `${settings.themes[settings.themeIndex].timerColor}`,
            }}
        >
            <TimeDisplay
                minutes={minutesRemaining}
                seconds={secondsRemaining}
                formatTime={settings.formatTime}
            />
            <ProgressBar progressBarValue={progressBarValue} />
            <div className="row flex flex-row justify-center w-full">
                <InteractiveButton
                    purpose="Start"
                    minutesRemaining={minutesRemaining}
                    secondsRemaining={secondsRemaining}
                />
                <InteractiveButton
                    purpose="Pause"
                    minutesRemaining={minutesRemaining}
                    secondsRemaining={secondsRemaining}
                />
                <InteractiveButton
                    purpose="Skip"
                    minutesRemaining={minutesRemaining}
                    secondsRemaining={secondsRemaining}
                />
            </div>
            <SoundButtonRow />
            <p className="sm:text-xl text-center select-none">Current Cycle: {cycleDisplay}</p>
        </div>
    )
}

export default Timer
