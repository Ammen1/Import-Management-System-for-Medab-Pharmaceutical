import { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { useSelector } from 'react-redux';
import { selectCurrentOrder } from "../features/order/orderSlice";
import { Link } from 'react-router-dom';
import  Footer  from "../features/common/Footer";
import NavBar from "../features/navbar/Navbar";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const currentOrder = useSelector(selectCurrentOrder);

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://localhost:3000/order-success/${currentOrder.id}`,
      },
    });

    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs"
  };

  return (
    <> 
    {/* <NavBar /> */}
    <div className="flex flex-col items-center justify-center min-h-screen">
     
      <div className="flex-shrink-0 self-center  mt-3">
        <Link to="/">
          <img
            className="h-12 w-auto"
            src="/logo.png"
            alt="Your Company"
          />
        </Link>
      </div>
      <h1 className=" text-lg mt-2">  Medab Pharmaceutical <span className="px-2 py-1  rounded-lg text-3xl font-serif ">& Medical  Equipment Import </span>  and Distributer Company</h1>
      <form id="payment-form" onSubmit={handleSubmit} className="mt-8   text-white p-4 rounded-md">
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button disabled={isLoading || !stripe || !elements} id="submit" className="mt-4 bg-white text-black px-4 py-2 rounded-md shadow-md">
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message" className="mt-4">{message}</div>}
      </form>
      <div className=" mt-12 w-full">
      <Footer />
      </div>

    </div>
    </>
  );
}
