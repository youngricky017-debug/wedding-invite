'use client';
import { useState } from 'react';

export default function RSVP(){
  const [f,setF]=useState({n:'',p:'',m:''});
  const [status,setStatus]=useState('');

  async function handleSubmit(e){
    e?.preventDefault?.();
    setStatus('Sending...');
    try{
      const res = await fetch('/api/rsvp',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({name: f.n, phone: f.p, message: f.m})
      });
      if(res.ok){
        setStatus('Thanks — your RSVP was received.');
        setF({n:'',p:'',m:''});
      } else {
        const j = await res.json().catch(()=>null);
        setStatus('Error: ' + (j?.error || res.statusText));
      }
    } catch(err){
      setStatus('Network error');
    }
  }

  return (
    <section style={{padding:40}}>
      <h2>RSVP</h2>

      <form onSubmit={handleSubmit}>
        <div style={{display:'flex',flexDirection:'column',gap:8,maxWidth:400}}>
          <label style={{display:'none'}}>Name<input value={f.n} placeholder='Name' onChange={e=>setF({...f,n:e.target.value})} /></label>
          <label style={{display:'none'}}>Phone<input value={f.p} placeholder='Phone' onChange={e=>setF({...f,p:e.target.value})} /></label>
          <label style={{display:'none'}}>Message<textarea value={f.m} placeholder='Message' onChange={e=>setF({...f,m:e.target.value})} /></label>

          <button type="submit" style={{marginTop:10}}>Submit</button>
          {status && <div style={{marginTop:8}}>{status}</div>}
        </div>
      </form>
    </section>
  )
}
