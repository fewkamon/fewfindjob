import React, { useState } from 'react';

interface ImageWithFallbackProps {
    src: string;
    fallbackSrc: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string; // Add className prop
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
    src,
    fallbackSrc,
    alt,
    width,
    height,
    className, // Include className in props
}) => {
    const [imgSrc, setImgSrc] = useState(src);

    const handleImageError = () => {
        if (imgSrc !== fallbackSrc) {
            setImgSrc(fallbackSrc);
        }
    };

    return (
        <img
            src={imgSrc}
            alt={alt}
            onError={handleImageError}
            width={width}
            height={height}
            className={className} // Add className to the img element
        />
    );
};

export default ImageWithFallback;
