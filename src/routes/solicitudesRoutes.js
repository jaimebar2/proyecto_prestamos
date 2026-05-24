const express = require("express");

const router = express.Router();

const {
  crearSolicitud,
  obtenerSolicitudes,
  actualizarEstado,
} = require("../controllers/solicitudesController");

router.post("/", crearSolicitud);

router.get("/", obtenerSolicitudes);

router.put("/:id", actualizarEstado);

module.exports = router;