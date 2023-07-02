import { firestore } from '../utils/firebase';

export default defineEventHandler(async (event) => {
  // an endpoint that is dynamic, can return ALL products, collection products by product.source, or product by doc.id
  const { source, productId } = getQuery(event);

  // Construct the initial query
  let productsRef = firestore.collection('products');
  if (source) {
    productsRef = productsRef.where('source', '==', source);
  }
  if (productId) {
    productsRef = productsRef.doc(productId);
  }

  // Fetch the products
  // Fetch the products
  const productDocs = productId
    ? [await productsRef.get()]
    : (await productsRef.get()).docs;

  // Prepare the products data
  const products = [];
  for (let doc of productDocs) {
    if (doc.exists) {
      const productData = doc.data();

      // get prices subcollection
      const pricesRef = doc.ref.collection('prices');
      const priceSnapshot = await pricesRef.get();

      let priceId = null;
      let unitAmount = null;

      // take only the first price document
      if (!priceSnapshot.empty) {
        const priceDoc = priceSnapshot.docs[0];
        const priceData = priceDoc.data();

        priceId = priceDoc.id;
        unitAmount = priceData.unit_amount;
      }

      // build a new product object with only the attributes you need
      const product = {
        productId: doc.id,
        priceId: priceId,
        unitAmount: unitAmount,
        category: productData.category,
        images: productData.images,
        mainImage: productData.images ? productData.images[0] : null,
        name: productData.name,
        shortName: productData.shortName,
        description: productData.description,
        source: productData.source,
        active: productData.active,
        price: unitAmount ? unitAmount / 100 : null,
      };

      // add the product to the products array
      products.push(product);
    }
  }

  // If productId was specified, return only the first product
  return productId ? products[0] : products;
});
