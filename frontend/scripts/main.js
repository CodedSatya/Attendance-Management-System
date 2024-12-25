// let userEmail ="";
// const loginData = (email) =>{
//   userEmail = email;
// }
const email = localStorage.getItem("userData");
const userEmail = JSON.parse(email);

document.getElementById("admin").addEventListener("click", ()=>{
  console.log(userEmail);
  
})


document.getElementById("logout").addEventListener("click", ()=>{
  localStorage.removeItem("userData");
  window.location.replace("http://localhost:5500/frontend/index.html")
})


const dArea = document.getElementById("displayArea");
fetch("http://localhost:8080/admin/getStudents", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  }
}).then(data => {
  data.json().then((d) => {
    console.log(d);
    const table = document.createElement("table");
    dArea.replaceChildren(table);
    table.innerHTML += `
      <tr>
        <th>Student Name</th>
      </tr>
    `
    d.forEach(item => {
      const row = `
        <tr>
          <td><a style="cursor:pointer" href="http://localhost:5500/frontend/Attendance.html?email=${item.email}" name="${item.email}" value="${item.email}">${item.name}</a></td>
        </tr>
      `
      table.innerHTML += row;
    })
  })
})

function getData(data){
  console.log("Ready");
  
}

// export {loginData}

