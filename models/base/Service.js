class Service {
    constructor(id,  service_code, service_name, service_icon, service_tariff, description) {
        this._id = Number(id)
        this.service_code = service_code,
        this.service_name = service_name,
        this.service_icon = service_icon,
        this.service_tariff = service_tariff,
        this.description = description
    }
}

module.exports = Service