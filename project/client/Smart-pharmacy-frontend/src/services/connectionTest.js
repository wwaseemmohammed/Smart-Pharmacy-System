import api from '../services/api';

export async function checkBackendConnection() {
  try {
    const response = await api.get('/health');
    return {
      connected: true,
      message: 'Backend is connected successfully',
      data: response.data
    };
  } catch (error) {
    return {
      connected: false,
      message: `Backend connection failed: ${error.message}`,
      error: error
    };
  }
}

export async function testAllEndpoints() {
  const endpoints = [
    { path: '/health', method: 'GET', description: 'Health Check' },
    { path: '/medicines', method: 'GET', description: 'Get Medicines' },
    { path: '/pharmacists', method: 'GET', description: 'Get Pharmacists' },
  ];

  const results = [];

  for (const endpoint of endpoints) {
    try {
      const response = await api.get(endpoint.path);
      results.push({
        ...endpoint,
        status: 'success',
        data: response.data
      });
    } catch (error) {
      results.push({
        ...endpoint,
        status: 'error',
        error: error.message
      });
    }
  }

  return results;
}