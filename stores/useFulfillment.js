// fulfillment.js
import { defineStore } from 'pinia';

export const useFulfillment = defineStore({
  id: 'fulfillment',
  state: () => ({
    baskets: {
      kitchen: {
        slot: null,
        items: [],
      },
      shop: {
        slot: null,
        items: [],
      },
      production: {
        slot: null,
        items: [],
      },
    },
  }),
  actions: {
    selectSlot(source, day, time) {
      const dateAndOrTime = day.dateString + (time ? ` ${time}` : ''); // Construct a string with date and time if provided
      if (this.baskets[source].slot === dateAndOrTime) {
        // If the slot is already selected, deselect it (toggle off)
        this.baskets[source].slot = null;
      } else {
        // If the slot is not yet selected, select it (toggle on)
        this.baskets[source].slot = dateAndOrTime;
      }
    },
    toggleSlot(slot, source) {
      if (this.baskets[source].slot === slot) {
        this.baskets[source].slot = null;
      } else {
        this.baskets[source].slot = slot;
      }
    },
    addItem(product) {
      // Assuming the product object contains 'source' and 'productId' fields
      const sourceItems = this.baskets[product.source].items;
      const existingItem = sourceItems.find(
        (item) => item.productId === product.productId,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        sourceItems.push({
          productId: product.productId,
          quantity: 1,
        });
      }
    },
    incrementQuantity(productId, source) {
      const sourceItems = this.baskets[source].items;
      const item = sourceItems.find((item) => item.productId === productId);

      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity(productId, source) {
      const sourceItems = this.baskets[source].items;
      const item = sourceItems.find((item) => item.productId === productId);

      if (item && item.quantity > 0) {
        item.quantity -= 1;
      }
    },
    getQuantityForProduct(productId, source) {
      const sourceItems = this.baskets[source]?.items;
      const item = sourceItems?.find((item) => item.productId === productId);

      return item ? item.quantity : 0;
    },
  },
});
