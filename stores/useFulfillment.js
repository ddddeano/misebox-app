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

      const fulfillmentItems = Object.values(state.baskets).reduce(
        (items, basket) => {
          if (basket.items.length > 0) {
            return [
              ...items,
              ...basket.items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
              })),
            ];
          }
          return items;
        },
        [],
      );

      return {
        hasItems,
        numberOfItems,
        totalPrice,
        fulfillmentItems,
      };
    },
    basketRequirements: (state) => {
      const requirements = {};
      for (let [name, { slot }] of Object.entries(state.baskets)) {
        requirements[name] = Object.keys(slot);
      }
      return requirements;
    },
    sourceDetails: (state) => (source) => {
      const basket = state.baskets[source];
      const sourceSlotRequirements = Object.keys(basket.slot);

      let message = '';
      if (!basket) {
        message = `Please select some items from the ${source}`;
      } else if (basket.items.length === 0) {
        message = `Please select some items from the ${source}`;
      } else if (sourceSlotRequirements.includes('day') && !basket.slot.day) {
        message = `Please select a date for the ${source}`;
      } else if (sourceSlotRequirements.includes('time') && !basket.slot.time) {
        message = `Please select a time for the ${source}`;
      } else {
        message = `You have selected products and deleivery, please proceed to the checkout when you are ready`;
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

      const calendar = useCalendarStore(); // Ensure you can access this here
      const openDays = calendar.openDaysBySource(source, 'ALL');
      const selectedDayObject = basket.slot.day
        ? openDays.find((day) => day.dateString === basket.slot.day)
        : null;

      const selectedTime = sourceSlotRequirements.includes('time')
        ? basket.slot.time
        : null;

      const isSelectedDate = (dateString) =>
        basket.slot && basket.slot.day === dateString;

      return {
        hasItems,
        numberOfItems,
        totalPrice,
        items: basket.items,
        slot: basket.slot,
        selectedDay: selectedDayObject,
        selectedTime,
        isSelectedDate,
        message,
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
    getOrderData: (state) => {
      const paymentType = 'card';

      let lineItems = [];

      Object.values(state.baskets).forEach((basket) => {
        basket.items.forEach((item) => {
          lineItems.push({
            price: item.priceId,
            quantity: item.quantity,
          });
        });
      });

      let orderData = {
        lineItems,
        paymentMethod: paymentType,
      };

      return orderData;
    },
  },
  actions: {
    confirmationButton() {
      let errors = [],
        hasItems = false;

      for (let [name, { items, slot }] of Object.entries(this.baskets)) {
        if (items.length > 0) {
          hasItems = true;
          this.basketRequirements[name].forEach((field) => {
            if (slot[field] === '')
              errors.push(
                `Error: please pick a ${field} for the ${name} basket`,
              );
          });
        }
      }

      if (!hasItems)
        errors.push('Error: please choose an item from at least one basket');
      if (errors.length) console.error(errors.join('\n'));
      return errors.length === 0;
    },

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
          priceId: product.stripe_metadata_stripePriceId,
          quantity: 1,
          price: parseInt(product.metadata.price), // Parse the price as an integer
          unitAmount: product.unitAmount,
          mainImage: product.mainImage,
          shortName: product.metadata.shortName,
          source: product.source,
        });
      }
    },

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
