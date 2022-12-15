import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { BUTTON_TYPES } from "../Button/button.component";
import {
  FormContainer,
  PaymentFormContainer,
  PaymentButton,
} from "./PaymentForm.style";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);

  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

  const paymentHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsPaymentProcessing(true);
    console.log(amount);
    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then((res) => res.json());

    const {
      paymentIntent: { client_secret },
    } = response;
    console.log(client_secret, amount);
    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.displayName : "Guest",
          email: currentUser ? currentUser.email : "N/A",
        },
      },
    });

    setIsPaymentProcessing(false);
    if (paymentResult.error) {
      alert(paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded")
        alert("Payment Successful");
    }
  };

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <CardElement />
        <PaymentButton
          isLoading={isPaymentProcessing}
          btnType={BUTTON_TYPES.invert}
        >
          Pay now
        </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
