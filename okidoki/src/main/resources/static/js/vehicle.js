window.addEventListener("load", () => {

    loadVehicleTable();
    refreshVehicleForm();


});

// load vehicle table
const loadVehicleTable = () => {

    let vehicles = getServiceRequest('/vehicle/alldata');

    const propertyList = [
        { propertyName: getTransportName, dataType: "function" },
        { propertyName: "vehicle_no", dataType: "string" },
        { propertyName: getVehicleType, dataType: "function" },
        { propertyName: getVehicleMake, dataType: "function" },
        { propertyName: "model", dataType: "string" },
        { propertyName: getVehicleStatus, dataType: "function" }]

    dataFillIntoTheTable(vehicleTableBody, vehicles, propertyList, vehicleView, vehicleEdit, vehicleDelete, true);


    $("#vehicleTable").dataTable();

};

// get Transport Name
const getTransportName = (dataOb) => {

    return dataOb.supplier_id.transportname;
};

// get Vehicle Type
const getVehicleType = (dataOb) => {
    return dataOb.vehicle_type_id.name;
};

// get Vehicle Make
const getVehicleMake = (dataOb) => {
    return dataOb.vehicle_make_id.name;
};

// get driver Status
const getVehicleStatus = (dataOb) => {
    if (dataOb.vehicle_status_id.status == 'Active') {
        return "<span class='status-badge status-active'>" + dataOb.vehicle_status_id.status + "</span>"
    }

    if (dataOb.vehicle_status_id.status == 'Inactive') {
        return "<span class='status-badge status-pending'>" + dataOb.vehicle_status_id.status + "</span>"
    }
    if (dataOb.vehicle_status_id.status == 'Deleted') {
        return "<span class='status-badge status-inactive'>" + dataOb.vehicle_status_id.status + "</span>"
    }
};

// vehicle form function
const vehicleView = (dataOb) => {

}

// vehicle form Edit Function
const vehicleEdit = (dataOb) => {

    textVehicleTransportName.value = JSON.stringify(dataOb.supplier_id);
    textVehicleNo.value = dataOb.vehicle_no;
    selectVehicleType.value = JSON.stringify(dataOb.vehicle_type_id);
    selectVehicleMake.value = JSON.stringify(dataOb.vehicle_make_id);
    textVehicleModel.value = dataOb.model;
    textVehicleYear.value = dataOb.make_year;

    if (dataOb.category == "Own") {
        radioOwnVehicle.checked = "checked"
    } else {
        radioNonOwnVehicle.checked = "checked"
    }
    textVehicleInsuranceExpireDate.value = dataOb.insurance_expire_date;
    textVehicleRevenuLicenseExpireDate.value = dataOb.revenu_license_expire_date;
    textVehicleStartMeterReading.value = dataOb.startup_meter_reading;
    textVehicleCurrentMeterReading.value = dataOb.current_meter_reading;
    textVehicleStatus.value = JSON.stringify(dataOb.vehicle_status_id);

    $("#vehicleFormModal").modal("show")

    updateButton.style.display = "";
    submitButton.style.display = "none";


    vehicle = JSON.parse(JSON.stringify(dataOb));
    oldVehicle = JSON.parse(JSON.stringify(dataOb));

}

// vehicle form delete function
const vehicleDelete = (dataOb) => {

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
            let deleteResponse = httpServiceRequest("/vehicle/delete", "DELETE", dataOb);
            if (deleteResponse == "ok") {
                Swal.fire({
                    title: "Deleted!",
                    text: "Deleted Successfully",
                    icon: "success",
                    iconColor: "#d33",
                    timer: 1000,
                    confirmButtonColor: "#d33",
                    showConfirmButton: false,
                    customClass :{
                        confirmButton :'btn-3d btn-3d-other'
                    }

                });
                loadVehicleTable();
                refreshVehicleForm();
            } else {
                Swal.fire({
                    title: "Failed to Submit....?",
                    text: deleteResponse,
                    icon: "question",
                    allowOutsideClick: false,
                    customClass :{
                        confirmButton :'btn-3d btn-3d-other'
                    }
                });
            };
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
}

// check form errors
const checkFormError = () => {
    let errors = "";

    if (vehicle.supplier_id == null) {
        errors = errors + "Please select the trasnport name....... ";
    }
    if (vehicle.vehicle_no == null) {
        errors = errors + "Please Enter Vehicle Number....... ";
    }
    if (vehicle.model == null) {
        errors = errors + "Please Enter Vehicle Modal....... ";
    }
    if (vehicle.make_year == null) {
        errors = errors + "Please Enter Vehicle make year....... ";
    }
    if (vehicle.insurance_expire_date == null) {
        errors = errors + "Please Enter insurance expire date....... ";
    }
    if (vehicle.revenu_license_expire_date == null) {
        errors = errors + "Please  Enter Revenu license expire date....... ";
    }
    if (vehicle.startup_meter_reading == null) {
        errors = errors + "Please Enter Start Meter reading....... ";
    }
    if (vehicle.vehicle_type_id == null) {
        errors = errors + "Please select vehicle Type....... ";
    }
    if (vehicle.vehicle_make_id == null) {
        errors = errors + "Please select the make....... ";
    }
    if (vehicle.category == null) {
        errors = errors + "Please select the Category....... ";
    }
    if (vehicle.vehicle_status_id == null) {
        errors = errors + "Please select the status....... ";
    }

    return errors;

}

