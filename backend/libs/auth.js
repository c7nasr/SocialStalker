var jwt = require('jsonwebtoken');

exports.GenerateToken = async () => {
    return jwt.sign({ }, process.env.JWT_SECRET,{expiresIn:"1hr"});
}

exports.VerifyToken = async (req,res,next) => {
    try {
        const token = req.headers['token']
        const isValid = await jwt.verify(token,process.env.JWT_SECRET);

        if (!isValid) return res.sendStatus(403)
        next()

    }catch (e) {
        return res.sendStatus(401)
    }


}