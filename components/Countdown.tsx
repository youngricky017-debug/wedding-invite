'use client';
import { useEffect, useState } from 'react';

export default function Countdown(){
  const target = new Date('2026-09-04').getTime();
  const [t,setT]=useState({d:0,h:0,m:0,s:0});

  useEffect(()=>{
    const i=setInterval(()=>{
      const diff = target - new Date().getTime();
      setT({
        d:Math.max(0,Math.floor(diff/86400000)),
        h:Math.max(0,Math.floor(diff/3600000%24)),
        m:Math.max(0,Math.floor(diff/60000%60)),
        s:Math.max(0,Math.floor(diff/1000%60))
      });
    },1000);
    return ()=>clearInterval(i);
  },[]);

  return (
    <section style={{textAlign:'center',padding:40}}>
      <h2>Countdown to Forever</h2>
      <div style={{fontSize:30, marginTop:10}}>
        {t.d} : {t.h} : {t.m} : {t.s}
      </div>
    </section>
  )
}
