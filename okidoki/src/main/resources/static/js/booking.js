
//  ----------------------------------------------------------------------------------------------------------------------------------------
// Window load Function
window.addEventListener("load", () => {

  loadBookingTable();
  refreshForm();
  initMap();

});

// Booking Table Load Function
const loadBookingTable = () => {
  // Booking Array

  let bookings = getServiceRequest('/booking/bystatus');

  // Property List
  let propertyList = [
    { propertyName: "booking_no", dataType: "string" },
    { propertyName: getCustomer, dataType: "function" },
    { propertyName: getPickupLoaction, dataType: "function" },
    { propertyName: getDeliveryLoaction, dataType: "function" },
    { propertyName: "distance", dataType: "string" },
    { propertyName: getStatus, dataType: "function" }
  ];

  // Data Filling Function to Table
  dataFillIntoTheTable(bookingTableBody, bookings, propertyList, bookingView, bookingEdit, bookingDelete,);

  $('#bookingTable').DataTable();

};

const getCustomer = (dataOb) => {
  return dataOb.customer_id.company_name;
}

const getPickupLoaction = (dataOb) => {
  return dataOb.pickup_locations_id.name;
}

const getDeliveryLoaction = (dataOb) => {
  return dataOb.delivery_locations_id.name;
}

// Status of The booking Table 
let getStatus = (dataOb) => {
  if (dataOb.booking_status_id.status == "Inproccess") {
    return "<p class = ' p-2 text-center  text-danger rounded-5'>" + dataOb.booking_status_id.status + "</p>"
  }
  if (dataOb.booking_status_id.status == "Attend") {
    return "<p class = 'p-2 text-center  rounded-5' style = 'Color:blue; '> " + dataOb.booking_status_id.status + "</p>"
  }
  if (dataOb.booking_status_id.status == "Arrived At Pickup") {
    return "<p class = ' p-2 text-center rounded-5' style = 'Color:yellow;'>" + dataOb.booking_status_id.status + "</p>"
  }
  if (dataOb.booking_status_id.status == "Departed From Pickup") {
    return "<p class = 'p-2 text-center  rounded-5' style = 'Color:rgb(237, 206, 29);'>" + dataOb.booking_status_id.status + "</p>"
  }
  if (dataOb.booking_status_id.status == "Arrived At Delivery") {
    return "<p class = ' p-2 text-center rounded-5' style = 'Color:rgb(55, 242, 55);'>" + dataOb.booking_status_id.status + "</p>"
  }
  if (dataOb.booking_status_id.status == "Departed From Delivery") {
    return "<p class = 'p-2 text-center rounded-5' style = 'Color:rgb(6, 177, 4);'>" + dataOb.booking_status_id.status + "</p>"
  }

  if (dataOb.booking_status_id.status == "Cancelled") {
    return "<p class = 'p-2 text-center rounded-5' style = 'Color:rgb(6, 177, 4);'>" + dataOb.booking_status_id.status + "</p>"
  }
}

// Delete Button Of the Table
const bookingDelete = (dataOb, index) => {
  console.log(dataOb);
  let userConfirm = Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, Delete it!",
    allowOutsideClick: false,
    customClass :{
      cancelButton :'btn-3d btn-3d-cancel',
      confirmButton :'btn-3d btn-3d-delete'
    }
  }).then((userConfirm) => {
    if (userConfirm.isConfirmed) {
      //call post service
      let deleteresponse = httpServiceRequest("booking/delete", "DELETE", dataOb);;
      if (deleteresponse == "ok") {
        Swal.fire({
          title: "Deleted!",
          text: "Deleted Successfully",
          icon: "success",
          iconColor: "#d33",
          timer: 1000,
          showConfirmButton: false,
          customClass :{
            confirmButton :'btn-3d btn-3d-other'
          }
        });
        loadBookingTable();
        refreshForm();

      } else {
        Swal.fire({
          title: "Failed to Submit....?",
          text: postResponse,
          icon: "question",
          allowOutsideClick: false,
          customClass :{
            confirmButton :'btn-3d btn-3d-other'
          }
        });
      }
    } else if (userConfirm.dismiss === Swal.DismissReason.cancel) {
      Swal.fire({
        title: "Cancelled",
        text: "Details not Deleted!",
        icon: "error",
        customClass :{
          confirmButton :'btn-3d btn-3d-other'
        }
      });
    };
  });

};

