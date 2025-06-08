export default function handler(req, res) {
    const svg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <!-- Gradient Background -->
        <defs>
            <radialGradient id="successGrad" cx="50%" cy="50%" r="80%">
                <stop offset="0%" style="stop-color:#00FF7F;stop-opacity:0.8" />
                <stop offset="30%" style="stop-color:#32CD32;stop-opacity:0.6" />
                <stop offset="60%" style="stop-color:#FFD700;stop-opacity:0.4" />
                <stop offset="100%" style="stop-color:#FF69B4;stop-opacity:0.3" />
            </radialGradient>
            <filter id="sparkle" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        
        <!-- Background -->
        <rect width="1200" height="630" fill="url(#successGrad)"/>
        
        <!-- Confetti -->
        <rect x="200" y="80" width="8" height="8" fill="#FF69B4" opacity="0.8" transform="rotate(45 204 84)"/>
        <rect x="800" y="120" width="6" height="6" fill="#00FF7F" opacity="0.9" transform="rotate(30 803 123)"/>
        <rect x="300" y="500" width="10" height="10" fill="#FFD700" opacity="0.7" transform="rotate(60 305 505)"/>
        <rect x="900" y="480" width="7" height="7" fill="#FF6347" opacity="0.8" transform="rotate(15 903.5 483.5)"/>
        <rect x="150" y="300" width="9" height="9" fill="#32CD32" opacity="0.6" transform="rotate(75 154.5 304.5)"/>
        <rect x="1000" y="300" width="8" height="8" fill="#FF69B4" opacity="0.7" transform="rotate(20 1004 304)"/>
        
        <!-- Stars -->
        <text x="250" y="150" font-family="Arial, sans-serif" font-size="30" fill="#FFD700" opacity="0.8">⭐</text>
        <text x="950" y="180" font-family="Arial, sans-serif" font-size="25" fill="#FFD700" opacity="0.6">✨</text>
        <text x="180" y="450" font-family="Arial, sans-serif" font-size="28" fill="#FFD700" opacity="0.7">🌟</text>
        <text x="1020" y="420" font-family="Arial, sans-serif" font-size="24" fill="#FFD700" opacity="0.9">⭐</text>
        
        <!-- Main Success Icon -->
        <circle cx="600" cy="200" r="70" fill="rgba(255,255,255,0.9)" filter="url(#sparkle)"/>
        <text x="600" y="230" font-family="Arial, sans-serif" font-size="80" 
              text-anchor="middle" fill="#00FF7F">✅</text>
        
        <!-- Success Title -->
        <text x="600" y="320" font-family="Arial, sans-serif" font-size="64" font-weight="bold" 
              text-anchor="middle" fill="white" filter="url(#sparkle)">
            🎉 SUCCESS! 🎉
        </text>
        
        <!-- Description -->
        <text x="600" y="380" font-family="Arial, sans-serif" font-size="32" 
              text-anchor="middle" fill="rgba(255,255,255,0.9)">
            Your Mood NFT Has Been Minted!
        </text>
        
        <!-- Info Box -->
        <rect x="300" y="440" width="600" height="120" rx="20" fill="rgba(255,255,255,0.9)"/>
        <text x="600" y="470" font-family="Arial, sans-serif" font-size="20" font-weight="bold" 
              text-anchor="middle" fill="#00AA00">
            🎨 NFT Created Successfully
        </text>
        <text x="600" y="500" font-family="Arial, sans-serif" font-size="16" 
              text-anchor="middle" fill="#666">
            Token ID: #${Date.now()}
        </text>
        <text x="600" y="525" font-family="Arial, sans-serif" font-size="16" 
              text-anchor="middle" fill="#666">
            Date: ${new Date().toISOString().split('T')[0]} • Network: Base
        </text>
        <text x="600" y="545" font-family="Arial, sans-serif" font-size="14" 
              text-anchor="middle" fill="#888">
            Come back tomorrow to mint your next mood! 🔥
        </text>
    </svg>
    `;
    
    res.setHeader('Content-Type', 'image/svg+xml');
    res.status(200).send(svg);
}
