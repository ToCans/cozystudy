import { PiWind, PiFire, PiMoon } from "react-icons/pi";
import { IoRainyOutline } from "react-icons/io5";

const SoundButton = ({ purpose, audioPlayingSetter }) => {
    // Fire Button
    if (purpose === "Fire") {
        return (
            <PiFire
                id="fireButton"
                className="size-12 p-1 border-solid border-2 border-slate-400 rounded-full stroke-1 stroke-slate-700  hover:stroke-2 hover:border-slate-600 hover:stroke-red-600"
                onClick={() => audioPlayingSetter("Fire")}
            />
        );
    }
    // Wind Button
    else if (purpose === "Wind") {
        return (
            <PiWind
                id="windButton"
                className="size-12 p-1 border-solid border-2 border-slate-400 rounded-full  stroke-1 stroke-slate-700 hover:stroke-2 hover:border-slate-600 hover:stroke-green-500"
                onClick={() => audioPlayingSetter("Wind")}
            />
        );
    }
    // Rain Button
    else if (purpose === "Rain") {
        return (
            <IoRainyOutline
                id="rainButton"
                className="size-12 p-1 border-solid border-2 border-slate-400 rounded-full stroke-1 stroke-slate-700  hover:stroke-2 hover:border-slate-600 hover:stroke-blue-600"
                onClick={() => audioPlayingSetter("Rain")}
            />
        );
    }
    // Moon Button
    else {
        return (
            <PiMoon
                id="moonButton"
                className="size-12  p-1 border-solid border-2 border-slate-400 rounded-full stroke-1 hover:stroke-2 hover:border-slate-600 hover:stroke-amber-00"
                onClick={() => audioPlayingSetter("None")}
            />
        );
    }
};

export default SoundButton;
