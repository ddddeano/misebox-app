const fulfillment = useFulfillment();
const basket = useBasket();
const firebaseUser = useFirebaseUser();

export const processOrderData = () => {
  const paymentManager = "cash"; // usePaymentTypes().getManagerByPaymentType(fulfillment.payment);

  const orderData = {
    // paymentManager,
    // customerName: firebaseUser.displayName,
    // customerEmail: firebaseUser.email,
    // items: basket.items, // basket items by manager
    // totalPrice: 6, //getBasketItemsForPaymentManager(paymentManager, basket.items),
    // paymentMethod: fulfillment.paymentMethod,
    // deliveryZone: fulfillment.deliveryZone,
    // dwelling: fulfillment.dwelling,
    // street: fulfillment.street,
    // notes: fulfillment.notes,
  };
  return orderData;
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
};

// console.log(`Managing payment through ${managerName}`);

// switch (managerName) {
//   case "misebox":
//     usePaymentTypes().payByMisebox(orderRef);
//     break;
//   case "stripe":
//     usePaymentTypes().payByStripe(orderRef);
//   default:
//     console.log(`No payment function found for manager: ${managerName}`);
//     break;
// }
