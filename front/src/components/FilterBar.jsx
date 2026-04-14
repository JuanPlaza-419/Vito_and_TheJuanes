import { useState } from 'react';

export default function FilterBar({ onFilter, onReset, loading }) {
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const reset = () => { setMin(''); setMax(''); onReset(); };
  return (
    <div style={s.bar}>
      {[['Precio mínimo (€)', min, setMin, 'Ej: 1000000'], ['Precio máximo (€)', max, setMax, 'Ej: 10000000']].map(([label, val, set, ph]) => (
        <div key={label} style={s.group}>
          <label style={s.label}>{label}</label>
          <input style={s.input} type="number" placeholder={ph} value={val} min={0} onChange={e => set(e.target.value)} />
        </div>
      ))}
      <div style={{display:'flex', gap:8, alignItems:'flex-end', paddingBottom:1}}>
        <button style={s.btn} onClick={() => onFilter(min, max)} disabled={loading}>{loading ? 'Buscando…' : '🔎 Filtrar'}</button>
        <button style={s.reset} onClick={reset}>Limpiar</button>
      </div>
    </div>
  );
}
const s = {
  bar: { background:'#fafafa', border:'1px solid #f0f0f0', borderRadius:20, padding:'24px 28px', marginBottom:40, display:'flex', alignItems:'flex-end', gap:16, flexWrap:'wrap' },
  group: { display:'flex', flexDirection:'column', gap:6, flex:1, minWidth:150 },
  label: { fontSize:12, fontWeight:600, color:'#6b7280', letterSpacing:'.4px', textTransform:'uppercase' },
  input: { padding:'10px 14px', border:'1.5px solid #e5e7eb', borderRadius:8, fontFamily:"'DM Sans',sans-serif", fontSize:14, color:'#0f0f0f', background:'#fff', outline:'none' },
  btn: { padding:'10px 22px', background:'#FF6B35', color:'#fff', fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:600, border:'none', borderRadius:8, cursor:'pointer', whiteSpace:'nowrap' },
  reset: { padding:'10px 16px', background:'#fff', color:'#6b7280', fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:500, border:'1.5px solid #e5e7eb', borderRadius:8, cursor:'pointer', whiteSpace:'nowrap' },
};
