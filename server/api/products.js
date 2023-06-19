import { firestore } from '../utils/firebase';

export default defineEventHandler(async (event) => {
  // get source from event query
  const { source } = getQuery(event);

  // reference to the products collection filtered by source
  const productsRef = firestore
    .collection('products')
    .where('source', '==', source);

  // get the products
  const productDocs = await productsRef.get();

  const products = [];
  for (let doc of productDocs.docs) {
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
      category: productData.category, // Assuming the category field is stored in the document
      images: productData.images,
      mainImage: productData.images ? productData.images[0] : null, // mainImage is the first image in the images array
      name: productData.name,
      shortName: productData.shortName, // Assuming the shortName field is stored in the document
      description: productData.description,
      source: productData.source,
      active: productData.active,
      price: unitAmount ? unitAmount / 100 : null, // price is unit amount divided by 100
    };

    // add the product to the products array
    products.push(product);
  }

  // return the products
  return products;
});
