const appMiddleware = (req,res,next) => {
    console.log("inside the appMiddleware");
    next()
}
module.exports = appMiddleware