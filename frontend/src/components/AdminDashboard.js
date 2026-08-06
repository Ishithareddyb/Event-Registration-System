import React, {useEffect, useState, useRef} from "react";

export default function AdminDashboard(){
  const [events, setEvents] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [newEvent, setNewEvent] = useState({title:"", description:"", capacity:50});
  const chartRef = useRef(null);

  useEffect(()=>load(), []);
  function load(){
    fetch("http://localhost:8080/api/events").then(r=>r.json()).then(setEvents).catch(()=>setEvents([]));
    fetch("http://localhost:8080/api/participants").then(r=>r.json()).then(setParticipants).catch(()=>setParticipants([]));
  }

  async function createEvent(e){
    e.preventDefault();
    await fetch("http://localhost:8080/api/events", {
      method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(newEvent)
    });
    setNewEvent({title:"", description:"", capacity:50});
    load();
    if(window.Swal) window.Swal.fire("Created","Event created","success");
  }

  useEffect(()=>{
    if(window.Chart && chartRef.current){
      const ctx = chartRef.current.getContext("2d");
      const counts = events.map(ev=> participants.filter(p=> p.event && p.event.id === ev.id).length );
      const labels = events.map(ev=> ev.title);
      // destroy previous chart if exists
      if(window._eventsChart) window._eventsChart.destroy();
      window._eventsChart = new window.Chart(ctx, {
        type: 'bar',
        data: { labels, datasets: [{ label: 'Registrations', data: counts }] },
        options: { responsive: true }
      });
    }
  }, [events, participants]);

  function exportCSV(){
    let csv = "Name,Email,Event\n";
    participants.forEach(p=>{
      csv += `"${p.name}","${p.email}","${p.event ? p.event.title : ''}"\n`;
    });
    const blob = new Blob([csv], {type: 'text/csv'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download="participants.csv"; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card p-4">
          <h3 className="text-lg font-semibold mb-3">Create Event</h3>
          <form onSubmit={createEvent} className="space-y-2">
            <input placeholder="Title" value={newEvent.title} onChange={e=>setNewEvent({...newEvent, title:e.target.value})} required className="w-full p-2 border rounded-md" />
            <input placeholder="Description" value={newEvent.description} onChange={e=>setNewEvent({...newEvent, description:e.target.value})} className="w-full p-2 border rounded-md" />
            <input type="number" placeholder="Capacity" value={newEvent.capacity} onChange={e=>setNewEvent({...newEvent, capacity: Number(e.target.value)})} className="w-full p-2 border rounded-md" />
            <button className="px-3 py-2 rounded-md">Create</button>
          </form>
        </div>

        <div className="card p-4">
          <h3 className="text-lg font-semibold mb-3">Analytics</h3>
          <canvas ref={chartRef} height="120"></canvas>
        </div>
      </div>

      <div className="card p-4 mt-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">Participants ({participants.length})</h3>
          <div>
            <button className="px-3 py-1 rounded-md mr-2" onClick={exportCSV}>Export CSV</button>
            <button className="px-3 py-1 rounded-md" onClick={load}>Refresh</button>
          </div>
        </div>
        <ul>
          {participants.map(p=>(
            <li key={p.id} className="border-b py-2">{p.name} — {p.email} <span className="text-sm text-gray-500">({p.event ? p.event.title : ''})</span></li>
          ))}
        </ul>
      </div>

      <div className="card p-4 mt-6">
        <h3 className="text-lg font-semibold">Events ({events.length})</h3>
        <ul>
          {events.map(ev=>(
            <li key={ev.id} className="border-b py-2">{ev.title} — {ev.description} — Capacity: {ev.capacity}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
