module.export = (res,error)=>{
    return res.status(500).json({
        status: "Internal Server Error",
        message: error.message,
        result: {}
    })
    }
