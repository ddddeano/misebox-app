import { defineStore } from "pinia";

export const useFulfillment = defineStore({
  id: "fulfillment",
  state: () => ({
    payment: "Cash",
    deliveryZone: "",
    dwelling: "",
    street: "",
    notes: "",
  }),
  getters: {
    paymentManager() {
      const { paymentTypes } = usePaymentTypes();
      const paymentType = paymentTypes.find((type) => type.name === this.payment);

      return paymentType?.managed || "";
    },
  },
});