// View Button Of the Table
const bookingView = (dataOb, index) => {

  dataCompanyName.innerText = dataOb.customer_id.company_name;
  dataContactPersonName.innerText = dataOb.booking_contact_person_name;
  dataContactPersonMobileNo.innerText = dataOb.booking_contact_person_mobileno;
  dataPickupLocation.innerText = dataOb.pickup_location;
  dataPickupDateAndTime.innerText = dataOb.pickup_date_time;
  dataDeliveryLocation.innerText = dataOb.delivery_location;
  dataDeliveryDateAndTime.innerText = dataOb.delivery_date_time;
  dataVehicleType.innerText = dataOb.vehicle_type_id.name;
  dataDistance.innerText = dataOb.distance;

  dataBookingStatus.innerText = dataOb.booking_status_id.status;


  $("#bookingViewForm").modal("show");
};

//Print Button  Of the Table
const buttonPrintRow = () => {
  let newWindow = window.open();
  let printView = "<head><title>Print Preview</title>" + "<link rel='stylesheet' href='booking.css'>" + `<link rel="stylesheet" href="../resources/bootstrap-5.2.3/css/bootstrap.min.css"></link>` + "</head><body><h2 class='text-center fw-bold' align='center'>Ceylon Transport</h2><div class='card'><table><tbody class='fw-bold'>" +
    "<tr><td >Company Name :</td> <td class='text-muted'>" + selectCompanyName.outerHTML + "</td></tr>" +
    "<tr><td >contact Person Name :</td> <td class='text-muted'>" + dataContactPersonName.outerHTML + "</td></tr>" +
    "<tr><td >contact Person Mobile No :</td> <td class='text-muted'>" + dataContactPersonMobileNo.outerHTML + "</td></tr>" +
    "<tr><td >Pickup Location :</td> <td class='text-muted'>" + dataPickupLocation.outerHTML + "</td></tr>" +
    "<tr><td >Date & Time :</td> <td class='text-muted'>" + dataPickupDateAndTime.outerHTML + "</td></tr>" +
    "<tr><td >Delivery Location :</td> <td class='text-muted'>" + dataDeliveryLocation.outerHTML + "</td></tr>" +
    "<tr><td >Date & Time :</td> <td class='text-muted'>" + dataDeliveryDateAndTime.outerHTML + "</td></tr>" +
    "<tr><td >Vehicle Type :</td> <td class='text-muted'>" + dataVehicleType.outerHTML + "</td></tr>" +
    "<tr><td > Distance :</td> <td class='text-muted'>" + dataDistance.outerHTML + "</td></tr>" +
    "<tr><td >Rate Per KM :</td> <td class='text-muted'>" + dataRate.outerHTML + "</td></tr>" +
    "</tbody></table></div></body>";
  newWindow.document.write(printView);

  setTimeout(() => {
    newWindow.stop();
    newWindow.print();
    newWindow.close();
  }, 500)
}

