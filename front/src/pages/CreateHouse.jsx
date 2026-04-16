import { useState } from 'react';
import HouseForm from '../components/HouseForm';

export default function CreateHouse() {
  const [toast, setToast] = useState(false);
  const show = () => { setToast(true); setTimeout(() => setToast(false), 3000); };
  return (
    <div>
      <div style={{maxWidth:680, margin:'0 auto', padding:'48px 32px 80px'}}>
        <div style={{marginBottom:36}}>
          <h1 style={{fontFamily:"'Sora',sans-serif", fontSize:30, fontWeight:800, letterSpacing:'-.8px', marginBottom:8}}>🏷️ Tasar vivienda</h1>
          <p style={{fontSize:15, color:'#6b7280'}}>Introduce los datos de la propiedad y obtén una tasación automática al instante.</p>
        </div>
        <HouseForm onSuccess={show} />
      </div>
      {toast && <div style={{position:'fixed', bottom:32, left:'50%', transform:'translateX(-50%)', background:'#1a1a1a', color:'#fff', padding:'12px 24px', borderRadius:28, fontSize:14, fontWeight:500, boxShadow:'0 12px 40px rgba(0,0,0,.15)', zIndex:999}}>✅ Vivienda tasada y añadida al sistema</div>}
    </div>
  );
}
