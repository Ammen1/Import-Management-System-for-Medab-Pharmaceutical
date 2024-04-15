import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'flowbite-react';

const Service = (props) => {
    const { title, icon, description } = props;
    const history = useNavigate();

    return (
        <div className='flex h-full'> {/* Ensure all cards have equal height */}
            <Card className="flex flex-col justify-between items-center border h-full hover:border-r-green-700 hover:border-r-2 hover:border-t-pink-800 hover:border-t-4 hover:border-indigo-800 hover:border-e-indigo-600 hover:border-e-2 hover:border-b-violet-800 hover:border-b-2  p-4 box-border rounded-xl ">
                <img className="w-20 ml-10" src={icon} alt={title} />
                <div className="flex flex-col justify-between items-center h-full"> {/* Ensure card content fills the height */}
                    <h1 className="text-gray-600 poppins text-xl text-center">{title}</h1>
                    <p className="text-gray-500 text-center">{description.slice(0, 150)}</p>
                </div>
            </Card>
        </div>
    );
};

export default Service;
