import ProgressBar from "react-bootstrap/ProgressBar";

const ProgressBarTest = ({ progressBarValue }) => {
    return <ProgressBar className="progressBar" now={progressBarValue} />;
};

export default ProgressBarTest;
