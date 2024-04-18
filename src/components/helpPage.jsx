import SettingsContent from "./settingsContent";
import { useContext } from "react";

const HelpPage = () => {
	const settings = useContext(SettingsContent);

	return (
		<div
			className="bg-slate-200 w-4/5 h-fit flex flex-col shadow-md rounded-lg mx-3 p-3 justify-center items-center opacity-95"
			style={{
				backgroundColor: `${settings.timerTheme[settings.themeIndex]}`,
			}}
		>
			This is the help page!
		</div>
	);
};

export default HelpPage;
