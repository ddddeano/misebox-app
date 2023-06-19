import { defineStore } from 'pinia';

export const useFulfillment = defineStore({
  id: 'fulfillment',
  state: () => ({
    baskets: {
      kitchen: {
        name: 'kitchen',
        slot: {
          day: null,
          time: null,
        },
        items: [],
      },
      shop: {
        name: 'shop',
        slot: {
          day: null,
        },
        items: [],
      },
      production: {
        name: 'production',
        slot: {
          day: null,
        },
        items: [],
      },
    },
  }),
  getters: {
    isEmpty: (state) => (source) => {
      return state.baskets[source].items.length === 0;
    },

    allBasketsEmpty: (state) => {
      return Object.values(state.baskets).every(
        (basket) => basket.items.length === 0,
      );
    },

    getTotalItemsBySource: (state) => (source) => {
      const sourceItems = state.baskets[source]?.items;
      return sourceItems ? sourceItems.length : 0;
    },

    getTotalPriceBySource: (state) => (source) => {
      const sourceItems = state.baskets[source]?.items;
      let totalPrice = 0;

      if (sourceItems) {
        totalPrice = sourceItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      }

      return totalPrice.toFixed(2);
    },

    getAllItems: (state) => {
      const allItems = [];

      Object.keys(state.baskets).forEach((source) => {
        allItems.push(...state.baskets[source].items);
      });

      return allItems;
    },

    getTotalPriceForProduct: (state) => (productId, source) => {
      const sourceItems = state.baskets[source]?.items;
      const item = sourceItems?.find((item) => item.productId === productId);

      if (item) {
        return (item.price * item.quantity).toFixed(2);
      }

      return 0;
    },

    getTotalPriceForAllProducts: (state) => (source) => {
      const sourceItems = state.baskets[source]?.items;
      let totalPrice = 0;

      if (sourceItems) {
        totalPrice = sourceItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      }

      return totalPrice.toFixed(2);
    },
  },
  actions: {
    selectSlot(source, day, time) {
      if (!this.baskets[source]) {
        console.error(`Invalid source: ${source}`);
        return;
      }

      const dateAndOrTime = {
        day: day,
        time: time ? time : null,
      };

      if (
        this.baskets[source].slot &&
        this.baskets[source].slot.day?.dateString === day.dateString &&
        this.baskets[source].slot.time === time
      ) {
        this.baskets[source].slot = {
          day: null,
          time: null,
        };
      } else {
        this.baskets[source].slot = dateAndOrTime;
      }
    },

    addItem(source, product) {
      const sourceItems = this.baskets[source].items;
      const existingItem = sourceItems.find(
        (item) => item.productId === product.productId,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        sourceItems.push({
          productId: product.productId,
          quantity: 1,
          price: product.price,
          unitAmount: product.unitAmount,
          mainImage: product.mainImage,
          shortName: product.shortName,
          source: product.source,
        });
      }
    },

    removeItem(source, product) {
      const sourceItems = this.baskets[source].items;
      const itemIndex = sourceItems.findIndex(
        (item) => item.productId === product.productId,
      );

      if (itemIndex !== -1) {
        sourceItems.splice(itemIndex, 1);
      }
    },

    clearBasket(source) {
      this.baskets[source].items = [];
    },

    removeAllItems(productId, source) {
      const sourceItems = this.baskets[source].items;
      this.baskets[source].items = sourceItems.filter(
        (item) => item.productId !== productId,
      );
    },

    getQuantityForProduct(productId, source) {
      const sourceItems = this.baskets[source]?.items;
      const item = sourceItems?.find((item) => item.productId === productId);

      return item ? item.quantity : 0;
    },
  },
});
