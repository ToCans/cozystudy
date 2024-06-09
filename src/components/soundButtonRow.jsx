import SoundButton from "./soundButton"
import SettingsContent from "./settingsContent"

import { useEffect, useState, useContext } from "react"

const SoundButtonRow = () => {
    const settings = useContext(SettingsContent)
    const [audioPlaying, setAudioPlaying] = useState("moonButton")

    // Ambient Sounds Handling
    useEffect(() => {
        if (
            !settings.fireAudio.current ||
            !settings.fireAudio.current ||
            !settings.windAudio.current ||
            !settings.rainAudio.current
        ) {
            return
        }
        // Stopping Audio Function
        const stopAllAudio = () => {
            // Fire Audio Off
            settings.fireAudio.current.pause()
            settings.fireAudio.current.currentTime = 0
            // Wind Audio Off
            settings.windAudio.current.pause()
            settings.windAudio.current.currentTime = 0
            // Rain Audio Off
            settings.rainAudio.current.pause()
            settings.rainAudio.current.currentTime = 0
        }

        function loopAudio() {
            var buffer = 0.35
            if (this.currentTime > this.duration - buffer) {
                this.currentTime = 0
                this.play()
            }
        }

        if (audioPlaying === "fireButton") {
            stopAllAudio()
            settings.fireAudio.current.volume = 0.75
            settings.fireAudio.current.play()
            settings.fireAudio.current.addEventListener("timeupdate", loopAudio, false)
        } else if (audioPlaying === "windButton") {
            stopAllAudio()
            settings.windAudio.current.play()
            settings.windAudio.current.volume = 0.7
            settings.windAudio.current.addEventListener("timeupdate", loopAudio, false)
        } else if (audioPlaying === "rainButton") {
            stopAllAudio()
            settings.rainAudio.current.volume = 0.5
            settings.rainAudio.current.play()
            settings.rainAudio.current.addEventListener("timeupdate", loopAudio, false)
        } else {
            stopAllAudio()
        }
    }, [audioPlaying, settings.fireAudio, settings.windAudio, settings.rainAudio])

    return (
        <div className="row flex flex-row justify-center w-full space-x-2 m-1">
            <SoundButton
                purpose="None"
                isActive={audioPlaying === "moonButton"}
                activeButton={audioPlaying}
                audioPlayingSetter={setAudioPlaying}
            />
            <SoundButton
                purpose="Fire"
                isActive={audioPlaying === "fireButton"}
                activeButton={audioPlaying}
                audioPlayingSetter={setAudioPlaying}
            />
            <SoundButton
                purpose="Wind"
                isActive={audioPlaying === "windButton"}
                activeButton={audioPlaying}
                audioPlayingSetter={setAudioPlaying}
            />
            <SoundButton
                purpose="Rain"
                isActive={audioPlaying === "rainButton"}
                activeButton={audioPlaying}
                audioPlayingSetter={setAudioPlaying}
            />
        </div>
    )
}

export default SoundButtonRow
