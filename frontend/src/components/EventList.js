import React, {useEffect, useState} from "react";

function EventCard({ev, onView}){
  return (
    <div className="card p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{ev.title}</h3>
          <p className="text-sm text-gray-600">{ev.description}</p>
        </div>
        <div className="text-right">
          <div className="text-sm">{ev.startTime ? new Date(ev.startTime).toLocaleString() : ""}</div>
          <div className="mt-2 text-xs text-gray-500">Capacity: {ev.capacity || "N/A"}</div>
          <button className="mt-3 px-3 py-1 rounded-md" onClick={()=>onView(ev)}>View</button>
        </div>
      </div>
    </div>
  );
}

export default function EventList({dark}){
  const [events, setEvents] = useState([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(()=>{ fetch("http://localhost:8080/api/events").then(r=>r.json()).then(setEvents).catch(()=>setEvents([])) }, []);

  const filtered = events.filter(e => e.title.toLowerCase().includes(query.toLowerCase()));

  function viewEvent(ev){
    setSelected(ev);
    if(window.Swal){
      window.Swal.fire({
        title: ev.title,
        html: `<p>${ev.description || ""}</p><p><strong>When:</strong> ${ev.startTime ? new Date(ev.startTime).toLocaleString() : "TBA"}</p><p><strong>Capacity:</strong> ${ev.capacity || "N/A"}</p>`,
        showCloseButton: true
      })
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Upcoming Events</h2>
        <input placeholder="Search events..." value={query} onChange={e=>setQuery(e.target.value)} className="px-3 py-2 rounded-md border" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.length===0 && <div className="card p-4">No events found.</div>}
        {filtered.map(ev=> <EventCard key={ev.id} ev={ev} onView={viewEvent} />)}
      </div>
    </div>
  );
}
