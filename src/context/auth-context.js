import {
  useReducer,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { authReducer } from "../reducer/auth-reducer";
import { app } from "../config/firebase.config";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, {
    user: {},
    isLoggedIn: false,
  });
  const auth = getAuth(app);
  const db = getFirestore(app);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const signUp = async ({ name, email, password }) => {
    try {
      setloading(true);
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, { displayName: name });
      // const docRef = await addDoc(collection(db, "admin"), {});
      const newUser = {
        id: user.uid,
        name: user.displayName,
        email: user.email,
      };
      await setDoc(doc(db, "admin", user.uid), newUser);
      navigate("/login", { replace: true });
    } catch (error) {
      setError(error.message);
    } finally {
      setloading(false);
    }
  };

  const logIn = async ({ email, password }) => {
    try {
      setloading(true);
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const newUser = {
        name: user.displayName,
        email: user.email,
        id: user.uid,
      };
      const id = user.uid;
      const docRef = doc(db, "admin", id);
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data());
      if (docSnap.exists() && docSnap.data().role === "admin") {
        sessionStorage.setItem("user", JSON.stringify(newUser));
        authDispatch({
          type: "LOGIN",
          payload: newUser,
        });
        navigate("/", { replace: true });
      } else {
        setError("You are not authorized to access this page");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    user &&
      authDispatch({
        type: "LOGIN",
        payload: user,
      });
    navigate("/", { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AuthContext.Provider
      value={{ authState, authDispatch, signUp, logIn, loading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);
export { AuthProvider, useAuth };
