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

    sourceDetails: (state) => (source) => {
      const basket = state.baskets[source];
      if (!basket) {
        return {
          hasItems: false,
          numberOfItems: 0,
          totalPrice: 0,
          slot: null,
          selectedDay: null,
        };
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

      // Find the selected day object
      const calendar = useCalendarStore(); // Ensure you can access this here
      let openDays = calendar.openDaysBySource(source, 'ALL');
      let selectedDayObject = basket.slot.day
        ? openDays.find((day) => day.dateString === basket.slot.day)
        : null;

      return {
        hasItems,
        numberOfItems,
        totalPrice,
        items: basket.items,
        slot: basket.slot,
        selectedDay: selectedDayObject, // Add the selected day object
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
    getSelectedDay: (state) => (source) => {
      return state.baskets[source]?.slot?.day;
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
    selectDate(source, dateString) {
      if (!this.baskets[source]) {
        console.error(`Invalid source: ${source}`);
        return;
      }

      // Always set the selected day to dateString, removing the possibility to deselect it.
      this.baskets[source].slot.day = dateString;
    },
    clearDate(source) {
      if (!this.baskets[source]) {
        console.error(`Invalid source: ${source}`);
        return;
      }

      this.baskets[source].slot.day = '';
      this.baskets[source].slot.time = '';
    },

    deselectTime(source) {
      console.log(`deselectTime called with source=${source}`);

      if (!this.baskets[source]) {
        console.error(`Invalid source: ${source}`);
        return;
      }

      console.log(
        `Current time slot for ${source} is ${this.baskets[source].slot.time}`,
      );

      console.log('Deselecting time');
      this.baskets[source].slot.time = ''; // clear the time

      console.log(
        `Time slot for ${source} after deselecting is ${this.baskets[source].slot.time}`,
      );
    },

    selectTime(source, time) {
      console.log(`selectTime called with source=${source} and time=${time}`);

      if (!this.baskets[source]) {
        console.error(`Invalid source: ${source}`);
        return;
      }

      console.log(
        `Current time slot for ${source} is ${this.baskets[source].slot.time}`,
      );

      console.log('Selecting time');
      this.baskets[source].slot.time = time; // selects the time

      console.log(
        `New time slot for ${source} is ${this.baskets[source].slot.time}`,
      );
    },

    clearSelection(source) {
      if (!this.baskets[source]) {
        console.error(`Invalid source: ${source}`);
        return;
      }

      this.baskets[source].slot = { day: '', time: '' }; // Clear date and time
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
    removeItems(source, productId = 'all') {
      console.log('Current basket before removal:', this.baskets[source].items);

      if (!this.baskets[source]) {
        console.error(`Invalid source: ${source}`);
        return;
      }

      if (productId === 'all') {
        console.log(
          'Removing all items from the basket:',
          this.baskets[source].items,
        );
        this.baskets[source].items = [];
        console.log('All items removed. Updated basket:', this.baskets[source]);
      } else {
        console.log(
          'Current basket before removal:',
          this.baskets[source].items,
        );
        const itemIndex = this.baskets[source].items.findIndex(
          (item) => item.productId === productId,
        );

        if (itemIndex !== -1) {
          console.log('Removing item:', this.baskets[source].items[itemIndex]);
          this.baskets[source].items.splice(itemIndex, 1);
          console.log('Item removed. Updated basket:', this.baskets[source]);
        } else {
          console.log('Item not found in the basket');
        }
      }
    },
    // Renamed the method to "decreaseProductQuantity" to better reflect its purpose.
    decreaseProductQuantity(source, productId) {
      if (!this.baskets[source]) {
        console.error(`Invalid source: ${source}`);
        return;
      }

      const product = this.baskets[source].items.find(
        (item) => item.productId === productId,
      );

      if (product) {
        if (product.quantity > 1) {
          console.log('Decreasing product quantity:', product);
          product.quantity -= 1;
          console.log(
            'Product quantity decreased. Updated basket:',
            this.baskets[source],
          );
        } else {
          // If product quantity is 1, remove the product entirely
          const itemIndex = this.baskets[source].items.findIndex(
            (item) => item.productId === productId,
          );
          console.log('Removing item:', this.baskets[source].items[itemIndex]);
          this.baskets[source].items.splice(itemIndex, 1);
          console.log('Item removed. Updated basket:', this.baskets[source]);
        }
      } else {
        throw new Error('Item not found in the basket'); // Throw error instead of console log
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
        return;
      }

      this.baskets[source].slot.time = '';
    },
  },
  persist: true,
});
