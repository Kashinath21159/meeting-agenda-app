import React, { useEffect, useState } from 'react';

interface Agenda {
  id: number;
  title: string;
  topics: string;
  agenda: string;
  duration: number;
  generatedAt: string;
}

function AgendaHistory() {
  const [agendas, setAgendas] = useState<Agenda[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/agendas')
      .then((res) => res.json())
      .then((data: Agenda[]) => {
        setAgendas(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching agenda history:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading agenda history...</p>;
  if (agendas.length === 0) return <p>No previous agendas found.</p>;

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>Agenda History</h2>
      {agendas.map((agenda) => (
        <div key={agenda.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
          <strong>{agenda.title}</strong> — {agenda.duration} min  
          <p><strong>Topics:</strong> {agenda.topics}</p>
          <pre>{agenda.agenda}</pre>
          <small>Generated on: {new Date(agenda.generatedAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}

export default AgendaHistory;
