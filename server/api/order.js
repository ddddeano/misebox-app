// server/api/order.js

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const orderData = JSON.parse(req.body);

      const orderRef = await firestore.collection("orders").add({
        test2: orderData,
        paymentManager: orderData.paymentManager,
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

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

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
