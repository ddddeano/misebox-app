import moment from 'moment';

export function generatePeriod(startOffset = 0, endOffset = 0, unit = 'weeks') {
  return {
    start: moment().add(startOffset, unit).format('YYYY-MM-DD'),
    end: moment().add(endOffset, unit).format('YYYY-MM-DD'),
  };
}

export function generateCalendar(currentPeriod, firestore) {
  let start = new Date(currentPeriod.start);
  const end = new Date(currentPeriod.end);
  const dateArray = [];

  while (start <= end) {
    dateArray.push(new Date(start));
    start.setDate(start.getDate() + 1);
  }

  return dateArray.map((date) => {
    const dateString = date.toISOString().slice(0, 10);
    const firestoreDay = firestore.find(
      (doc) => doc && doc.dateString === dateString,
    );

    const kitchenSlotArray = [
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
    ];

    const kitchenSlots = kitchenSlotArray.map((slot) => {
      const slotFromFirestore =
        firestoreDay &&
        firestoreDay.kitchen &&
        firestoreDay.kitchen.slots &&
        firestoreDay.kitchen.slots.find((s) => s.time === slot);

      let status = slotFromFirestore ? slotFromFirestore.status : 'available';

      return {
        time: slot,
        status: status,
      };
    });

    const kitchenStatus = kitchenSlots.some(
      (slot) => slot.status === 'available' || slot.status === 'unavailable',
    )
      ? 'open'
      : 'closed';

    const kitchen = {
      status: kitchenStatus,
      slots: kitchenSlots,
    };

    const production = {
      status:
        firestoreDay && firestoreDay.production
          ? firestoreDay.production.status
          : 'open',
    };

    const shop = {
      status:
        firestoreDay && firestoreDay.shop ? firestoreDay.shop.status : 'open',
    };

    return {
      dateString,
      kitchen,
      production,
      shop,
    };
  });
}
