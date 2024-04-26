import { useContext } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { IconContext } from "react-icons";
import SettingsContent from "./settingsContent";

const Notification = () => {
    const settings = useContext(SettingsContent);
    return (
        <div className="bg-slate-200 flex justify-center items-center text-center opacity-95 rounded-xl m-1 p-2 w-fit mx-auto">
            <p className="text-base">
                Using Mobile? Use desktop for best performance. Mobile app
                coming soon.
            </p>
            <IconContext.Provider value={{ className: "closeButton" }}>
                <IoCloseOutline
                    className="size-8 m-1"
                    onClick={() => {
                        settings.setIsMobile(false);
                    }}
                />
            </IconContext.Provider>
        </div>
    );
};

export default Notification;
