// server/api/misebox-users/[id].put.js
import { firestore } from '../../utils/firebase';

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;
  const userData = await useBody(event);

  try {
    // Update the user's document in Firestore to include the assigned role
    await firestore.collection('misebox-users').doc(id).update(userData);

    // Return a success response
    return { success: true, message: 'User updated successfully' };
  } catch (error) {
    // Handle errors and return an error response
    console.error('Error updating user:', error);
    return { success: false, message: 'Failed to update user' };
  }
});
