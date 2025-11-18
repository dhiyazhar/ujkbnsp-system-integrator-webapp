import './App.css'

function App() {
  const namaPeserta = "Muhammad Nur Azhar Dhiyaulhaq"; 

  return (
    <div className="page-container">
      <div className="main-card">
        <p className="header-text">Uji Kompetensi BNSP</p>
        <h1 className="participant-name">{namaPeserta}</h1>
        <p className="scheme-text">System Integrator</p>
        <p className="scheme-text">v3</p>

        
        <div className="deployment-status">
          <span className="status-dot"></span>
          <p></p>
        </div>
      </div>
    </div>
  )
}

export default App