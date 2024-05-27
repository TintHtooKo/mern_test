const {validationResult} = require('express-validator')

const handleErrorMessage = (req,res,next) => {
    const result = validationResult(req)
    if(!result.isEmpty()){
        return res.status(400).json({error:result.mapped()})
    }else{
        next()
    }
}

module.exports = handleErrorMessage;