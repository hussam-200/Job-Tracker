import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore"
import { auth, db } from "./FireBase"
import { signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { loading, register, setError } from "../Redux/Reduser";

export const registerUser = async (username, email, password, roll = "user") => async (dispatch) => {
    dispatch(loading(true));
    try {
        const q = query(collection(db, "users"), where("email", "==", email));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
            throw new Error("Email already exists in database!");
        }
        const UserCredential = await createUserWithEmailAndPassword(auth, email, password)

        const userData = {
            uid: UserCredential.user.uid,
            email,
            username,
            roll
        };
        await setDoc(doc(db, "users", UserCredential.user.uid), {
            uid: UserCredential.user.uid,
            email,
            username,
            roll
        })

        dispatch(register(userData));
        return userData;
    } catch (error) {
        dispatch(setError(error.message));
        throw error;
    } finally {
        dispatch(loading(false));
    }

}
export const loginUser = (email, password) => async (dispatch) => {
  dispatch(loading(true));
  try {
    // تسجيل الدخول عبر Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // جلب بيانات المستخدم من Firestore
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    let user = {
      uid,
      email: userCredential.user.email,
      username: "",
    };

    if (docSnap.exists()) {
      user = { ...user, ...docSnap.data() };
    }

    dispatch(login(user));
    dispatch(setError(null));

    return user;
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(login(null));
    console.error("Login failed:", error.message);
  } finally {
    dispatch(loading(false));
  }
};