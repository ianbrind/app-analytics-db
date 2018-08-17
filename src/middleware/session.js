module.exports = (req, res, next) => {
    
        //Check a session is present.
        if (!req.session || !req.session.access_token) {
            return res.status(401).redirect("/");
        }
    
        next();
    };
    
    
    