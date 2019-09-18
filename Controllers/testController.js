const signUpModel = require('../Model/signUp');
const bcrypt = require('bcrypt');



class testController {

        // SIgnUp

        signUp (req, res) {
            const { username, email, password, confirmPassword } = req.body;
        if ( !username || !email || !password ) {
                console.log('Some fields are not filled');
                return res.status(400).send({
                    error: true,
                    code: 400,
                    message: "name, email and password must be passed"
                }); 
            }
            else{
                if(req.body.password!==req.body.confirmPassword){
                    return res.status(400).send ({
                        code: 400,
                        message: 'Passwords do not match' 
                    })
                }
                bcrypt.hash(req.body.password, 10, (err, hashedPassword)=>{
                    if(err){
                        return res.status(500).json({
                            error: err.message
                        });
                    }
                    else{
                       return signUpModel.create({
                            username,
                            email,
                            password: hashedPassword,
                            confirmPassword
                        }).then ((resp) => {
                            console.log('Sign up was successfull')
                        return res.status(201).send({
                                    error: false,
                                    code: 201,
                                    message: 'You have successfully signed up',
                            })
                        }).catch((err) => {
                            console.log('Not saved');
                            if (err) {
                                if (err.name === 'MongoError' && err.code === 11000) {
                                    return res.status(400).send ({
                                        code: 400,
                                        message: 'Username already exist' 
                                    })
                                } 
                                else if(err) {
                                    return res.status(400).send ({
                                        code: 400,
                                        message: 'Invalid email' 
                                    })
                                } 
                                else {
                                    return res.status(400).send ({
                                        code: 400,
                                        message: err
                                    })
                                }
                            }
                        })
                    }
                });
            }
        }
        

    //SignIn

    signIn (req, res) {
        const { username, password } = req.body;
        if ( !username || !password ) {
            return res.status(400).send({
                error: true, 
                code: 400,
                message: 'username, password must be passed'
            })
        }
        return signUpModel.findOne({username})
            .then((response) => {
                if (response) {
                    bcrypt.compare(req.body.password, response.password, (err, result)=>{
                        if (err){
                            return res.status(503).send({
                                error: true, 
                                code: 503,
                                message: 'Auth failed',
                            });
                        }
                        if(result){
                            console.log('User succesfully signed in');
                            return res.status(200).send({
                                error: false, 
                                code: 200,
                                message: 'User successfully signed in',
                            });
                        }
                        else{
                            return res.status(401).send({
                                error: false, 
                                code: 401,
                                message: 'Incorrect password'
                            });
                        }
                    });
                }
                else{
                    console.log('Unable to sign in');
                    return res.status(404).send({
                        error: false, 
                        code: 404,
                        message: 'User does not exisit, kindly sign up'
                    });
                } 
            })
            .catch((error) => {
                console.log('Unable to sign in user');
                return res.status(400).send({
                    error: true, 
                    code: 400,
                    message: error
             })
        })
     }
}

module.exports = testController;
