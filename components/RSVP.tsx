'use client';
import { useState } from 'react';

export default function RSVP(){
  const [f,setF]=useState({n:'',p:'',m:''});
  const [status,setStatus]=useState('');
  const [errors,setErrors]=useState({n:'',p:''});
  const [sending,setSending]=useState(false);

  function validate(){
    const e = {n:'',p:''};
    if(!f.n.trim()) e.n = 'Name is required';
    // very simple phone validation: digits, spaces, +, -
    const phone = f.p.trim();
    if(!phone) e.p = 'Phone is required';
    else if(!/^\+?[0-9()\-\s]{7,20}$/.test(phone)) e.p = 'Enter a valid phone number';
    setErrors(e);
    return !e.n && !e.p;
  }

  async function handleSubmit(e){
    e?.preventDefault?.();
    if(!validate()) return setStatus('Please fix errors');
    setSending(true);
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
        setErrors({n:'',p:''});
      } else {
        const j = await res.json().catch(()=>null);
        setStatus('Error: ' + (j?.error || res.statusText));
      }
    } catch(err){
      setStatus('Network error');
    } finally{
      setSending(false);
    }
  }

  return (
    <section style={{padding:40}}>
      <h2>RSVP</h2>

      <form onSubmit={handleSubmit} aria-labelledby="rsvp-heading">
        <div style={{display:'flex',flexDirection:'column',gap:8,maxWidth:400}}>
          <div>
            <label htmlFor="rsvp-name">Name <span aria-hidden="true">*</span></label>
            <input id="rsvp-name" value={f.n} placeholder='Name' onChange={e=>setF({...f,n:e.target.value})} aria-invalid={!!errors.n} aria-describedby={errors.n? 'err-name':''} required />
            {errors.n && <div id="err-name" style={{color:'salmon',fontSize:13}} role="alert">{errors.n}</div>}
          </div>

          <div>
            <label htmlFor="rsvp-phone">Phone <span aria-hidden="true">*</span></label>
            <input id="rsvp-phone" value={f.p} placeholder='Phone' onChange={e=>setF({...f,p:e.target.value})} aria-invalid={!!errors.p} aria-describedby={errors.p? 'err-phone':''} required />
            {errors.p && <div id="err-phone" style={{color:'salmon',fontSize:13}} role="alert">{errors.p}</div>}
          </div>

          <div>
            <label htmlFor="rsvp-message">Message</label>
            <textarea id="rsvp-message" value={f.m} placeholder='Message' onChange={e=>setF({...f,m:e.target.value})} />
          </div>

          <button type="submit" style={{marginTop:10}} disabled={sending}>{sending ? 'Sending...' : 'Submit'}</button>
          {status && <div style={{marginTop:8}}>{status}</div>}
        </div>
      </form>
    </section>
  )
}
