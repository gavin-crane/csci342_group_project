import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function CodeRunner(){
    useEffect(() => {
        const script = document.createElement("script");

        script.src = "https://www.jdoodle.com/assets/jdoodle-pym.min.js"
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    });
    
    const { lang } = useParams();
    const go = `https://www.jdoodle.com/embed/v0/${lang}?stdin=0&arg=0`
    return (
        <div>
            <div data-pym-src={go}></div>
            {/* // https://www.jdoodle.com/embed/v0/5Z00 */}
        </div>
    );
    
}