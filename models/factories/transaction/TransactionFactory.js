const pool = require('../../../config/connection.js');
const Transaction = require('../../base/Transaction.js');

class TransactionFactory {
    static async new(input) {
        input.created_on = new Date()
        input.updated_on = new Date()

        let query = `
        INSERT INTO "Transactions" ("user_id","invoice_number","service_code","service_name","transaction_type","total_amount","created_on","updated_on")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING invoice_number,service_code,service_name,transaction_type,total_amount,created_on;`
        let values = [input.user_id, input.invoice_number,  input.service_code, input.service_name, input.transaction_type, input.total_amount, input.created_on, input.updated_on]

        const data = await pool.query(query, values);
        if (data.rows.length > 0) {
            const transaction = data.rows[0]
            return transaction
        } else {
            return null
        }
    }

    static async history(user_id) {
        let query = `SELECT * FROM "Transactions" WHERE "user_id" = $1;`
        let values = [user_id]

        const data = await pool.query(query, values);
        if (data.rows.length > 0) {
            const transactions = data.rows.map(d => { return new Transaction(d._id, d.user_id, d.invoice_number,  d.service_code, d.service_name, d.transaction_type, d.total_amount, d.created_on, d.updated_on)})
            return transactions
        } else {
            return null
        }
    }
}

module.exports = TransactionFactory