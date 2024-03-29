const pool = require('../../../config/connection.js')
const Banner = require('../../base/Banner.js');
const Service = require('../../base/Service.js');

class InformationFactory {
    static async findAllBanners () {
        let query = `SELECT * FROM "Banners";`
        const data = await pool.query(query);
        if (data.rows.length > 0) {
            const banners = data.rows.map(d => { return new Banner(d._id, d.banner_name, d.banner_image, d.description)})
            return banners
        } else {
            return null
        }
    }

    static async findAllServices () {
        let query = `SELECT * FROM "Services";`
        const data = await pool.query(query);
        if (data.rows.length > 0) {
            const services = data.rows.map(d => { return new Service(d._id, d.service_code, d.service_name, d.service_icon, d.service_tariff)})
            return services
        } else {
            return null
        }
    }
}

module.exports = InformationFactory