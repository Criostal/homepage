import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import GridItem from './GridItem';
import '../styles/home.css';
import HouseIcon from '@mui/icons-material/House';
import { Icon } from '@mui/material';

const Home: React.FC = () => {
    const items = [
        { title: 'Quick Links', subtitle: 'Open common links' },
        { title: 'Cameras', subtitle: 'View camera feeds' },
        { title: 'Link Manager', subtitle: 'Manage bookmarks' },
        { title: 'Horses', subtitle: 'Horse info' },
    ];

    function OpenLink(url: string) {
        window.open(url, '_blank');
    }

    return (
        <Box className="home-page" sx={{ p: 3 }}>

            <Icon component={HouseIcon} sx={{ fontSize: 64, mb: 2 }} />

            <GridItem title="Home assistant" subtitle="Open common links" 
                onClick={() => OpenLink('http://homeassistant.local:8123/') } />

            <GridItem title="Pi Hole" subtitle="Open common links" 
                onClick={() => OpenLink('https://pihole.fritz.box/admin') } />

            <GridItem title="Dashboard" subtitle="Grafana dashboard"
                onClick={() => OpenLink('http://pihole.fritz.box:3000/d/a505cc22-2db3-4c68-8eea-c7db039c5cc4/leistung?orgId=1&from=now-2d&to=now&timezone=browser') } />



        </Box>
    );
};

export default Home;
