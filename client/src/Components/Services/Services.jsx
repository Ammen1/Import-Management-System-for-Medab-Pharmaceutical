import React from 'react';
import Bounce from 'react-reveal/Bounce';
import { Swiper, SwiperSlide } from 'swiper/react';
import Heading from '../Heading';
import Service from './Service';
import serviceData from '../../data/serviceData'; 

const chunkArray = (array, chunkSize) => {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunkedArray.push(array.slice(i, i + chunkSize));
    }
    return chunkedArray;
};

const Services = () => {
    const chunkedServiceData = chunkArray(serviceData, 4);

    return (
        <section className="max-w-screen-xl mx-auto px-6 py-6 pb-24">
            <Heading title="Services" />
            <Swiper
                className="mySwiper py-12 "
                slidesPerView={1}
                spaceBetween={40}
                pagination={{ clickable: true }}
            >
                {chunkedServiceData.map((chunk, index) => (
                    <SwiperSlide key={index}>
                        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 ">
                            {chunk.map(service => (
                                <Bounce left key={service.id}>
                                    <Service {...service} />
                                </Bounce>
                            ))}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Services;
