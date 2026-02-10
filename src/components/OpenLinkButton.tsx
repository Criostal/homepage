import React, { useMemo, useState } from 'react';
import { ExternalLink } from 'lucide-react';

interface OpenLinkButtonProps {
    url: string;
    ariaLabel?: string;
    size?: number;
    className?: string;
}

const OpenLinkButton: React.FC<OpenLinkButtonProps> = ({ url, ariaLabel = 'Öffnen', size = 18, className = '' }) => {
    const [showFavicon, setShowFavicon] = useState(true);

    return (
        <a className={`open-btn ${className}`} href={url} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}>
            <ExternalLink size={size} />
        </a>
    );
};

export default OpenLinkButton;
