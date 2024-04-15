import React from 'react';
import Fade from 'react-reveal/Fade';
import { useNavigate } from 'react-router-dom';
import { Button } from 'flowbite-react';
import Lottie from 'lottie-react';
import animationData from '../../assets/Animation .json';

const Banner = () => {
    const history = useNavigate();
    const currentYear = new Date().getFullYear();

    return (
        <section className="container max-w-screen-xl mx-auto px-6 mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 py-12 ">
                <Fade left>
                    <div className="order-1 lg:order-1  flex flex-col justify-center h-full space-y-6 ">

                        <div className="flex flex-col mt-10">
                            <img className="w-56" src="../../../assets/banner/medal.png" alt="banner" />
                            <h1 className="poppins text-gray-700 font-semibold text-3xl lg:text-3xl leading-relaxed">ETHIOPIAN MEDICAL EQUIPMENT DIGITAL MARKETPLACE IN <span className="text-5xl"> {currentYear}</span></h1>
                            <p className="text-gray-500 text-light text-sm">Welcome to Medab, the go-to online marketplace for medical equipment in Ethiopia. Whether you need to Buy equipment, we've got
                             you covered. We also make it easy for you to access tenders and connect with potential business partners. Medab simplifies the process, so you can focus on what matters most providing quality 
                             healthcare...</p>
                        </div>
                     
                        <Button className="btn-primary  poppins w-48 mt-6" text="" onClick={() => history('/products')} >Explore our shop</Button>
                    </div>
                </Fade>
                <Fade right>
                    <div className="order-1 lg:order-2" style={{ width: '100%', height: '100%' }}>
                        <Lottie animationData={animationData} style={{ width: '100%', height: '100%' }} />
                    </div>
                </Fade>
            </div>
        </section>
    )
}

export default Banner;