//Edit Button of the Table(for Refilling The Form)
const bookingEdit = (dataOb, index) => {
  console.log(dataOb);

  selectCompanyName.value = JSON.stringify(dataOb.customer_id);

  // edita eked customer agreement gahala tiyen vehicle type tika witharak enna oni
  let vehicleTypes = getServiceRequest('vehicletype/bycustomeragreementsandcustomerid?customer_id=' + dataOb.customer_id.id);
  dataFilIntoSelect(selectVehicleType, "Select Vehicle Type", vehicleTypes, "name")


  textContactPerson.value = dataOb.booking_contact_person_name;
  textContactPersonMobileNo.value = dataOb.booking_contact_person_mobileno;

  textPickupDateAndTime.value = dataOb.pickup_date_time;


  textDeliveryDateAndTime.value = dataOb.delivery_date_time;
  textDistance.value = dataOb.distance;


  document.getElementById('selectCompanyName').disabled = true;

  // waya locations thiyewn nam withrak meka wada karanawa
  if (dataOb.locations != null && dataOb.locations.length > 0) {
    vialocationchkbox.checked = "checked";
    vialocationLabel.innerText = 'Available';
    viaLocation.style.display = '';
    waypointslist.value = '';
    waypointslist.style.display = '';

    viaLocations = getServiceRequest('/location/withoutselectlocation?bookingid=' + dataOb.id);
    console.log(viaLocations)
    dataFilIntoSelect(selectViaLocation, "Select Via Location", viaLocations, "name")

    customeDataFilIntoSelect(waypointslist, "", dataOb.locations, "name")

    // waya location add karala thiyewn nam route eka calculate karawanawa
    calculateRoute();
  }
  //pickup location ekai deleivery locations ekai witharak select karala thiyenw nam route eka calculate karanwa
  calculateRoute();

  selectVehicleType.value = JSON.stringify(dataOb.vehicle_type_id);



  updateButton.style.display = "";
  submitButton.style.display = "none";

  booking = JSON.parse(JSON.stringify(dataOb));
  oldBooking = JSON.parse(JSON.stringify(dataOb));

  // edit ekedi customer adala location tika witharak fill wenna oni
  let deliveryLocation = getServiceRequest('/deliverylocation/bycustomerid?customer_id=' + dataOb.customer_id.id);
  dataFilIntoSelect(textDeliveryLocation, "Select Delivery Location", deliveryLocation, "name")
  console.log("1" + deliveryLocation)
  textDeliveryLocation.value = JSON.stringify(dataOb.delivery_locations_id);

  // edit ekedi customer adala location tika witharak fill wenna oni
  let pickupLocation = getServiceRequest('pickuplocation/bycustomerid?customer_id=' + dataOb.customer_id.id);
  dataFilIntoSelect(textPickupLocation, "Select Pickup Location", pickupLocation, "name")
  console.log("2-"  + pickupLocation)
  textPickupLocation.value = JSON.stringify(dataOb.pickup_locations_id);

  $(document).ready(function () {
    // Activate the first tab by default (optional)
    $('#pills-bookingform-tab').click();
  });

  // calculate distance and route on the update
  function calculateRoute() {
    const waypointItems = document.querySelectorAll('#waypointslist option');
    const waypoints = [];
    console.log(waypointItems);

    // Get waypoints from the waypoint items
    for (let i = 0; i < waypointItems.length; i++) {
      waypoints.push({
        location: waypointItems[i].dataset.location,
        stopover: true
      });
    }

    const origin = JSON.stringify(dataOb.pickup_locations_id);
    const destination = JSON.stringify(dataOb.delivery_locations_id);

    if (!origin || !destination) {
      // alert('Please enter both a starting point and destination.');
      Swal.fire({
        title: 'Error!',
        text: "Please Select both  Pickup Location and Delivery Location.",
        icon: 'error',
        confirmButtonText: 'OK',
        allowOutsideClick: false,
      });
      return;
    }

    // Create request for directions service
    const request = {
      origin: origin,
      destination: destination,
      waypoints: waypoints,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING
    };

    // Send request to directions service
    directionsService.route(request, function (response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(response);

        // Get the route from the response
        const route = response.routes[0];

        // Calculate total distance and duration
        let totalDistance = 0;
        let totalDuration = 0;

        route.legs.forEach(leg => {
          totalDistance += leg.distance.value;
          totalDuration += leg.duration.value;
        });

        // Convert distance to kilometers and duration to minutes
        totalDistance = (totalDistance / 1000).toFixed(2);
        totalDuration = (totalDuration / 60).toFixed(2);

        // Display total distance and duration
        document.getElementById('textDistance').value = `${totalDistance} km`;
        booking.distance = totalDistance;
      } else {
        // alert('Directions request failed due to ' + status);
        // Swal.fire({
        //   title: 'Error!',
        //   text: "Please Select both  Pickup Location and Delivery Location.",
        //   icon: 'error',
        //   confirmButtonText: 'OK',
        //   allowOutsideClick: false,
        // });
      }
    });
  }

  console.log(dataOb)
}

