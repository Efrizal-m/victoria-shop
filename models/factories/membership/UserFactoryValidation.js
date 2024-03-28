const UserFactory = require('./UserFactory')

UserFactory.validate = (input) => {
    let errors = []
    if (input.email === '' || input.email.trim() === '' || input.email === undefined) {
        errors.push('Email is required')
    }
    if (input.first_name === '' || input.first_name.trim() === '' || input.first_name === undefined) {
        errors.push('First Name is required')
    }
    if (input.last_name === '' || input.last_name.trim() === '' || input.last_name === undefined) {
        errors.push('Last Name is required')
    }
    if (input.password === '' || input.password.trim() === '' || input.password === undefined) {
        errors.push('Password is required')
    }

    return errors;
}