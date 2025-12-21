import React, { useRef, useState, useEffect } from 'react';
import '../styles/cameras.css'; // Importieren Sie Ihre CSS-Datei für die Stile

const BASE1 = "http://192.168.178.51/action/snap?cam=0&user=admin&pwd=12345";
const BASE2 = "http://192.168.178.58/action/snap?cam=0&user=admin&pwd=12345";

const Base1Gui = "http://192.168.178.51/?user=admin";
const Base2Gui = "http://192.168.178.58/?user=admin";

const CamerasPage: React.FC = () => {

    const [embedUrl, setEmbedUrl] 
        = useState(`${BASE1}&_ts=${Date.now()}`);
    const [embedUrl2, setEmbedUrl2]
        = useState(`${BASE2}&_ts=${Date.now()}`);
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

    const moveCam = async (cmd: string, hori: number | string, vert: number | string) => {
        try {
            // derive host + auth params from BASE1
            const base = new URL(BASE1);
            const origin = base.origin;
            const user = base.searchParams.get('user');
            const pwd = base.searchParams.get('pwd');

            const ptzUrl = new URL('/action/ptz', origin);
            ptzUrl.searchParams.set('subject', 'ctrl');
            if (user) ptzUrl.searchParams.set('user', user);
            if (pwd) ptzUrl.searchParams.set('pwd', pwd);

            const xml = `<?xml version="1.0" encoding="utf-8"?>` +
                `<request>` +
                `<ptzcmd>` +
                `<cmd>${cmd}</cmd>` +
                `<move>` +
                `<hori>${hori}</hori>` +
                `<vert>${vert}</vert>` +
                `</move>` +
                `</ptzcmd>` +
                `</request>`;

            const res = await fetch(ptzUrl.toString(), {
                method: 'POST',
                headers: { 'Content-Type': 'application/xml' },
                body: xml,
            });

            if (!res.ok) {
                console.error('PTZ request failed', res.status, await res.text());
            }
        } catch (err) {
            console.error('PTZ error', err);
        }
    };

        // timer: reload both iframes every 5 seconds with cache-busting timestamp
    useEffect(() => {
        const tick = () => {
            const url1 = `${BASE1}${BASE1.includes('?') ? '&' : '?'}_ts=${Date.now()}`;
            const url2 = `${BASE2}${BASE2.includes('?') ? '&' : '?'}_ts=${Date.now()}`;
            if (iframeRef.current) iframeRef.current.src = url1;
            if (iframeRef2.current) iframeRef2.current.src = url2;
            setEmbedUrl(url1);
            setEmbedUrl2(url2);
        };

        const id = setInterval(tick, 15000);
        return () => clearInterval(id);
    }, []);

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
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
                    <div className="preview-window" style={{ height: 480, width:720,  border: '1px solid #ddd', borderRadius: 6, overflow: 'hidden' }}>
                        <iframe
                            ref={iframeRef}
                            title="embed-preview-1"
                            src={embedUrl}
                            style={{ width: '100%', height: '100%', border: 0, overflow: 'hidden', display: 'block' }}
                        />
                    </div>

                <div className="cam-button-steering" style={{ marginTop: 12 }}>
                    <button onClick={() => refreshEmbed()}>Refresh</button>
                    <button onClick={() => openInNewWindow(Base1Gui)}>gui</button>
                </div>


                <div className="preview-window" style={{ height: 480, width:720, border: '1px solid #ddd', borderRadius: 6, overflow: 'hidden' }}>
                    <iframe
                        ref={iframeRef2}
                        title="embed-preview-2"
                        src={embedUrl2}
                        style={{ width: '100%', height: '100%', border: 0, overflow: 'hidden', display: 'block' }}
                    />
                </div>

                <button onClick={() => refreshEmbed(2)}>Refresh</button>
                <button onClick={() => openInNewWindow(Base2Gui)}>gui</button>

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