//Need to check all the fields are fill
const checkContactPersonCheckBox = document.getElementById("checkContactPersonCheckBox");
const checkFormError = () => {
  let errors = "";

  if (booking.customer_id == null) {
    errors = errors + "Please Enter Company Name..! \n";
  }
  if (booking.pickup_locations_id == null) {
    errors = errors + "Please Enter Pickup Location..! \n";
  }
  if (booking.pickup_date_time == null) {
    errors = errors + "Please Enter valid Pickup Date And Time..! \n";
  }
  if (booking.delivery_locations_id == null) {
    errors = errors + "Please Enter Delivery Location..! \n";
  }
  if (booking.delivery_date_time == null) {
    errors = errors + "Please Enter Delivery Date And Time..! \n";
  }
  if (booking.distance == null) {
    errors = errors + "Please Calculate the distance..! \n";
  }
  if (booking.vehicle_type_id == null) {
    errors = errors + "Please Select Vehicle Type..! \n";
  }
  if (checkContactPersonCheckBox.checked === true) {
    if (booking.booking_contact_person_name == null) {
      errors = errors + "Please Select Booking contact Person name... \n";
    }
    if (booking.booking_contact_person_mobileno == null) {
      errors = errors + "Please Select Booking Contact Person Mobile no... \n";
    }
  }
  if (vialocationchkbox.checked === true) {
    if (booking.locations.length === 0) {
      errors = errors + "Please Select via locations..! \n";
    }
  }
  return errors;
}

//Booking from submit event function
const bookingFormSubmit = () => {
  console.log(booking);

  // check form error for required element
  let errors = checkFormError();
  if (errors == "") {
    // errors not exit
    //need to get user confirmation

    let userConfirm = Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, save it!",
      allowOutsideClick: false,
      customClass :{
        cancelButton :'btn-3d btn-3d-cancel',
        confirmButton :'btn-3d btn-3d-submit'
      }

    }).then((userConfirm) => {
      if (userConfirm.isConfirmed) {
        //call post service
        let postResponse = httpServiceRequest("booking/insert", "POST", booking);
        if (postResponse == "ok") {
          Swal.fire({
            title: "Saved!",
            text: "Saved Successfully",
            icon: "success",
            customClass :{
              confirmButton :'btn-3d btn-3d-other'
            }
          });
          loadBookingTable();
          refreshForm();
          $("#booking").offcanvas("hide");
        } else {
          Swal.fire({
            title: "Failed to Submit....?",
            text: postResponse,
            icon: "question",
            customClass :{
              confirmButton :'btn-3d btn-3d-other'
            }
          });
        }
      } else if (userConfirm.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Cancelled",
          text: "Details not Saved!",
          icon: "error",
          customClass :{
            confirmButton :'btn-3d btn-3d-other'
          }
        });
      }
    });
  } else {
    Swal.fire({
      title: 'Error!',
      text: errors,
      icon: 'error',
      confirmButtonText: 'OK',
      allowOutsideClick: false,
      customClass :{
        confirmButton :'btn-3d btn-3d-other'
      }
    });
  }

}

//Need to check all the fields are fill 
const checkFormUpdates = () => {
  let updates = "";

  if (booking != null && oldBooking != null) {

    if (booking.booking_contact_person_name != oldBooking.booking_contact_person_name) {
      updates = updates + "Contact Person Name  Changed..! \n";
    }
    if (booking.booking_contact_person_mobileno != oldBooking.booking_contact_person_mobileno) {
      updates = updates + "Contact Person Mobile No Changed..! \n";
    }
    if (booking.pickup_locations_id.name != oldBooking.pickup_locations_id.name) {
      updates = updates + "Pickup Location  Changed..! \n";
    }
    if (booking.pickup_date_time != oldBooking.pickup_date_time) {
      updates = updates + "Pickup Date And Time  Changed..! \n";
    }
    if (booking.delivery_locations_id.name != oldBooking.delivery_locations_id.name) {
      updates = updates + "Delivery Location Changed..! \n";
    }
    if (booking.delivery_date_time != oldBooking.delivery_date_time) {
      updates = updates + "Delivery Date And Time Changed..! \n";
    }
    if (booking.vehicle_type_id.name != oldBooking.vehicle_type_id.name) {
      updates = updates + "Vehicle Type Changed..! \n";
    }
    if (booking.locations.length != oldBooking.locations.length) {
      updates = updates + "Location Changed..! \n";
    }
  }

  return updates;
}

