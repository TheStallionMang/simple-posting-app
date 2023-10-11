import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCgzrw3eIFeOqlrCvwCP1rMyKWqRrD5ecY",
  authDomain: "fireship-next-2.firebaseapp.com",
  databaseURL: "https://fireship-next-2-default-rtdb.firebaseio.com",
  projectId: "fireship-next-2",
  storageBucket: "fireship-next-2.appspot.com",
  messagingSenderId: "387534965723",
  appId: "1:387534965723:web:1029020ff1946c163135fe",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername(username) {
  const usersRef = firestore.collection("users");
  const query = usersRef.where("username", "==", username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}

// Use this function to convert a Firestore timestamp to a number.
export const fromMillis = firebase.firestore.Timestamp.fromMillis;

// The server timestamp ensures data time-based data will be consistent for all users.
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;

export const increment = firebase.firestore.FieldValue.increment;
