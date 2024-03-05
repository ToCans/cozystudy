import "./index.css"
import gearIcon from "./assets/icons/gear-svgrepo-com.svg"
import Timer from "./components/timer";
import Settings from "./components/settings";

import { useState } from "react";

function App() {

	const [showSettings,setShowSettings] = useState(false);

	const settingsToggle = () => {
		setShowSettings(!showSettings)
	}
	
	return (
		<div className="app">
			<img src={gearIcon} onClick={settingsToggle} alt="Gear Icon for Settings" />
			{showSettings === false?<Timer />:<Settings/>}
			
			
		</div>
	);
}

export default App;
