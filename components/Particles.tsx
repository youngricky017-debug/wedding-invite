export default function Particles(){
  const particles = Array.from({length: 25});
  return (
    <>
      {particles.map((_,i)=>(
        <div
          key={i}
          className="particle"
          style={{
            left: Math.random()*100 + '%',
            animationDuration: (5 + Math.random()*5) + 's',
            opacity: Math.random()
          }}
        />
      ))}
    </>
  )
}
