const BalanceFactory = require('../../models/factories/transaction/BalanceFactory')

class BalanceController {
    static async getUserBalance (req, res, next) {
        try {
            const userId = req.loggedInUser.id
            let balance = await BalanceFactory.getBalance(userId)

            if (!balance) {
                const initValue = { user_id: userId, balance_amount: 0, created_on: new Date(), updated_on: new Date()}
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
        if (typeof(top_up_amount) != "number" || top_up_amount < 0) {
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