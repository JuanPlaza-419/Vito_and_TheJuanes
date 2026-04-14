const fmt = (p) => new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(p);
const furnish = ['Sin amueblar','Semi amueblado','Amueblado'];
const furnishColor = ['#f3f4f6,#6b7280','#fef3c7,#92400e','#dcfce7,#166534'];
const GRADS = ['linear-gradient(135deg,#ffecd2,#fcb69f)','linear-gradient(135deg,#e0f2fe,#7dd3fc)','linear-gradient(135deg,#dcfce7,#86efac)','linear-gradient(135deg,#fef9c3,#fde047)'];

export default function HouseCard({ house, delay = 0 }) {
  const [bg, text] = (furnishColor[house.furnishingstatus] || furnishColor[0]).split(',');
  return (
    <div style={{...s.card, animationDelay:`${delay}ms`}}>
      <div style={{...s.img, background: GRADS[house.bathrooms % GRADS.length]}}>
        <span style={{fontSize:48, opacity:.6}}>{'🏠🏡🏘️🏗️'[house.bedrooms % 4]}</span>
        <span style={s.badge}>{house.area.toLocaleString('es-ES')} m²</span>
      </div>
      <div style={s.body}>
        <div style={s.price}>{fmt(house.price)} <span style={s.priceSub}>· {Math.round(house.price/house.area).toLocaleString('es-ES')} €/m²</span></div>
        <p style={s.desc}>{house.description || 'Vivienda disponible.'}</p>
        <div style={s.specs}>
          {[['🛏',`${house.bedrooms} hab.`],['🚿',`${house.bathrooms} baños`],['📐',`${house.stories} plant.`],['🚗',`${house.parking} plaza${house.parking!==1?'s':''}`]].map(([ic,lb]) =>
            <span key={lb} style={s.chip}>{ic} {lb}</span>
          )}
        </div>
        <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
          <span style={{...s.fBadge, background:bg, color:text}}>{furnish[house.furnishingstatus]}</span>
          {!!house.airconditioning && <span style={s.tagOn}>❄️ A/A</span>}
          {!!house.basement && <span style={s.tagOn}>⬇️ Sótano</span>}
          {!!house.guestroom && <span style={s.tagOn}>🛋️ Invitados</span>}
          {!!house.prefarea && <span style={s.tagOn}>⭐ Zona pref.</span>}
        </div>
      </div>
    </div>
  );
}
const s = {
  card: { background:'#fff', border:'1px solid #f0f0f0', borderRadius:20, overflow:'hidden', boxShadow:'0 1px 3px rgba(0,0,0,.06)', animation:'fadeUp .4s ease both', cursor:'pointer', transition:'box-shadow .2s, transform .2s' },
  img: { height:180, position:'relative', display:'flex', alignItems:'center', justifyContent:'center' },
  badge: { position:'absolute', top:12, right:12, background:'rgba(255,255,255,.92)', fontSize:11, fontWeight:700, color:'#FF6B35', padding:'4px 10px', borderRadius:20, textTransform:'uppercase', letterSpacing:'.4px' },
  body: { padding:'20px 22px 22px' },
  price: { fontFamily:"'Sora',sans-serif", fontSize:24, fontWeight:800, color:'#FF6B35', letterSpacing:'-.5px', marginBottom:6 },
  priceSub: { fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:500, color:'#9ca3af' },
  desc: { fontSize:13, color:'#6b7280', lineHeight:1.55, marginBottom:16, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' },
  specs: { display:'flex', gap:4, flexWrap:'wrap', marginBottom:12 },
  chip: { display:'flex', alignItems:'center', gap:4, background:'#fafafa', border:'1px solid #f0f0f0', padding:'4px 10px', borderRadius:20, fontSize:12, color:'#6b7280', fontWeight:500 },
  fBadge: { fontSize:11, fontWeight:600, padding:'3px 10px', borderRadius:20, textTransform:'uppercase', letterSpacing:'.3px' },
  tagOn: { fontSize:11, fontWeight:500, color:'#FF6B35', background:'#fff2ec', padding:'3px 8px', borderRadius:4 },
};
