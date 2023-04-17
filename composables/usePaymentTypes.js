export const usePaymentTypes = () => {
  const paymentTypes = [
    {
      name: "Cash",
      enabled: true,
      managed: "misebox",
      icon: "fa6-solid:coins",
    },
    {
      name: "Twint",
      enabled: false,
      managed: "twint",
      icon: "arcticons:twint",
    },
    {
      name: "Card",
      enabled: false,
      managed: "stripe",
      icon: "emojione-monotone:credit-card",
    },
    {
      name: "Apple",
      enabled: false,
      managed: "stripe",
      icon: "logos:apple-pay",
    },
    {
      name: "Google",
      enabled: false,
      managed: "stripe",
      icon: "logos:google-pay",
    },
    {
      name: "PayPal",
      enabled: false,
      managed: "stripe",
      icon: "logos:paypal",
    },
  ];

  const getManagerByPaymentType = (paymentTypeName) => {
    const paymentType = paymentTypes.find((type) => type.name === paymentTypeName);
    return paymentType ? paymentType.managed : undefined;
  };
  const payByMisebox = (orderId) => {
    console.log("thanks for paying with Misebox, please leave your cash somewhere safe for me");

    navigateTo(`/basket/confirmation-${orderId}`);
  };
  const payByStripe = (orderId) => {
    console.log("thanks for paying with Stripe");
    navigateTo(`/basket/confirmation-${orderId}`);
  };
  const payByTwint = (orderId) => {
    console.log("thanks for paying with Twint");
    navigateTo(`/basket/confirmation-${orderId}`);
  };

  return { paymentTypes, getManagerByPaymentType, payByMisebox, payByStripe };
};
