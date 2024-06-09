import { PiWind, PiFire, PiMoon } from "react-icons/pi"
import { IoRainyOutline } from "react-icons/io5"
import { IconContext } from "react-icons"

const SoundButton = ({ purpose, isActive, activeButton, audioPlayingSetter }) => {
    let classNames =
        "size-12 p-1 border-solid border-2 rounded-full bg-slate-100 border-slate-400 hover:border-slate-500 opacity-100"

    const styleButtonObject = {
        moonButton: "#f7e877",
        fireButton: "#ea580c",
        windButton: "#1db957",
        rainButton: "#60a5fa",
    }

    if (isActive) {
        classNames = classNames.replace("border-slate-400", "border-slate-500")
    }

    const buttonStyle = isActive ? { color: styleButtonObject[activeButton] } : {}

    // Fire Button
    if (purpose === "Fire") {
        return (
            <IconContext.Provider value={{ className: "fireButton" }}>
                <PiFire
                    id="fireButton"
                    className={classNames}
                    style={buttonStyle}
                    onClick={() => audioPlayingSetter("fireButton")}
                />
            </IconContext.Provider>
        )
    }
    // Wind Button
    else if (purpose === "Wind") {
        return (
            <IconContext.Provider value={{ className: "windButton" }}>
                <PiWind
                    id="windButton"
                    className={classNames}
                    style={buttonStyle}
                    onClick={() => audioPlayingSetter("windButton")}
                />
            </IconContext.Provider>
        )
    }
    // Rain Button
    else if (purpose === "Rain") {
        return (
            <IconContext.Provider value={{ className: "rainButton" }}>
                <IoRainyOutline
                    id="rainButton"
                    className={classNames}
                    style={buttonStyle}
                    onClick={() => audioPlayingSetter("rainButton")}
                />
            </IconContext.Provider>
        )
    }
    // Moon Button
    else {
        return (
            <IconContext.Provider value={{ className: "moonButton" }}>
                <PiMoon
                    id="moonButton"
                    className={classNames}
                    style={buttonStyle}
                    onClick={() => audioPlayingSetter("moonButton")}
                />
            </IconContext.Provider>
        )
    }
}

export default SoundButton
