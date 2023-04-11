export const processOrderData = () => {
  // const paymentManager = usePaymentTypes().getManagerByPaymentType(fulfillment.payment);

  const orderData = {
    paymentManager: "test",
    // userid: userId,
    // items: [], //getBasketItemsForPaymentManager(paymentManager, basket.items),
    // totalPrice: basket.getTotalPrice(),
    // paymentMethod: fulfillment.payment,
    // deliveryZone: fulfillment.deliveryZone,
    // dwelling: fulfillment.dwelling,
    // street: fulfillment.street,
    // notes: fulfillment.notes,
  };

  return JSON.stringify(orderData);
};

function getBasketItemsForPaymentManager(paymentManager, basketItems) {
  if (paymentManager === "misebox") {
    return basketItems.map((item) => ({
      shortName: item.shortName,
      quantity: item.quantity,
    }));
  } else if (paymentManager === "stripe") {
    return basketItems.map((item) => ({
      priceId: item.priceId,
      quantity: item.quantity,
    }));
  } else {
    throw new Error(`Payment manager ${paymentManager} not recognized.`);
  }
}
