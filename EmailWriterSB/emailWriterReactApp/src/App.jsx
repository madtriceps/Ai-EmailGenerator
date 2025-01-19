import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const COLORS = ['#C51111', '#132ED1', '#117F2D', '#ED54BA', '#EF7D0D', '#F5F557'];

const FloatingCharacter = ({ color, top, left, delay }) => (
  <div
    className="floating-character"
    style={{
      backgroundColor: color,
      top: `${top}%`,
      left: `${left}%`,
      animationDelay: `${delay}s`
    }}
  />
);

const FloatingCharacters = () => (
  <>
    {COLORS.map((color, index) => (
      <FloatingCharacter
        key={index}
        color={color}
        top={Math.random() * 100}
        left={Math.random() * 100}
        delay={Math.random() * 5}
      />
    ))}
  </>
);

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post("http://localhost:8080/api/email/generate", {
        emailContent,
        tone
      });
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
    } catch (error) {
      setError('Failed to generate email reply. Please try again');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <FloatingCharacters />
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-title">Email Reply Generator</div>
          <div className="navbar-links">
            <a href="https://github.com/madtriceps" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="mailto:jmadhav638@gmail.com">Email</a>
          </div>
        </div>
      </nav>
      <main className="main-content">
        <h1 className="title">Email Reply Generator</h1>
        <form onSubmit={handleSubmit} className="form-container">
          <textarea
            className="input-field"
            rows="6"
            placeholder="Original Email Content"
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            required
          />
          <select
            className="select-field"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          >
            <option value="">Select Tone (Optional)</option>
            <option value="professional">Professional</option>
            <option value="casual">Casual</option>
            <option value="friendly">Friendly</option>
          </select>
          <button type="submit" className="button" disabled={!emailContent || loading}>
            {loading ? "Generating..." : "Generate Reply"}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {generatedReply && (
          <div className="generated-reply">
            <h2>Generated Reply:</h2>
            <textarea
              className="input-field"
              rows="6"
              value={generatedReply}
              readOnly
            />
            <button
              className="copy-button"
              onClick={() => navigator.clipboard.writeText(generatedReply)}
            >
              Copy to Clipboard
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

