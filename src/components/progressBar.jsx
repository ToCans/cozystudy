const ProgressBar = ({ progressBarValue }) => {
    return (
        <div className="w-full bg-slate-300 rounded-full h-2.5 m-1">
            <div
                className="bg-blue-400 h-2.5 rounded-full"
                style={{ width: `${progressBarValue}%` }}
            ></div>
        </div>
    );
};

export default ProgressBar;
