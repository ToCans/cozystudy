import "./index.css"
import { Analytics } from "@vercel/analytics/react"
import { PiGearLight, PiQuestionLight, PiChartBarLight } from "react-icons/pi"
import { IconContext } from "react-icons"
import { useState, useRef, useEffect, useMemo } from "react"

import JapaneseHome from "./assets/backgrounds/JapaneseHome.jpg"
import JapaneseHomeSmall from "./assets/backgrounds/JapaneseHomeSmall.jpg"
import DesertSunset from "./assets/backgrounds/DesertSunset.jpg"
import DesertSunsetSmall from "./assets/backgrounds/DesertSunsetSmall.jpg"
import Shibuya from "./assets/backgrounds/Shibuya.jpg"
import ShibuyaSmall from "./assets/backgrounds/ShibuyaSmall.jpg"
import WinterForest from "./assets/backgrounds/WinterForest.jpg"
import WinterForestSmall from "./assets/backgrounds/WinterForestSmall.jpg"
import WinterMountain from "./assets/backgrounds/WinterMountain.jpg"
import WinterMountainSmall from "./assets/backgrounds/WinterMountainSmall.jpg"
import Timer from "./components/timer"
import PhotoCredit from "./components/photoCredit.jsx"
import Settings from "./components/settings"
import StatsPage from "./components/statsPage.jsx"
import HelpPage from "./components/helpPage.jsx"
import SettingsContent from "./components/settingsContent"
import Notification from "./components/notification.jsx"
import timerWorkerScript from "./scripts/timerWorker.js"
import breakFinishAudioClip from "./assets/sounds/complete.mp3"
import workFinishAudioClip from "./assets/sounds/lowHighChime.mp3"
import campfireAudioLoop from "./assets/sounds/campfireLoop.mp3"
import windAudioLoop from "./assets/sounds/windLoop.mp3"
import rainAudioLoop from "./assets/sounds/rainLoop.mp3"

