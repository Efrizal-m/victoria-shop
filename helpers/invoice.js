const moment = require('moment')

function generateInvoiceCode () {
    return `INV` + moment(new Date).format("DDMMYYY") + `-${new Date().getUTCMilliseconds()}`
}

module.exports = {
    generateInvoiceCode
}