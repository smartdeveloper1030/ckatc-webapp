import axios from 'axios';
import { Student, UserInfo } from '../types/utils';

const API_URL = import.meta.env.VITE_API_URL;

export const getTestUser = async (): Promise<UserInfo> => {
  try {
    const response = await axios.post(`${API_URL}/users/getTestUser`, {}, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data.user;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch test user');
    }
    throw error;
  }
};

export const getStudents = async (therapistId: string | null): Promise<Student[]> => {
  if (!therapistId) {
    throw new Error('Therapist ID is required');
  }
  
  try {
    const response = await axios.post(`${API_URL}/therapists/getStudentsWithTheraID`, {
      therapist_id: therapistId
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data.students;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch student');
    }
    throw error;
  }
};

export const getProgramsAndTargetsApi = async (studentId: number) => {
  try {
    const response = await axios.post(`${API_URL}/therapists/getProgramsWithStudentID`, {
      student_id: studentId,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // Axios automatically handles the response as JSON, so you can directly access response.data
    return response.data;
  } catch (error) {
    // Check if the error is from Axios
    if (axios.isAxiosError(error)) {
      console.error('Error fetching programs and targets:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to fetch programs and targets');
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred while fetching programs and targets.');
    }
  }
};
