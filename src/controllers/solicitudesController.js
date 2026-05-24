const pool = require("../config/db");

const crearSolicitud = async (req, res) => {
  try {
    const {
      usuario_id,
      equipo,
      fecha_prestamo,
      fecha_devolucion,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO solicitudes
      (usuario_id, equipo, fecha_prestamo, fecha_devolucion)
      VALUES ($1,$2,$3,$4)
      RETURNING *`,
      [
        usuario_id,
        equipo,
        fecha_prestamo,
        fecha_devolucion,
      ]
    );

    res.json(result.rows[0]);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      mensaje: "Error al crear solicitud",
    });
  }
};

const obtenerSolicitudes = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT solicitudes.*, usuarios.nombre
      FROM solicitudes
      INNER JOIN usuarios
      ON usuarios.id = solicitudes.usuario_id
      ORDER BY solicitudes.id DESC
    `);

    res.json(result.rows);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      mensaje: "Error al obtener solicitudes",
    });
  }
};

const actualizarEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const result = await pool.query(
      `
      UPDATE solicitudes
      SET estado = $1
      WHERE id = $2
      RETURNING *
      `,
      [estado, id]
    );

    res.json(result.rows[0]);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      mensaje: "Error al actualizar",
    });
  }
};

module.exports = {
  crearSolicitud,
  obtenerSolicitudes,
  actualizarEstado,
};