// update button
const bookingFormUpdate = () => {
  // check form error for required element
  let errors = checkFormError();
  if (errors == "") {
    let updates = checkFormUpdates();
    // updates not exit
    if (updates == "") {
      Swal.fire({
        title: "Opps?",
        text: "Nothing To Update?",
        icon: "question",
        allowOutsideClick: false,
        customClass :{
          confirmButton :'btn-3d btn-3d-other'
        }
      });
    } else {
      let userConfirm = Swal.fire({
        title: "Are you sure?",
        text: "You want to update this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Update it!",
        allowOutsideClick: false,
        customClass :{
          cancelButton :'btn-3d btn-3d-cancel',
          confirmButton :'btn-3d btn-3d-update'
        }
      }).then((userConfirm) => {
        if (userConfirm.isConfirmed) {
          //call post service
          let postResponse = httpServiceRequest("booking/update", "PUT", booking);
          if (postResponse == "ok") {
            Swal.fire({
              title: "Update!",
              text: "Updated Successfully",
              icon: "success",
              customClass :{
                confirmButton :'btn-3d btn-3d-other'
              }
            });
            loadBookingTable();
            refreshForm();
            $("#booking").offcanvas("hide");

          } else {
            Swal.fire({
              title: "Failed to Submit....?",
              text: postResponse,
              icon: "question",
              customClass :{
                confirmButton :'btn-3d btn-3d-other'
              }
            });
          }
        } else if (userConfirm.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            title: "Cancelled",
            text: "Details not Updated!",
            icon: "error",
            allowOutsideClick: false,
            customClass :{
              confirmButton :'btn-3d btn-3d-other'
            }
          });
        }
      });
    }
  } else {
    Swal.fire({
      title: 'Error!',
      text: errors,
      icon: 'error',
      confirmButtonText: 'OK',
      allowOutsideClick: false,
      customClass :{
        confirmButton :'btn-3d btn-3d-other'
      }
    });
  }
}

// form Refresh after submit the form
const refreshForm = () => {
  booking = new Object();
  booking.locations = new Array();

  initMap();

  bookingForm.reset();

  setDefault([selectCompanyName, textContactPerson, textContactPersonMobileNo, textPickupLocation, textPickupDateAndTime, textDeliveryLocation, textDeliveryDateAndTime, selectVehicleType])

  let customers = getServiceRequest('/customer/byactiveagreements');
  dataFilIntoSelect(selectCompanyName, "Select Company Name", customers, "company_name")

  let vehicleTypes = getServiceRequest('/vehicletype/alldata');;
  dataFilIntoSelect(selectVehicleType, "Select Vehicle Type", vehicleTypes, "name")

  let pickupLocation = getServiceRequest('/pickuplocation/alldata');;
  dataFilIntoSelect(textPickupLocation, "Select Pickup Location", pickupLocation, "name")

  viaLocations = getServiceRequest('/location/alldata');
  dataFilIntoSelect(selectViaLocation, "Select Via Location", viaLocations, "name")

  dataFilIntoSelect(waypointslist, "", booking.locations, "name")

  let deliveryLocation = getServiceRequest('/deliverylocation/alldata');;
  dataFilIntoSelect(textDeliveryLocation, "Select Delivery Location", deliveryLocation, "name")

  submitButton.style.display = "";
  updateButton.style.display = "none";
  addButton.style.display = "none";

  viaLocation.style.display = "none";
  waypointslist.style.display = "none";

  document.getElementById('selectCompanyName').disabled = false;


  // table eka hidde karala thiyanaw
  tempeoryBookingListView.style.display = "none";

}

