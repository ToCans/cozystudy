import React, { useEffect } from "react";

const AdSense = ({ dataAdSlot }) => {
    useEffect(() => {
        setTimeout(() => {
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {
                console.log("Error", e);
            }
        }, 3000);
    }, []);

    return (
        <div className=" bottom-2 flex justify-center absolute select-none">
            <ins
                className="adsbygoogle"
                style={{
                    display: "inline-block",
                    width: "600px",
                    height: "200px",
                }}
                data-ad-client="ca-pub-7280995304318799"
                data-ad-slot="9436812137"
            ></ins>
        </div>
    );
};

export default AdSense;
