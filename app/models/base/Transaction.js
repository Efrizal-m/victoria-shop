class Transaction {
    constructor(id, user_id, balance_amount, created_on, updated_on ) {
        this._id = Number(id)
        this.user_id = user_id,
        this.invoice_number = invoice_number,
        this.service_code = service_code,
        this.service_name = service_name,
        this.transaction_type = transaction_type,
        this.total_amount = total_amount,
        this.created_on = created_on,
        this.updated_on = updated_on
    }
}

module.exports = Transaction