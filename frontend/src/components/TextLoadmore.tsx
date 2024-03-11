import React, { useState } from 'react';


const LoadableText = ({ longText, length }: { longText: string, length: number }) => {
    const [showFullText, setShowFullText] = useState(false);

    const handleClick = () => {
        setShowFullText(!showFullText);
    };

    return (
        <div>
            <span>{showFullText ? longText : longText.slice(0, length)}&nbsp;&nbsp;</span>
            {longText.length > length && (
                <span className="text-blue-500 cursor-pointer" onClick={handleClick}>{showFullText ? "Load Less" : "Load More"}</span>
            )}
        </div>
    );
};

export default LoadableText;
