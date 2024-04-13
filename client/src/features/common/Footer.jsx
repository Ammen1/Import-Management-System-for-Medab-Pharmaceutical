import { Footer as Browerfooter } from "flowbite-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <Browerfooter
      container
      className="border border-t-8 bg-slate-100 text-black border-teal-600 mt-5 hover:shadow-2xl hover:border-t-sky-600">
          <div className="mt-5">
            <div className="flex-1">
              <Link to="/" className="font-bold text-black text-4xl ">
                <span className="px-2 py-1  bg-gradient-to-r from-indigo-500  rounded-lg text-black">
                  Medab 
                </span>
                Pharmaceutical Medical
              </Link>
              <p className="text-md mt-5 w-80 text-black">
              Medab Pharmaceutical & Medical equipment is an 
              Ethiopian based company established in 2013 by 
              family members to solve the shortage in pharmaceutical 
              products and medical equipment in the country
              </p>
            </div>
          </div>
        <div className="max-w-2xl mx-auto text-white py-10">
          <div className="mt-28 flex flex-col md:flex-row md:justify-between items-center text-sm text-black">
            <p className="order-2 md:order-1 mt-8 md:mt-0 text-black">
              {' '}
              © Medab Pharmaceutical & Medical , 2024.{' '}
            </p>
            <div className="order-1 md:order-2 text-black">
              <span className="px-2">About us</span>
              <span className="px-2 border-l">Contact us</span>
              <span className="px-2 border-l">Privacy Policy</span>
            </div>
          </div>
        </div>
      </Browerfooter>
    </>
  );
}

export default Footer;
