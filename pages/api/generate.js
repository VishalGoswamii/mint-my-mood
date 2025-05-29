export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { mood } = req.body;

  if (!mood) {
    return res.status(400).json({ error: 'Mood is required' });
  }

  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      prompt: `an abstract illustration of the emotion: ${mood}`,
      n: 1,
      size: '512x512',
    }),
  });

  const data = await response.json();

  if (data.error) {
    return res.status(500).json({ error: data.error.message });
  }

  return res.status(200).json({ imageUrl: data.data[0].url });
}
