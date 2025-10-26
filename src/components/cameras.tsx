import React from 'react';
import '../styles/cameras.css'; // Importieren Sie Ihre CSS-Datei für die Stile

const CamerasPage: React.FC = () => {
    const openInNewWindow = (url: string) => {
        window.open(
            url,
            '_blank',
            'width=800,height=600,scrollbars=yes,resizable=yes'
        );
    };

    return (
        <div className="cameras-page-container">
            <div>
                <h2>web cams</h2>
                <div className="button-container">
                    <button onClick={() => openInNewWindow('http://webserver.fritz.box/cam/show.html')}>kameras</button>
                    <button onClick={() => openInNewWindow('http://webserver.fritz.box/cam/front.html')}>front</button>
                    <button onClick={() => openInNewWindow('http://pihole.fritz.box:3000/')}>grafana</button>
                </div>
            </div>
            <div className="grafana-dashboard">
                <h3>Grafana Dashboard</h3>
                <a
                    href="http://pihole.fritz.box:3000/d/a505cc22-2db3-4c68-8eea-c7db039c5cc4/leistung?orgId=1&from=now-6h&to=now&timezone=browser"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Dashboard öffnen
                </a>
            </div>
        </div>
    );
};

export default CamerasPage;