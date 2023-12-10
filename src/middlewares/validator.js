const { validationResult } = require('express-validator')

const validateInput = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.empty()){
        res.status(400).send({errors:errors.array()});  //render()puede estar
    
    }

    next();

};

module.exports = validateInput;