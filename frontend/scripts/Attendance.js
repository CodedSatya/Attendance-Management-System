const queryString = window.location.search;
const urlParam = new URLSearchParams(queryString);

const email = urlParam.get("email")

console.log(email);

const dArea = document.getElementById("displayArea");

function getPercentage(toal, attended) {
  return ((attended / toal) * 100).toFixed(2);
}


fetch("http://localhost:8080/admin/student", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    email: email
  })
}).then(data => {
  data.json().then(d => {
    const table = document.createElement("table")
    
    dArea.innerHTML += `<h1 style="text-align:center;color:blue;">Welcome ${d[0].name}</h1>`
    dArea.appendChild(table);
    table.innerHTML = `
    <tr>
      <th>Subject Name</th>
      <th>Total classes</th>
      <th>Attended Classes</th>
      <th>Percentage</th>
    </tr>
  `
    d.forEach(item => {
      console.log(item);
      
      const row = `
      <tr class="row">
        <td>${item.subjectName}</td>
        <td><input class="totalClasses" style="background:none;border:none;" type="number" value="${item.totalClasses}"/></td>
        <td><input class="attendedClasses" style="background:none;border:none;" type="number" value="${item.attendedClasses}"/></td>
        <td>${getPercentage(item.totalClasses, item.attendedClasses)}%</td>
      </tr>
    `
      table.innerHTML += row;
    })
    dArea.innerHTML += `<button class="btn" id="update">Update</button>`
    const update = document.getElementById("update");
    update.addEventListener("click", (event) => {
      event.preventDefault();

      const rows = document.querySelector("table").querySelectorAll(".row")
      let attendance = {}
      console.log(rows);
      

      rows.forEach(row => {
        // console.log(row);
        /*
      {
        IR : [total, atte],
        
      }
        */
        
        const subjectName = row.cells[0].textContent;
        // console.log(subjectName);
        
        const totalClasses = row.querySelector(".totalClasses").value;
        const attendedClasses = row.querySelector(".attendedClasses").value;
      
        console.log(totalClasses, attendedClasses);
        
        attendance[subjectName] = {  totalClasses: parseInt(totalClasses), attendedClasses: parseInt(attendedClasses)};
      })
      /* {
          IR: [16, 15],
          DWT: []
       }
      */ 
      console.log(attendance);
      
      // Api call for updation

      fetch(`http://localhost:8080/admin/updateAttendance/${email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify(attendance)
      }).then(data=>{
        console.log("Update successfull")
        window.location.reload();
      }
      ).catch(err=>{
        console.log("error : "+err)
      }
      )  
    })
  })
})

const goHome = () =>{
  window.location.replace("http://localhost:5500/frontend/Admin.html");
}

document.getElementById("goBack").addEventListener("click", ()=>{
  window.location.replace("http://localhost:5500/frontend/Admin.html")
})
