import SettingsContent from "./settingsContent";
import { useContext } from "react";

const ProgressBar = ({ progressBarValue }) => {
    // Setting Context used
    const settings = useContext(SettingsContent);

    return (
        <div className="w-4/5 bg-slate-300 rounded-full h-2.5 m-1">
            <div
                className="bg-blue-400 h-2.5 rounded-full"
                style={{
                    width: `${progressBarValue}%`,
                    backgroundColor: `${
                        settings.themes[settings.themeIndex].buttonProgressColor
                    }`,
                }}
            ></div>
        </div>
    );
};

export default ProgressBar;
