
const table = document.getElementById("table");
const dArea = document.getElementById("displayArea");
function getPercentage(toal, attended) {
  return ((attended / toal) * 100).toFixed(2);
}
/*
{
  id: 1,
  subject: [IR, DWT]
}
*/

function getAttendance(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  dArea.innerHTML = `<div class="table"></div>`

  fetch("http://localhost:8080/attendance/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      {
        email: email,
        password: password
      }
    ),
  }).then((data) => {
    console.log(data  );
    
    data.json().then((d) => {
      console.log(d);
      if (d[0].role == "admin") {
        console.log("Admin logged in")
        dArea.innerHTML += `<h1 style="text-align:center;color:blue">Welcome Admin</h1>`;
        dArea.innerHTML += `<button class="btn" onclick="getStudents()">Get Students List</button>`
      } else {
        const name = d[0].name;
        table.innerHTML = ``;
        // dArea.replaceChildren(table);
        dArea.innerHTML = `<h1 style="text-align:center;color:green">Welcome ${name}</h1>`
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
      }

    }).catch(err => {
      console.log(err);
      dArea.innerHTML = ``
      dArea.innerHTML += `<h2 class="warning">Invalid User</h2>`

    })
  }).catch((err) => {
    console.log(err.toString());
  })
}

const getStudents = () => {
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
            <td><a style="cursor:pointer" onclick="getData(this)" name="${item.email}" value="${item.email}">${item.name}</a></td>
          </tr>
        `
        table.innerHTML += row;
      })
    })
  })
}

const getData = (data) => {
  console.log(data.name);
  const email = data.name
  console.log(email);

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
      dArea.replaceChildren(table);
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
          <td><input class="totalClasses" type="number" value="${item.totalClasses}"/></td>
          <td><input class="attendedClasses" type="number" value="${item.attendedClasses}"/></td>
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
        }
        ).catch(err=>{
          console.log("error : "+err)
        }
        )  
      })
    })
  })
}
