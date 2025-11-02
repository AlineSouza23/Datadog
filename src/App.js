import React, { useState } from "react";
import { ChevronDown, ChevronRight, Search, ArrowLeft } from "lucide-react";
import logo from "./datadog.svg"; // usado como background

const data = [
  {
    folder: "COF",
    dashboards: [
      { name: "ACEITAÇÃO", link: "em desenvolvimento" },
      { name: "Account Fee", link: "em desenvolvimento" },
      { name: "Autorizado Pendete de Liquidado", link: "em desenvolvimento" },
      { name: "BACEN", link: "em desenvolvimento" },
      { name: "Liquidado Pendente Autorizado", link: "em desenvolvimento" },
      {
        name: "REJEIÇÃO",
        link: "https://us3.datadoghq.com/dashboard/5c4-dtr-7f5?fromUser=true&refresh_mode=sliding&storage=hot&from_ts=1759847492250&to_ts=1760452292250&live=true",
      },
    ],
  },
  {
    folder: "ELO",
    dashboards: [
      {
        name: "ANÁLISE TRANSACIONAL",
        link: "https://us3.datadoghq.com/dashboard/q4k-tx9-8pv/anlise-transacional?fromUser=false&refresh_mode=paused&from_ts=1759546800000&to_ts=1759633199999&live=false",
      },
      {
        name: "Autorização - FN",
        link: "https://us3.datadoghq.com/dashboard/hbh-87d-x7a?fromUser=true&refresh_mode=sliding&storage=flex_tier&from_ts=1757501520759&to_ts=1757502420759&live=true",
      },
      {
        name: "Autorização - Ajuda ai",
        link: "https://us3.datadoghq.com/dashboard/naf-s34-4ua/autorizao---ajuda-ai?fromUser=false&refresh_mode=paused&from_ts=1759546800000&to_ts=1759633199999&live=false",
      },
      {
        name: "3DS - Autenticação",
        link: "https://us3.datadoghq.com/dashboard/dqt-ne4-cpv/3ds---autenticao?fromUser=false&refresh_mode=sliding&from_ts=1757500669883&to_ts=1757504269883&live=true",
      },
      {
        name: "3DS",
        link: "https://us3.datadoghq.com/dashboard/tga-uui-vkt/3ds?fromUser=false&refresh_mode=paused&from_ts=1760410800000&to_ts=1760497199999&live=false",
      },
      {
        name: "Disputas",
        link: "https://us3.datadoghq.com/dashboard/dke-dtn-iek/disputas?fromUser=false&refresh_mode=sliding&from_ts=1757853861369&to_ts=1760445861369&live=true",
      },
      {
        name: "Análise Transacional Pefisa",
        link: "https://us3.datadoghq.com/dashboard/xr6-5y7-ek9/anlise-transacional-pefisa?fromUser=false&refresh_mode=sliding&from_ts=1759934337863&to_ts=1759937937863&live=true",
      },
      {
        name: "ADVICE STAND IN - FN",
        link: "https://us3.datadoghq.com/dashboard/xr6-5y7-ek9?fromUser=false&refresh_mode=sliding&from_ts=1759914516148&to_ts=1759918116148&live=true",
      },
      {
        name: "ATAQUE FORÇA BRUTA - FN",
        link: "https://us3.datadoghq.com/dashboard/7fg-css-qma/ataque-fora-bruta---fn?fromUser=false&refresh_mode=paused&from_ts=1758510000000&to_ts=1758596399999&live=false",
      },
      {
        name: "Companhias Aéreas - Internacionais",
        link: "https://us3.datadoghq.com/dashboard/yi3-cax-n6t/companhias-areas---internacionais?fromUser=false&refresh_mode=paused&from_ts=1760929200000&to_ts=1761015599999&live=false",
      },
      {
        name: "Companhias Aéreas - Nacionais",
        link: "https://us3.datadoghq.com/dashboard/pkj-jjw-3rf?fromUser=false&refresh_mode=sliding&from_ts=1759936812683&to_ts=1759937712683&live=true",
      },
      {
        name: "Detalhamento transações",
        link: "https://us3.datadoghq.com/dashboard/jus-c3s-evv?fromUser=false&refresh_mode=paused&storage=hot&from_ts=1760842800000&to_ts=1760929199999&live=false",
      },
      {
        name: "PREVENÇÃO A FRAUDE | Áquila",
        link: "https://us3.datadoghq.com/dashboard/82y-vfr-yhi/preveno-a-fraude--aquila?fromUser=false&refresh_mode=paused&from_ts=1758682800000&to_ts=1758769199999&live=false",
      },
      {
        name: "Provisionamento Produtos Digitais",
        link: "https://us3.datadoghq.com/dashboard/ysk-e86-a8c/provisionamento-produtos-digitais---alma?fromUser=false&refresh_mode=sliding&storage=flex_tier&from_ts=1757496423933&to_ts=1757500023933&live=true",
      },
      {
        name: "REDE DE SEGURANÇA",
        link: "https://us3.datadoghq.com/dashboard/y5n-9mq-xjt?fromUser=false&refresh_mode=paused&from_ts=1759201200000&to_ts=1759287599999&live=false",
      },
      {
        name: "Impacto Financeiro - FN",
        link: "https://us3.datadoghq.com/dashboard/fsb-wn9-32v/impacto-financeiro---fn-correto?fromUser=false&refresh_mode=sliding&storage=hot&tpl_var_Emissor%5B0%5D=Pernambucanas-0985&from_ts=1761138514115&to_ts=1761142114115&live=true",
      },
      {
        name: "STAND IN ELO",
        link: "https://us3.datadoghq.com/dashboard/crm-p3r-73i/stand-in-elo?fromUser=false&refresh_mode=paused&from_ts=1757930170968&to_ts=1757949933789&live=false",
      },
      {
        name: "Pernambucanas v3 (compartilhada)",
        link: "https://us3.datadoghq.com/dashboard/pyk-w9y-k5m/pernambucanas-v3-compartilhada?fromUser=false&refresh_mode=paused&from_ts=1760324400000&to_ts=1760410799999&live=false",
      },
    ],
  },
  {
    folder: "Banese",
    dashboards: [
      {
        name: "Autorização BANESE - FN (compartilhado)",
        link: "https://us3.datadoghq.com/dashboard/aex-xd9-i7q?fromUser=false&refresh_mode=sliding&storage=hot&from_ts=1760312253366&to_ts=1760315853366&live=true",
      },
    ],
  },
  {
    folder: "Caixa",
    dashboards: [
      {
        name: "Autorização Caixa - FN (compartilhado)",
        link: "https://us3.datadoghq.com/dashboard/8yt-zxx-t9t/autorizao-caixa---fn-compartilhado?fromUser=false&refresh_mode=sliding&tile_focus=556262361263361&from_ts=1757498093627&to_ts=1757501693627&live=true",
      },
    ],
  },
  {
    folder: "Vox",
    dashboards: [
      {
        name: "Autorização Vox - FN (compartilhado)",
        link: "https://us3.datadoghq.com/dashboard/53n-cxp-ki3/autorizao-vox---fn-compartilhado?fromUser=false&refresh_mode=sliding&from_ts=1761138072199&to_ts=1761141672199&live=true",
      },
    ],
  },
  {
    folder: "Impacto Financeiro",
    dashboards: [
      {
        name: "Autorização Impacto Financeiro",
        link: "https://us3.datadoghq.com/dashboard/fsb-wn9-32v/impacto-financeiro---fn-correto?fromUser=false&refresh_mode=sliding&storage=hot&tpl_var_Emissor%5B0%5D=Pernambucanas-0985&from_ts=1761138514115&to_ts=1761142114115&live=true",
      },
    ],
  },
  {
    folder: "Produção TI",
    dashboards: [
      { name: "Principais Ofensores", link: "em desenvolvimento" },
      {
        name: "TELÃO Tokenização",
        link: "https://us3.datadoghq.com/dashboard/ji5-ze5-cw5?fromUser=true&refresh_mode=sliding&storage=hot&from_ts=1761063476190&to_ts=1761063776190&live=true",
      },
    ],
  },
  {
    folder: "Produção TI | CCE",
    dashboards: [
      { name: "Checklist", link: "em desenvolvimento" },
      { name: "GERADOR de DESFAZIMENTO", link: "em desenvolvimento" },
      {
        name: "Provisionamento / VISÃO COMMAND CENTER",
        link: "https://us3.datadoghq.com/dashboard/atc-ukb-wx9/provisionamento-viso-cce?fromUser=false&refresh_mode=paused&storage=hot&from_ts=1760324400000&to_ts=1760410799999&live=false",
      },
      {
        name: "TELÃO | Credenciadores",
        link: "https://us3.datadoghq.com/dashboard/4pf-ipt-uzr/telo--credenciadores?fromUser=false&refresh_mode=sliding&tile_focus=365812824300089&from_ts=1757500478820&to_ts=1757504078820&live=true",
      },
      {
        name: "TELÃO | Emissores V2",
        link: "https://us3.datadoghq.com/dashboard/kmk-kj7-ctu/telo--emissores-v2?fromUser=false&refresh_mode=sliding&from_ts=1757500499532&to_ts=1757504099532&live=true",
      },
      {
        name: "TELÃO | IMPACTOS TRANSACIONAIS",
        link: "https://us3.datadoghq.com/dashboard/64u-h6s-a4u?fromUser=true&refresh_mode=paused&from_ts=1760324400000&to_ts=1760410799999&live=false",
      },
      {
        name: "TELÃO | IMPACTOS TRANSACIONAIS AWS",
        link: "https://us3.datadoghq.com/dashboard/3et-jvs-5hm/telo-impactos-transacionais-aws?fromUser=false&refresh_mode=paused&storage=hot&from_ts=1760324400000&to_ts=1760410799999&live=false",
      },
      { name: "TELÃO | IMPACTOS TRANSACIONAIS RISE", link: "em desenvolvimento" },
    ],
  },
  {
    folder: "Release",
    dashboards: [
      {
        name: "Release 25.2",
        link: "https://us3.datadoghq.com/dashboard/cf6-sfg-vrw/release-252?fromUser=false&refresh_mode=paused&from_ts=1759201200000&to_ts=1759287599999&live=false",
      },
    ],
  },
  {
    folder: "Squad Monitoria",
    dashboards: [
      { name: "LOGIN PARCEIROS", link: "em desenvolvimento" },
      { name: "Monitoria RPA", link: "em desenvolvimento" },
      { name: "Parcelado em aberto de Liquidação", link: "em desenvolvimento" },
      { name: "Reap fora do prazo", link: "em desenvolvimento" },
    ],
  },
];

