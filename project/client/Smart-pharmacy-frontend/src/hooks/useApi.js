import { useState, useEffect } from 'react';
import api from '../services/api';
import { INITIAL_MEDS } from '../data/medications';
import { PHARMACISTS } from '../data/pharmacists';

const normalizeMedicine = (item) => ({
  id: item.id,
  name: item.name,
  cat: item.category || item.cat,
  price: Number(item.price),
  stock: Number(item.stock),
  desc: item.description || item.desc,
  usage: item.usage_info || item.usage,
  popular: Number(item.popular) || 0,
  isNew: Boolean(item.is_new || item.isNew),
  image: item.image_url || item.image,
});

const normalizePharmacist = (item) => ({
  id: item.id,
  name: item.name,
  nameAr: item.name_ar || item.nameAr,
  titleAr: item.title_ar || item.titleAr,
  specialtyAr: item.specialty_ar || item.specialtyAr,
  experience: Number(item.experience) || 0,
  shift: item.shift || 'morning',
  phone: item.phone,
  whatsapp: item.whatsapp,
  avatar: item.avatar,
  avatarColor: item.avatar_color || item.avatarColor,
  status: item.status,
});

export function useMedicines(search = '', category = 'all', sort = 'popular', page = 1, limit = 50) {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        setLoading(true);
        const response = await api.get('/medicines', {
          params: { search, category, sort, page, limit }
        });
        const normalised = (response.data.medicines || []).map((item) => ({
          ...normalizeMedicine(item),
        }));
        setMedicines(normalised);
        setTotal(response.data.total || 0);
        setError(null);
      } catch (err) {
        setError(err.message);
        // Fallback to local data if API fails
        console.warn('API failed, using local data:', err.message);
        setMedicines(INITIAL_MEDS);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, [search, category, sort, page, limit]);

  return { medicines, loading, error, total };
}

export function usePharmacists() {
  const [pharmacists, setPharmacists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPharmacists = async () => {
      try {
        setLoading(true);
        const response = await api.get('/pharmacists');
        const raw = response.data;
        const items = Array.isArray(raw) ? raw : (raw.pharmacists || []);
        const normalised = items.map(normalizePharmacist);
        setPharmacists(normalised);
        setError(null);
      } catch (err) {
        setError(err.message);
        // Fallback to local data if API fails
        console.warn('API failed, using local data:', err.message);
        setPharmacists(PHARMACISTS);
      } finally {
        setLoading(false);
      }
    };

    fetchPharmacists();
  }, []);

  return { pharmacists, loading, error };
}

export function useDashboardSummary(range = 'today') {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        const response = await api.get('/analytics/summary', { params: { range } });
        setSummary(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [range]);

  return { summary, loading, error };
}