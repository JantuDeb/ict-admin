export const ADD_STUDENT = "ADD_STUDENT";
export const ADD_STUDENTS = "ADD_STUDENTS";
export const UPDATE_STUDENT = "UPDATE_STUDENT";
export const DELTE_STUDENT = " DELTE_STUDENT";
export const studentReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_STUDENT:
      return [...state, payload.student];
    case ADD_STUDENTS:
      return [...state, ...payload];
    case UPDATE_STUDENT:
      return state.map((student) =>
        student.id === payload.student.id ? payload.student : student
      );
    case DELTE_STUDENT:
      return state.filter((student) => student.id !== payload.id);
    default:
      return state;
  }
};
