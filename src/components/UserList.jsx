import React from "react";
import { useStudent } from "../context/student-context";
import TableHead from "./table/TableHead";

const UserList = () => {
  const { students, deleteStudent } = useStudent();

  const thArr = ["Name", "Roll No", "Reg No", "Final Mark"];

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {thArr.map((title) => (
              <TableHead key={title} title={title} />
            ))}
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Delete</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr
              key={student.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4">{student.name}</td>
              <td className="px-6 py-4">{student.rollNo}</td>
              <td className="px-6 py-4">{student.regNo}</td>
              <td className="px-6 py-4">{student.finalMark}%</td>
              <td className="px-6 py-4 text-right">
                <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                  Edit
                </button>
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  onClick={() => deleteStudent(student)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
