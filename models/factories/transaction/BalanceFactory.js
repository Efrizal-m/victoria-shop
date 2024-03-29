const pool = require('../../../config/connection.js')

class BalanceFactory {
    static async initBalance(input) {
        input.created_on = new Date()
        input.updated_on = new Date()
        
        let query = `INSERT INTO "Balances" ("user_id","balance_amount","created_on","updated_on") VALUES ($1, $2, $3, $4);`
        let values = [input.user_id, input.balance_amount, input.created_on, input.updated_on]

        await pool.query(query, values);
        return true
    }

    static async getBalance(user_id) {
        let query = `SELECT balance_amount FROM "Balances" WHERE "user_id" = $1;`
        let values = [user_id]

        const data = await pool.query(query, values);

        if (data.rows.length > 0) {
            return data.rows[0].balance_amount
        } else {
            return null
        }
    }    

    static async setBalance(input) {
        input.updated_on = new Date()
        let query = `UPDATE "Balances"
        SET
            "balance_amount" = $1,
            "updated_on" = $2
        WHERE 
            "user_id" = $3;`
        let values = [input.balance_amount, input.updated_on, input.user_id]
        const data = await pool.query(query, values);
        if (data.rowCount > 0) {
            return true
        } else {
            return false
        }
    }
}

module.exports = BalanceFactory