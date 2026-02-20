import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { Menu } from 'lucide-react';
import EditableGrid from './components/EditableGrid';
import CamerasPage from './components/cameras';
import NxLinks from './components/WebLinks';
import LinkManager from './components/linkmanager';
import Horses from './components/horses';
import Keyboard from './components/keyboard';
import LinksSiteAsp from './components/asplinks';
import Home from './components/Home';
import HappyNewYear2026 from './components/HappyNewYear2026';
import LinksSiteAdd from './components/addlink';
import Toast from './components/Toast';
import Healthcheck from './components/Healthcheck';
import Clipboard from './components/clipboard';

import './styles/App.css';
import { ListItem } from '@mui/material';

const App: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [theme, setTheme] = useState<'light'|'dark'>(() => (typeof window !== 'undefined' && window.localStorage.getItem('theme') === 'dark') ? 'dark' : 'light');

    useEffect(() => {
        if (typeof document !== 'undefined') {
            document.body.classList.toggle('dark', theme === 'dark');
        }
        try {
            if (typeof window !== 'undefined') window.localStorage.setItem('theme', theme);
        } catch (e) {
            // ignore
        }
    }, [theme]);

    const toggleMenu = () => setMenuOpen(open => !open);

    const AppHeader: React.FC<{ onToggleMenu: () => void; theme: 'light'|'dark'; onToggleTheme: () => void }> = ({ onToggleMenu, theme, onToggleTheme }) => {
        const location = useLocation();
        if (location.pathname === '/clipboard') return null;
        return (
            <AppBar position="static" color="transparent" >
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={onToggleMenu}
                        disableRipple
                        sx={{ mr: 2, width: 32, height: 32, borderRadius: '6px', bgcolor: 'transparent', p: 0.5 }}
                    >
                        <Menu size={20} />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Homepage
                    </Typography>
                    <Switch
                        checked={theme === 'dark'}
                        onChange={onToggleTheme}
                        color="default"
                        inputProps={{ 'aria-label': 'theme switch' }}
                        sx={{ mr: 1 }}
                    />
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/asplinks">web</Button>
                    <Button color="inherit" component={Link} to="/Weblinks">Nx</Button>
                </Toolbar>
            </AppBar>
        );
    };

    return (
        <Router>
            <div className="App">
                <AppHeader onToggleMenu={toggleMenu} theme={theme} onToggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} />

                <Drawer anchor="left" open={menuOpen} onClose={() => setMenuOpen(false)}>
                    <Box sx={{ width: 260 }} role="presentation" onClick={() => setMenuOpen(false)} onKeyDown={() => setMenuOpen(false)}>
                        <List>
                            <ListItemButton component={Link} to="/">
                                <ListItemText primary="Home" />
                            </ListItemButton>
                            <ListItemButton component={Link} to="/cameras">
                                <ListItemText primary="Cameras" />
                            </ListItemButton>
                            <ListItemButton component={Link} to="/Weblinks">
                                <ListItemText primary="Weblinks" />
                            </ListItemButton>
                            <ListItemButton component={Link} to="/linkmanager">
                                <ListItemText primary="Link Manager" />
                            </ListItemButton>
                            <ListItemButton component={Link} to="/horses">
                                <ListItemText primary="Horses" />
                            </ListItemButton>
                            <ListItemButton component={Link} to="/keyboard">
                                <ListItemText primary="Keyboard" />
                            </ListItemButton>
                            <ListItemButton component={Link} to="/asplinks">
                                <ListItemText primary="Bookmarks" />
                            </ListItemButton>
                            <ListItemButton component={Link} to="/addBookmark">
                                <ListItemText primary="Add bookmark" />
                            </ListItemButton>
                        </List>
                        <Divider />
                    </Box>
                </Drawer>
                <div className="container">
                    <main className="content">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/cameras" element={<CamerasPage />} />
                            <Route path="/Weblinks" element={<NxLinks />} />
                            <Route path="/edit" element={<EditableGrid />} />
                            <Route path="/linkmanager" element={<LinkManager />} />
                            <Route path="/horses" element={<Horses />} />
                            <Route path="/keyboard" element={<Keyboard />} />
                            <Route path="/asplinks" element={<LinksSiteAsp />} />
                            <Route path="/addBookmark" element={<LinksSiteAdd />} />
                            <Route path="*" element={<h2>404 - Seite nicht gefunden</h2>} />
                            <Route path="/toast" element={<Toast message="This is a toast notification! 403 (forbidden)" onClose={
() => console.log('Toast closed')
                            }/>} />
                            <Route path="/healthcheck" element={<Healthcheck />} />
                            <Route path="/clipboard" element={<Clipboard />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </Router>
    );
};

export default App;