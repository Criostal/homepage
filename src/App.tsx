import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import EditableGrid from './components/EditableGrid';
import CamerasPage from './components/cameras';
import NxLinks from './components/WebLinks';
import LinkManager from './components/linkmanager';
import Horses from './components/horses';
import Keyboard from './components/keyboard';
import './styles/App.css';

const App: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(open => !open);

    return (
        <Router>
            <div className="App">
                {/* Menüleiste oben */}
                <header className="top-menu">
                    <nav className={menuOpen ? 'open' : ''}>
                        <ul>
                            <li><Link to="/" onClick={() => setMenuOpen(false)}>home</Link></li>
                            <li><Link to="/cameras" onClick={() => setMenuOpen(false)}>cameras</Link></li>
                            <li><Link to="/Weblinks" onClick={() => setMenuOpen(false)}>weblinks</Link></li>
                            <li><Link to="/linkmanager" onClick={() => setMenuOpen(false)}>linkmanager</Link></li>
                            <li><Link to="/horses" onClick={() => setMenuOpen(false)}>horses</Link></li>
                            <li><Link to="/keyboard" onClick={() => setMenuOpen(false)}>keyboards</Link></li>
                        </ul>
                    </nav>
                </header>
                <div className="container">
                    <main className="content">
                        <Routes>
                            <Route path="/" element={<NxLinks />} />
                            <Route path="/cameras" element={<CamerasPage />} />
                            <Route path="/Weblinks" element={<NxLinks />} />
                            <Route path="/edit" element={<EditableGrid />} />
                            <Route path="/linkmanager" element={<LinkManager />} />
                            <Route path="/horses" element={<Horses />} />
                            <Route path="/keyboard" element={<Keyboard />} />
                            <Route path="*" element={<h2>404 - Seite nicht gefunden</h2>} />
                        </Routes>
                    </main>
                </div>
            </div>
        </Router>
    );
};

export default App;