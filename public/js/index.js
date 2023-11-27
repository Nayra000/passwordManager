import {sign} from './signing.js'



const signinForm =document.getElementById('signinForm');
if(signinForm){
    signinForm.addEventListener('submit' ,(e)=>{
        e.preventDefault();
        console.log(signinForm);
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        sign('signin' ,{email ,password});
    })
}

const signupForm = document.getElementById('signupForm');
if(signupForm){
    signupForm.addEventListener('submit' ,(e)=>{
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('confirm-password').value;
        const name = document.getElementById('name').value;
        sign('signup' ,{name,email ,password ,passwordConfirm});
    })
}