// import { loginData } from "./main";


const loginBtn = document.getElementById("submit");


function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  fetch("http://localhost:8080/admin/login", {
    method:"POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email, password})
  }).then(res=>{
    res.json().then(data=>{
      console.log(data);
      // loginData(data.email);
      // const {email, password} = data;
      localStorage.setItem("userData", JSON.stringify({email, password}))
      if(data.role == "admin"){
        window.location.replace("http://localhost:5500/frontend/Admin.html")
      }else{
        window.location.replace("http://localhost:5500/frontend/Student.html")
      }
    })
  })
}
loginBtn.addEventListener("click", (event)=>{
  event.preventDefault();
  login();
});

