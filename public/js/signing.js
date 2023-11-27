/* import axios from 'axios'; */


export const sign =async (type , data)=>{
    try{
        const res = await axios({
            method :'POST' ,         
            url :type ==='signin' ? 'http://localhost:3000/api/users/login' :'http://localhost:3000/api/users/signup' ,
            data
        })
        if (res.data.status === 'success') {
            window.setTimeout(() => {
                location.assign('/');
            }, 1000);
        }

    }
    catch(err){
        console.log(err.response.data.message);

    }


}