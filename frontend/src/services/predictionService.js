const API_URL = 'http://localhost:5000/api';

export const predictCkd = async (parameters) => {
  try {
    const response = await fetch(`${API_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parameters),
    });
    
    if (!response.ok) {
      throw new Error('Failed to get prediction');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error in prediction service:', error);
    throw error;
  }
};

export const getRequiredParameters = async () => {
  try {
    const response = await fetch(`${API_URL}/parameters`);
    
    if (!response.ok) {
      throw new Error('Failed to get parameters');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching parameters:', error);
    throw error;
  }
};