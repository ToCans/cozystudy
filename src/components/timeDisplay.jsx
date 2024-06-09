import SettingsContent from "./settingsContent"
import { useContext } from "react"

const TimeDisplay = ({ minutes, seconds, formatTime }) => {
    // Setting Context used
    const settings = useContext(SettingsContent)
    const time = formatTime(minutes, seconds)

    return (
        <p
            className="sm:text-9xl text-center text-8xl m-1 select-none opacity-100"
            style={{
                color: `${settings.themes[settings.themeIndex].timerTextColor}`,
            }}
        >
            {time}
        </p>
    )
}

export default TimeDisplay
