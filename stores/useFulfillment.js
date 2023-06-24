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
      return state.baskets[source]?.items.length || 0;
    },

    getTotalPriceBySource: (state) => (source) => {
      return (
        state.baskets[source]?.items
          .reduce((total, item) => total + item.price * item.quantity, 0)
          ?.toFixed(2) || 0
      );
    },

    getAllItems: (state) => {
      return Object.values(state.baskets).flatMap((basket) => basket.items);
    },

    getTotalPriceForProduct: (state) => (productId, source) => {
      const item = state.baskets[source]?.items.find(
        (item) => item.productId === productId,
      );

      return item ? (item.price * item.quantity).toFixed(2) : 0;
    },

    getTotalPriceForAllProducts: (state) => (source) => {
      return (
        state.baskets[source]?.items
          .reduce((total, item) => total + item.price * item.quantity, 0)
          ?.toFixed(2) || 0
      );
    },

    getBasketItems: (state) => (expanded) => {
      const hierarchy = [];
      const topLevel = {
        name: 'Total',
        items: [
          {
            totalItems: state.getAllItems.length,
            totalPrice: state.getAllItems
              .reduce((total, item) => total + item.price * item.quantity, 0)
              .toFixed(2),
            sourceItems: [],
          },
        ],
      };
      const sourceItems = {};

      state.getAllItems.forEach((item) => {
        if (!sourceItems[item.source]) {
          sourceItems[item.source] = {
            source: item.source,
            items: [],
          };
        }
        sourceItems[item.source].items.push(item);
      });

      if (expanded) {
        topLevel.items[0].sourceItems = Object.values(sourceItems);
      }

      hierarchy.push(topLevel);

      return hierarchy;
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
        day &&
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
      const item = this.baskets[source]?.items.find(
        (item) => item.productId === productId,
      );

      return item ? item.quantity : 0;
    },
  },
  persist: true,
});
