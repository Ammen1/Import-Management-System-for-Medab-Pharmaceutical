import { Link } from "react-router-dom";
import NavBar from "../features/navbar/Navbar";
import ProductList from "../features/product/components/ProductList";
import Footer from "../features/common/Footer";
import Banner from "../Components/Header/Banner";
import Services from "../Components/Services/Services";
import ContactScreen from "../screens/ContactScreen";
import Testimonial from "../Components/Testimonial/Testimonial";
import Customers from "./Customers";
import Component from "../Components/Header/Componen";
function Home() {
    return ( 
        <div className="">
            <NavBar>
                <Banner></Banner>
                <div className=" ">
                <Customers></Customers>
                <Component></Component>
                <Services></Services>
                </div>
                <ContactScreen></ContactScreen>
                
            </NavBar>
            <Footer></Footer>
        </div>
     );
}

export default Home;