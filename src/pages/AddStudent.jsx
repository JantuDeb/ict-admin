import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { useStudent } from "../context/student-context";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../config/firebase.config";

const AddStudent = () => {
  const [loading, setLoading] = useState(false)
  const [student, setStudent] = useState({
    name: "",
    guardianName: "",
    address: "",
    rollNo: "",
    regNo: "",
    course: "",
    admissionDate: "",
    resultDate: "",
    center: "",
    finalMark: "",
  });
  const [file, setFile] = useState(null);
  const {
    name,
    guardianName,
    address,
    rollNo,
    regNo,
    course,
    admissionDate,
    resultDate,
    center,
    finalMark,
  } = student;
  const { addStudentToDb } = useStudent();
  const navigate = useNavigate();
  const uploadFile = (file) => {
    if (!file) return;
    setLoading(true)
    const id = Math.random().toString(36).substring(2, 15);
    const fileNameStr = file.name.split(".");
    const ext = fileNameStr[fileNameStr.length - 1];
    const filePath = `certificates/${id}.${ext}`;
    //storage ref
    const storage = getStorage(app);
    const imageRef = ref(storage, filePath);

    // Upload the file and metadata
    const uploadTask = uploadBytesResumable(imageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log(snapshot.totalBytes);
        // const progress = Math.round(
        //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        // );
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const newStudent = {
            ...student,
            admissionDate: formatDate(student.admissionDate),
            resultDate: formatDate(student.resultDate),
            filePath,
            certUrl: downloadURL,
          };
          addStudentToDb(newStudent);
          setLoading(false)
          navigate("/");
        });
      }
    );
  };

  function changeHandler(e) {
    setStudent({ ...student, [e.target.name]: e.target.value });
  }

  function formatDate(date) {
    const dateObj = new Date(date);
    const dd = dateObj.getDate();
    const mm = dateObj.getMonth() + 1;
    const yyyy = dateObj.getFullYear();
    const dateString = `${dd < 10 ? `0${dd}` : dd}-${
      mm < 10 ? `0${mm}` : mm
    }-${yyyy}`;
    return dateString;
  }

  function addStudent() {
    uploadFile(file);
  }

  return (
    <main className="flex flex-col items-stretch w-full ">
      <h1 className="text-center text-2xl font-semibold text-blue-500 m-2">
        Add New Student Details
      </h1>
      <div className="flex justify-center flex-wrap">
        <Input
          label="name"
          type="text"
          changeHandler={changeHandler}
          value={name}
          placeHolder="Full Name"
        />
        <Input
          label="guardianName"
          type="text"
          changeHandler={changeHandler}
          value={guardianName}
          placeHolder="Guardian Name"
        />
      </div>
      <div className="flex justify-center flex-wrap">
        <Input
          label="address"
          type="text"
          changeHandler={changeHandler}
          value={address}
          placeHolder="Address"
        />
        <Input
          label="rollNo"
          type="text"
          changeHandler={changeHandler}
          value={rollNo}
          placeHolder="Roll No"
        />
      </div>
      <div className="flex justify-center flex-wrap">
        <Input
          label="regNo"
          type="text"
          changeHandler={changeHandler}
          value={regNo}
          placeHolder="Reg. No"
        />
        <Input
          label="course"
          type="text"
          changeHandler={changeHandler}
          value={course}
          placeHolder="Course Name"
        />
      </div>
      <div className="flex justify-center flex-wrap">
        <Input
          label="admissionDate"
          type="date"
          changeHandler={changeHandler}
          value={admissionDate}
          placeHolder="Date Of admission "
        />
        <Input
          label="resultDate"
          type="date"
          changeHandler={changeHandler}
          value={resultDate}
          placeHolder="Date of result"
        />
      </div>
      <div className="flex justify-center flex-wrap">
        <Input
          label="center"
          type="text"
          changeHandler={changeHandler}
          value={center}
          placeHolder="Study Center"
        />
        <Input
          label="finalMark"
          type="text"
          changeHandler={changeHandler}
          value={finalMark}
          placeHolder="Final Mark(Percentage)"
        />
      </div>
      <div className="flex justify-center items-center ">
        <div className="max-w-md">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 max-w-md"
            htmlFfor="certificate"
          >
            Certificate
          </label>
          <input
            className="block max-w-md text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="certificate_help"
            id="certificate"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
      </div>
      <div className="flex justify-center w-full m-2">
        <Link
          to="/"
          className="flex max-w-sm text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full justify-center px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-2"
        >
          Cancel
        </Link>
        <Button type="submit" loading={loading} clickHandler={addStudent}>
          Save
        </Button>
      </div>
    </main>
  );
};

export default AddStudent;
