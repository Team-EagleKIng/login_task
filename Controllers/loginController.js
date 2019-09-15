const loginModel = require('../Model/login');
const bcrypt = require('bcrypt');



class loginController {

    // Login

    login (req, res) {
            const { username, password } = req.body;
            if ( !username || !password ) {
                return res.status(400).send({
                    error: true, 
                    code: 400,
                    message: 'username and password must be passed'
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hashedPassword)=>{
                    if(err){
                        return res.status(500).json({
                            error: err.message
                        });
                    }
                    else{
                        console.log(hashedPassword)
                       return loginModel.create({
                            username,
                            password: hashedPassword
                        }).then ((resp) => {
                            console.log('Login was successful')
                        return res.status(200).send({
                                    error: false,
                                    code: 200,
                                    message: 'Yaaaaay, You have successfully logged in',
                            })
                        }).catch((err) => {
                            console.log('Not saved');
                            if (err) {
                                if (err.name === 'MongoError' && err.code === 11000) {
                                    return res.status(400).send ({
                                        code: 400,
                                        message: 'Ooops, this usernname already exist' 
                                    })
                                } else {
                                    return res.send({
                                        error: true, 
                                        code: 400,
                                        message: error 
                                    });
                                }
                            }
                        })
                    }                  });
            }
     }
}

module.exports = loginController;
