// pages/api/generate.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { mood } = req.body;

  if (!mood || typeof mood !== 'string') {
    return res.status(400).json({ error: 'Mood is required and must be a string' });
  }

  try {
    console.log('API /api/generate called');
    console.log('Received mood:', mood);

    const replicateResponse = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Authorization": `Token ${process.env.REPLICATE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "ac732df8", // Stable Diffusion v1.5
        input: {
          prompt: `a digital art representing the mood: ${mood}, in abstract colorful style`
        },
      }),
    });

    console.log('Replicate response status:', replicateResponse.status);

    if (!replicateResponse.ok) {
      const errorText = await replicateResponse.text();
      console.error('Replicate API error:', errorText);
      return res.status(replicateResponse.status).json({ error: errorText });
    }

    const json = await replicateResponse.json();
    console.log('Replicate response data:', json);

    // Wait for the prediction to complete (optional: you may want to poll or use webhooks for production)
    // For simplicity, assume prediction is done instantly (or check status)

    // The image URL might be inside json.prediction.output array, or in json.output (depending on API version)
    const imageUrl = json?.prediction?.output?.[0] || json?.output?.[0];

    if (!imageUrl) {
      return res.status(500).json({ error: 'No image URL found in Replicate response' });
    }

    return res.status(200).json({ imageUrl });

  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
