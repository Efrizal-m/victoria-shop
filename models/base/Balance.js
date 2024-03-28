class Balance {
    constructor(id, user_id, balance_amount, created_on, updated_on ) {
        this._id = Number(id)
        this.user_id = user_id,
        this.balance_amount = balance_amount,
        this.created_on = created_on,
        this.updated_on = updated_on
    }
}

module.exports = Balance