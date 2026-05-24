const API_URL = "https://proyectoprestamos-production-bcc5.up.railway.app/api";

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

      const result = await response.json();

      return result;

    } catch (error) {
      console.log("Error login:", error);

      return {
        mensaje: "Error de conexión con el servidor",
      };
    }
  },
};

export default api;