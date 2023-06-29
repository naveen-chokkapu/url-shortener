const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortId = require('shortid');
const config = require('config');

const Url = require('../models/Url');

// @route POST api/url/shorten
router.post('/shorten',async (req,res)=>{
    const {longUrl} = req.body;
    const baseUrl = config.get('baseURL');


    // check baseURL
    if(!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid baseURL');
    }

    // create URL code
    const urlCode = shortId.generate();

    // check longURL
    if(validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({longUrl});
            
            if(url) res.json(url);
            else {
                const shortUrl = baseUrl + '/' + urlCode;

                url = new Url({
                    urlCode,
                    longUrl,
                    shortUrl,
                    date: new Date()
                });

                await url.save();
                res.json(url);
            }

        } catch (err) {
            console.log(err.message);
            res.status(500).json('Server Error');
        }
    }
    else {
        res.status(401).json('Invalid longURL');
    }

});

module.exports = router;