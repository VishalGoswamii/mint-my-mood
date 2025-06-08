export default function handler(req, res) {
    const svg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <!-- Gradient Background -->
        <defs>
            <radialGradient id="happyGrad" cx="50%" cy="50%" r="70%">
                <stop offset="0%" style="stop-color:#FFD700;stop-opacity:0.8" />
                <stop offset="50%" style="stop-color:#FFA500;stop-opacity:0.6" />
                <stop offset="100%" style="stop-color:#FF6347;stop-opacity:0.4" />
            </radialGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        
        <!-- Background -->
        <rect width="1200" height="630" fill="url(#happyGrad)"/>
        
        <!-- Floating Elements -->
        <circle cx="150" cy="100" r="15" fill="#FFD700" opacity="0.6"/>
        <circle cx="1050" cy="150" r="20" fill="#FFA500" opacity="0.5"/>
        <circle cx="200" cy="500" r="12" fill="#FF6347" opacity="0.7"/>
        <circle cx="1000" cy="480" r="18" fill="#FFD700" opacity="0.4"/>
        
        <!-- Main Emoji -->
        <text x="600" y="250" font-family="Arial, sans-serif" font-size="180" 
              text-anchor="middle" filter="url(#glow)">😊</text>
        
        <!-- Title -->
        <text x="600" y="350" font-family="Arial, sans-serif" font-size="64" font-weight="bold" 
              text-anchor="middle" fill="#FF6347" filter="url(#glow)">
            Happy Mood!
        </text>
        
        <!-- Description -->
        <text x="600" y="420" font-family="Arial, sans-serif" font-size="28" 
              text-anchor="middle" fill="#B8860B">
            Radiating joy and positivity! ✨
        </text>
        
        <!-- Mint Info -->
        <rect x="400" y="480" width="400" height="80" rx="15" fill="rgba(255,255,255,0.8)"/>
        <text x="600" y="510" font-family="Arial, sans-serif" font-size="20" font-weight="bold" 
              text-anchor="middle" fill="#FF6347">
            Ready to Mint Your Happy NFT?
        </text>
        <text x="600" y="535" font-family="Arial, sans-serif" font-size="16" 
              text-anchor="middle" fill="#666">
            Gas fee: ~$0.01 • One per day
        </text>
    </svg>
    `;
    
    res.setHeader('Content-Type', 'image/svg+xml');
    res.status(200).send(svg);
}
