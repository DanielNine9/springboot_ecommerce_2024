import React, { useEffect, useState } from 'react';
import { requestGetConfigAdmin } from '../../../client/apiRequest';

const Banner = () => {
    const [links, setLinks] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const getConfig = async () => {
            const res = await requestGetConfigAdmin();
            if (res?.status === "ok") {
                setLinks(res?.data?.bannerLinks);
            }
        };
        getConfig();
    }, []);

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % links.length);
        }, 1000); // Change slide every 4 seconds

        return () => clearInterval(slideInterval);
    }, [links]);

    return (
        <div className="h-1/2 relative overflow-hidden">
            <div
                className={`flex transition ease-out duration-40`}
                style={{
                    transform: `translateX(-${currentSlide * 100}%)`,
                }}
            >
                {links.map((s, index) => (
                    <img key={index} src={s} className="w-full h-full object-contain rounded-lg shadow-lg" />
                ))}
            </div>
        </div>
    );
};

export default Banner;
