import { useState, useMemo } from 'react';
import { INITIAL_MEDS, getStockStatus } from '../data/medications';
import type { Medication, MedFormData, Filters, SortOption } from '../data/medications';

export function useMedications() {
  const [meds, setMeds] = useState<Medication[]>(INITIAL_MEDS);

  const addMed = (data: MedFormData) => {
    setMeds(prev => [...prev, { ...data, id: Date.now(), popular: 50, isNew: true }]);
  };

  const updateMed = (id: number, data: MedFormData) => {
    setMeds(prev => prev.map(m => m.id === id ? { ...m, ...data } : m));
  };

  const deleteMed = (id: number) => {
    setMeds(prev => prev.filter(m => m.id !== id));
  };

  const updateStock = (id: number, stock: number) => {
    setMeds(prev => prev.map(m => m.id === id ? { ...m, stock } : m));
  };

  return { meds, addMed, updateMed, deleteMed, updateStock };
}

interface FilterParams extends Filters {
  search: string;
  sort: SortOption;
}

export function useFilteredMeds(meds: Medication[], params: FilterParams): Medication[] {
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
