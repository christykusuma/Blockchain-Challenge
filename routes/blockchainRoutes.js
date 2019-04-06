const axios = require('axios');

module.exports = (app) => {
    app.get('/api/fetch_data', (req, res, next) => {

        axios
            .get('https://blockchain.info/rawaddr/1AJbsFZ64EpEfS5UAjAfcUG8pH8Jn3rn1F')
            .then((response) => {
                res.send({results: response.data});
            })

    })
};

