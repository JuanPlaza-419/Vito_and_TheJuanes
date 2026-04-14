import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { pathname } = useLocation();
  const cls = (p) => `nav-btn${pathname === p ? ' active' : ''}`;
  return (
    <nav style={s.nav}>
      <Link to="/" style={s.logo}>
        <span style={s.logoIcon}>🏠</span>
        <span style={s.logoText}>tasamos<span style={{color:'#FF6B35'}}>tucasa</span>.es</span>
      </Link>
      <div style={s.links}>
        <Link to="/" className={cls('/')} style={s.navLink(pathname === '/')}>Inicio</Link>
        <Link to="/filter" className={cls('/filter')} style={s.navLink(pathname === '/filter')}>Buscar</Link>
        <Link to="/create" style={s.cta}>+ Nueva vivienda</Link>
      </div>
    </nav>
  );
}
const s = {
  nav: { position:'sticky', top:0, zIndex:100, height:64, background:'rgba(255,255,255,.9)', backdropFilter:'blur(16px)', borderBottom:'1px solid #f0f0f0', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 32px' },
  logo: { display:'flex', alignItems:'center', gap:8, textDecoration:'none' },
  logoIcon: { width:32, height:32, background:'#FF6B35', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 },
  logoText: { fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:15, color:'#0f0f0f', letterSpacing:'-.3px' },
  links: { display:'flex', alignItems:'center', gap:4 },
  navLink: (active) => ({ padding:'7px 16px', borderRadius:8, fontSize:14, fontWeight:500, color: active ? '#FF6B35' : '#6b7280', background: active ? '#fff2ec' : 'transparent', textDecoration:'none', transition:'all .2s' }),
  cta: { padding:'8px 20px', borderRadius:8, fontSize:14, fontWeight:600, color:'#fff', background:'#FF6B35', textDecoration:'none', boxShadow:'0 2px 8px rgba(255,107,53,.3)' },
};