function App() {
    // Default States
    const [activePage, setActivePage] = useState("Timer")
    const [cycleNumber, setCycleNumber] = useState(1)
    const [imageLoaded, setImageLoaded] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    // Checking Local Storage Function
    const checkLocalStorage = (checkFor, defaultValue) => {
        const checker = localStorage.getItem(checkFor)
        return checker !== null ? JSON.parse(checker) : defaultValue
    }

    // Local Storage States
    const [showTabTimer, setTabTimer] = useState(() => {
        return checkLocalStorage("showTabTimer", true)
    })

    const [workingMinutes, setWorkingMinutes] = useState(() => {
        return checkLocalStorage("workingMinutes", 25)
    })

    const [shortBreakMinutes, setShortBreakMinutes] = useState(() => {
        return checkLocalStorage("shortBreakMinutes", 5)
    })

    const [longBreakMinutes, setLongBreakMinutes] = useState(() => {
        return checkLocalStorage("longBreakMinutes", 15)
    })

    const [backgroundImageIndex, setBackgroundImageIndex] = useState(() => {
        return checkLocalStorage("backgroundImageIndex", 0)
    })

    const [themeIndex, setThemeIndex] = useState(() => {
        return checkLocalStorage("themeIndex", 0)
    })

    // Refernces for cookies
    const workingMinutesCompleted = useRef(0)
    const workingCyclesCompleted = useRef(0)

    // Audio and Webworker Definitions
    const breakFinishAudio = useRef(null)
    const workFinishAudio = useRef(null)
    const fireAudio = useRef(null)
    const windAudio = useRef(null)
    const rainAudio = useRef(null)

    // Reference for webworker
    const timerWorker = useRef(null)

    // Initialization
    useEffect(() => {
        timerWorker.current = new Worker(timerWorkerScript)
        breakFinishAudio.current = new Audio(breakFinishAudioClip)
        workFinishAudio.current = new Audio(workFinishAudioClip)
        fireAudio.current = new Audio(campfireAudioLoop)
        windAudio.current = new Audio(windAudioLoop)
        rainAudio.current = new Audio(rainAudioLoop)

        // Cleanup function to terminate the worker when the component unmounts
        return () => {
            timerWorker.current.terminate()
        }
    }, [])

    // Themes
    const backgrounds = useMemo(
        () => [
            {
                name: " Shibuya",
                image: Shibuya,
                smallImage: ShibuyaSmall,
                photographer: "Mos Design",
                portfolio: "https://unsplash.com/@mosdesign",
            },
            {
                name: " Winter Mountain",
                image: WinterMountain,
                smallImage: WinterMountainSmall,
                photographer: "EberHard Grossgasteiger",
                portfolio: "https://unsplash.com/@eberhardgross",
            },
            {
                name: " Japanese Home",
                image: JapaneseHome,
                smallImage: JapaneseHomeSmall,
                photographer: "Marek Okon",
                portfolio: "https://unsplash.com/@marekokon",
            },

            {
                name: " Desert Sunset",
                image: DesertSunset,
                smallImage: DesertSunsetSmall,
                photographer: "Alexander Psiuk",
                portfolio: "https://unsplash.com/@alexdeloy",
            },
            {
                name: " Winter Forest",
                image: WinterForest,
                smallImage: WinterForestSmall,
                photographer: "Joyce G",
                portfolio: "https://unsplash.com/@joyce_",
            },
        ],
        []
    )

    // Theme Definitions
    const themes = [
        {
            name: " Default",
            timerColor: "#e2e8f0",
            timerTextColor: "#1e293b",
            textColorHover: "hover:text-gray-400",
            buttonProgressColor: "#60a5fa",
        },
        {
            name: " Coffee",
            timerColor: "#fef3c7",
            timerTextColor: "#1e293b",
            textColorHover: "hover:text-gray-400",
            buttonProgressColor: "#92400e",
        },
        {
            name: " Indigo",
            timerColor: "#a5b4fc",
            timerTextColor: "#f8fafc",
            textColorHover: "hover:text-gray-300",
            buttonProgressColor: "#6366f1",
        },
    ]

    // Time formatting function
    const formatTime = (minutes, seconds) => {
        let timerMinutes
        let timerSeconds
        let timerDisplay

        // Timer Display
        if (minutes < 10) {
            timerMinutes = `0${minutes}`
        } else {
            timerMinutes = minutes
        }

        if (seconds < 10) {
            timerSeconds = `0${seconds}`
        } else {
            timerSeconds = seconds
        }

        timerDisplay = `${timerMinutes}:${timerSeconds}`

        return timerDisplay
    }

    // Image Loading Handler

    useEffect(() => {
        setImageLoaded(false)
        const img = new Image()
        img.src = backgrounds[backgroundImageIndex].image
        img.alt = backgrounds[backgroundImageIndex].name
        img.onload = () => {
            setImageLoaded(true)
        }
    }, [backgroundImageIndex, backgrounds])

    // Checking for Mobile Usage
    useEffect(() => {
        const userAgent = navigator.userAgent.toLowerCase()
        setIsMobile(/iphone|ipad|android/.test(userAgent))
    }, [])

    return (
        <div className=" h-screen w-screen ">
            <SettingsContent.Provider
                value={{
                    showTabTimer,
                    workingMinutes,
                    shortBreakMinutes,
                    longBreakMinutes,
                    cycleNumber,
                    timerWorker,
                    breakFinishAudio,
                    workFinishAudio,
                    fireAudio,
                    windAudio,
                    rainAudio,
                    backgroundImageIndex,
                    themeIndex,
                    backgrounds,
                    themes,
                    isMobile,
                    workingMinutesCompleted,
                    workingCyclesCompleted,
                    formatTime,
                    setTabTimer,
                    setWorkingMinutes,
                    setShortBreakMinutes,
                    setLongBreakMinutes,
                    setCycleNumber,
                    setBackgroundImageIndex,
                    setThemeIndex,
                    setIsMobile,
                }}
            >
                <div className="flex flex-col top-0 absolute w-full h-fit z-10">
                    <div className="flex flex-row justify-end">
                        <IconContext.Provider value={{ className: "topBarButton" }}>
                            <PiQuestionLight
                                className="size-12"
                                alt="Question Mark Icon for Questions"
                                onClick={() => {
                                    if (activePage !== "HelpPage") {
                                        setActivePage("HelpPage")
                                    } else {
                                        setActivePage("Timer")
                                    }

                                    timerWorker.current.postMessage({
                                        timerRunning: false,
                                        minutesRemaining: null,
                                        secondsRemaining: null,
                                    })
                                }}
                            />
                        </IconContext.Provider>
                        <IconContext.Provider value={{ className: "topBarButton" }}>
                            <PiChartBarLight
                                className="size-12 "
                                alt="Chart Icon for Statistics"
                                onClick={() => {
                                    if (activePage !== "Stats") {
                                        setActivePage("Stats")
                                    } else {
                                        setActivePage("Timer")
                                    }

                                    timerWorker.current.postMessage({
                                        timerRunning: false,
                                        minutesRemaining: null,
                                        secondsRemaining: null,
                                    })
                                }}
                            />
                        </IconContext.Provider>
                        <IconContext.Provider value={{ className: "topBarButton" }}>
                            <PiGearLight
                                className="size-12 "
                                alt="Gear Icon for Settings"
                                onClick={() => {
                                    if (activePage !== "Settings") {
                                        setActivePage("Settings")
                                    } else {
                                        setActivePage("Timer")
                                    }

                                    timerWorker.current.postMessage({
                                        timerRunning: false,
                                        minutesRemaining: null,
                                        secondsRemaining: null,
                                    })
                                }}
                            />
                        </IconContext.Provider>
                    </div>
                    {isMobile === true ? <Notification /> : null}
                </div>

                <div
                    className={"bg-no-repeat bg-cover bg-center h-full overscroll-none"}
                    style={{
                        backgroundImage: imageLoaded
                            ? `url(${backgrounds[backgroundImageIndex].image})`
                            : `url(${backgrounds[backgroundImageIndex].smallImage}`,
                        backdropFilter: imageLoaded ? "none" : `blur(16px)`,
                    }}
                >
                    <div className="flex flex-col justify-center items-center w-full h-full">
                        {activePage === "Settings" ? <Settings /> : null}
                        {activePage === "Stats" ? <StatsPage /> : null}
                        {activePage === "HelpPage" ? <HelpPage /> : null}
                        {activePage === "Timer" ? <Timer /> : null}
                    </div>

                    <PhotoCredit
                        photographer={backgrounds[backgroundImageIndex].photographer}
                        portfolio={backgrounds[backgroundImageIndex].portfolio}
                    />
                </div>
            </SettingsContent.Provider>
            <Analytics />
        </div>
    )
}

export default App