// -------------------------------------------------------------------------------------------------------------------
// get all active customers data
let customers = getServiceRequest('/customer/bycustomerstatus');

// cutomer select karaddi contact details auto fill kranwa function eka
let selectCompanyNameElement = document.querySelector("#selectCompanyName");
selectCompanyNameElement.addEventListener("change", () => {

  // booking object eka select customer value eka pass karanawa
  booking.customer_id = JSON.parse(selectCompanyNameElement.value);

  // check box eka details gnnw
  let checkBocCustomerPerson = document.querySelector("#checkContactPersonCheckBox");

  //customerwa change karaddi check box auto false wela input disbale wela value eka claen wenna oni
  checkBocCustomerPerson.checked = false;
  document.getElementById('textContactPerson').disabled = true;
  document.getElementById('textContactPersonMobileNo').disabled = true;
  document.getElementById('textContactPerson').value = "";
  document.getElementById('textContactPersonMobileNo').value = "";

  // validation remove wenna oni
  textContactPerson.classList.remove("is-invalid");
  textContactPerson.classList.remove("is-valid");

  textContactPersonMobileNo.classList.remove("is-invalid");
  textContactPersonMobileNo.classList.remove("is-valid");

  // input eke object jason parse karagannawa
  let selectCustomer = JSON.parse(selectCompanyNameElement.value);


  // gaththa customers lage all data walin id eka witharak gannawa
  let customerFound = customers.find(customer => customer.id === selectCustomer.id);

  // check box eka true kale naththan db eke thiyena contact data assign wenawa
  if (!checkBocCustomerPerson.checked) {
    console.log("12345")
    // gaththa id eka select karapu id eka samana nam conatct personge nama saha mobile nume eka input walata adesha wenawa
    if (customerFound) {
      document.getElementById('textContactPerson').value = customerFound.contact_person_fullname;
      document.getElementById('textContactPersonMobileNo').value = customerFound.contact_person_mobileno;
      booking.booking_contact_person_name = textContactPerson.value;
      booking.booking_contact_person_mobileno = textContactPersonMobileNo.value;
    }
  } else {
    document.getElementById('textContactPerson').disabled = true;
    document.getElementById('textContactPersonMobileNo').disabled = true;
    document.getElementById('textContactPerson').value = "";
    document.getElementById('textContactPersonMobileNo').value = "";

  }

//   -----------------------------------------------------------------------------------
//   cutomer anuwa vehicle type eka select karanawa
  let companyname = JSON.parse(selectCompanyNameElement.value);
  booking.customer_id = JSON.parse(selectCompanyNameElement.value);

  let vehicleTypes = getServiceRequest('vehicletype/bycustomeragreementsandcustomerid?customer_id=' + companyname.id);
  dataFilIntoSelect(selectVehicleType, "Select Vehicle Type", vehicleTypes, "name")


  let pickupLocation = getServiceRequest('pickuplocation/bycustomerid?customer_id=' + companyname.id);
  dataFilIntoSelect(textPickupLocation, "Select Pickup Location", pickupLocation, "name")

  viaLocations = getServiceRequest('location/bycustomerid?customer_id=' + companyname.id);
  dataFilIntoSelect(selectViaLocation, "Select Via Location", viaLocations, "name")

  let deliveryLocation = getServiceRequest('/deliverylocation/bycustomerid?customer_id=' + companyname.id);;
  dataFilIntoSelect(textDeliveryLocation, "Select Delivery Location", deliveryLocation, "name")

});

