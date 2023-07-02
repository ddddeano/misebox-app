import { defineStore } from 'pinia';

export const useFulfillment = defineStore({
  id: 'fulfillment',
  state: () => ({
    baskets: {
      kitchen: {
        name: 'kitchen',
        slot: {
          day: '',
          time: '',
        },
        items: [],
      },
      shop: {
        name: 'shop',
        slot: {
          day: '',
        },
        items: [],
      },
      production: {
        name: 'production',
        slot: {
          day: '',
        },
        items: [],
      },
    },
  }),
  getters: {
    basketDetails: (state) => {
      const hasItems = Object.values(state.baskets).some(
        (basket) => basket.items.length > 0,
      );
      const numberOfItems = Object.values(state.baskets).reduce(
        (sum, basket) => sum + basket.items.length,
        0,
      );
      const totalPrice = Object.values(state.baskets).reduce((sum, basket) => {
        return (
          sum +
          basket.items.reduce(
            (subtotal, item) => subtotal + item.price * item.quantity,
            0,
          )
        );
      }, 0);

      return {
        hasItems,
        numberOfItems,
        totalPrice,
      };
    },
    getSelectedDay: (state) => (source) => {
      return state.baskets[source]?.slot?.day;
    },

    sourceDetails: (state) => (source) => {
      console.log('Source:', source); // Add this line for debugging

      const basket = state.baskets[source];
      if (!basket) {
        return { hasItems: false, numberOfItems: 0, totalPrice: 0 };
      }

      const hasItems = basket.items.length > 0;
      const numberOfItems = basket.items.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );
      const totalPrice = basket.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );

      return {
        hasItems,
        numberOfItems,
        totalPrice,
        items: basket.items, // include items in the return object
      };
    },

    productDetails: (state) => (source, productId) => {
      const basket = state.baskets[source];
      if (!basket) {
        return { productQuantity: 0, totalPrice: 0 };
      }

      const product = basket.items.find((item) => item.productId === productId);
      const productQuantity = product ? product.quantity : 0;
      const totalPrice = product ? product.price * product.quantity : 0;

      return {
        productQuantity,
        totalPrice,
      };
    },

    isSelectedDate: (state) => (source, dateString) => {
      return (
        state.baskets[source] &&
        state.baskets[source].slot &&
        state.baskets[source].slot.day === dateString
      );
    },

    selectedTime: (state) => (source, dateString) => {
      if (source === 'kitchen') {
        if (state.baskets.kitchen.slot?.day === dateString) {
          return state.baskets.kitchen.slot.time;
        }
      }
      return null;
    },
  },

  actions: {
    // Select or deselect a delivery slot
    // Select or deselect a delivery slot
    selectSlot(source, dateString, time) {
      if (!this.baskets[source]) {
        console.error(`Invalid source: ${source}`);
        return;
      }

      if (
        this.baskets[source].slot &&
        this.baskets[source].slot.day === dateString &&
        this.baskets[source].slot.time === time
      ) {
        this.baskets[source].slot = {
          day: '',
          time: '',
        };
      } else {
        this.baskets[source].slot = {
          day: dateString,
          time: time ? time : '',
        };
      }
    },

    // Add product to the specified source basket
    addProduct(source, product) {
      if (!this.baskets[source]) {
        console.error(`Invalid source: ${source}`);
        return;
      }
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

    // Removes product(s) from the specified source basket
    removeItems(source, product = 'all') {
      if (!this.baskets[source]) {
        console.error(`Invalid source: ${source}`);
        return;
      }
      if (product === 'all') {
        this.baskets[source].items = [];
      } else {
        const itemIndex = this.baskets[source].items.findIndex(
          (item) => item.productId === product.productId,
        );

        if (itemIndex !== -1) {
          this.baskets[source].items.splice(itemIndex, 1);
        }
      }
    },
    clearDate(source) {
      if (!this.baskets[source]) {
        console.error(`Invalid source: ${source}`);
        return;
      }

      this.baskets[source].slot.day = '';

      // If source is kitchen, also clear time
      if (source === 'kitchen') {
        this.baskets[source].slot.time = '';
      }
    },

    // Clear the selected time for a given source, only for kitchen at the moment
    clearTime(source) {
      if (source !== 'kitchen') {
        console.error(
          `Invalid source: ${source}. Only kitchen has time slots.`,
        );
        return;
      }

      this.baskets[source].slot.time = '';
    },
  },
  persist: true,
});
