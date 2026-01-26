import React, { useState } from "react";

const imagesJson = require('../assets/images/images.json');

const Keyboard: React.FC = () => {
    const [current, setCurrent] = useState(0);

    const prevImage = () => setCurrent((c) => (c === 0 ? imagesJson.length - 1 : c - 1));
    const nextImage = () => setCurrent((c) => (c === imagesJson.length - 1 ? 0 : c + 1));

    return (
        <div style={{
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 2px 12px 0 rgba(0,0,0,0.10)",
            padding: 32,
            minHeight: 200
        }}>
            <h2>Keyboard</h2>
            <p>
                Die Tastatur ist eines der wichtigsten Eingabegeräte für Computer. Sie ermöglicht es, Buchstaben, Zahlen und Sonderzeichen einzugeben und verschiedene Befehle auszuführen. Es gibt viele verschiedene Tastatur-Layouts, wobei das QWERTZ-Layout im deutschsprachigen Raum am weitesten verbreitet ist. Moderne Tastaturen unterscheiden sich in Bauform, Tastenanzahl und Zusatzfunktionen. Mechanische Tastaturen sind besonders bei Vielschreibern und Gamern beliebt, während flache Chiclet-Tastaturen oft bei Laptops zum Einsatz kommen. Neben kabelgebundenen Varianten gibt es auch viele kabellose Tastaturen, die per Bluetooth oder Funk verbunden werden. Die Entwicklung der Tastatur ist eng mit der Geschichte der Schreibmaschine verbunden, aus der sie ursprünglich hervorging.
            </p>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 32,
                marginTop: 64
            }}>
                <button
                    onClick={prevImage}
                    style={{
                        fontSize: 22,
                        background: "#f0f4fa",
                        border: "1px solid #1976d2",
                        borderRadius: 8, // viereckig
                        cursor: "pointer",
                        color: "#1976d2",
                        padding: "0",
                        minWidth: 38,
                        minHeight: 38,
                        width: 38,
                        height: 38,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                    aria-label="Vorheriges Bild"
                >
                    &#8592;
                </button>
                <img
                    src={require(`../assets/images/${imagesJson[current].filename}`)}
                    alt={imagesJson[current].alt || imagesJson[current].title || `Bild ${current + 1}`}
                    title={imagesJson[current].title}
                    style={{
                        width: 800,
                        height: 500,
                        objectFit: "cover",
                        borderRadius: 16,
                        boxShadow: "0 4px 24px 0 rgba(0,0,0,0.13)",
                        background: "#eee"
                    }}
                />
                <button
                    onClick={nextImage}
                    style={{
                        fontSize: 22,
                        background: "#f0f4fa",
                        border: "1px solid #1976d2",
                        borderRadius: 8, // viereckig
                        cursor: "pointer",
                        color: "#1976d2",
                        padding: "0",
                        minWidth: 38,
                        minHeight: 38,
                        width: 38,
                        height: 38,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                    aria-label="Nächstes Bild"
                >
                    &#8594;
                </button>
            </div>
            <div style={{ textAlign: "center", marginTop: 16, color: "#555" }}>
                {imagesJson[current].title || `Bild ${current + 1}`}
            </div>
        </div>
    );
};

export default Keyboard;