export default defineEventHandler(async (event) => {
  console.log("heelo");
  // const { fulfillment, basket } = await getBody(event);

  // try {
  //   const orderData = processOrderData(fulfillment, basket);
  //   const orderRef = await firestore.collection("orders").add(orderData);

  //   console.log("Order created with ID: ", orderRef.id);

  //   return {
  //     status: 200,
  //     body: { message: "Order processed successfully" },
  //   };
  // } catch (error) {
  //   console.error(error);

  //   return {
  //     status: 500,
  //     body: { message: "Error processing order" },
  //   };
  // }
});
