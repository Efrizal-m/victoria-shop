const env = require('../config/env.js')
const axios = require('axios')

async function uploadToImgur(imageBuffer) {
    try {
        const response = await axios.post('https://api.imgur.com/3/image', imageBuffer, {
            headers: {
                Authorization: `Client-ID ${env.imgurclientId}`,
                'Content-Type': 'image/jpeg' // Adjust content type based on the image type
            }
        });
        return response.data;
    } catch (error) {
        console.log(error)
        throw new Error('Failed to upload image to Imgur');
    }
}

module.exports = {uploadToImgur}