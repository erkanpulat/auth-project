// Set new default font family and font color to mimic Bootstrap's default styling
(Chart.defaults.global.defaultFontFamily = "Nunito"),
  '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = "#858796";

// dataInfo
let thisMthNumOfUsers = document.getElementById("thisMthNumOfUsers")
  ? document.getElementById("thisMthNumOfUsers").textContent.trim()
  : 0;
let totalNumOfUsers = document.getElementById("totalNumOfUsers")
  ? document.getElementById("totalNumOfUsers").textContent.trim()
  : 0;
let totalNumOfAdmins = document.getElementById("totalNumOfAdmins")
  ? document.getElementById("totalNumOfAdmins").textContent.trim()
  : 0;
let emailVerNumOfUsers = document.getElementById("emailVerNumOfUsers")
  ? document.getElementById("emailVerNumOfUsers").textContent.trim()
  : 0;

// Pie Chart User
let ctx = document.getElementById("usersPieChart");
if (ctx) {
  let usersPieChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: [
        "Kullanıcı Sayısı (Bu Ay)",
        "Kullanıcı Sayısı (Toplam)",
        "Admin Sayısı",
      ],
      datasets: [
        {
          data: [thisMthNumOfUsers, totalNumOfUsers, totalNumOfAdmins],
          backgroundColor: ["#4e73df", "#1cc88a", "#F6C23E"],
          hoverBackgroundColor: ["#2e59d9", "#17a673", "#F6B13E"],
          hoverBorderColor: "rgba(234, 236, 244, 1)",
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: "#dddfeb",
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
      },
      legend: {
        display: false,
      },
      cutoutPercentage: 80,
    },
  });
}

// Pie Chart Email
let ctxEmail = document.getElementById("emailPieChart");
if (ctxEmail) {
  let emailPieChart = new Chart(ctxEmail, {
    type: "doughnut",
    data: {
      labels: [
        "E-postası Onaylı Kullanıcı",
        "E-postası Onaylanmamış Kullanıcı",
      ],
      datasets: [
        {
          data: [emailVerNumOfUsers, totalNumOfUsers - emailVerNumOfUsers],
          backgroundColor: ["#36B9CC", "#4e73df"],
          hoverBackgroundColor: ["#36A5CC", "#2e59d9"],
          hoverBorderColor: "rgba(234, 236, 244, 1)",
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: "#dddfeb",
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
      },
      legend: {
        display: false,
      },
      cutoutPercentage: 80,
    },
  });
}

// console.log(usersPieChart.data.datasets[0].data);
