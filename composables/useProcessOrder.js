export const processOrderData = (userId, basket, fulfillment) => {
  const paymentManager = fulfillment.paymentManager;
  const items = getBasketItemsForPaymentManager(paymentManager, basket.items);
  const totalPrice = basket.getTotalPrice;

  const orderData = {
    userId: userId,
    paymentManager,
    items,
    totalPrice,
    paymentMethod: fulfillment.payment,
    deliveryZone: fulfillment.deliveryZone,
    dwelling: fulfillment.dwelling,
    street: fulfillment.street,
    notes: fulfillment.notes,
  };

  const orderDataString = JSON.stringify(orderData);

  console.log("processing order:,", orderData);

  return { orderDataString, orderData };
};

function getBasketItemsForPaymentManager(paymentManager, basketItems) {
  if (paymentManager === "misebox") {
    return basketItems.map((item) => ({
      shortName: item.shortName,
      quantity: item.quantity,
      source: item.source,
    }));
  } else if (paymentManager === "stripe") {
    return basketItems.map((item) => ({
      shortName: item.shortName,
      quantity: item.quantity,
      source: item.source,
      priceId: item.priceId,
    }));
  } else {
    throw new Error(`Payment manager ${paymentManager} not recognized.`);
  }
}
