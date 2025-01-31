const axios = require('axios');

async function analyzeContent(content) {
    try {
        const response = await axios.post('https://api-inference.huggingface.co/models/fakenews-detector', 
            { inputs: content },
            { headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` } }
        );
        return response.data;
    } catch (error) {
        return { error: "Analysis failed" };
    }
}

module.exports = analyzeContent;
