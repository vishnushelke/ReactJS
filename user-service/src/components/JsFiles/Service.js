import axios from 'axios'

export function LoginUser(loginDto){
    return axios.put('http://localhost:8080/user/login',loginDto,{
        headers:{
            'Content-Type':'application/json;charset=utf-8'
        }
    })
}
export function RegisterUser(registerDto){
    return axios.post('http://localhost:8080/user/register',registerDto,{
        headers:{
            'Content-Type':'application/json;charset=utf-8'
        }
    })
}
export function ValidateUser(token){
    return axios.put('http://localhost:8080/user/validate',{},{
        headers:{
            'token':token
        }
    })
}
export function ForgetPassword(forgetDto){
    return axios.put('http://localhost:8080/user/forgetpassword',forgetDto,{
        headers:{
            'Content-Type':'application/json;charset=utf-8'
        }
    })
}
export function ResetPassword(setPasswordDto,token){
    return axios.put('http://localhost:8080/user/resetpassword',setPasswordDto,{
        headers:{
            'Content-Type':'application/json;charset=utf-8',
            'token':token
        }
    })
}
