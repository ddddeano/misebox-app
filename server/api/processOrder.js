export default defineEventHandler(async (event) => {
  console.log("processOrder.js received event: ");
  const body = await readBody(event);
  const orderData = JSON.parse(body.orderData);

  console.log(`Order Data:`, orderData);
  console.log(`paymentManager:`, orderData.paymentManager);
  const orderRef = await firestore.collection("orders").add({
    paymentManager: orderData.paymentManager,
  });
  console.log(`Order created with ID: ${orderRef.id}`);

  return {
    status: 200,
    body: {
      message: "Order processed successfully",
      orderId: orderRef.id,
    },
  };
});

// import { firestore } from "../utils/firebase";

// export default defineEventHandler(async (event) => {
//   console.log("processOrder.js received event: ", event);
//   try {
//     const orderData = await readBody(event);
//     console.log("processOrder.js received orderData: ", orderData);

//     const orderRef = await firestore.collection("orders").add({
//       paymentManager: "misebox", // orderData.paymentManager,
//       userid: "test", // orderData.userid,
//       items: "test", //  orderData.items,
//       totalPrice: "test", // orderData.totalPrice,
//       paymentMethod: "test", //  orderData.paymentMethod,
//       deliveryZone: "test", // orderData.deliveryZone,
//       dwelling: "test", // orderData.dwelling,
//       street: "test", // orderData.street,
//       notes: "test", //  orderData.notes,
//     });
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
