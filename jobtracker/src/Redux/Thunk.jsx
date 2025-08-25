import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { auth, db } from "../FireBase/FireBase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { loading, login, register, setError } from "./Reduser";

export const registerUser = (username, email, password, roll = "user") => async (dispatch) => {
  dispatch(loading(true));
  try {
    const q = query(collection(db, "users"), where("email", "==", email));
    const snapshot = await getDocs(q);
    console.log("Snapshot empty?", snapshot.empty, "Docs:", snapshot.docs.map(doc => doc.data().email));

    if (!snapshot.empty) {
      throw new Error("Email already exists in database!");
    }
    const UserCredential = await createUserWithEmailAndPassword(auth, email, password);

    const userData = {
      uid: UserCredential.user.uid,
      email,
      username,
      roll
    };
    await setDoc(doc(db, "users", UserCredential.user.uid), userData);

    dispatch(register(userData));
    return userData;
  } catch (error) {
    dispatch(setError(error.message));

  } finally {
    dispatch(loading(false));
  }
}

export const loginUser = (email, password) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    let userData = { uid, email: userCredential.user.email, username: "" };

    if (docSnap.exists()) userData = { ...userData, ...docSnap.data() };

    dispatch(login(userData));
    return userData;
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(login(null));
  } finally {
    dispatch(loading(false));
  }
};
