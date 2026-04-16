import { useState } from 'react';
import { createHouse } from '../api/housesApi';

const BINARY = [['mainroad','Vía principal'],['guestroom','Hab. invitados'],['basement','Sótano'],['hotwaterheating','Agua caliente'],['airconditioning','Aire acond.'],['prefarea','Zona pref.']];
const INIT = { area:'', bedrooms:'', bathrooms:'', stories:'', parking:'', furnishingstatus:'2', mainroad:0, guestroom:0, basement:0, hotwaterheating:0, airconditioning:0, prefarea:0 };
const fmt = (p) => new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(p);

export default function HouseForm({ onSuccess }) {
  const [form, setForm] = useState(INIT);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggle = (k) => setForm(f => ({ ...f, [k]: f[k] === 1 ? 0 : 1 }));

  const submit = async () => {
    setError(''); setResult(null);
    if (['area','bedrooms','bathrooms','stories','parking'].some(k => !form[k])) { setError('Por favor rellena todos los campos numéricos.'); return; }
    const payload = { area:+form.area, bedrooms:+form.bedrooms, bathrooms:+form.bathrooms, stories:+form.stories, parking:+form.parking, furnishingstatus:+form.furnishingstatus, mainroad:form.mainroad, guestroom:form.guestroom, basement:form.basement, hotwaterheating:form.hotwaterheating, airconditioning:form.airconditioning, prefarea:form.prefarea };
    setLoading(true);
    try { const d = await createHouse(payload); setResult(d); setForm(INIT); if(onSuccess) onSuccess(); }
    catch(e) { setError(e.message); }
    setLoading(false);
  };

  return (
    <div>
      <div style={s.card}>
        <p style={s.secTitle}>📐 Características físicas</p>
        <div style={s.grid2}>
          {[['area','Superficie (m²)','Ej: 5000'],['bedrooms','Habitaciones','Ej: 3'],['bathrooms','Baños','Ej: 2'],['stories','Plantas','Ej: 2'],['parking','Plazas parking','Ej: 1']].map(([k,l,ph])=>(
            <div key={k} style={s.group}><label style={s.label}>{l}</label><input style={s.input} type="number" placeholder={ph} value={form[k]} min={k==='parking'?0:1} onChange={e=>set(k,e.target.value)}/></div>
          ))}
        </div>
        <p style={{...s.secTitle, marginTop:24}}>Equipamiento</p>
        <div style={s.group}><label style={s.label}>Estado del inmueble</label>
          <select style={s.select} value={form.furnishingstatus} onChange={e=>set('furnishingstatus',e.target.value)}>
            <option value="0">Sin amueblar</option><option value="1">Semi amueblado</option><option value="2">Amueblado</option>
          </select>
        </div>
        <p style={{...s.secTitle, marginTop:24}}>✅ Características adicionales</p>
        <div style={s.swGrid}>
          {BINARY.map(([k,l])=>(
            <div key={k} style={{...s.sw, background: form[k]?'#fff2ec':'#fafafa', borderColor: form[k]?'#FF6B35':'#e5e7eb'}} onClick={()=>toggle(k)}>
              <span style={{fontSize:13, fontWeight:500, color: form[k]?'#FF6B35':'#6b7280'}}>{l}</span>
              <div style={{...s.swTrack, background: form[k]?'#FF6B35':'#e5e7eb'}}><div style={{...s.swThumb, transform: form[k]?'translateX(16px)':'none'}}/></div>
            </div>
          ))}
        </div>
        {error && <div style={s.error}>⚠️ {error}</div>}
        <button style={{...s.submit, opacity: loading?.6:1}} onClick={submit} disabled={loading}>
          {loading ? '⏳ Tasando…' : '🏷️ Tasar vivienda'}
        </button>
      </div>
      {result && (
        <div style={s.resultCard}>
          <div style={{fontSize:32, marginBottom:8}}>🎉</div>
          <div style={s.resultTitle}>¡Tasación completada!</div>
          <div style={s.resultPrice}>{fmt(result.price)}</div>
          <p style={{fontSize:14, color:'#166534', opacity:.8}}>{result.description || `${result.area} m² · ${result.bedrooms} hab.`}</p>
        </div>
      )}
    </div>
  );
}
const s = {
  card: { background:'#fff', border:'1px solid #f0f0f0', borderRadius:20, padding:'32px 36px', boxShadow:'0 1px 3px rgba(0,0,0,.06)' },
  secTitle: { fontFamily:"'Sora',sans-serif", fontSize:13, fontWeight:700, color:'#9ca3af', letterSpacing:'.8px', textTransform:'uppercase', marginBottom:16, paddingBottom:10, borderBottom:'1px solid #f0f0f0' },
  grid2: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 },
  group: { display:'flex', flexDirection:'column', gap:6, marginBottom:4 },
  label: { fontSize:13, fontWeight:600, color:'#6b7280' },
  input: { padding:'10px 14px', border:'1.5px solid #e5e7eb', borderRadius:8, fontFamily:"'DM Sans',sans-serif", fontSize:14, color:'#0f0f0f', outline:'none' },
  select: { padding:'10px 14px', border:'1.5px solid #e5e7eb', borderRadius:8, fontFamily:"'DM Sans',sans-serif", fontSize:14, color:'#0f0f0f', outline:'none', background:'#fff' },
  swGrid: { display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))', gap:10 },
  sw: { display:'flex', alignItems:'center', justifyContent:'space-between', border:'1.5px solid', borderRadius:8, padding:'10px 14px', cursor:'pointer', userSelect:'none', transition:'all .2s' },
  swTrack: { width:36, height:20, borderRadius:10, position:'relative', transition:'background .2s', flexShrink:0 },
  swThumb: { position:'absolute', top:3, left:3, width:14, height:14, borderRadius:'50%', background:'#fff', transition:'transform .2s', boxShadow:'0 1px 4px rgba(0,0,0,.2)' },
  error: { background:'#fef2f2', border:'1px solid #fecaca', color:'#dc2626', borderRadius:8, padding:'12px 16px', fontSize:14, marginTop:16 },
  submit: { width:'100%', padding:15, background:'#FF6B35', color:'#fff', fontFamily:"'DM Sans',sans-serif", fontSize:15, fontWeight:700, border:'none', borderRadius:8, cursor:'pointer', marginTop:20, boxShadow:'0 4px 16px rgba(255,107,53,.3)' },
  resultCard: { marginTop:28, background:'#f0fdf4', border:'1.5px solid #bbf7d0', borderRadius:20, padding:28, animation:'fadeUp .4s ease' },
  resultTitle: { fontFamily:"'Sora',sans-serif", fontSize:18, fontWeight:700, color:'#166534', marginBottom:4 },
  resultPrice: { fontFamily:"'Sora',sans-serif", fontSize:32, fontWeight:800, color:'#FF6B35', letterSpacing:'-1px', margin:'12px 0' },
};
