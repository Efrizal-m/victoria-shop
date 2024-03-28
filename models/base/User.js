class User {
    constructor(id, email, password, first_name, last_name, profile_image ) {
        this._id = Number(id)
        this.email = email,
        this.password = password,
        this.first_name = first_name,
        this.last_name = last_name,
        this.profile_image = profile_image
    }
}

module.exports = User