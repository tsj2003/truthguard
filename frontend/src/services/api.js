import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

export const checkContent = async (content) => {
    try {
        const response = await axios.post(`${API_URL}/check`, { content }, {
            timeout: 120000 // 2 minute timeout
        });
        
        // Validate response
        if (!response.data || typeof response.data !== 'object') {
            throw new Error('Invalid response from server');
        }

        // Store in local history after successful analysis
        const history = JSON.parse(localStorage.getItem('analysisHistory') || '[]');
        history.unshift(response.data);
        localStorage.setItem('analysisHistory', JSON.stringify(history.slice(0, 50))); // Keep last 50 entries
        
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        if (error.code === 'ECONNABORTED') {
            throw new Error('Request timed out. Please try again.');
        }
        if (error.response?.data?.error) {
            throw new Error(error.response.data.error);
        }
        throw new Error('Failed to analyze content. Please try again.');
    }
};

export const getAnalysisHistory = () => {
    return JSON.parse(localStorage.getItem('analysisHistory') || '[]');
};

export const clearHistory = () => {
    localStorage.removeItem('analysisHistory');
};
