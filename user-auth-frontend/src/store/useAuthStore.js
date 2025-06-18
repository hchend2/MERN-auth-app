//
// File: src/store/useAuthStore.js
//
import { create } from "zustand";
import axios from "axios";

// Correct base URL for backend server
const API_URL = "http://localhost:5000/api"; // Backend runs on port 5000

axios.defaults.withCredentials = true; // Ensure cookies (like JWT) are included in requests

// Zustand store for user authentication
export const useAuthStore = create((set) => ({
  user: null,
  error: null,
  isLoading: false,

  // Action to register a new user
  register: async (firstname, lastname, email, password) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(
        `${API_URL}/register`,
        {
          firstname,
          lastname,
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      set({
        user: response.data,
        isLoading: false,
      });

      return response.data; // Optional: allow calling code to receive response

    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data ||
        "Registration failed";

      set({
        isLoading: false,
        error: message,
      });

      throw new Error(message); // Re-throw for frontend to handle with toast, etc.
    }
  },

  // Logout user
  logout: () => set({ user: null, error: null }),
}));
