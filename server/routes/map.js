
const express = require('express');
const router = express.Router();
const Request = require('request');


/* 
    getMapData
    获取地图数据
*/
router.get('/getMapData', (request, response) => {
    const options = {
        url: 'https://ncovdata.market.alicloudapi.com/ncov/cityDiseaseInfoWithTrend',
        headers: {
            'Authorization': 'APPCODE ecf6f1ea60ad4ae68a62f0511cf5e714'
        }
    };
    Request(options, (error, result, body) => {
        if(error) {
            console.log(error);
        } else {
            response.send({
                code: 200,
                data: body
            });
        };
    });
});


module.exports = router;