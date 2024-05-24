// composables/useSnapshotListeners.js
import { ref } from 'vue';
import { collection, doc, onSnapshot } from 'firebase/firestore';

export function useSnapshotListeners(firestore, collectionName) {
  const data = ref(null);
  const error = ref(null);

  const attachSnapshotListeners = (docId = null) => {
    if (docId) {
      console.log(`[useSnapshotListeners:attachSnapshotListeners] Attaching snapshot listener for document ID: ${docId} in collection: ${collectionName}`);
      const docRef = doc(firestore, collectionName, docId);
      onSnapshot(docRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          console.log(`[useSnapshotListeners:attachSnapshotListeners] Document snapshot exists for ID: ${docId}`);
          data.value = { id: docSnapshot.id, data: docSnapshot.data() };
        } else {
          const errorMsg = `Document with ID ${docId} does not exist in ${collectionName}`;
          console.error(`[useSnapshotListeners:attachSnapshotListeners] ${errorMsg}`);
          error.value = errorMsg;
        }
      }, (err) => {
        console.error(`[useSnapshotListeners:attachSnapshotListeners] Error in document snapshot listener for ID: ${docId}`, err.message);
        error.value = err.message;
      });
    } else {
      console.log(`[useSnapshotListeners:attachSnapshotListeners] Attaching snapshot listener for collection: ${collectionName}`);
      const collectionRef = collection(firestore, collectionName);
      onSnapshot(collectionRef, (collectionSnapshot) => {
        const updatedDocs = collectionSnapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        }));
        data.value = updatedDocs;
      }, (err) => {
        console.error(`[useSnapshotListeners:attachSnapshotListeners] Error in collection snapshot listener for collection: ${collectionName}`, err.message);
        error.value = err.message;
      });
    }
  };

  return {
    data,
    error,
    attachSnapshotListeners
  };
}
