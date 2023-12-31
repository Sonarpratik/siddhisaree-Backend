var http = require('http'),
    fs = require('fs'),
    ccav = require('./ccavutil.js'),
    crypto = require('crypto'),
    qs = require('querystring');

exports.postCus = function(request,response){
    var ccavEncResponse='',
	ccavResponse='',	
	workingKey = '4E61D9A9028E7E76FB330E1239AA652D',	//Put in the 32-Bit key provided by CCAvenues.
	ccavPOST = '';

    //Generate Md5 hash for the key and then convert in base64 string
    var md5 = crypto.createHash('md5').update(workingKey).digest();
    var keyBase64 = Buffer.from(md5).toString('base64');

    //Initializing Vector and then convert in base64 string
    var ivBase64 = Buffer.from([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d,0x0e, 0x0f]).toString('base64');

        request.on('data', function (data) {
	    ccavEncResponse += data;
	    ccavPOST =  qs.parse(ccavEncResponse);
	    var encryption = ccavPOST.encResp;
	    ccavResponse = ccav.decrypt(encryption, keyBase64, ivBase64);
        });

	request.on('end', function () {
	    var pData = '';
	    pData = '<table border=1 cellspacing=2 cellpadding=2><tr><td>'	


		pData = pData + ccavResponse.replace(/=/gi,'</td><td>')
		// console.log("ccavResponse",ccavResponse.replace(/=/gi))
		const keyValuePairs = ccavResponse.replace(/=/gi).split("&");

		// Initialize an empty object to store the parsed data
		const parsedData = {};
		
		// Loop through the key-value pairs and populate the parsed data object
		for (const pair of keyValuePairs) {
		  const [key, value] = pair.split("undefined");
		  parsedData[key] = value === "null" ? null : value;
		}
		
		console.log(parsedData);
        if(parsedData.order_status){
            response.redirect(302, 'http://localhost:3000/abort');
            // response.status(200).json(parsedData)
        }
	}); 	
};