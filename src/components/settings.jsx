//import "../index.css";
import SettingsContent from "./settingsContent";
import {
    HiOutlinePlusCircle,
    HiOutlineMinusCircle,
    HiOutlineArrowCircleLeft,
    HiOutlineArrowCircleRight,
} from "react-icons/hi";

import { useContext } from "react";

const Settings = () => {
    const settings = useContext(SettingsContent);

    return (
        <div className="bg-slate-200 w-4/5 flex flex-col shadow-md rounded-lg mx-3 p-3 space-y-3 justify-center items-center opacity-90">
            <h1 className="text-3xl font-semibold text-center select-none">
                Here are the settings!
            </h1>
            <div className="flex flex-row space-x-2 sm:text-2xl items-center justify-center  w-full">
                <HiOutlineMinusCircle
                    className="size-6 sm:mt-1 hover:stroke-slate-600"
                    onClick={() => {
                        if (settings.workingMinutes > 1) {
                            settings.setWorkingMinutes(
                                settings.workingMinutes - 1
                            );
                        }
                    }}
                />
                <p className="text-center align-middle select-none w-2/5">
                    Working Minutes: {settings.workingMinutes}
                </p>
                <HiOutlinePlusCircle
                    className="size-6 sm:mt-1 hover:stroke-slate-600"
                    onClick={() =>
                        settings.setWorkingMinutes(settings.workingMinutes + 1)
                    }
                />
            </div>
            <div className="flex flex-row space-x-2 sm:text-2xl items-center justify-center  w-full">
                <HiOutlineMinusCircle
                    className="size-6 sm:mt-1 hover:stroke-slate-600"
                    onClick={() => {
                        if (settings.shortBreakMinutes > 1) {
                            settings.setShortBreakMinutes(
                                settings.shortBreakMinutes - 1
                            );
                        }
                    }}
                />
                <p className="text-center align-middle select-none w-2/5">
                    Short Break Minutes: {settings.shortBreakMinutes}
                </p>
                <HiOutlinePlusCircle
                    className="size-6 sm:mt-1 hover:stroke-slate-600"
                    onClick={() =>
                        settings.setShortBreakMinutes(
                            settings.shortBreakMinutes + 1
                        )
                    }
                />
            </div>
            <div className="flex flex-row space-x-2 sm:text-2xl items-center justify-center w-full">
                <HiOutlineMinusCircle
                    className="size-6 sm:mt-1 hover:stroke-slate-600"
                    onClick={() => {
                        if (settings.longBreakMinutes > 1) {
                            settings.setLongBreakMinutes(
                                settings.longBreakMinutes - 1
                            );
                        }
                    }}
                />
                <p className="text-center align-middle select-none w-2/5">
                    Long Break Minutes: {settings.longBreakMinutes}
                </p>
                <HiOutlinePlusCircle
                    className="size-6 sm:mt-1 hover:stroke-slate-600"
                    onClick={() =>
                        settings.setLongBreakMinutes(
                            settings.longBreakMinutes + 1
                        )
                    }
                />
            </div>
            <div className="flex flex-row space-x-2 sm:text-2xl items-center justify-center w-full">
                <HiOutlineArrowCircleLeft
                    className="size-6 sm:mt-1 hover:stroke-slate-600"
                    onClick={() => {
                        if (settings.backgroundImageIndex > 0) {
                            settings.setBackgroundImageIndex(
                                settings.backgroundImageIndex - 1
                            );
                        } else {
                            settings.setBackgroundImageIndex(
                                settings.backgroundImages.length - 1
                            );
                        }
                    }}
                />
                <p className="text-center align-middle select-none w-2/5">
                    Background Image:
                    {
                        settings.backgroundImageNames[
                            settings.backgroundImageIndex
                        ]
                    }
                </p>
                <HiOutlineArrowCircleRight
                    className="size-6 sm:mt-1 hover:stroke-slate-600"
                    onClick={() => {
                        if (
                            settings.backgroundImageIndex <
                            settings.backgroundImages.length - 1
                        ) {
                            settings.setBackgroundImageIndex(
                                settings.backgroundImageIndex + 1
                            );
                        } else {
                            settings.setBackgroundImageIndex(0);
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default Settings;
