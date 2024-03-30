//import "../index.css";
import SettingsContent from "./settingsContent";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { MinusCircleIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";

const Settings = () => {
    const settings = useContext(SettingsContent);

    return (
        <div className="bg-slate-200 w-4/5 flex flex-col shadow-md rounded-lg mx-3 p-3 space-y-3 justify-center items-center">
            <h1 className="text-3xl font-semibold text-center select-none">
                Here are the settings!
            </h1>
            <div className="flex flex-row space-x-2 sm:text-2xl items-center justify-center  w-full">
                <MinusCircleIcon
                    className="size-6 sm:mt-1"
                    onClick={() => {
                        if (settings.workingMinutes > 1) {
                            settings.setWorkingMinutes(
                                settings.workingMinutes - 1
                            );
                        }
                    }}
                />
                <p className="text-center align-middle select-none">
                    Working Minutes: {settings.workingMinutes}
                </p>
                <PlusCircleIcon
                    className="size-6 sm:mt-1"
                    onClick={() =>
                        settings.setWorkingMinutes(settings.workingMinutes + 1)
                    }
                />
            </div>
            <div className="flex flex-row space-x-2 sm:text-2xl items-center justify-center  w-full">
                <MinusCircleIcon
                    className="size-6 sm:mt-1"
                    onClick={() => {
                        if (settings.shortBreakMinutes > 1) {
                            settings.setShortBreakMinutes(
                                settings.shortBreakMinutes - 1
                            );
                        }
                    }}
                />
                <p className="text-center align-middle select-none">
                    Short Break Minutes: {settings.shortBreakMinutes}
                </p>
                <PlusCircleIcon
                    className="size-6 sm:mt-1"
                    onClick={() =>
                        settings.setShortBreakMinutes(
                            settings.shortBreakMinutes + 1
                        )
                    }
                />
            </div>
            <div className="flex flex-row space-x-2 sm:text-2xl items-center justify-center  w-full">
                <MinusCircleIcon
                    className="size-6 sm:mt-1"
                    onClick={() => {
                        if (settings.longBreakMinutes > 1) {
                            settings.setLongBreakMinutes(
                                settings.longBreakMinutes - 1
                            );
                        }
                    }}
                />
                <p className="text-center align-middle select-none">
                    Long Break Minutes: {settings.longBreakMinutes}
                </p>
                <PlusCircleIcon
                    className="size-6 sm:mt-1"
                    onClick={() =>
                        settings.setLongBreakMinutes(
                            settings.longBreakMinutes + 1
                        )
                    }
                />
            </div>
        </div>
    );
};

export default Settings;
