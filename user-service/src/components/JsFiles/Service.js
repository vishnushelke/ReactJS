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
export function AddUserNote(createNoteDto,tokenUserId){
    return axios.post('http://localhost:8080/user/notes',createNoteDto,{
        headers:{
            'Content-Type':'application/json;charset=utf-8',
            'tokenUserId':tokenUserId
        }
    })
}

export function GetAllNotes(tokenUserId){
    return axios.get('http://localhost:8080/user/notes',{
        headers:{
            'tokenUserId':tokenUserId
        }
    })
}
export function GetAllLabels(tokenUserId){
    return axios.get('http://localhost:8080/user/labels',{
        headers:{
            'tokenUserId':tokenUserId
        }
    })
}
export function AddUserLabel(addLabelDto,tokenUserId){    
    return axios.post('http://localhost:8080/user/labels',addLabelDto,{
        headers:{
            'Content-Type':'application/json;charset=utf-8',
            'tokenUserId':tokenUserId
        }
    })
}
export function EditUserNote(updateNoteDto,tokenUserId,noteId){    
    return axios.put('http://localhost:8080/user/notes',updateNoteDto,{
        headers:{
            'Content-Type':'application/json;charset=utf-8',
            'tokenUserId':tokenUserId,
            'noteId':noteId
        }
    })
}
export function ColorUserNote(noteId,colourHashcode,tokenUserId){  
    return axios.put('http://localhost:8080/user/notes/setcolour',{},{
        headers:{      
            'Content-Type':'application/json;charset=utf-8',    
            'noteId':noteId,
            'colourHashcode':colourHashcode,
            'tokenUserId':tokenUserId
        }
    })
}
export function TrashUserNote(noteId,tokenUserId){  
    return axios.put('http://localhost:8080/user/notes/trash',{},{
        headers:{      
            'Content-Type':'application/json;charset=utf-8',    
            'noteId':noteId,
            'tokenUserId':tokenUserId
        }
    })
}
export function ArchiveUserNote(noteId,tokenUserId){  
    return axios.put('http://localhost:8080/user/notes/archive',{},{
        headers:{      
            'Content-Type':'application/json;charset=utf-8',    
            'noteId':noteId,
            'tokenUserId':tokenUserId
        }
    })
}
export function GetTrashedUserNote(tokenUserId){    
    return axios.get('http://localhost:8080/user/notes/trashednotes',{
        headers:{
            'Content-Type':'application/json;charset=utf-8',
            'tokenUserId':tokenUserId
        }
    })
}
export function GetArchivedUserNote(tokenUserId){    
    return axios.get('http://localhost:8080/user/notes/archivednotes',{
        headers:{
            'Content-Type':'application/json;charset=utf-8',
            'tokenUserId':tokenUserId
        }
    })
}
export function GetUserNoteOfLabel(labelId,tokenUserId){    
    return axios.get('http://localhost:8080/user/labels/archivednotes',{
        headers:{
            'Content-Type':'application/json;charset=utf-8',
            'tokenUserId':tokenUserId,
            'labelId':labelId
        }
    })
}
export function AddNoteToLabel(noteId,labelId,tokenUserId){    
    return axios.get('http://localhost:8080/user/notes/addtolabel',{
        headers:{
            'Content-Type':'application/json;charset=utf-8',
            'tokenUserId':tokenUserId,
            'labelId':labelId
        }
    })
}
