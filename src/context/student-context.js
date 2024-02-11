import {
  useReducer,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import {
  ADD_STUDENT,
  ADD_STUDENTS,
  DELTE_STUDENT,
  studentReducer,
} from "../reducer/studentReducer";
import {
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { db, storage } from "../config/firebase.config";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";
const StudentContext = createContext({});

const StudentProvider = ({ children }) => {
  const [state, studentDispatch] = useReducer(studentReducer, [
    /**
     * {
      id: "45454",
      name: "Jantu Deb",
      guardianName: "Ratish Deb",
      address: "",
      rollNo: "4567",
      regNo: "4564",
      course: "DCA",
      admissionDate: date,
      resultDate: date,
      center: "Manikbhander",
      finalMark: "70",
    },
    {
      id: "454546544",
      name: "Jantu Deb",
      guardianName: "Ratish Deb",
      address: "",
      rollNo: "4567",
      regNo: "4564",
      course: "DCA",
      admissionDate: date,
      resultDate: date,
      center: "Manikbhander",
      finalMark: "70",
    },
    {
      id: "465",
      name: "Jantu Deb",
      guardianName: "Ratish Deb",
      address: "",
      rollNo: "4567",
      regNo: "4564",
      course: "DCA",
      admissionDate: date,
      resultDate: date,
      center: "Manikbhander",
      finalMark: "70",
    },
     */
  ]);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState("");
  const addStudentToDb = async (student) => {
    try {
      setloading(true);
      const docRef = await addDoc(collection(db, "students"), {});
      student.id = docRef.id;
      await setDoc(docRef, student);
      studentDispatch({ type: ADD_STUDENT, payload: { student } });
    } catch (e) {
      setError(e.message);
      console.error("Error adding document: ", e);
    } finally {
      setloading(false);
    }
  };

  const getAllStudents = async () => {
    try {
      setloading(true);
      const querySnapshot = await getDocs(collection(db, "students"));
      const students = querySnapshot.docs.map((doc) => doc.data());
      studentDispatch({ type: ADD_STUDENTS, payload: students });
    } catch (error) {
      setError(error.message);
    } finally {
      setloading(false);
    }
  };

  const deleteStudent = async ({ id, filePath }) => {
    try {
      setloading(true);
      //storage ref

      const imageRef = ref(storage, filePath);
      await deleteObject(imageRef);
      const docRef = doc(db, "students", id);
      await deleteDoc(docRef);
      studentDispatch({ type: DELTE_STUDENT, payload: { id } });
    } catch (error) {
      setError(error.message);
    } finally {
      setloading(false);
    }
  };

  const getStudent = async (id) => {
    if (Array.isArray(state) && state.length)
      return state.find((student) => student.id === id);
    const docRef = doc(db, "students", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return {};
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getAllStudents(), []);
  return (
    <StudentContext.Provider
      value={{
        students: state,
        studentDispatch,
        loading,
        error,
        addStudentToDb,
        deleteStudent,
        getStudent,
      }}>
      {children}
    </StudentContext.Provider>
  );
};

const useStudent = () => useContext(StudentContext);
export { StudentProvider, useStudent };
