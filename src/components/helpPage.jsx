import SettingsContent from "./settingsContent";
import { useContext } from "react";

const HelpPage = () => {
    const settings = useContext(SettingsContent);

    return (
        <div
            className="bg-slate-200 w-4/5 h-fit flex flex-col shadow-md rounded-lg mx-3 p-3 justify-center items-center opacity-95"
            style={{
                backgroundColor: `${
                    settings.themes[settings.themeIndex].timerColor
                }`,
            }}
        >
            <ul
                style={{
                    color: `${
                        settings.themes[settings.themeIndex].timerTextColor
                    }`,
                }}
            >
                <p className="text-xl">Images from:</p>
                <li>
                    <a href="https://unsplash.com/@m_d_adventures">
                        Matej Dhra
                    </a>
                </li>
                <li>
                    <a href="https://unsplash.com/@alexdeloy">
                        Alexander Psiuk
                    </a>
                </li>
                <li>
                    <a href="https://unsplash.com/@eberhardgross">
                        EberHard Grossgasteiger
                    </a>
                </li>
                <li>
                    <a href="https://unsplash.com/@mosdesign">Mos Design</a>
                </li>
                <li>Marek Okon</li>
                <li>
                    <a href="https://unsplash.com/@joyce_">Joyce G</a>
                </li>
                <li>
                    <a href="https://unsplash.com/@joshuakettle">
                        Joshua Kettle
                    </a>
                </li>
                <li>
                    <a href="https://unsplash.com/@beckerworks">David Becker</a>
                </li>
                <li>
                    <a href="https://unsplash.com/@marekokon">Marek Okon</a>
                </li>
            </ul>
        </div>
    );
};

export default HelpPage;
