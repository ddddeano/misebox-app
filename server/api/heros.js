import { firestore } from '../utils/firebase';

export default defineEventHandler(async (event) => {
  const snap = await firestore
    .collection('heros')
    .where('active', '==', true)
    .get();

  const data = await Promise.all(
    snap.docs.map(async (doc) => {
      const hero = {
        id: doc.id,
        ...doc.data(),
      };

      if (hero.type === 'Product') {
        const productRef = firestore.collection('products').doc(hero.productId);
        const productSnap = await productRef.get();

        if (productSnap.exists) {
          hero.product = productSnap.data();
        }
      } else if (hero.type === 'Navigation') {
        const navigationRef = firestore
          .collection('navigations')
          .doc(hero.navigationId);
        const navigationSnap = await navigationRef.get();

        if (navigationSnap.exists) {
          hero.navigation = navigationSnap.data();
        }
      }

      return hero;
    }),
  );

  return data;
});
