export default async function handler(req, res) {
  console.log('API /api/generate called');  // Log function entry

  if (req.method !== 'POST') {
    console.log('Invalid method:', req.method);
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  try {
    const { mood } = req.body;
    console.log('Received mood:', mood);

    if (!mood) {
      console.log('No mood provided');
      return res.status(400).json({ error: 'Mood is required' });
    }

    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
  prompt: `a colorful digital art representing the feeling of being ${mood}, in an abstract, artistic style`,
  n: 1,
  size: '1024x1024',
  model: 'dall-e-3',
}),

    });

    console.log('OpenAI response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.log('OpenAI API error:', errorData);
      return res.status(response.status).json({ error: errorData.error?.message || 'OpenAI API error' });
    }

    const data = await response.json();
    console.log('OpenAI response data:', data);

    if (!data.data || data.data.length === 0) {
      console.log('No image data returned');
      return res.status(500).json({ error: 'No image data returned' });
    }

    return res.status(200).json({ imageUrl: data.data[0].url });

  } catch (error) {
    console.error('Unexpected error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
