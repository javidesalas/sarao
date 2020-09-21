
    //middleware para tener siempre disponible req.user en las vistas
    module.exports =  (req, res, next)=> {
                    if(req.user){
                    console.log('entra middleware!')    
                    res.locals.actUser = req.user
                    }
                    next()
                }
