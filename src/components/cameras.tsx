import React, { useRef, useState } from 'react';
import '../styles/cameras.css'; // Importieren Sie Ihre CSS-Datei für die Stile

const CamerasPage: React.FC = () => {
    const [embedUrl, setEmbedUrl] 
        = useState("http://192.168.178.51/action/snap?cam=0&user=admin&pwd=12345&" + new Date().getTime());
    const [embedUrl2, setEmbedUrl2]
        = useState("http://192.168.178.58/action/snap?cam=0&user=admin&pwd=12345&" + new Date().getTime());
    const iframeRef = useRef<HTMLIFrameElement | null>(null);
    const iframeRef2 = useRef<HTMLIFrameElement | null>(null);
    
    const openInNewWindow = (url: string) => {
        window.open(
            url,
            '_blank',
            'width=800,height=600,scrollbars=yes,resizable=yes'
        );
    };

    const loadEmbed = () => {
        if (iframeRef.current) {
            // change src to trigger reload
            iframeRef.current.src = embedUrl;
        }
    };

    const refreshEmbed = (which: 1 | 2 = 1) => {
        const ref = which === 1 ? iframeRef.current : iframeRef2.current;
        if (ref) {
            try {
                ref.contentWindow?.location.reload();
            } catch {
                ref.src = ref.src;
            }
        }
    };

    return (
        <div className="cameras-page-container">
            <div>
                <h2>web cams</h2>
                <div className="cam-button-container">
                    <button onClick={() => openInNewWindow('http://webserver.fritz.box/cam/show.html')}>kameras</button>
                    <button onClick={() => openInNewWindow('http://webserver.fritz.box/cam/front.html')}>front</button>
                    <button onClick={() => openInNewWindow('http://pihole.fritz.box:3000/')}>grafana</button>
                </div>

                {/* Stack the two preview windows vertically */}
                <div style={{ display: 'flex', flexDirection: 'row', gap: 12, marginTop: 12 }}>
                    <div className="preview-window" style={{ height: 240, border: '1px solid #ddd', borderRadius: 6, overflow: 'hidden' }}>
                        <iframe
                            ref={iframeRef}
                            title="embed-preview-1"
                            src={embedUrl}
                            style={{ width: '100%', height: '100%', border: 0 }}
                        />
                    </div>

                    <div className="preview-window" style={{ height: 240, border: '1px solid #ddd', borderRadius: 6, overflow: 'hidden' }}>
                        <iframe
                            ref={iframeRef2}
                            title="embed-preview-2"
                            src={embedUrl2}
                            style={{ width: '100%', height: '100%', border: 0 }}
                        />
                    </div>
                </div>
            </div>

            <div className="grafana-dashboard" style={{ marginTop: 18 }}>
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