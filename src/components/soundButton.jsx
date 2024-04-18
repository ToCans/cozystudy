import { PiWind, PiFire, PiMoon } from "react-icons/pi";
import { IoRainyOutline } from "react-icons/io5";
import { IconContext } from "react-icons";

const SoundButton = ({ purpose, audioPlayingSetter }) => {
	// Fire Button
	if (purpose === "Fire") {
		return (
			<IconContext.Provider value={{ className: "fireButton" }}>
				<PiFire
					id="fireButton"
					className="size-12 p-1 border-solid border-2 border-slate-400 rounded-full bg-slate-100 hover:border-slate-600 "
					onClick={() => audioPlayingSetter("Fire")}
				/>
			</IconContext.Provider>
		);
	}
	// Wind Button
	else if (purpose === "Wind") {
		return (
			<IconContext.Provider value={{ className: "windButton" }}>
				<PiWind
					id="windButton"
					className="size-12 p-1 border-solid border-2 border-slate-400 rounded-full bg-slate-100  hover:border-slate-600 "
					onClick={() => audioPlayingSetter("Wind")}
				/>
			</IconContext.Provider>
		);
	}
	// Rain Button
	else if (purpose === "Rain") {
		return (
			<IconContext.Provider value={{ className: "rainButton" }}>
				<IoRainyOutline
					id="rainButton"
					className="size-12 p-1 border-solid border-2 border-slate-400 rounded-full bg-slate-100    hover:border-slate-600 "
					onClick={() => audioPlayingSetter("Rain")}
				/>
			</IconContext.Provider>
		);
	}
	// Moon Button
	else {
		return (
			<IconContext.Provider value={{ className: "moonButton" }}>
				<PiMoon
					id="moonButton"
					className="size-12  p-1 border-solid border-2 border-slate-400 rounded-full bg-slate-100  hover:border-slate-600"
					onClick={() => audioPlayingSetter("None")}
				/>
			</IconContext.Provider>
		);
	}
};

export default SoundButton;
