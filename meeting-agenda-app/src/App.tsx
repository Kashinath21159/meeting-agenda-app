import { useState } from 'react';
import './App.css';
import AgendaHistory from './components/AgendaHistory';
import jsPDF from 'jspdf'; // Npm libraray for pdf generartion

function App() {
  // Local state variables for form inputs and results
  const [title, setTitle] = useState('');
  const [topics, setTopics] = useState('');
  const [duration, setDuration] = useState('');
  const [agenda, setAgenda] = useState('');
  const [loading, setLoading] = useState(false);

// Function to handle agenda generation
  const handleGenerateAgenda = async () => {
    if (!title || !topics || !duration) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://agenda-app-backend.onrender.com/api/generate-agenda', {
   // Send POST request to backend AP
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, topics, duration }),
      });

      const data = await response.json(); //  json response parse 
      setAgenda(data.agenda); // Update agenda state with result
    } catch (error) {
      console.error(error);
      alert('Failed to generate agenda.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(`Meeting Agenda: ${title}`, 10, 10);

    const lines = doc.splitTextToSize(agenda, 180);
    doc.text(lines, 10, 20);
    doc.save(`${title || 'agenda'}.pdf`); // Save the PDF with the meeting title as filename
  };

  return (
    <div className="container">
      <h1>Meeting Agenda Generator</h1>

      <input
        type="text"
        placeholder="Meeting Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Topics (comma-separated)"
        value={topics}
        onChange={(e) => setTopics(e.target.value)}
      />

      <input
        type="number"
        placeholder="Duration (minutes)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />

      <button onClick={handleGenerateAgenda} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Agenda'}
      </button>

      {agenda && (
        <div className="agenda">
          <h2>Generated Agenda</h2>

          <textarea
            value={agenda}
            onChange={(e) => setAgenda(e.target.value)}
            rows={10}
            style={{ width: '100%', marginTop: '1rem' }}
          />

          <button onClick={handleDownloadPDF} style={{ marginTop: '1rem' }}>
            Download Agenda as PDF
          </button>
        </div>
      )}

      <AgendaHistory />
    </div>
  );
}

export default App;
