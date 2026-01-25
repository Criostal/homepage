import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
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
import HappyNewYear2026 from './components/HappyNewYear2026';
import LinksSiteAdd from './components/addlink';

import './styles/App.css';
import { ListItem } from '@mui/material';

const App: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(open => !open);

    return (
        <Router>
            <div className="App">
                {/* Material AppBar */}
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={toggleMenu}
                            disableRipple
                            sx={{ mr: 2, width: 32, height: 32, borderRadius: '6px', bgcolor: 'transparent', p: 0.5 }}
                        >
                            <Menu size={20} />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Homepage
                        </Typography>
                        <Button color="inherit" component={Link} to="/">Home</Button>
                        <Button color="inherit" component={Link} to="/Weblinks">Links</Button>
                    </Toolbar>
                </AppBar>

                <Drawer anchor="left" open={menuOpen} onClose={() => setMenuOpen(false)}>
                    <Box sx={{ width: 260 }} role="presentation" onClick={() => setMenuOpen(false)} onKeyDown={() => setMenuOpen(false)}>
                        <List>
                            <ListItemButton component={Link} to="/Weblinks">
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
                            <Route path="/" element={<LinksSiteAsp />} />
                            <Route path="/cameras" element={<CamerasPage />} />
                            <Route path="/Weblinks" element={<NxLinks />} />
                            <Route path="/edit" element={<EditableGrid />} />
                            <Route path="/linkmanager" element={<LinkManager />} />
                            <Route path="/horses" element={<Horses />} />
                            <Route path="/keyboard" element={<Keyboard />} />
                            <Route path="/asplinks" element={<LinksSiteAsp />} />
                            <Route path="/addBookmark" element={<LinksSiteAdd />} />
                            <Route path="*" element={<h2>404 - Seite nicht gefunden</h2>} />
                        </Routes>
                    </main>
                </div>
            </div>
        </Router>
    );
};

export default App;