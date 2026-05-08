import { useState, useMemo } from 'react';
import { INITIAL_MEDS, getStockStatus } from '../data/medications';

export function useMedications() {
  const [meds, setMeds] = useState(INITIAL_MEDS);

  const addMed = (data) => {
    setMeds(prev => [...prev, { ...data, id: Date.now(), popular: 50, isNew: true }]);
  };

  const updateMed = (id, data) => {
    setMeds(prev => prev.map(m => m.id === id ? { ...m, ...data } : m));
  };

  const deleteMed = (id) => {
    setMeds(prev => prev.filter(m => m.id !== id));
  };

  const updateStock = (id, stock) => {
    setMeds(prev => prev.map(m => m.id === id ? { ...m, stock } : m));
  };

  return { meds, addMed, updateMed, deleteMed, updateStock };
}

export function useFilteredMeds(meds, params) {
  const { category, maxPrice, search, sort } = params;

  return useMemo(() => {
    const filtered = meds.filter(m => {
      if (category !== 'all' && m.cat !== category) return false;
      if (m.price > maxPrice) return false;
      if (search && !m.name.toLowerCase().includes(search.toLowerCase())) return false;
      const st = getStockStatus(m.stock);
      if (st === 'ok'  && !params.availability.inStock)   return false;
      if (st === 'low' && !params.availability.lowStock)  return false;
      if (st === 'out' && !params.availability.outOfStock) return false;
      return true;
    });

    return [...filtered].sort((a, b) => {
      if (sort === 'price-asc')  return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'newest')     return Number(b.isNew) - Number(a.isNew);
      return b.popular - a.popular;
    });
  }, [meds, category, maxPrice, search, sort, params.availability]);
}
