'use client';
import { motion } from 'framer-motion';

export default function Hero(){
  return (
    <section style={{
      height:'100vh',
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      textAlign:'center'
    }}>
      <motion.h1
        initial={{opacity:0, scale:0.8}}
        animate={{opacity:1, scale:1}}
        transition={{duration:1.2}}
        style={{fontSize:60, fontFamily:'serif'}}
      >
        Mirabel & Godspower
      </motion.h1>

      <motion.p
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{delay:0.8}}
        style={{opacity:0.7}}
      >
        A cinematic love story • 2026
      </motion.p>
    </section>
  )
}
