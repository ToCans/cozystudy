import SettingsContent from "./settingsContent"
import { useContext } from "react"

const HelpPage = () => {
    const settings = useContext(SettingsContent)

    return (
        <div
            className="bg-slate-200 w-4/5 h-fit flex flex-row shadow-md rounded-lg p-3 justify-center items-center opacity-95 space-x-8"
            style={{
                backgroundColor: `${settings.themes[settings.themeIndex].timerColor}`,
            }}
        >
            <div className="w-1/2 h-full flex justify-center items-center">
                <ul
                    style={{
                        color: `${settings.themes[settings.themeIndex].timerTextColor}`,
                    }}
                >
                    <p className="text-xl">Written by:</p>
                    <li>
                        <a
                            href="https://github.com/ToCans"
                            className={settings.themes[settings.themeIndex].textColorHover}
                        >
                            Tom
                        </a>
                    </li>
                </ul>
            </div>

            <div className="w-1/2 h-full flex justify-center items-center">
                <ul
                    style={{
                        color: `${settings.themes[settings.themeIndex].timerTextColor}`,
                    }}
                >
                    <p className="text-xl">Images from:</p>
                    <li>
                        <a
                            href="https://unsplash.com/@alexdeloy"
                            className={settings.themes[settings.themeIndex].textColorHover}
                        >
                            Alexander Psiuk
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://unsplash.com/@eberhardgross"
                            className={settings.themes[settings.themeIndex].textColorHover}
                        >
                            EberHard Grossgasteiger
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://unsplash.com/@mosdesign"
                            className={settings.themes[settings.themeIndex].textColorHover}
                        >
                            Mos Design
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://unsplash.com/@marekokon"
                            className={settings.themes[settings.themeIndex].textColorHover}
                        >
                            Marek Okon
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://unsplash.com/@joyce_"
                            className={settings.themes[settings.themeIndex].textColorHover}
                        >
                            Joyce G
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default HelpPage
