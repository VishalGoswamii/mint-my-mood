export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { untrustedData } = req.body;
        const buttonIndex = untrustedData.buttonIndex;
        
        // Define mood data
        const moods = {
            1: { 
                name: "Happy", 
                color: "#FFD700", 
                emoji: "😊",
                bgColor: "#FFF8DC",
                description: "Radiating joy and positivity!"
            },
            2: { 
                name: "Sad", 
                color: "#4169E1", 
                emoji: "😢",
                bgColor: "#E6F3FF", 
                description: "Feeling blue but that's okay!"
            },
            3: { 
                name: "Calm", 
                color: "#20B2AA", 
                emoji: "😴",
                bgColor: "#F0FFFF",
                description: "Peace and tranquility within!"
            },
            4: { 
                name: "Energetic", 
                color: "#FF6347", 
                emoji: "🔥",
                bgColor: "#FFE4E1",
                description: "Full of energy and ready to go!"
            }
        };
        
        const selectedMood = moods[buttonIndex];
        
        if (!selectedMood) {
            return res.status(400).json({ error: 'Invalid mood selection' });
        }
        
        // Generate confirmation frame HTML
        const confirmationHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Confirm Your Mood - Mint My Mood</title>
            
            <!-- Farcaster Frame Meta Tags -->
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content="https://mint-my-mood-farcaster.vercel.app/images/confirm-${selectedMood.name.toLowerCase()}.png" />
            <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
            <meta property="fc:frame:button:1" content="✅ Mint ${selectedMood.emoji} NFT" />
            <meta property="fc:frame:button:1:action" content="post" />
            <meta property="fc:frame:button:2" content="← Back to Moods" />
            <meta property="fc:frame:button:2:action" content="post" />
            <meta property="fc:frame:post_url" content="https://mint-my-mood-farcaster.vercel.app/api/mint-nft" />
            <meta property="fc:frame:state" content='${JSON.stringify(selectedMood)}' />
            
            <!-- Open Graph Meta Tags -->
            <meta property="og:title" content="Confirm Your ${selectedMood.name} Mood" />
            <meta property="og:description" content="${selectedMood.description}" />
            <meta property="og:image" content="https://mint-my-mood-farcaster.vercel.app/images/confirm-${selectedMood.name.toLowerCase()}.png" />
        </head>
        <body style="font-family: Arial, sans-serif; background: ${selectedMood.bgColor}; margin: 0; padding: 20px; text-align: center;">
            <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
                <h1 style="font-size: 3em; margin-bottom: 20px; color: ${selectedMood.color};">
                    ${selectedMood.emoji} ${selectedMood.name} Mood
                </h1>
                <p style="font-size: 1.3em; margin-bottom: 30px; color: #333;">
                    ${selectedMood.description}
                </p>
                
                <div style="background: rgba(255,255,255,0.8); border-radius: 15px; padding: 30px; margin: 20px 0; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                    <h2 style="color: ${selectedMood.color}; margin-bottom: 20px;">Ready to Mint?</h2>
                    <p style="color: #666; margin-bottom: 15px;">This will create a unique NFT representing your ${selectedMood.name.toLowerCase()} mood today!</p>
                    <p style="color: #666; font-size: 0.9em;">Gas fee: ~$0.01 on Base network</p>
                </div>
            </div>
        </body>
        </html>
        `;
        
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(confirmationHtml);
        
    } catch (error) {
        console.error('Error in select-mood:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
