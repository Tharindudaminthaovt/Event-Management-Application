import React, { useEffect, useState } from 'react';
import './ImageSlider.css';
import arrow from '../assets/arrow.png';

const ImageSlider = ({slides}) => {
    const [currentIndex, setCurrentIndex] = useState(1);

    const imageStyles = {
        backgroundImage: `url(${slides[currentIndex].url})`,
    };

    const nextImage = () => {
        if(slides.length - 1 == currentIndex) {
            setCurrentIndex(0)
        } else {
            setCurrentIndex(currentIndex + 1);
        }
    }

    const back = () => {
        if(currentIndex == 0) {
            setCurrentIndex(slides.length - 1)
        } else {
            setCurrentIndex(currentIndex - 1)
        }
    }

    useEffect(() => {
        const intervalSlide = setInterval(nextImage, 5000);

        return () => clearInterval(intervalSlide);
    }, [nextImage])

  return (
    <div className='imageslider'>
        <button className='imageslider-back' onClick={back}><img src={arrow} alt="" /></button>
        <div className='imageslider-img' style={imageStyles}></div>
        <button className='imageslider-next' onClick={nextImage}><img src={arrow} alt="" /></button>
    </div>
  )
}

export default ImageSlider
