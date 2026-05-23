const API_URL = "https://proyectoprestamos-production-bcc5.up.railway.app";

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