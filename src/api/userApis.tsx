import axios from "axios";
import { RecordDTTParams, Student, UserInfo } from "../types/utils";

const API_URL = import.meta.env.VITE_API_URL;

export const getEmailWithUsername = async (username: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/users/getEmailWithUsername`,
      {
        username: username,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // Axios automatically handles the response as JSON, so you can directly access response.data
    return response.data;
  } catch (error) {
    // Check if the error is from Axios
    if (axios.isAxiosError(error)) {
      console.error("Error get email with username:", error.response?.data);
      throw new Error(
        error.response?.data?.message || "Failed to get email with username"
      );
    } else {
      console.error("Unexpected error:", error);
      throw new Error(
        "An unexpected error occurred while get email with username."
      );
    }
  }
};

export const getUserDetail = async (id: string): Promise<UserInfo> => {
  try {
    const response = await axios.post(
      `${API_URL}/users/getUserDetail`,
      { id: id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.user;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch test user"
      );
    }
    throw error;
  }
};

export const getStudents = async (
  therapistId: string | null
): Promise<Student[]> => {
  if (!therapistId) {
    throw new Error("Therapist ID is required");
  }

  try {
    const response = await axios.post(
      `${API_URL}/therapists/getStudentsWithTheraID`,
      {
        therapist_id: therapistId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.students;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch student"
      );
    }
    throw error;
  }
};

export const getProgramsAndTargetsApi = async (studentId: number) => {
  try {
    const response = await axios.post(
      `${API_URL}/therapists/getProgramsWithStudentID`,
      {
        student_id: studentId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // Axios automatically handles the response as JSON, so you can directly access response.data
    return response.data;
  } catch (error) {
    // Check if the error is from Axios
    if (axios.isAxiosError(error)) {
      console.error(
        "Error fetching programs and targets:",
        error.response?.data
      );
      throw new Error(
        error.response?.data?.message || "Failed to fetch programs and targets"
      );
    } else {
      console.error("Unexpected error:", error);
      throw new Error(
        "An unexpected error occurred while fetching programs and targets."
      );
    }
  }
};

export const getStudentWithID = async (studentId: number) => {
  try {
    const response = await axios.post(
      `${API_URL}/students/getStudentWithID`,
      {
        student_id: studentId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // Axios automatically handles the response as JSON, so you can directly access response.data
    return response.data;
  } catch (error) {
    // Check if the error is from Axios
    if (axios.isAxiosError(error)) {
      console.error("Error fetching student with id:", error.response?.data);
      throw new Error(
        error.response?.data?.message || "Failed to fetch student with id"
      );
    } else {
      console.error("Unexpected error:", error);
      throw new Error(
        "An unexpected error occurred while fetching student with id."
      );
    }
  }
};

export const getProgramsWithStudentID = async ({
  studentId,
  startAt,
}: {
  studentId: number;
  startAt: string;
}) => {
  try {
    const response = await axios.post(
      `${API_URL}/therapists/getProgramsWithStudentID`,
      {
        student_id: studentId,
        start_at: startAt,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // Axios automatically handles the response as JSON, so you can directly access response.data
    return response.data;
  } catch (error) {
    // Check if the error is from Axios
    if (axios.isAxiosError(error)) {
      console.error(
        "Error fetching programs and targets:",
        error.response?.data
      );
      throw new Error(
        error.response?.data?.message || "Failed to fetch programs and targets"
      );
    } else {
      console.error("Unexpected error:", error);
      throw new Error(
        "An unexpected error occurred while fetching programs and targets."
      );
    }
  }
};

export const recordDTTValue = async (params: RecordDTTParams) => {
  try {
    // Make the POST request using Axios
    const response = await axios.post(`${API_URL}/dtts/recordDTT`, params, {
      headers: {
        "Content-Type": "application/json",
        // Add any other required headers here
      },
    });

    // Axios automatically parses the response as JSON
    return response.data;
  } catch (error) {
    // Check if the error is an Axios error
    if (axios.isAxiosError(error)) {
      console.error("Error recording DTT value:", error.response?.data);
      throw new Error(
        error.response?.data?.message ||
          `HTTP error! status: ${error.response?.status}`
      );
    } else {
      console.error("Unexpected error:", error);
      throw new Error(
        "An unexpected error occurred while recording DTT value."
      );
    }
  }
};
