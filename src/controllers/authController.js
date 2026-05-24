const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    console.log(req.body);

    const { correo, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM usuarios WHERE correo = $1",
      [correo]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        mensaje: "Usuario no encontrado",
      });
    }

    const usuario = result.rows[0];

    console.log(usuario.password);

    const validPassword = await bcrypt.compare(
      password,
      usuario.password
    );

    console.log(validPassword);

    if (!validPassword) {
      return res.status(401).json({
        mensaje: "Contraseña incorrecta",
      });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        correo: usuario.correo,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "8h",
      }
    );

    res.json({
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol,
},
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      mensaje: "Error del servidor",
    });
  }
};

module.exports = {
  login,
};