import api from "./services/api";
import { useState } from "react";

const EQUIPOS = [
  {
    id: 1,
    nombre: "Laptop Dell Inspiron 15",
    tipo: "Laptop",
    estado: "Disponible",
    imagen: "💻",
  },
  {
    id: 2,
    nombre: "Proyector Epson X2000",
    tipo: "Proyector",
    estado: "Disponible",
    imagen: "📽️",
  },
  {
    id: 3,
    nombre: "Cámara Canon EOS 200D",
    tipo: "Cámara",
    estado: "No disponible",
    imagen: "📷",
  },
  {
    id: 4,
    nombre: "Cable HDMI 5m",
    tipo: "Cable",
    estado: "Disponible",
    imagen: "🔌",
  },
];

const SOLICITUDES_INIT = [
  {
    id: 1,
    usuario: "María Coronado",
    equipo: "Proyector Epson X2000",
    equipoId: 2,
    prestamo: "10/05/2024",
    devolucion: "15/05/2024",
    estado: "Pendiente",
    motivo: "Actividad académica",
  },
  {
    id: 2,
    usuario: "Juan Pérez",
    equipo: "Laptop Dell Inspiron 15",
    equipoId: 1,
    prestamo: "02/05/2024",
    devolucion: "05/05/2024",
    estado: "Aprobado",
    motivo: "Trabajo final",
  },
];

const COLORS = {
  primary: "#1a56db",
  primaryDark: "#1e40af",
  white: "#ffffff",
  gray50: "#f9fafb",
  gray100: "#f3f4f6",
  gray200: "#e5e7eb",
  gray400: "#9ca3af",
  gray600: "#4b5563",
  gray800: "#1f2937",
  green: "#16a34a",
  greenBg: "#dcfce7",
  red: "#dc2626",
  redBg: "#fee2e2",
  amber: "#d97706",
  amberBg: "#fef3c7",
  blue: "#2563eb",
  blueBg: "#dbeafe",
};

const Badge = ({ status }) => {
  const map = {
    Disponible: { bg: COLORS.greenBg, color: COLORS.green },
    "No disponible": { bg: COLORS.redBg, color: COLORS.red },
    Pendiente: { bg: COLORS.amberBg, color: COLORS.amber },
    Aprobado: { bg: COLORS.greenBg, color: COLORS.green },
    Rechazado: { bg: COLORS.redBg, color: COLORS.red },
    Devuelto: { bg: COLORS.blueBg, color: COLORS.blue },
  };

  const s = map[status];

  return (
    <span
      style={{
        background: s.bg,
        color: s.color,
        padding: "4px 10px",
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      {status}
    </span>
  );
};

const Sidebar = ({ page, setPage, logout }) => {
  const links = [
    { id: "dashboard", label: "Inicio", icon: "🏠" },
    { id: "equipos", label: "Equipos", icon: "💻" },
    { id: "mis-solicitudes", label: "Solicitudes", icon: "📋" },
  ];

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 220,
        minWidth: 220,
        background: COLORS.white,
        borderRight: `1px solid ${COLORS.gray200}`,
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <div style={{ padding: 20 }}>
        <h2 style={{ margin: 0, color: COLORS.primary }}>
          🖥️ Préstamos
        </h2>
      </div>

      <nav style={{ padding: 10, flex: 1 }}>
        {links.map((l) => (
          <button
            key={l.id}
            onClick={() => setPage(l.id)}
            style={{
              width: "100%",
              marginBottom: 8,
              padding: "12px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              background:
                page === l.id ? COLORS.blueBg : "transparent",
              color:
                page === l.id
                  ? COLORS.primary
                  : COLORS.gray600,
              fontWeight: 600,
            }}
          >
            {l.icon} {l.label}
          </button>
        ))}
      </nav>

      <button
        onClick={logout}
        style={{
          margin: 10,
          padding: 12,
          borderRadius: 8,
          border: "none",
          cursor: "pointer",
          background: COLORS.red,
          color: "#fff",
          fontWeight: 700,
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
};

const TopBar = ({ title, subtitle }) => (
  <div
    style={{
      padding: "22px 32px 14px",
      borderBottom: `1px solid ${COLORS.gray200}`,
      background: COLORS.white,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      flexWrap: "wrap",
      gap: 12,
    }}
  >
    <div>
      <h2 style={{ margin: 0, color: COLORS.gray800 }}>
        {title}
      </h2>

      <p style={{ margin: 0, color: COLORS.gray400 }}>
        {subtitle}
      </p>
    </div>

    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: "50%",
        background: COLORS.primary,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
      }}
    >
      MC
    </div>
  </div>
);

function LoginPage({ onLogin }) {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!correo || !password) {
      alert("Completa todos los campos");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/api/auth/login", {
        correo,
        password,
      });

      if (response.data.success) {
        localStorage.setItem(
          "usuario",
          JSON.stringify(response.data.usuario)
        );

        onLogin();
      } else {
        alert("Credenciales incorrectas");
      }
    } catch (error) {
      console.log(error);

      alert("Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          flex: 1,
          minWidth: 300,
          background: `linear-gradient(135deg, ${COLORS.primaryDark}, ${COLORS.primary})`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 40,
          color: "#fff",
          textAlign: "center",
        }}
      >
        <div>
          <div style={{ fontSize: 80 }}>💻📽️📷</div>

          <h1>Sistema de Préstamo</h1>

          <p>Universidad · Laboratorios</p>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: 420,
          padding: 20,
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: COLORS.white,
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 340,
          }}
        >
          <h2>Iniciar sesión</h2>

          <input
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="Correo"
            style={{
              width: "100%",
              padding: 12,
              marginBottom: 16,
              borderRadius: 8,
              border: `1px solid ${COLORS.gray200}`,
              boxSizing: "border-box",
            }}
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            style={{
              width: "100%",
              padding: 12,
              marginBottom: 20,
              borderRadius: 8,
              border: `1px solid ${COLORS.gray200}`,
              boxSizing: "border-box",
            }}
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: "100%",
              padding: 12,
              background: COLORS.primary,
              color: "#fff",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </div>
      </div>
    </div>
  );
}

