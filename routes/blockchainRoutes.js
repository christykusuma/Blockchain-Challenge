const axios = require('axios');

module.exports = (app) => {
/* 
Although we are using a front end that normally does http calls, You can still
 use axios on the backend. The reason why is because currently on the front
 end, the 'Access-Control-Allow-Origins' (ACAO) isn't accessible since we are
 grabbing data from an outside source instead of fetching from our web server.
 The browser doesn't handle ACAO responses, the web server does. To get around
 it we implement the middleware in our web server since it contains the proper
 headers to make requests accross other http/https servers. SImply use an axios call
 and the required data from the url will get passed back
*/
    app.get('/api/fetch_data', (req, res, next) => {

        axios
            .get('https://blockchain.info/rawaddr/1AJbsFZ64EpEfS5UAjAfcUG8pH8Jn3rn1F')
            .then((response) => {
                res.send({results: response.data});
            })

    })
};

