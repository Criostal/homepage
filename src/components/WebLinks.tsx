import React from "react";
import "../styles/Weblinks.css";

// Icon-Auswahl pro Kategorie
const categoryIcons: Record<string, string> = {
    "Entwicklung": "💻",
    "Wissen": "📚",
    "Projektmanagement": "📈",
    "HR": "👥",
    "Zeiterfassung": "⏱️",
    "Datenbank": "🗄️",
    "Support": "🛠️",
    "Amts": "🏛️",
    "Api": "🔗",
    "Dokumentation": "📄"
};

type Weblink = {
    label: string;
    url: string;
    category: string;
};

const weblinks: Weblink[] = [
    { label: "GitHub", url: "https://www.github.com", category: "Entwicklung" },
    { label: "React", url: "https://www.reactjs.org", category: "Entwicklung" },
    { label: "Stack Overflow", url: "https://stackoverflow.com", category: "Entwicklung" },
    { label: "Jira sprint medi", url: "https://servicedesk.nexus-ag.de/secure/RapidBoard.jspa?rapidView=1843&projectKey=PNXCMC&quickFilter=2507#", category: "Sprint" },
    { label: "Mitarbeiterportal", url: "https://ess.nexus-ag.de/", category: "HR" },
    { label: "Tempo", url: "https://servicedesk.nexus-ag.de/secure/Tempo.jspa#/my-work/week?type=LIST", category: "Sprint" },
    { label: "Hotfix db", url:"http://191.100.2.124/hotfix/", category: "Datenbank" },
    { label: "Changeset - Hotfix", url: "https://ds-vm-csovcs01.nexus.int/NxCollection/Medication/_git/DatabaseMigrationTool?path=%2FChangesetId-Hotfix.xml&version=GBmaster", category: "Datenbank"},
    { label: "Ticket IT" , url:"https://servicedesk.nexus-ag.de/servicedesk/customer/portal/143", category: "Support" },
    { label: "Ticket IT query" , url:"https://servicedesk.nexus-ag.de/projects/NXITINT/queues/custom/1705", category: "Support" },
    { label: "Amts dashboard local", url:"http://cch-ds-lap01.nexus.int:82/", category: "Amts" },
    { label: "Amts dashboard", url:"https://ds-vm-mbuild03.nexus.int:442/", category: "Amts" },
    { label: "Amts check (NL)", url: "http://ds-vm-mdb01.nexus.int:84/", category: "Amts" },
    { label: "swagger eps24.2 mbuild03", url:"https://ds-vm-mbuild03.nexus.int/medication/eps24.2/swagger/index.html", category: "Api" },
    { label: "swagger eps 133", url: "http://191.100.43.133/NexusKis/medication/eps/swagger/index.html", category: "Api" },
    { label: "Dosing Server", url:"http://ds-vm-all-do-02/", category: "Api" },
    { label: "Id Server", url:"https://ds-vm-mtest-idb.nexus.int/webcomponents/webcomponents.html", category: "Api" },
    { label: "eps 24.2", url:"file://vs-file01/Entwicklung_MediChart/Test/MEDI_CHART_24_1/Medication/24.1.7.1-RC/api-doc/articles/intro.html", category: "Api" },
    { label: "Confluence medi", url:"https://confluence.nexus-ag.de/display/MED/CMC+Team+Space", category: "Dokumentation" },
    { label: "Medication Tec Doc", url:"https://confluence.nexus-ag.de/pages/viewpage.action?pageId=180908220", category: "Dokumentation" },
    { label: "Oracle 19c dev", url:"https://docs.oracle.com/en/database/oracle/oracle-database/19/index.html", category: "Datenbank" },
    { label: "Sprint", url: "https://ds-vm-csovcs01.nexus.int/NxCollection/Medication/_sprints/taskboard/Medication%20Team/Medication/Sprint", category: "Sprint" },
    { label: "Pull requests", url: "https://ds-vm-csovcs01.nexus.int/NxCollection/Medication/_apps/hub/ryanstedman.tfs-pullrequest-dashboard.tfs-pullrequest-dashboard", category: "Sprint" },
    { label: "Amts - Doku", url: "https://confluence.nexus-ag.de/x/iiYeBQ", category: "Dokumentation" },
    // Weitere Links...
];

// Farben pro Kategorie
const categoryColors: Record<string, string> = {
    "Entwicklung": "#388e3c",
    "Wissen": "#388e3c",
    "Projektmanagement": "#fbc02d",
    "HR": "#8e24aa",
    "Zeiterfassung": "#00838f",
    "Datenbank": "#d84315",
    "Support": "#455a64",
    "Amts": "#c2185b",
    "Api": "#c2185b",
    "Dokumentation": "#c2185b",
    "Sprint": "#c2185b",
};

