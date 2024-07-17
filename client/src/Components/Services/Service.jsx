import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'flowbite-react';

const Service = (props) => {
    const { title, icon, description } = props;
    const history = useNavigate();

    return (
        <div className='flex h-full'>
            <Card className="flex flex-col justify-between items-center  ">
                <img className="w-20 ml-10" src={icon} alt={title} />
                <div className="flex flex-col justify-between items-center h-full">
                    <h1 className="text-gray-700 poppins text-base text-center">{title}</h1>
                    <p className="text-gray-700 text-center text-base">{description.slice(0, 150)}</p>
                </div>
            </Card>
        </div>
    );
};

export default Service;
