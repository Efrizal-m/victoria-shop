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
            const services = data.rows.map(d => { return new Service(d._id, d.service_code, d.service_name, d.service_icon, d.service_tariff, d.description)})
            return services
        } else {
            return null
        }
    }

    static async findAndValidateService(service_code) {
        let query = `SELECT * FROM "Services" WHERE "service_code" = $1;`
        let values = [service_code]

        const data = await pool.query(query, values);
        if (data.rows.length > 0) {
            const user = new Service(data.rows[0]._id, data.rows[0].service_code, data.rows[0].service_name, data.rows[0].service_icon, data.rows[0].service_tariff, data.rows[0].description)
            return user
        } else {
            return null
        }
    }
}

module.exports = InformationFactory