export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { untrustedData, trustedData } = req.body;
        const buttonIndex = untrustedData.buttonIndex;
        
        // Handle back button
        if (buttonIndex === 2) {
            const backHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>Mint My Mood</title>
                
                <!-- Farcaster Frame Meta Tags -->
                <meta property="fc:frame" content="vNext" />
                <meta property="fc:frame:image" content="https://mint-my-mood-farcaster.vercel.app/images/mood-selector.png" />
                <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
                <meta property="fc:frame:button:1" content="😊 Happy" />
                <meta property="fc:frame:button:1:action" content="post" />
                <meta property="fc:frame:button:2" content="😢 Sad" />
                <meta property="fc:frame:button:2:action" content="post" />
                <meta property="fc:frame:button:3" content="😴 Calm" />
                <meta property="fc:frame:button:3:action" content="post" />
                <meta property="fc:frame:button:4" content="🔥 Energetic" />
                <meta property="fc:frame:button:4:action" content="post" />
                <meta property="fc:frame:post_url" content="https://mint-my-mood-farcaster.vercel.app/api/select-mood" />
            </head>
            <body>
                <p>Back to mood selection...</p>
            </body>
            </html>
            `;
            
            res.setHeader('Content-Type', 'text/html');
            return res.status(200).send(backHtml);
        }
        
        // For now, we'll simulate the minting process
        // In production, you'd integrate with your smart contract here
        
        const currentDate = new Date().toISOString().split('T')[0];
        const tokenId = Date.now(); // Simple token ID generation
        
        // Simulate successful minting
        const successHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Mood NFT Minted! - Mint My Mood</title>
            
            <!-- Farcaster Frame Meta Tags -->
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content="https://mint-my-mood-farcaster.vercel.app/images/success.png" />
            <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
            <meta property="fc:frame:button:1" content="🎉 Share Success" />
            <meta property="fc:frame:button:1:action" content="link" />
            <meta property="fc:frame:button:1:target" content="https://warpcast.com/~/compose?text=Just%20minted%20my%20daily%20mood%20NFT%20with%20Mint%20My%20Mood!%20🎨✨%20https://mint-my-mood-farcaster.vercel.app" />
            <meta property="fc:frame:button:2" content="🔄 Mint Tomorrow" />
            <meta property="fc:frame:button:2:action" content="post" />
            <meta property="fc:frame:button:3" content="📊 View Collection" />
            <meta property="fc:frame:button:3:action" content="link" />
            <meta property="fc:frame:button:3:target" content="https://opensea.io" />
            <meta property="fc:frame:post_url" content="https://mint-my-mood-farcaster.vercel.app" />
            
            <!-- Open Graph Meta Tags -->
            <meta property="og:title" content="Mood NFT Successfully Minted!" />
            <meta property="og:description" content="Daily mood NFT created on ${currentDate}" />
            <meta property="og:image" content="https://mint-my-mood-farcaster.vercel.app/images/success.png" />
        </head>
        <body style="font-family: Arial, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); margin: 0; padding: 20px; color: white; text-align: center;">
            <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
                <h1 style="font-size: 3em; margin-bottom: 20px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">🎉 Success!</h1>
                <p style="font-size: 1.3em; margin-bottom: 30px;">Your mood NFT has been minted!</p>
                
                <div style="background: rgba(255,255,255,0.1); border-radius: 15px; padding: 30px; backdrop-filter: blur(10px); margin: 20px 0;">
                    <h2 style="margin-bottom: 20px;">NFT Details:</h2>
                    <p><strong>Token ID:</strong> #${tokenId}</p>
                    <p><strong>Date:</strong> ${currentDate}</p>
                    <p><strong>Network:</strong> Base</p>
                    <p><strong>Status:</strong> ✅ Minted</p>
                </div>
                
                <p style="font-size: 0.9em; opacity: 0.8; margin-top: 30px;">Come back tomorrow to mint your next mood!</p>
            </div>
        </body>
        </html>
        `;
        
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(successHtml);
        
    } catch (error) {
        console.error('Error in mint-nft:', error);
        
        const errorHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Minting Error - Mint My Mood</title>
            
            <!-- Farcaster Frame Meta Tags -->
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content="https://mint-my-mood-farcaster.vercel.app/images/error.png" />
            <meta property="fc:frame:button:1" content="🔄 Try Again" />
            <meta property="fc:frame:button:1:action" content="post" />
            <meta property="fc:frame:post_url" content="https://mint-my-mood-farcaster.vercel.app" />
        </head>
        <body style="text-align: center; padding: 40px; font-family: Arial, sans-serif;">
            <h1 style="color: #ff4444;">⚠️ Minting Failed</h1>
            <p>Something went wrong. Please try again!</p>
        </body>
        </html>
        `;
        
        res.setHeader('Content-Type', 'text/html');
        res.status(500).send(errorHtml);
    }
}
