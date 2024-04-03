import { PiWindLight, PiFireLight, PiMoonLight } from "react-icons/pi";
import { IoRainyOutline } from "react-icons/io5";

const SoundButton = ({ purpose, audioPlayingSetter }) => {
	// Fire Button
	if (purpose === "Fire") {
		return (
			<PiFireLight
				id="fireButton"
				className="size-12 p-1 border-solid border-2 border-slate-400 rounded-full stroke-1 active:stroke-2 active:border-slate-600"
				onClick={() => audioPlayingSetter("Fire")}
			/>
		);
	}
	// Wind Button
	else if (purpose === "Wind") {
		return (
			<PiWindLight
				id="windButton"
				className="size-12 p-1 border-solid border-2 border-slate-400 rounded-full stroke-1 active:stroke-2 active:border-slate-600"
				onClick={() => audioPlayingSetter("Wind")}
			/>
		);
	}
	// Rain Button
	else if (purpose === "Rain") {
		return (
			<IoRainyOutline
				id="rainButton"
				className="size-12 p-1 border-solid border-2 border-slate-400 rounded-full stroke-1 active:stroke-2 active:border-slate-600"
				onClick={() => audioPlayingSetter("Rain")}
			/>
		);
	}
	// Moon Button
	else {
		return (
			<PiMoonLight
				id="moonButton"
				className="size-12  p-1 border-solid border-2 border-slate-400 rounded-full stroke-1 active:stroke-2 active:border-slate-600"
				onClick={() => audioPlayingSetter("None")}
			/>
		);
	}
};

export default SoundButton;