// check box eka true karaddi input type clean wenna oni.e wage input eka flase karaddi select customers ta adal contact deatils tik aye   input type walata fill wela input type tika disabled wenna oni
checkContactPersonCheckBox.addEventListener("click", function () {

  // select wela thiyena eke object eka jason parse karagannawa
  let selectCustomer = JSON.parse(selectCompanyNameElement.value);

  // selecte wela customerge id eka witharak gannawa
  let customerFound = customers.find(customer => customer.id === selectCustomer.id);

  if (this.checked) {
    document.getElementById('textContactPerson').disabled = false;
    document.getElementById('textContactPersonMobileNo').disabled = false;
    document.getElementById('textContactPerson').value = null;
    document.getElementById('textContactPersonMobileNo').value = null;

  } else {

    // select wela thiyen customerge id ekata adala contact deatils tika assign karanwa input ekata
    if (customerFound) {
      document.getElementById('textContactPerson').disabled = true;
      document.getElementById('textContactPersonMobileNo').disabled = true;

      document.getElementById('textContactPerson').value = customerFound.contact_person_fullname;
      document.getElementById('textContactPersonMobileNo').value = customerFound.contact_person_mobileno;
      booking.booking_contact_person_name = textContactPerson.value;
      booking.booking_contact_person_mobileno = textContactPersonMobileNo.value;

      // validation remove wenna oni
      textContactPerson.classList.remove("is-invalid");
      textContactPerson.classList.remove("is-valid");

      textContactPersonMobileNo.classList.remove("is-invalid");
      textContactPersonMobileNo.classList.remove("is-valid");
    }
  }
})

// booking form clear Button
const bookingFormClearButton = () => {
  refreshForm();
}

// booking type eka multiple booking nam table eka view karanna oni
// selectBookingType.addEventListener("change", () => {
//   if (selectBookingType.value == 'Multiple Booking') {
//     tempeoryBookingListView.style.display = "";
//     addButton.style.display = "";
//     submitButton.style.display = "none";
//     updateButton.style.display = "none";
//   } else {
//     tempeoryBookingListView.style.display = "none";
//     addButton.style.display = "none";
//     submitButton.style.display = "";
//   }
// })

// ----------------------------------------------------------------------------------------------
let companyName = document.getElementById('selectCompanyName')
addButton.addEventListener("click", function () {

  let tbody = document.getElementById("multipleBookingTableBody");

  const tr = document.createElement("tr");

  tr.innerHTML = `
  <td>${selectCompanyName.value}</td>
  <td>${selectCompanyName.value}</td>
  <td>${selectCompanyName.value}</td>
  <td>${selectCompanyName.value}</td>
  <td>${selectCompanyName.value}</td>
`
  tbody.appendChild(tr);
  const bookings = new Object();
  console.log(bookings);

})
//Alert Box Call function
Swal.isVisible();


let map;
let directionsService;
let directionsRenderer;
let waypoints = [];

// map initialize function
function initMap() {
  // Initialize the map
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 6,
    center: { lat: 37.7749, lng: -122.4194 } // San Francisco coordinates
  });

  // Initialize the DirectionsService and DirectionsRenderer
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer({
    map: map,
    panel: document.getElementById('directions-panel')
  });

  // Add event listeners
  document.getElementById('add-waypoint').addEventListener('click', addWaypoint);
  document.getElementById('textPickupLocation').addEventListener('change', calculateRoute);
  document.getElementById('textDeliveryLocation').addEventListener('change', calculateRoute);
  document.getElementById('waypointslist').addEventListener('change', calculateRoute);
}

// calculate distance and route
function calculateRoute() {
  const waypointItems = document.querySelectorAll('#waypointslist option');
  const waypoints = [];
  console.log(waypointItems);

  // Get waypoints from the waypoint items
  for (let i = 0; i < waypointItems.length; i++) {
    waypoints.push({
      location: waypointItems[i].dataset.location,
      stopover: true
    });
  }

  const origin = document.getElementById('textPickupLocation').value;
  const destination = document.getElementById('textDeliveryLocation').value;

  if (!origin || !destination) {
    // alert('Please enter both a starting point and destination.');
    Swal.fire({
      title: 'Error!',
      text: "Please Select both  Pickup Location and Delivery Location.",
      icon: 'error',
      confirmButtonText: 'OK',
      allowOutsideClick: false,
    });
    return;
  }

  // Create request for directions service
  const request = {
    origin: origin,
    destination: destination,
    waypoints: waypoints,
    optimizeWaypoints: true,
    travelMode: google.maps.TravelMode.DRIVING
  };

  // Send request to directions service
  directionsService.route(request, function (response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsRenderer.setDirections(response);

      // Get the route from the response
      const route = response.routes[0];

      // Calculate total distance and duration
      let totalDistance = 0;
      let totalDuration = 0;

      route.legs.forEach(leg => {
        totalDistance += leg.distance.value;
        totalDuration += leg.duration.value;
      });

      // Convert distance to kilometers and duration to minutes
      totalDistance = (totalDistance / 1000).toFixed(2);
      totalDuration = (totalDuration / 60).toFixed(2);

      // Display total distance and duration
      document.getElementById('textDistance').value = `${totalDistance} km`;
      booking.distance = totalDistance;
    } else {
      // alert('Directions request failed due to ' + status);
      // Swal.fire({
      //   title: 'Error!',
      //   text: "Please Select both  Pickup Location and Delivery Location.",
      //   icon: 'error',
      //   confirmButtonText: 'OK',
      //   allowOutsideClick: false,
      // });
    }
  });
}

