import HouseCard from './HouseCard';

export default function HouseList({ houses, loading, error, emptyMsg = '¡No se encontraron viviendas!' }) {
  if (loading) return <div style={s.center}><div style={s.spinner} /><p style={{color:'#9ca3af'}}>Cargando propiedades…</p></div>;
  if (error) return <div style={s.center}><span style={{fontSize:48}}>⚠️</span><p style={s.title}>Error al cargar</p><p style={s.sub}>{error}</p></div>;
  if (!houses.length) return <div style={s.center}><span style={{fontSize:48}}>🔍</span><p style={s.title}>{emptyMsg}</p></div>;
  return <div style={s.grid}>{houses.map((h,i)=><HouseCard key={i} house={h} delay={i*50}/>)}</div>;
}
const s = {
  center: { display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:12, padding:'80px 32px', color:'#9ca3af', textAlign:'center' },
  title: { fontFamily:"'Sora',sans-serif", fontSize:18, fontWeight:600, color:'#6b7280' },
  sub: { fontSize:14 },
  grid: { display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))', gap:20 },
  spinner: { width:36, height:36, border:'3px solid #e5e7eb', borderTopColor:'#FF6B35', borderRadius:'50%', animation:'spin .7s linear infinite' },
};
