"use stric"

//---------HTML ELAMENTS------------------
let loginForm = $('#form-login'),
    userName = $('#username'),
    userPasword = $('#password');






//------GLLOBOL VERAYBLIS ---------------

const besURL = 'https://fakestoreapi.com';
// -----   (   /auth/login    )






//----LOGIN ACTION--------
async function autharization() {
    const user = {
        username: userName.value,
        password: userPasword.value
    }

    try{
        if(user.password.trim().length == 0 || user.username.trim().length == 0){
            alert("Janob formani to'liq toldiring !!")
        }else{
            let respons = await fetch(`${besURL}/auth/login`,{
                method: 'POST',
                headers:{
                 "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            }); 

            let result = await respons.json();
            localStorage.setItem('token' , result.token);

            if(localStorage.getItem('token')){
                window.location.href = "../../index.html";
            }
        }
    }catch(err){
        alert(err);
        userName.value="";
        userPasword.value="";
    }
}

loginForm.addEventListener('submit' , (e)=>{
    e.preventDefault();
    autharization();
})