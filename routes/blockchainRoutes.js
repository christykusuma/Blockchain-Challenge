const axios = require('axios');

module.exports = (app) => {
    app.post('/api/fetch_data', async (req, res, next) => {
        const { address } = req.body;
        axios
            // .get('https://blockchain.info/rawaddr/1AJbsFZ64EpEfS5UAjAfcUG8pH8Jn3rn1F')
            .get(`https://blockchain.info/rawaddr/${address}`)
            .then((response) => {
                res.send({results: response.data});
            })
    })
};