//vehicel form submit buttom
const vehicleFormSubmit = () => {
  
    // check form error for required element
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
                let postResponse = httpServiceRequest("/vehicle/insert", "POST", vehicle);

                if (postResponse == "ok") {
                    Swal.fire({
                        title: "Saved!",
                        text: "Saved Successfully",
                        icon: "success",
                        customClass :{
                            confirmButton :'btn-3d btn-3d-other'
                        }
                    });
                    loadVehicleTable();
                    refreshVehicleForm();
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
    console.log(vehicle);
}

// check form updates
const checkFormUpdates = () => {
    let updates = "";
    if (vehicle != null && oldVehicle != null) {
        if (vehicle.supplier_id.transportname != oldVehicle.supplier_id.transportname) {
            updates = updates + "Transport Name is changed.... ";
        }
        if (vehicle.vehicle_no != oldVehicle.vehicle_no) {
            updates = updates + "Vehicle Number is changed.... ";
        }
        if (vehicle.model != oldVehicle.model) {
            updates = updates + "Vehicle Model is changed.... ";
        }
        if (vehicle.make_year != oldVehicle.make_year) {
            updates = updates + "Vehicle Make Year is changed.... ";
        }
        if (vehicle.insurance_expire_date != oldVehicle.insurance_expire_date) {
            updates = updates + "Insurance Expire Date is changed.... ";
        }
        if (vehicle.revenu_license_expire_date != oldVehicle.revenu_license_expire_date) {
            updates = updates + "Revenu License Expire Date is changed.... ";
        }
        if (vehicle.startup_meter_reading != oldVehicle.startup_meter_reading) {
            updates = updates + "Start Meter Reading is changed.... ";
        }
        if (vehicle.vehicle_type_id.name != oldVehicle.vehicle_type_id.name) {
            updates = updates + "Vehicle Type is changed.... ";
        }
        if (vehicle.vehicle_make_id.name != oldVehicle.vehicle_make_id.name) {
            updates = updates + "Vehicle Make is changed.... ";
        }
        if (vehicle.category != oldVehicle.category) {
            updates = updates + "Category is changed.... ";
        }
        if (vehicle.vehicle_status_id.status != oldVehicle.vehicle_status_id.status) {
            updates = updates + "Status is changed.... ";
        }
    }

    return updates;

}

// vehicle form update function
const vehicleFormUpdate = () => {
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
                    let putResponse = httpServiceRequest("/vehicle/update", "PUT", vehicle);;
                    if (putResponse == "ok") {
                        Swal.fire({
                            title: "Update!",
                            text: "Updated Successfully",
                            icon: "success",
                            customClass :{
                                confirmButton :'btn-3d btn-3d-other'
                            }
                        });
                        loadVehicleTable();
                        refreshVehicleForm();
                        $("#vehicleFormModal").modal("hide");

                    } else {
                        Swal.fire({
                            title: "Failed to Submit....?",
                            text: putResponse,
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

// vehicle form refresh function
const refreshVehicleForm = () => {

    vehicle = new Object();
    vehicleRegistrationForm.reset();

    setDefault([textVehicleTransportName, textVehicleNo, selectVehicleType, selectVehicleMake, textVehicleModel, textVehicleYear, textVehicleInsuranceExpireDate, textVehicleRevenuLicenseExpireDate, textVehicleStartMeterReading, textVehicleCurrentMeterReading, textVehicleStatus])

    // get only active suppliers
    let transportNames = getServiceRequest('/supplier/alldatabystatus');
    dataFilIntoSelect(textVehicleTransportName, "Select Transport", transportNames, "transportname");

    let vehicleStatus = getServiceRequest('/vehiclestatus/alldata');
    dataFilIntoSelect(textVehicleStatus, "Select Status", vehicleStatus, "status");

    let vehicleType = getServiceRequest('/vehicletype/alldata');
    dataFilIntoSelect(selectVehicleType, "Select Vehicle Type", vehicleType, "name");

    let vehicleMake = getServiceRequest('/vehiclemake/alldata');
    dataFilIntoSelect(selectVehicleMake, "Select Vehicle Make", vehicleMake, "name");

    submitButton.style.display = "";
    updateButton.style.display = "none";
};

//Alert Box Call function
Swal.isVisible();