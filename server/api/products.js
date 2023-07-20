// server/products.get.js
import { firestore } from '../utils/firebase';

export default defineEventHandler(async (event) => {
  const { source } = getQuery(event);
  let productsRef = firestore.collection('products');

  if (source) {
    productsRef = productsRef.where('source', '==', source);
  }

  // Fetch the products
  const productDocs = (await productsRef.get()).docs;

  // Prepare the products data
  let products = productDocs.map((doc) => ({
    ...doc.data(),
    productId: doc.id,
  }));

  // Filter out products with ID starting with "TEST" in the production environment
  if (process.env.NODE_ENV === 'production') {
    products = products.filter(
      (product) => !product.productId.startsWith('TEST'),
    );
  }

  return products;
});
