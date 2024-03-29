const BalanceFactory = require('../../models/factories/transaction/BalanceFactory')
const TransactionFactory = require('../../models/factories/transaction/TransactionFactory.js')
const { generateInvoiceCode } = require('../../helpers/invoice.js')

class BalanceController {
    static async getUserBalance (req, res, next) {
        try {
            const userId = req.loggedInUser.id
            let balance = await BalanceFactory.getBalance(userId)

            if (!balance) {
                const initValue = { user_id: userId, balance_amount: 0}
                await BalanceFactory.initBalance(initValue)
                balance = await BalanceFactory.getBalance(userId)
            }

            res.status(200).json({
                "status": 0,
                "message": "Get Balance Berhasil",
                "data": { balance }
            })
        } catch (error) {
            next(error)
        }
    }

    static async topup (req, res, next) {
        let top_up_amount = req.body.top_up_amount
        if (!top_up_amount || typeof(top_up_amount) != "number" || top_up_amount < 0) {
            res.status(400).json({
                "status": 102,
                "message": "Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0",
                "data": null
            })
            return
        }

        const input = {
            user_id: req.loggedInUser.id,
            balance_amount: 0
        }
        let balance = await BalanceFactory.getBalance(input.user_id)
        input.balance_amount += balance + top_up_amount
        const updateSuccess = await BalanceFactory.setBalance(input)
        if (updateSuccess) {
            const input_tx = {
                user_id: input.user_id,
                invoice_number: generateInvoiceCode(),
                service_code: "VICTORIA",
                service_name: "VICTORIA-SHOP",
                transaction_type: "TOPUP",
                description: "Top Up Balance",
                total_amount: top_up_amount
            }

            await TransactionFactory.new(input_tx)

            res.status(200).json({
                "status": 0,
                "message": "Top Up Balance berhasil",
                "data": {
                    balance: input.balance_amount
                }
            })
        } else {
            throw { status: 500, message: 'Internal Error' }
        }
    }
}

module.exports = BalanceController