// Helle Farbverläufe für die Kategorie-Hintergründe
const categoryBackgrounds: Record<string, string> = {
    "Entwicklung": "linear-gradient(135deg, #e0f3fa 60%, #f6fcff 100%)",
    "Wissen": "linear-gradient(135deg, #e6f5ea 60%, #f8fcf9 100%)",
    "Projektmanagement": "linear-gradient(135deg, #fff9e1 60%, #fffef7 100%)",
    "HR": "linear-gradient(135deg, #f3e6fa 60%, #faf6fd 100%)",
    "Zeiterfassung": "linear-gradient(135deg, #e0f7fa 60%, #f6feff 100%)",
    "Datenbank": "linear-gradient(135deg, #e0f3fa 60%, #f6fcff 100%)",
    "Support": "linear-gradient(135deg, #f3e6fa 60%, #faf6fd 100%)",
    "Amts": "linear-gradient(135deg, #fff3e0 60%, #fffbea 100%)",
    "Api": "linear-gradient(135deg, #e0f3fa 60%, #f6fcff 100%)",
    "Dokumentation": "linear-gradient(135deg, #e0f3fa 60%, #f6fcff 100%)",
    "Sprint": "linear-gradient(135deg, #fff3e0 60%, #fffbea 100%)"
};

const groupedLinks = weblinks.reduce<Record<string, Weblink[]>>((acc, link) => {
    if (!acc[link.category]) acc[link.category] = [];
    acc[link.category].push(link);
    return acc;
}, {});

const Weblinks: React.FC = () => {
    // Links im neuen Tab öffnen (ohne window.open, sondern mit <a target="_blank">)
    // Kategorien sortieren: "Sprint" zuerst, dann alphabetisch
    const sortedCategories = Object.keys(groupedLinks).sort((a, b) => {
        if (a === "Sprint") return -1;
        if (b === "Sprint") return 1;
        return a.localeCompare(b);
    });

    return (
        <div>
            {sortedCategories.map(category => {
                const links = groupedLinks[category];
                const half = Math.ceil(links.length / 2);
                const col1 = links.slice(0, half);
                const col2 = links.slice(half);

                return (
                    <div
                        key={category}
                        style={{
                            marginBottom: 16,
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 14,
                            borderRadius: 18,
                            boxShadow: "0 4px 24px 0 rgba(0,0,0,0.07)",
                            background: categoryBackgrounds[category] || "#f5f5f5",
                            padding: "12px 9px"
                        }}
                    >
                        <h3
                            style={{
                                minWidth: 180,
                                margin: 0,
                                paddingTop: 10,
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                color: "#111", // <-- Text jetzt schwarz
                                textShadow: "0 2px 8px rgba(0,0,0,0.07)"
                            }}
                        >
                            {category}
                            <span style={{ fontSize: 18 }}>
                                {categoryIcons[category] || "🔗"}
                            </span>
                        </h3>
                        <div style={{ display: "flex", flexDirection: "row", gap: 8 }}>
                            <div className="button-container" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                {col1.map(link => (
                                    <a
                                        key={link.url}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            background: "rgba(255,255,255,0.18)",
                                            border: "1.5px solid rgba(30, 144, 255, 0.18)",
                                            borderRadius: 8,
                                            color: "#1976d2",
                                            padding: "10px 20px",
                                            width: 220,
                                            fontSize: 16,
                                            cursor: "pointer",
                                            marginBottom: 0,
                                            boxShadow: `0 4px 24px 0 ${categoryColors[category] || "#607d8b"}33, 0 2px 8px 0 rgba(0,0,0,0.10)`,
                                            textDecoration: "none",
                                            display: "inline-block",
                                            textAlign: "center",
                                            transition: "box-shadow 0.2s, filter 0.2s, background 0.2s, border 0.2s",
                                            backdropFilter: "blur(8px)",
                                            WebkitBackdropFilter: "blur(8px)"
                                        }}
                                        onMouseOver={e => (e.currentTarget.style.filter = "brightness(1.08) drop-shadow(0 0 8px #fff)")}
                                        onMouseOut={e => (e.currentTarget.style.filter = "")}
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                            <div className="button-container" style={{ display: "inline", flexDirection: "column", gap: 8 }}>
                                {col2.map(link => (
                                    <a
                                        key={link.url}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            background: "rgba(255,255,255,0.18)",
                                            border: "1.5px solid rgba(30, 144, 255, 0.18)",
                                            borderRadius: 8,
                                            color: "#1976d2",
                                            padding: "10px 20px",
                                            width: 220,
                                            fontSize: 16,
                                            cursor: "pointer",
                                            marginBottom: 0,
                                            boxShadow: `0 4px 24px 0 ${categoryColors[category] || "#607d8b"}33, 0 2px 8px 0 rgba(0,0,0,0.10)`,
                                            textDecoration: "none",
                                            display: "inline-block",
                                            textAlign: "center",
                                            transition: "box-shadow 0.2s, filter 0.2s, background 0.2s, border 0.2s",
                                            backdropFilter: "blur(8px)",
                                            WebkitBackdropFilter: "blur(8px)"
                                        }}
                                        onMouseOver={e => (e.currentTarget.style.filter = "brightness(1.08) drop-shadow(0 0 8px #fff)")}
                                        onMouseOut={e => (e.currentTarget.style.filter = "")}
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Weblinks;