// waya point add button
const addWaypoint = () => {
  let selectedViaLocations = JSON.parse(selectViaLocation.value)
  booking.locations.push(selectedViaLocations);
  customeDataFilIntoSelect(waypointslist, "", booking.locations, "name")
  calculateRoute();


  let extIndex = viaLocations.map(viaLocation => viaLocation.id).indexOf(selectedViaLocations.id);
  if (extIndex != -1) {
    viaLocations.splice(extIndex, 1);
  }
  dataFilIntoSelect(selectViaLocation, "Select Via Location", viaLocations, "name")

  waypointDateTime.value = "";
}

//custome Data fill in to the dynamic select elements for select waya locations
const customeDataFilIntoSelect = (parentId, massage, dataList, displayProperties) => {
  parentId.innerHTML = "";
  if (massage != "") {
    let optionMsgEs = document.createElement("option");
    optionMsgEs.value = " ";
    optionMsgEs.selected = "selected";
    optionMsgEs.disabled = "disabled";
    optionMsgEs.innerText = massage;
    parentId.appendChild(optionMsgEs);
  }

  dataList.forEach(dataOb => {
    let div = document.createElement("div");
    div.className = "row mt-2";
    let divcol = document.createElement("div");
    divcol.className = "col-10";

    let option = document.createElement("Option");
    option.value = JSON.stringify(dataOb);
    option.innerText = dataOb[displayProperties];
    // wayalocation map eke set karanna oni
    option.dataset.location = JSON.stringify(dataOb);

    let divcolnext = document.createElement("div");
    divcolnext.className = "col-2";
    let button = document.createElement("button");
    button.className = "btn btn-danger";
    button.innerText = "Delete";
    button.id = "btndelete";
    button.onclick = () => {
      removeWaypoint(dataOb);
    }

    divcol.appendChild(option);
    divcolnext.appendChild(button);
    div.appendChild(divcol);
    div.appendChild(divcolnext);
    parentId.appendChild(div);
  });

}

// remove function via location from select list
const removeWaypoint = (dataOb) => {
  console.log(dataOb)
  let selectedViaLocations = JSON.parse(JSON.stringify(dataOb))
  console.log(selectedViaLocations);
  viaLocations.push(selectedViaLocations);
  dataFilIntoSelect(selectViaLocation, "Select Via Location", viaLocations, "name")


  let extIndex = booking.locations.map(viaLocation => viaLocation.id).indexOf(selectedViaLocations.id);
  if (extIndex != -1) {
    booking.locations.splice(extIndex, 1);
  }
  customeDataFilIntoSelect(waypointslist, "", booking.locations, "name")
  // auto calculate the route when change
  calculateRoute();
}

//check box eka onclick ekedi list eka clean karanna oni
// delete all data function eka liyanna oni
let vialocationchkbox = document.getElementById("vialocationchkbox");
vialocationchkbox.addEventListener('click', () => {

  for (const viaLocation of booking.locations) {
    viaLocations.push(viaLocation);
  }
  dataFilIntoSelect(selectViaLocation, "Select Via Location", viaLocations, "name")

  booking.locations = [];
  customeDataFilIntoSelect(waypointslist, "", booking.locations, "name")
  // auto calculate the route
  calculateRoute();
})