function App() {
  const [search, setSearch] = useState("");
  const [openFolders, setOpenFolders] = useState({});
  const [showLogin, setShowLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const toggleFolder = (folder) => {
    setOpenFolders((prev) => ({ ...prev, [folder]: !prev[folder] }));
  };

  const handleLogin = () => {
    if (user === "COEMONITORIA" && pass === "MonitoriaAutomacao") {
      setLoggedIn(true);
      setShowLogin(false);
      setError("");
      setUser("");
      setPass("");
    } else {
      setError("Usuário ou senha incorretos!");
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setOpenFolders({});
  };

  const filteredData = data
    .filter((folder) => {
      // Esconder parceiros se não estiver logado
      if (!loggedIn && ["Banese", "Caixa", "Vox"].includes(folder.folder)) return false;
      return true;
    })
    .map((folder) => ({
      ...folder,
      dashboards: folder.dashboards.filter((d) =>
        d.name.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter(
      (folder) =>
        folder.folder.toLowerCase().includes(search.toLowerCase()) ||
        folder.dashboards.length > 0
    );

  return (
    <div style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerOverlay}>
          {!loggedIn ? (
            <button style={styles.loginButton} onClick={() => setShowLogin(true)}>
              Login Monitoria
            </button>
          ) : (
            <button style={styles.backButton} onClick={handleLogout}>
              <ArrowLeft size={20} />
              <span>Voltar</span>
            </button>
          )}
          <h1 style={styles.title}>Dashboards</h1>
        </div>
      </header>

      {/* Campo de busca */}
      <div style={styles.searchContainer}>
        <div style={styles.searchBox}>
          <Search style={styles.searchIcon} size={20} />
          <input
            type="text"
            placeholder="Pesquisar dashboards..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>
      </div>

      {/* Lista de pastas */}
      <div style={styles.content}>
        {filteredData.map((folder) => (
          <div key={folder.folder} style={styles.folderContainer}>
            <button onClick={() => toggleFolder(folder.folder)} style={styles.folderButton}>
              <span>{folder.folder}</span>
              {openFolders[folder.folder] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </button>
            {openFolders[folder.folder] && (
              <div style={styles.dashboardList}>
                {folder.dashboards.map((d) => (
                  <a
                    key={d.name}
                    href={d.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.dashboardLink}
                  >
                    {d.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal de Login */}
      {showLogin && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalBox}>
            <h2 style={{ marginBottom: "16px" }}>Login Monitoria</h2>
            <input
              type="text"
              placeholder="Usuário"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Senha"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              style={styles.input}
            />
            {error && <p style={styles.error}>{error}</p>}
            <button onClick={handleLogin} style={styles.modalButton}>
              Entrar
            </button>
            <button onClick={() => setShowLogin(false)} style={styles.modalCancel}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* 🎨 Estilos */
const styles = {
  page: {
    fontFamily: "'Inter', sans-serif",
    backgroundColor: "#fff",
    minHeight: "100vh",
  },
  header: {
    position: "relative",
    height: "220px",
    backgroundColor: "#5c2d91",
    backgroundImage: `url(${logo})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  headerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(90deg, rgb(47, 71, 190), rgb(186, 106, 228))",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  title: { fontSize: "2rem", fontWeight: "600", zIndex: 1 },
  loginButton: {
    position: "absolute",
    top: 16,
    right: 20,
    backgroundColor: "white",
    color: "#5c2d91",
    border: "none",
    borderRadius: "8px",
    padding: "8px 14px",
    cursor: "pointer",
    fontWeight: 500,
  },
  backButton: {
    position: "absolute",
    top: 16,
    left: 20,
    backgroundColor: "white",
    color: "#5c2d91",
    border: "none",
    borderRadius: "8px",
    padding: "8px 14px",
    cursor: "pointer",
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  searchContainer: { maxWidth: "700px", margin: "24px auto 0", padding: "0 16px" },
  searchBox: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f0e6ff",
    borderRadius: "12px",
    padding: "8px 12px",
  },
  searchIcon: { color: "#5c2d91", marginRight: "8px" },
  searchInput: { flex: 1, border: "none", outline: "none", background: "transparent", fontSize: "1rem" },
  content: { maxWidth: "700px", margin: "24px auto", padding: "0 16px" },
  folderContainer: {
    border: "1px solid #e0d6f7",
    borderRadius: "12px",
    marginBottom: "12px",
    overflow: "hidden",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
  folderButton: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f5edff",
    color: "#5c2d91",
    border: "none",
    padding: "12px 16px",
    fontSize: "1.1rem",
    fontWeight: "500",
    cursor: "pointer",
  },
  dashboardList: { backgroundColor: "white", borderTop: "1px solid #e0d6f7" },
  dashboardLink: {
    display: "block",
    padding: "10px 20px",
    color: "#333",
    textDecoration: "none",
    transition: "background 0.2s",
  },
  /* Modal */
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalBox: {
    backgroundColor: "white",
    padding: "24px",
    borderRadius: "12px",
    width: "320px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  },
  input: {
    marginBottom: "10px",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  modalButton: {
    backgroundColor: "#5c2d91",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "500",
    marginBottom: "8px",
  },
  modalCancel: {
    backgroundColor: "#ddd",
    color: "#333",
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  error: { color: "red", fontSize: "0.9rem", marginBottom: "10px" },
};

export default App;
