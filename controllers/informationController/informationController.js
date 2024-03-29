const InformationFactory = require('../../models/factories/information/InformationFactory.js')

class InformationController {
    static async getBanners (req, res, next) {
        try {
            const banners = await InformationFactory.findAllBanners()
            const filtered = banners.map(({banner_image, banner_name, description}) => {  return {banner_image, banner_name, description} })
            res.status(200).json({
                "status": 0,
                "message": "Sukses",
                "data": filtered
            })
        } catch (error) {
            next(error)
        }
    }

    static async getServices (req, res, next) {
        try {
            const services = await InformationFactory.findAllServices()
            const filtered = services.map(({service_code, service_name, service_icon, service_tariff}) => { return {service_code, service_name, service_icon, service_tariff}})
            res.status(200).json({
                "status": 0,
                "message": "Sukses",
                "data": filtered
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = InformationController