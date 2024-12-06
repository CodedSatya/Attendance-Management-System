
const table = document.getElementById("table");
const dArea = document.getElementById("displayArea");
function getPercentage(toal, attended) {
  return ((attended / toal) * 100).toFixed(2);
}

function getAttendance(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

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
    data.json().then((d) => {
      console.log(d);
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
    }).catch(err=>{
      console.log(err);
      dArea.innerHTML = ``
      dArea.innerHTML += `<h2 class="warning">Invalid User</h2>`
      
    })
  }).catch((err) => {
    console.log(err.toString());
  })
}