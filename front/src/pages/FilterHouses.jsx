import { useState } from 'react';
import { filterHouses } from '../api/housesApi';
import FilterBar from '../components/FilterBar';
import HouseList from '../components/HouseList';

export default function FilterHouses() {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');

  const handle = async (min, max) => {
    setLoading(true); setError(''); setSearched(true);
    try { setHouses(await filterHouses(min, max)); }
    catch(e) { setError(e.message); }
    setLoading(false);
  };
  const reset = () => { setHouses([]); setSearched(false); setError(''); };

  return (
    <div style={{maxWidth:1200, margin:'0 auto', padding:'48px 32px 80px'}}>
      <div style={{marginBottom:36}}>
        <h1 style={{fontFamily:"'Sora',sans-serif", fontSize:30, fontWeight:800, letterSpacing:'-.8px', marginBottom:8}}>🔎 Buscar por precio</h1>
        <p style={{fontSize:15, color:'#6b7280'}}>Filtra las viviendas del mercado según tu presupuesto disponible.</p>
      </div>
      <FilterBar onFilter={handle} onReset={reset} loading={loading} />
      {searched && <>
        <div style={{display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:24, flexWrap:'wrap', gap:12}}>
          <div>
            <h2 style={{fontFamily:"'Sora',sans-serif", fontSize:24, fontWeight:700, letterSpacing:'-.5px'}}>Resultados</h2>
            <p style={{fontSize:14, color:'#9ca3af'}}>Propiedades que coinciden con tu búsqueda</p>
          </div>
          {!loading && <span style={{fontSize:13, color:'#6b7280', background:'#fafafa', border:'1px solid #f0f0f0', padding:'4px 12px', borderRadius:20}}>{houses.length} encontradas</span>}
        </div>
        <HouseList houses={houses} loading={loading} error={error} emptyMsg="Sin resultados en ese rango de precio" />
      </>}
    </div>
  );
}
