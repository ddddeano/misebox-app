import { firestore } from "../utils/firebase";

export default defineEventHandler(async (event) => {
  // Read request body
  const { orderData } = await readBody(event);

  // const orderData = JSON.parse(string);

  const orderRef = await firestore.collection("orders").add({
    test: "order",
    test2: orderData,
    paymentManager: orderData.paymentManage,
    userId: orderData.userId,
    items: orderData.items,
    totalPrice: orderData.totalPrice,
    paymentMethod: orderData.paymentMethod,
    deliveryZone: orderData.deliveryZone,
    dwelling: orderData.dwelling,
    street: orderData.street,
    notes: orderData.notes,
  });

  const result = {
    orderId: orderRef.id,
    paymentManager: orderData.paymentManager,
  };

  // const { data } = ;

  return result;
});

// export default defineEventHandler(async (event) => {
//   console.log("processOrder.js received event: ", event);
//   try {
//     const orderData = await readBody(event);
//     console.log("processOrder.js received orderData: ", orderData);

//

//     console.log("Returning 200 response from processOrder.js");
//     return {
//       status: 200,
//       body: { message: "Order processed successfully" },
//     };
//   } catch (error) {
//     console.error("Error in processOrder.js: ", error);
//     return {
//       status: 500,
//       body: { message: "Error processing order", error: error },
//     };
//   }
// });

// if (orderData.paymentManager === "misebox") {
//   console.log("Processing payment with Misebox...");
//   // usePaymentTypes().payByMisebox(orderRef);
// } else if (orderData.paymentManager === "stripe") {
//   console.log("Processing payment with Stripe...");
// } else {
//   console.error("Invalid payment manager:", orderData.paymentManager);
//   return {
//     status: 400,
//     body: { message: "Invalid payment manager" },
//   };
// }
