import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getSessionsDetails = async (session_id: number, student_id: number) => {
    try {
      const response = await axios.post(
        `${API_URL}/sessions/getSessionDetail`,
        {
          session_id: session_id,
          student_id: student_id,
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
        console.error("Error login with username:", error.response?.data);
        throw new Error(
          error.response?.data?.message || "Failed to login with username"
        );
      } else {
        console.error("Unexpected error:", error);
        throw new Error(
          "An unexpected error occurred while login with username."
        );
      }
    }
  };