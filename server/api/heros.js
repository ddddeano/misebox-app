import { firestore } from '../utils/firebase';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

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
        const apiUrl = config.public.apiUrl;

        // Make a fetch request to your endpoint
        const response = await fetch(
          `${apiUrl}/api/products?productId=${hero.productId}`,
        );
        hero.product = await response.json();
      }

      return hero;
    }),
  );

  return data;
});
