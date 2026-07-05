'use client';
import { motion } from 'framer-motion';

export default function LoveStory(){
  const items = [
    'How we met — destiny aligned our paths.',
    'First conversation — simple but magical.',
    'First date — everything changed.',
    'The moment we knew — forever began.'
  ];

  return (
    <section style={{padding:40}}>
      <h2 style={{fontSize:40, fontFamily:'serif'}}>Our Love Story</h2>

      {items.map((t,i)=>(
        <motion.p
          key={i}
          initial={{opacity:0, y:20}}
          whileInView={{opacity:1, y:0}}
          transition={{delay:i*0.2}}
          style={{marginTop:15, opacity:0.8}}
        >
          {t}
        </motion.p>
      ))}
    </section>
  )
}
