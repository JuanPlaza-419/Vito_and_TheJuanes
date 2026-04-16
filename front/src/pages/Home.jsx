import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHouses } from '../api/housesApi';
import HouseList from '../components/HouseList';

export default function Home() {
  const nav = useNavigate();
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getHouses().then(d => { setHouses(d); setLoading(false); }).catch(e => { setError(e.message); setLoading(false); });
  }, []);

  return (
    <div>
      <div style={{background:'linear-gradient(180deg,#fff8f5,#fff)', paddingBottom:1}}>
        <div style={s.hero}>
          <div>
            <div style={s.label}>● Tasación inmobiliaria inteligente</div>
            <h1 style={s.title}>El precio justo de tu <em style={{color:'#FF6B35',fontStyle:'normal'}}>vivienda</em> hoy</h1>
            <p style={s.subtitle}>Obtén una tasación automática e instantánea basada en datos reales del mercado. Rápido, fiable y sin comisiones.</p>
            <div style={{display:'flex', gap:12, flexWrap:'wrap'}}>
              <button style={s.btnPrimary} onClick={() => nav('/create')}>🏷️ Tasar mi vivienda</button>
              <button style={s.btnSecondary} onClick={() => nav('/filter')}>🔎 Explorar propiedades</button>
            </div>
          </div>
          <div style={s.stats}>
            {[['+2.400','Viviendas tasadas',true],['98%','Precisión del modelo',false],['<10s','Tiempo de tasación',false],['€0','Coste del servicio',true]].map(([v,l,o])=>(
              <div key={l} style={s.stat}><div style={{...s.statVal, color: o?'#FF6B35':'#0f0f0f'}}>{v}</div><div style={s.statLabel}>{l}</div></div>
            ))}
          </div>
        </div>
      </div>
      <div style={s.section}>
        <div style={{display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:32, flexWrap:'wrap', gap:12}}>
          <div>
            <h2 style={s.secTitle}>Propiedades disponibles</h2>
            <p style={{fontSize:14, color:'#9ca3af'}}>Viviendas del mercado con tasación automática</p>
          </div>
          {!loading && <span style={s.count}>{houses.length} propiedades</span>}
        </div>
        <HouseList houses={houses} loading={loading} error={error} />
      </div>
    </div>
  );
}
const s = {
  hero: { maxWidth:1200, margin:'0 auto', padding:'72px 32px 48px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center' },
  label: { display:'inline-flex', alignItems:'center', gap:6, background:'#fff2ec', color:'#FF6B35', fontSize:12, fontWeight:600, letterSpacing:'.6px', textTransform:'uppercase', padding:'5px 12px', borderRadius:20, marginBottom:20 },
  title: { fontFamily:"'Sora',sans-serif", fontSize:'clamp(32px,5vw,52px)', fontWeight:800, lineHeight:1.1, letterSpacing:'-1.5px', marginBottom:16 },
  subtitle: { fontSize:17, color:'#6b7280', lineHeight:1.65, marginBottom:32 },
  btnPrimary: { display:'inline-flex', alignItems:'center', gap:8, padding:'13px 28px', background:'#FF6B35', color:'#fff', fontFamily:"'DM Sans',sans-serif", fontSize:15, fontWeight:600, border:'none', borderRadius:8, cursor:'pointer', boxShadow:'0 4px 16px rgba(255,107,53,.3)' },
  btnSecondary: { display:'inline-flex', alignItems:'center', gap:8, padding:'13px 28px', background:'transparent', color:'#0f0f0f', fontFamily:"'DM Sans',sans-serif", fontSize:15, fontWeight:600, border:'1.5px solid #e5e7eb', borderRadius:8, cursor:'pointer' },
  stats: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 },
  stat: { background:'#fafafa', border:'1px solid #f0f0f0', borderRadius:14, padding:24, display:'flex', flexDirection:'column', gap:4 },
  statVal: { fontFamily:"'Sora',sans-serif", fontSize:28, fontWeight:800, letterSpacing:'-1px' },
  statLabel: { fontSize:13, color:'#9ca3af' },
  section: { maxWidth:1200, margin:'0 auto', padding:'0 32px 80px' },
  secTitle: { fontFamily:"'Sora',sans-serif", fontSize:24, fontWeight:700, letterSpacing:'-.5px' },
  count: { fontSize:13, color:'#6b7280', background:'#fafafa', border:'1px solid #f0f0f0', padding:'4px 12px', borderRadius:20, fontWeight:500 },
};
