module.exports = (err, req, res, next) => {
    if (err.code == "23505") {
        res.status(400).send({status: 102, message: "Email sudah terdaftar"})
    } else if (err.status) {
        res.status(400).send({status: err.status, message: err.message})
    } else if (err.Error === undefined) {
        res.send(err)
    } else {
        res.status(400).send({status: 500, message: "Internal Server Error"})
    }
}