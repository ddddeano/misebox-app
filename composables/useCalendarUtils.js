import moment from 'moment';

export function generatePeriod(startOffset = 0, endOffset = 0, unit = 'weeks') {
  const startDate = moment().add(startOffset, unit).format('YYYY-MM-DD');
  const endDate = moment().add(endOffset, unit).format('YYYY-MM-DD');

  const dates = [];
  let currentDate = moment(startDate);

  while (currentDate.isSameOrBefore(endDate)) {
    dates.push(currentDate.format('YYYY-MM-DD'));
    currentDate.add(1, 'days');
  }

  return { dates, startDate, endDate };
}

export function generateGlobalCalendar(currentPeriod, firestoreCalendar) {
  const globalCalendar = currentPeriod.dates.map((dateString) => {
    const dayData = firestoreCalendar.find(
      (day) => day.dateString === dateString,
    );
    return dayData ? { ...dayData } : { dateString };
  });

  return globalCalendar;
}

export function generateProductionCalendar(globalCalendar) {
  const productionCalendar = globalCalendar.map((day) => {
    const { dateString, production } = day;
    const status = production ? production.status : 'open';

    return {
      dateString,
      status,
    };
  });

  return productionCalendar;
}

export function generateShopCalendar(globalCalendar) {
  const shopCalendar = globalCalendar.map((day) => {
    const { dateString, shop } = day;
    const status = shop ? shop.status : 'open';

    return {
      dateString,
      status,
    };
  });
  return shopCalendar;
}

export function generateKitchenCalendar(globalCalendar) {
  const kitchenSlotArray = [
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
  ];

  const kitchenCalendar = globalCalendar.map((day) => {
    const { dateString, kitchen } = day;

    const slots = kitchenSlotArray.map((slot) => {
      const slotFromFirestore =
        kitchen && kitchen.slots && kitchen.slots.find((s) => s.time === slot);
      let status = slotFromFirestore ? slotFromFirestore.status : 'available';
      return {
        time: slot,
        status: status,
      };
    });

    const status = slots.some((slot) => slot.status === 'available')
      ? 'open'
      : 'closed';

    return {
      dateString,
      status,
      slots,
    };
  });

  return kitchenCalendar;
}
