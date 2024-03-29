const BalanceFactory = require('../../models/factories/transaction/BalanceFactory')
const InformationFactory = require('../../models/factories/information/InformationFactory.js')
const { generateInvoiceCode } = require('../../helpers/invoice.js')
const TransactionFactory = require('../../models/factories/transaction/TransactionFactory.js')

class TransactionController {
    static async addTransaction (req, res, next) {
        try {
            let service_code = req.body.service_code
            if (!service_code || service_code.length > 30) {
                throw { status: 400, message: 'Bad Request' }
            }
            const existingServiceCode = await InformationFactory.findAndValidateService(service_code)
            if (!existingServiceCode) {
                res.status(400).json({
                    "status": 102,
                    "message": "Service ataus Layanan tidak ditemukan",
                    "data": null
                })
                return    
            }

            const input = {
                user_id: req.loggedInUser.id,
                service_code: existingServiceCode.service_code,
                service_name: existingServiceCode.service_name,
                transaction_type: "PAYMENT",
                total_amount: existingServiceCode.service_tariff
            }

            let balance = await BalanceFactory.getBalance(input.user_id)
            if (balance < input.total_amount) {
                res.status(400).json({
                    "status": 102,
                    "message": "Saldo tidak cukup untuk melakukan transaksi",
                    "data": null
                })
                return    
            }

            if (!balance) {
                const initValue = { user_id: userId, balance_amount: 0}
                await BalanceFactory.initBalance(initValue)
                balance = await BalanceFactory.getBalance(userId)
            }

            input.invoice_number = generateInvoiceCode()
            const transaction = await TransactionFactory.new(input)

            res.status(200).json({
                "status": 0,
                "message": "Transaksi berhasil",
                "data": transaction
            })
        } catch (error) {
            next(error)
        }
    }

    static async getTransactionHistory (req, res, next) {
    }
}

module.exports = TransactionController