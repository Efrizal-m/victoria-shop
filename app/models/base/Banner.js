class Banner {
    constructor(id, banner_name, banner_image, description ) {
        this._id = Number(id)
        this.banner_name = banner_name,
        this.banner_image = banner_image,
        this.description = description
    }
}

module.exports = Banner