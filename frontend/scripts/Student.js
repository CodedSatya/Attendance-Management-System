let userEmail = "";

document.getElementById("student").addEventListener("click", ()=>{
  const email = JSON.parse(localStorage.getItem("userData"))
  console.log(email)
  userEmail = email
})

document.getElementById("logout").addEventListener("click", ()=>{
  localStorage.removeItem("userData");
  window.location.replace("http://localhost:5500/frontend/index.html")
})

function getPercentage(toal, attended) {
  return ((attended / toal) * 100).toFixed(2);
}

const dArea = document.getElementById("displayArea");
const {email, password} = JSON.parse(localStorage.getItem("userData"));
dArea.innerHTML = `<div class="table"></div>`
console.log(email, password);

  fetch("http://localhost:8080/attendance/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      {
        email: email,
        pasword: password
      }
    ),
  }).then((data) => {
    console.log(data.status);
    
    data.json().then((d) => {
      console.log(d);
      
        const name = d[0].name;
        // table.innerHTML = ``;
        // dArea.replaceChildren(table);
        dArea.innerHTML = `<h1 style="text-align:center;color:green">Welcome ${name}</h1>`
        const table = document.createElement("table");
        dArea.appendChild(table)
        table.innerHTML = `
      <tr>
        <th>Subject Name</th>
        <th>Total classes</th>
        <th>Attended Classes</th>
        <th>Percentage</th>
      </tr>
    `
        d.forEach(item => {
          const row = `
            <tr>
                <td>${item.subjectName}</td>
                <td>${item.totalClasses}</td>
                <td>${item.attendedClasses}</td>
                <td>${getPercentage(item.totalClasses, item.attendedClasses)}%</td>
              </tr>
          `
          table.innerHTML += row;
        }
        );

    }).catch(err => {
      console.log(err);
      dArea.innerHTML = ``
      dArea.innerHTML += `<h2 class="warning">Invalid User</h2>`

    })
  }).catch((err) => {
    console.log(err.toString());
  })