function DashboardPage({ setPage }) {
  return (
    <div style={{ flex: 1, background: COLORS.gray50 }}>
      <TopBar
        title="Dashboard"
        subtitle="Sistema de préstamo de equipos"
      />

      <div
        style={{
          padding: "clamp(16px, 4vw, 32px)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          <div
            style={{
              background: COLORS.white,
              padding: 24,
              borderRadius: 12,
              border: `1px solid ${COLORS.gray200}`,
            }}
          >
            <h3>💻 Equipos</h3>

            <p>Consulta los equipos disponibles.</p>

            <button
              onClick={() => setPage("equipos")}
              style={{
                padding: "10px 18px",
                background: COLORS.primary,
                color: "#fff",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              Ver equipos
            </button>
          </div>

          <div
            style={{
              background: COLORS.white,
              padding: 24,
              borderRadius: 12,
              border: `1px solid ${COLORS.gray200}`,
            }}
          >
            <h3>📋 Solicitudes</h3>

            <p>Revisa tus solicitudes realizadas.</p>

            <button
              onClick={() =>
                setPage("mis-solicitudes")
              }
              style={{
                padding: "10px 18px",
                background: COLORS.primary,
                color: "#fff",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              Ver solicitudes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EquiposPage() {
  return (
    <div style={{ flex: 1, background: COLORS.gray50 }}>
      <TopBar
        title="Equipos disponibles"
        subtitle="Consulta los equipos"
      />

      <div
        style={{
          padding: "clamp(16px, 4vw, 32px)",
        }}
      >
        <div
          style={{
            background: COLORS.white,
            borderRadius: 12,
            border: `1px solid ${COLORS.gray200}`,
          }}
        >
          {EQUIPOS.map((eq, i) => (
            <div
              key={eq.id}
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 16,
                padding: "16px 24px",
                borderBottom:
                  i < EQUIPOS.length - 1
                    ? `1px solid ${COLORS.gray200}`
                    : "none",
              }}
            >
              <div style={{ fontSize: 40 }}>
                {eq.imagen}
              </div>

              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontWeight: 700,
                    color: COLORS.gray800,
                  }}
                >
                  {eq.nombre}
                </div>

                <div style={{ color: COLORS.gray400 }}>
                  {eq.tipo}
                </div>
              </div>

              <Badge status={eq.estado} />

              <button
                style={{
                  padding: "10px 16px",
                  background: COLORS.primary,
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                }}
              >
                Solicitar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SolicitudesPage({ solicitudes }) {
  return (
    <div style={{ flex: 1, background: COLORS.gray50 }}>
      <TopBar
        title="Mis solicitudes"
        subtitle="Estado de préstamos"
      />

      <div
        style={{
          padding: "clamp(16px, 4vw, 32px)",
        }}
      >
        <div
          style={{
            background: COLORS.white,
            borderRadius: 12,
            border: `1px solid ${COLORS.gray200}`,
            overflowX: "auto",
          }}
        >
          <table
            style={{
              width: "100%",
              minWidth: 700,
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th style={{ padding: 16 }}>
                  Equipo
                </th>

                <th style={{ padding: 16 }}>
                  Usuario
                </th>

                <th style={{ padding: 16 }}>
                  Estado
                </th>
              </tr>
            </thead>

            <tbody>
              {solicitudes.map((s) => (
                <tr key={s.id}>
                  <td style={{ padding: 16 }}>
                    {s.equipo}
                  </td>

                  <td style={{ padding: 16 }}>
                    {s.usuario}
                  </td>

                  <td style={{ padding: 16 }}>
                    <Badge status={s.estado} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const [page, setPage] = useState("dashboard");

  const [solicitudes] = useState(
    SOLICITUDES_INIT
  );

  const logout = () => {
    localStorage.removeItem("usuario");
    setLoggedIn(false);
  };

  if (!loggedIn) {
    return (
      <LoginPage
        onLogin={() => setLoggedIn(true)}
      />
    );
  }

  const renderPage = () => {
    switch (page) {
      case "equipos":
        return <EquiposPage />;

      case "mis-solicitudes":
        return (
          <SolicitudesPage
            solicitudes={solicitudes}
          />
        );

      default:
        return (
          <DashboardPage setPage={setPage} />
        );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        fontFamily:
          "system-ui, -apple-system, sans-serif",
        minHeight: "100vh",
        background: COLORS.gray50,
      }}
    >
      <Sidebar
        page={page}
        setPage={setPage}
        logout={logout}
      />

      {renderPage()}
    </div>
  );
}