export default function handler(req, res) {
    const svg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <!-- Gradient Background -->
        <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#764ba2;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#f093fb;stop-opacity:1" />
            </linearGradient>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <dropShadow dx="4" dy="4" stdDeviation="3" flood-color="rgba(0,0,0,0.3)"/>
            </filter>
        </defs>
        
        <!-- Background -->
        <rect width="1200" height="630" fill="url(#grad1)"/>
        
        <!-- Main Title -->
        <text x="600" y="120" font-family="Arial, sans-serif" font-size="72" font-weight="bold" 
              text-anchor="middle" fill="white" filter="url(#shadow)">
            🎨 Mint My Mood
        </text>
        
        <!-- Subtitle -->
        <text x="600" y="180" font-family="Arial, sans-serif" font-size="28" 
              text-anchor="middle" fill="rgba(255,255,255,0.9)">
            What's Your Mood Today?
        </text>
        
        <!-- Mood Options Grid -->
        <!-- Happy -->
        <circle cx="225" cy="350" r="80" fill="rgba(255,215,0,0.3)" stroke="#FFD700" stroke-width="4"/>
        <text x="225" y="370" font-family="Arial, sans-serif" font-size="60" text-anchor="middle">😊</text>
        <text x="225" y="450" font-family="Arial, sans-serif" font-size="24" font-weight="bold" 
              text-anchor="middle" fill="white">Happy</text>
        
        <!-- Sad -->
        <circle cx="450" cy="350" r="80" fill="rgba(65,105,225,0.3)" stroke="#4169E1" stroke-width="4"/>
        <text x="450" y="370" font-family="Arial, sans-serif" font-size="60" text-anchor="middle">😢</text>
        <text x="450" y="450" font-family="Arial, sans-serif" font-size="24" font-weight="bold" 
              text-anchor="middle" fill="white">Sad</text>
        
        <!-- Calm -->
        <circle cx="750" cy="350" r="80" fill="rgba(32,178,170,0.3)" stroke="#20B2AA" stroke-width="4"/>
        <text x="750" y="370" font-family="Arial, sans-serif" font-size="60" text-anchor="middle">😴</text>
        <text x="750" y="450" font-family="Arial, sans-serif" font-size="24" font-weight="bold" 
              text-anchor="middle" fill="white">Calm</text>
        
        <!-- Energetic -->
        <circle cx="975" cy="350" r="80" fill="rgba(255,99,71,0.3)" stroke="#FF6347" stroke-width="4"/>
        <text x="975" y="370" font-family="Arial, sans-serif" font-size="60" text-anchor="middle">🔥</text>
        <text x="975" y="450" font-family="Arial, sans-serif" font-size="24" font-weight="bold" 
              text-anchor="middle" fill="white">Energetic</text>
        
        <!-- Bottom Text -->
        <text x="600" y="550" font-family="Arial, sans-serif" font-size="20" 
              text-anchor="middle" fill="rgba(255,255,255,0.8)">
            Choose your emotion and mint it as a colorful NFT!
        </text>
    </svg>
    `;
    
    res.setHeader('Content-Type', 'image/svg+xml');
    res.status(200).send(svg);
}
