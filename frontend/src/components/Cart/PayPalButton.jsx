import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, onSuccess, onError }) => {
  const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;

  if (!clientId) {
    console.error("PayPal Client ID is missing. Please check your environment variables.");
    return <div>Error: PayPal Client ID is not configured.</div>;
  }

  if (!amount || isNaN(amount) || amount <= 0) {
    console.error("Invalid amount provided to PayPalButton:", amount);
    return <div>Error: Invalid payment amount.</div>;
  }

  return (
    <PayPalScriptProvider
      options={{
        "client-id": clientId,
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              { amount: { value: parseFloat(amount).toFixed(2) } },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(onSuccess).catch((err) => {
            console.error("Error capturing PayPal order:", err);
            if (onError) onError(err);
          });
        }}
        onError={(err) => {
          console.error("PayPal Button Error:", err);
          if (onError) onError(err);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
