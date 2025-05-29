import Head from 'next/head'
import { useState } from 'react'
import axios from 'axios'

const MOODS = [
  { name: 'Happy', emoji: '😊' },
  { name: 'Sleepy', emoji: '😴' },
  { name: 'Angry', emoji: '😡' },
  { name: 'Stressed', emoji: '🤯' },
  { name: 'Focused', emoji: '🤔' },
]

export default function Home() {
  const [mood, setMood] = useState('')
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)

  const generateImage = async (selectedMood) => {
    setLoading(true)
    setImage('')
    try {
      const res = await axios.post('/api/generate', { mood: selectedMood })
      setImage(res.data.imageUrl)
      setMood(selectedMood)
    } catch (err) {
      alert('Failed to generate image.')
    }
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Mint My Mood</title>
        <meta property="og:title" content="Mint My Mood" />
        <meta property="og:description" content="Choose your mood and mint an AI-generated NFT!" />
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:button:1" content="Mint This Mood" />
      </Head>
      <main style={{ minHeight: '100vh', padding: 20, textAlign: 'center' }}>
        <h1 style={{ fontSize: 32, marginBottom: 20 }}>Mint My Mood</h1>

        {!image && (
          <>
            <p style={{ marginBottom: 20 }}>How are you feeling today?</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, maxWidth: 300, margin: 'auto' }}>
              {MOODS.map(({ name, emoji }) => (
                <button
                  key={name}
                  onClick={() => generateImage(name)}
                  style={{
                    borderRadius: 20,
                    padding: '10px 15px',
                    backgroundColor: '#7c3aed',
                    color: 'white',
                    border: 'none',
                    fontSize: 18,
                    cursor: 'pointer',
                  }}
                >
                  {emoji} {name}
                </button>
              ))}
            </div>
          </>
        )}

        {loading && <p style={{ marginTop: 20 }}>Generating your mood image...</p>}

        {image && (
          <div style={{ marginTop: 20 }}>
            <img src={image} alt="Mood AI Art" style={{ borderRadius: 20, maxWidth: '100%' }} />
            <p style={{ marginTop: 10, fontSize: 18 }}>Mood: {mood}</p>
            <a
              href={image}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginTop: 10,
                display: 'inline-block',
                padding: '10px 20px',
                backgroundColor: '#22c55e',
                color: 'white',
                borderRadius: 20,
                textDecoration: 'none',
              }}
            >
              Download Image
            </a>
          </div>
        )}
      </main>
    </>
  )
}
