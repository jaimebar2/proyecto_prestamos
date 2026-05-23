const API_URL = "http://localhost:3000/api";

const api = {
  login: async (data) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      return await response.json();

    } catch (error) {
      console.log(error);
    }
  },
};

export default api;