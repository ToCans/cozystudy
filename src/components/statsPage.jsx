import SettingsContent from "./settingsContent"
import { useContext } from "react"

const StatsPage = () => {
    const settings = useContext(SettingsContent)

    // Gathering the ending for the day
    function getOrdinalSuffix(day) {
        if (day > 3 && day < 21) return "th"
        switch (day % 10) {
            case 1:
                return "st"
            case 2:
                return "nd"
            case 3:
                return "rd"
            default:
                return "th"
        }
    }

    // Date Formatting
    function formatDate(date) {
        const options = { month: "long", year: "numeric", day: "numeric" }
        const day = date.getDate()
        const dayWithSuffix = day + getOrdinalSuffix(day)

        return date.toLocaleDateString("en-US", options).replace(day, dayWithSuffix)
    }

    const currentDate = new Date()
    const formattedDate = formatDate(currentDate)

    return (
        <div
            className="bg-slate-200 w-4/5 h-fit flex flex-row shadow-md rounded-lg p-3 justify-center items-center opacity-95 space-x-2"
            style={{
                backgroundColor: `${settings.themes[settings.themeIndex].timerColor}`,
            }}
        >
            <div className="h-full flex justify-center items-center">
                <ul
                    style={{
                        color: `${settings.themes[settings.themeIndex].timerTextColor}`,
                    }}
                >
                    <p className="text-xl">{formattedDate} Statistics:</p>
                    <li>Working Cycles Completed: {settings.workingCyclesCompleted.current}</li>
                    <li>Working Minutes Completed: {settings.workingMinutesCompleted.current}</li>
                </ul>
            </div>
        </div>
    )
}

export default StatsPage
