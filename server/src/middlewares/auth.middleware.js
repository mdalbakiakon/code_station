
// user input for register and login validation middleware
const authInputValidation = async (req, res, next) => {
    try {

        // user input values
        const {identifier, password} = req.body;

        // role based req handle
        if(req.body.role === "instructor"){
            req.role = "instructor";
        }else{
            req.role = "student";
        }

        // if user gives null empty undefined input value
        if(!identifier || !password){
            return res.status(400).json({
                message: "credentials can't be empty"
            });
        }

        // handling edge case if identifier input from user like "       "
        if(identifier.trim() === ""){
            return res.status(400).json({
                message: "identifier can't be empty"
            });
        }

        // checking the identifier is email or username based
        if(identifier.includes('@')){
            req.identifierType = 'email';
            req.email = identifier.trim();
        }else{
            req.identifierType = 'username';
            req.username = identifier.trim();
        }

        // taking password into req.password to pass next
        req.password = password;
        next();
        
    } catch (error) {
        console.log(error);

        // fallback error handling
        return res.status(500).json({
            message: "something went wrong while user input validation",
            error: error.message
        })
    }
}

export default {authInputValidation};