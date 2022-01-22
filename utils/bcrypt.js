const bcrypt = require('bcrypt')

module.exports = {
    hashPassword : (password) => {
        const hash = bcrypt.hashSync(password, 10)
        return hash
    },
    comparePassword : (password, hash) => {
        const compare = bcrypt.compareSync(password, hash)
        return compare
    }
}
