const axios = require('axios');

module.exports = (app) => {
    app.post('/api/fetch_address', (req, res) => {
        // let address = '1AJbsFZ64EpEfS5UAjAfcUG8pH8Jn3rn1F'
        
        // axios.get(`https://blockchain.info/rawaddr/${address}&cors=true`)
        res.send('data');
    });
};

