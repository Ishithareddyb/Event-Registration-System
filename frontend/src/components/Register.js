import React, {useState, useEffect} from "react";

export default function Register(){
  const [events, setEvents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [eventId, setEventId] = useState("");

  useEffect(()=>{ fetch("http://localhost:8080/api/events").then(r=>r.json()).then(setEvents).catch(()=>setEvents([])) }, []);

  const submit = async (e) => {
    e.preventDefault();
    const body = { name, email, event: { id: Number(eventId) } };
    try{
      const resp = await fetch("http://localhost:8080/api/participants", {
        method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(body)
      });
      if(resp.ok){
        if(window.Swal) window.Swal.mixin({toast:true, position:"top-end", timer:2200, showConfirmButton:false}).fire({icon:"success", title:"Registered!"});
        setName(""); setEmail(""); setEventId("");
      } else {
        if(window.Swal) window.Swal.fire("Error","Registration failed","error");
      }
    } catch(err){
      if(window.Swal) window.Swal.fire("Error","Could not reach server","error");
    }
  };

  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold mb-4">Register for an Event</h2>
      <form onSubmit={submit} className="space-y-3">
        <div><label className="block text-sm">Name<input value={name} onChange={e=>setName(e.target.value)} required className="mt-1 w-full p-2 border rounded-md" /></label></div>
        <div><label className="block text-sm">Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required className="mt-1 w-full p-2 border rounded-md" /></label></div>
        <div><label className="block text-sm">Event
          <select value={eventId} onChange={e=>setEventId(e.target.value)} required className="mt-1 w-full p-2 border rounded-md">
            <option value="">-- choose --</option>
            {events.map(ev=><option key={ev.id} value={ev.id}>{ev.title}</option>)}
          </select>
        </label></div>
        <button type="submit" className="px-4 py-2 rounded-md">Register</button>
      </form>
    </div>
  );
}
