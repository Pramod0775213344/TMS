//recent 5 bookings get in to the dashboeard
const loadRecentBookingTableFunction = () => {
    console.log("111")
    let recentBookings = getServiceRequest('/booking/recentbooking');
    console.log(recentBookings)

    let propertyList = [
        { propertyName: "booking_no", dataType: "string" },
        { propertyName: getCustomer, dataType: "function" },
        { propertyName: getVehicleNo, dataType: "function" },
        { propertyName: "pickup_date_time", dataType: "string" },
        { propertyName: "delivery_date_time", dataType: "string" }
    ];

    // Data Filling Function to Table
    dataFillIntoTheReportTable(recentBookingsTableBody,recentBookings,propertyList);
}

window.addEventListener("load", ()=> {
         loadRecentBookingTableFunction();
          bookingcountgeneratebybookingstatus();
          bookingcountgeneratebyCustomer();
          monthlydistancegeneratebyBookings();
      });

      // get customer name
      const getCustomer = (dataOb) => {
          return dataOb.customer_id.company_name;
          console.log(dataOb)
      }

      // get vehicle no
      const getVehicleNo = (dataOb) => {
          if(dataOb.vehicle_id != null){
              return dataOb.vehicle_id.vehicle_no;
          }else{
              return "<span class='status-badge status-inactive mt-2'>Not Assigned</span>";
          }
      }

      // vehicle count eka chart eken generate karana function eka
      const bookingcountgeneratebybookingstatus = () =>{

          let datalist = getServiceRequest('/report/countbybookingstatus');

          let reportDatalist = new Array();
          let data = new Array();
          let label = new Array();

          for (const index in datalist) {
              let object = new Object();
              object.vehicle_type = datalist[index][0];
              object.count = datalist[index][1];
              reportDatalist.push(object);

              label.push(datalist[index][1]);
              data.push(datalist[index][0]);
          }

          const propertyList = [
              { propertyName: "count", dataType: "string" },
              { propertyName: "status", dataType: "string" },
          ];
          // chart generate
          const ctx = document.getElementById('myChart');

          new Chart(ctx, {
              type: 'bar',
              data: {
                  labels: label,
                  datasets: [{
                      label: 'Number Of Bookings',
                      data: data,
                      borderWidth: 1,
                      backgroundColor: [
                          '#22C55E',  // Primary green
                          '#4ADE80',  // Mint green
                          '#86EFAC',  // Soft light green
                          '#16A34A',  // Darker green
                          '#BBF7D0',  // Very light green
                          '#15803D',  // Forest green
                          '#A7F3D0'   // Mint pastel
                      ],
                  }]
              },
              options: {
                  scales: {
                      y: {
                          beginAtZero: true
                      }
                  }
              }
          });
      }

      // booking count eka chart eken generate karana function eka
      const bookingcountgeneratebyCustomer = () =>{

          let datalist = getServiceRequest('/report/bookingcountbycustomer');

          let reportDatalist = new Array();
          let data = new Array();
          let label = new Array();

          for (const index in datalist) {
              let object = new Object();
              object.vehicle_type = datalist[index][0];
              object.count = datalist[index][1];
              reportDatalist.push(object);

              label.push(datalist[index][1]);
              data.push(datalist[index][0]);
          }

          const propertyList = [
              { propertyName: "count", dataType: "string" },
              { propertyName: "customer_name", dataType: "string" },
          ];
          // chart generate
          const ctx = document.getElementById('myChart2');

          new Chart(ctx, {
              type: 'doughnut',
              data: {
                  labels: label,
                  datasets: [{
                      label: 'Number Of Bookings',
                      data: data,
                      borderWidth: 1,
                      backgroundColor: [
                          '#22C55E',
                          '#4ADE80',
                          '#86EFAC',
                          '#16A34A',
                          '#BBF7D0'
                      ],
                  }]
              },
              options: {
                  scales: {
                      y: {
                          beginAtZero: true
                      }
                  }
              }
          });
      }

      // booking count eka chart eken generate karana function eka
      const monthlydistancegeneratebyBookings = () =>{

          let datalist = getServiceRequest('/report/totalbookingdistancebymonthlybookings');

          let reportDatalist = new Array();
          let data = new Array();
          let label = new Array();

          for (const index in datalist) {
              let object = new Object();
              object.vehicle_type = datalist[index][0];
              object.count = datalist[index][1];
              reportDatalist.push(object);

              label.push(datalist[index][1]);
              data.push(datalist[index][0]);
          }

          const propertyList = [
              { propertyName: "distance", dataType: "string" },
              { propertyName: "month", dataType: "string" },
          ];
          // chart generate
          const ctx = document.getElementById('myChart3');

          new Chart(ctx, {
              type: 'line',
              data: {
                  labels: label,
                  datasets: [{
                      label: 'Distance(KM)',
                      data: data,
                      borderColor: '#22C55E',
                      backgroundColor :function(context) {
                          const chart = context.chart;
                          const {ctx, chartArea} = chart;
                          if (!chartArea) {
                              return null;
                          }
                          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                          // gradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)');
                          // gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.4)');
                          // gradient.addColorStop(1, 'rgba(59, 130, 246, 0.1)');
                          gradient.addColorStop(0, 'rgba(34, 197, 94, 0.8)');   // Primary green (#22C55E)
                          gradient.addColorStop(0.5, 'rgba(34, 197, 94, 0.4)');
                          gradient.addColorStop(1, 'rgba(34, 197, 94, 0.1)');
                          return gradient;
                      },
                      borderWidth: 2.5,
                      fill: true,
                      tension: 0.4,
                      pointBackgroundColor: '#1ebb59',
                      pointBorderColor: '#ffffff',
                      pointBorderWidth: 2,
                      pointRadius: 5,
                      pointHoverRadius: 7,
                      pointHoverBackgroundColor: '#1ebb59',
                      pointHoverBorderColor: '#ffffff',
                      pointHoverBorderWidth: 3
                  }]
              },
              options: {
                  scales: {
                      y: {
                          beginAtZero: true
                      }
                  }
              }
          });
      }

