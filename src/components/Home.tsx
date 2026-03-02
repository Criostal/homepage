import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import GridItem from './GridItem';
import '../styles/home.css';
import HouseIcon from '@mui/icons-material/House';
import { Icon } from '@mui/material';
import Mermaid from './Mermaid';

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

    const chart = `
    graph TD
    Browser["🖥️ Browser / Dashboard-App"]

    Browser -->|"Port 3000"| Grafana["📊 Grafana\npihole.fritz.box:3000"]
    Browser -->|"Port 8081"| ioBroker["🏠 ioBroker\n192.168.178.165:8081"]
    Browser -->|"Port 8086"| InfluxDB["🗄️ InfluxDB\n192.168.178.56:8086"]
    Browser -->|"Port 80"| OpenDTU["☀️ OpenDTU\n192.168.178.79"]

    InfluxDB -->|"Daten liefern"| Grafana
    ioBroker -->|"Metriken schreiben"| InfluxDB
    OpenDTU -->|"Solar-Daten"| ioBroker
  `;
  
    return (
        <Box className="home-page" sx={{ p: 3 }}>

            <Icon component={HouseIcon} sx={{ fontSize: 64, mb: 2 }} />

            <GridItem title="Home assistant" subtitle="Open common links" 
                onClick={() => OpenLink('http://homeassistant.local:8123/') } />

            <GridItem title="Pi Hole" subtitle="Open common links" 
                onClick={() => OpenLink('https://pihole.fritz.box/admin') } />

            <GridItem title="Dashboard" subtitle="Grafana dashboard"
                onClick={() => OpenLink('http://pihole.fritz.box:3000/d/a505cc22-2db3-4c68-8eea-c7db039c5cc4/leistung?orgId=1&from=now-2d&to=now&timezone=browser') } />
            
            <GridItem title="iobroker" subtitle="iobroker dashboard"
                onClick={() => OpenLink('http://192.168.178.165:8081/#tab-intro') } />

            <GridItem title="Influxdb" subtitle="influx datenbank"
                onClick={() => OpenLink('http://192.168.178.56:8086/') } />

            <GridItem title="OpenDtu" subtitle="OpenDtu"
                onClick={() => OpenLink('http://192.168.178.79/') } />

            <GridItem title="Open WebUI" subtitle="Open WebUI"
                onClick={() => OpenLink('http://192.168.178.108:8080') } />

            <Mermaid chart={chart} />

        </Box>
    );
};

export default Home;
