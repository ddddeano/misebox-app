import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useBasket = defineStore("basket", {
  state: () => ({
    items: useStorage("basket-items", []),
  }),
  getters: {
    sources: (state) => {
      return Array.from(new Set(state.items.map((item) => item.source)));
    },
    getItemsBySource: (state) => (source) => {
      return state.items.filter((item) => item.source === source);
    },
    getQuantityForProduct: (state) => (productId) => {
      const found = state.items.find((i) => i.productId === productId);
      return found ? found.quantity : 0;
    },
    getTotalPrice: (state) => {
      let total = 0;
      state.items.forEach((item) => {
        total += item.price * item.quantity;
      });
      return total;
    },
    getTotalPriceBySource: (state) => (source) => {
      let total = 0;
      state.items
        .filter((item) => item.source === source)
        .forEach((item) => {
          total += item.price * item.quantity;
        });
      return total.toFixed(2);
    },
    getTotalItemsBySource: (state) => (source) => {
      return state.items
        .filter((item) => item.source === source)
        .reduce((total, item) => {
          return total + item.quantity;
        }, 0);
    },
    getTotalItems: (state) => {
      return state.items.reduce((total, item) => {
        return total + item.quantity;
      }, 0);
    },
  },
  actions: {
    addItem(item) {
      console.log("addItem clicked, Item:", item, "productId:", item.productId, "productName:", item.name);
      const found = this.items.find((i) => i.productId === item.productId);
      if (found) {
        this.incrementQuantity(found.productId);
      } else {
        const basketItem = {
          productId: item.productId,
          name: item.name,
          price: item.price,
          category: item.category,
          source: item.source,
          priceId: item.active_price_Id,
          image: item.images[0],
          description: item.description,
          shortName: item.shortName,
          quantity: 1,
        };
        this.items.push(basketItem);
      }
    },
    removeItem(item) {
      console.log("removeItem clicked", "productId:", item.productId, "name:", item.name);
      const index = this.items.findIndex((i) => i.productId === item.productId);
      if (index !== -1) {
        if (this.items[index].quantity === 1) {
          this.items.splice(index, 1);
        } else {
          this.decrementQuantity(item.productId);
        }
      }
    },
    clearBasket() {
      this.items = [];
    },
    incrementQuantity(productId) {
      const found = this.items.find((i) => i.productId === productId);
      if (found) {
        found.quantity++;
      }
    },
    decrementQuantity(productId) {
      const found = this.items.find((i) => i.productId === productId);
      if (found && found.quantity > 0) {
        found.quantity--;
      }
    },
  },
});
