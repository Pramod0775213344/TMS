window.addEventListener("load", () => {

    loadCustomerAgreementTable();

    refreshCustomerAgreementForm();


})

// table data load function
const loadCustomerAgreementTable = () => {

    customerAgreements = getServiceRequest('/customeragreement/alldata');

    const propertyList = [
        { propertyName: getAgreementNo, dataType: "function" },
        { propertyName: getCustomer, dataType: "function" },
        { propertyName: getPackage, dataType: "function" },
        { propertyName: getPackageDsitance, dataType: "function" },
        { propertyName: getVehicleType, dataType: "function" },
        { propertyName: "agreement_end_date", dataType: "string" },
        { propertyName: getCustomerAgreementStatus, dataType: "function" }
    ];


    // table data fill function
    dataFillIntoTheTable(customerAgreementTableBody, customerAgreements, propertyList, customerAgreemnentView, customerAgreemnentEdit, customerAgreemnentDelete, true);

    $("#customerAgreementTable").dataTable();

}

// get agreement no
const getAgreementNo = (dataOb) => {

    return "<span class ='unique_no'>" + dataOb.cus_agreement_no + "</span >";
}
// get customer name
const getCustomer = (dataOb) => {
    return dataOb.customer_id.company_name;
}

// get package name
const getPackage = (dataOb) => {
    return dataOb.package_id.name;
}

// get package distance
const getPackageDsitance = (dataOb) => {
    if (dataOb.package_id.name == "Floating rate") {
        return "<span >" + dataOb.package_id.distance + "<span> Km </span></span>"
    }

    if (dataOb.package_id.name = "Fix Rate") {
        return "<span >" + dataOb.package_id.distance + "<span> Km </span></span>"
    }

}

//get vehicle type
const getVehicleType = (dataOb) => {
    return dataOb.vehicle_type_id.name;
}

// get customer agreement Status
const getCustomerAgreementStatus = (dataOb) => {
    if (dataOb.customer_agreement_status_id.status == 'Approved') {
        return "<span class='status-badge status-active'>" + dataOb.customer_agreement_status_id.status + "</span>"
    }

    if (dataOb.customer_agreement_status_id.status == 'Pending') {
        return "<span class='status-badge status-pending'> " + dataOb.customer_agreement_status_id.status + "</span>"
    }
    if (dataOb.customer_agreement_status_id.status == 'Expired') {
        return "<span class='status-badge status-inactive'> " + dataOb.customer_agreement_status_id.status + "</span>"
    }
    if (dataOb.customer_agreement_status_id.status == 'Deleted') {
        return "<span class='status-badge status-inactive'> " + dataOb.customer_agreement_status_id.status + "</span>"
    }
    if (dataOb.customer_agreement_status_id.status == 'Reject') {
        return "<span class='status-badge status-reject'> " + dataOb.customer_agreement_status_id.status + "</span>"
    }
}

const customerAgreemnentView = (dataOb) => { };

// agreement delete function
const customerAgreemnentDelete = (dataOb) => {
    console.log("Reject", dataOb);

    let userConfirm = Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        confirmButtonText: "Yes, Delete it!",
        allowOutsideClick: false,
        customClass :{
            cancelButton :'btn-3d btn-3d-cancel',
            confirmButton :'btn-3d btn-3d-delete'
        }
    }).then((userConfirm) => {
        if (userConfirm.isConfirmed) {
            //call post service
            let deleteResponse = httpServiceRequest("/customeragreement/delete", "DELETE", dataOb);
            if (deleteResponse == "ok") {
                Swal.fire({
                    title: "Reject!",
                    text: "Reject Successfully",
                    icon: "success",
                    iconColor: "#d33",
                    timer: 1000,
                    showConfirmButton: false,
                    customClass :{
                        confirmButton :'btn-3d btn-3d-other'
                    }
                });
                loadCustomerAgreementTable();
                refreshCustomerAgreementForm();
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
        }
    });
};

const customerAgreemnentEdit = (dataOb) => {

    // check the status of the agreementa and if it is approved can't edit the details
    if (dataOb.customer_agreement_status_id.status == 'Approved') {
        Swal.fire({
            title: "Opps?",
            text: "Can't Edit Approved Details",
            icon: "question",
            allowOutsideClick: false,
        });
        return;

    }


    selectCompanyName.value = JSON.stringify(dataOb.customer_id);

    textCustomerAgreementDate.value = dataOb.agreement_date;

    textCustomerAgreementPeriod.value = dataOb.agreement_period;

    textCustomerAgreementEndDate.value = dataOb.agreement_end_date;

    textCustomerDeliveryFrequency.value = dataOb.delivery_frequency;

    selectVehicleType.value = JSON.stringify(dataOb.vehicle_type_id);

    selectPackageType.value = JSON.stringify(dataOb.package_id);

    textCustomerAgreementCharge.value = dataOb.agreement_charge;

    textCustomerAgreementAdditionalCharge.value = dataOb.additional_charge;

    textCustomerAgreementDistance.value = dataOb.total_distance;

    textCustomerAgreementTotalAmount.value = dataOb.total_amount;

    textCustomerAgreementNote.value = dataOb.special_note;

    textCustomerAgreementApprovalNote.value = dataOb.approval_note;

    // update button dispaly and submit button hide
    updateButton.style.display = "";
    submitButton.style.display = "none";

    // when click the edit button the form will be display
    $("#customerAgreementModal").modal("show");

    customerAgreement = JSON.parse(JSON.stringify(dataOb));
    oldCustomerAgreement = JSON.parse(JSON.stringify(dataOb));
};

// check form errors
const checkFormError = () => {

    let errors = "";

    if (customerAgreement.customer_id == null) {
        errors += " Select  the Company Name.........";

    }
    if (customerAgreement.agreement_date == null) {
        errors += "Select the Agreement Date.....";

    }
    if (customerAgreement.agreement_period == null) {
        errors += "Select the Agreement Period..... ";

    }
    if (customerAgreement.agreement_end_date == null) {
        errors += "Select the Agreement End Date........";

    }
    if (customerAgreement.delivery_frequency == null) {
        errors += "Select the Delivery Frequency...........";

    }
    if (customerAgreement.vehicle_type_id == null) {
        errors += "Select the Vehicle......";

    }

    if (customerAgreement.package_id == null) {
        errors += "Select the Package..........";

    }

    return errors;
}

// customer agreement form submit function
const customerAgreementFormSubmit = () => {
  
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
                let postResponse = httpServiceRequest("/customeragreement/insert", "POST", customerAgreement);
                if (postResponse == "ok") {
                    Swal.fire({
                        title: "Saved!",
                        text: "Saved Successfully",
                        icon: "success",
                        customClass :{
                            confirmButton :'btn-3d btn-3d-other'
                        }
                    });
                    loadCustomerAgreementTable();
                    refreshCustomerAgreementForm();

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

// check form updates
const checkFormUpdates = () => {
    let updates = "";

    if (customerAgreement != null && oldCustomerAgreement != null) {
        if (customerAgreement.customer_id.company_name != oldCustomerAgreement.customer_id.company_name) {
            updates += "Please Select the company name..... ";
        }
        if (customerAgreement.agreement_date != oldCustomerAgreement.agreement_date) {
            updates += "Please Select the agreement date..... ";
        }
        if (customerAgreement.agreement_period != oldCustomerAgreement.agreement_period) {
            updates += "Please Select the agreement period..... ";
        }
        if (customerAgreement.agreement_end_date != oldCustomerAgreement.agreement_end_date) {
            updates += "Please Select the agreement end date..... ";
        }
        if (customerAgreement.delivery_frequency != oldCustomerAgreement.delivery_frequency) {
            updates += "Please Select the delivery frequency..... ";
        }
        if (customerAgreement.vehicle_type_id.name != oldCustomerAgreement.vehicle_type_id.name) {
            updates += "Please Select the vehicle type..... ";
        }
        if (customerAgreement.package_id.name != oldCustomerAgreement.package_id.name) {
            updates += "Please Select the package..... ";
        }
        if (customerAgreement.agreement_charge != oldCustomerAgreement.agreement_charge) {
            updates += "Please Enter the agreement charge..... ";
        }
        if (customerAgreement.additional_charge != oldCustomerAgreement.additional_charge) {
            updates += "Please Enter the additional charge..... ";
        }
        if (customerAgreement.total_distance != oldCustomerAgreement.total_distance) {
            updates += "Please Enter the total distance..... ";
        }
        if (customerAgreement.total_amount != oldCustomerAgreement.total_amount) {
            updates += "Please Enter the total amount..... ";
        }
        if (customerAgreement.special_note != oldCustomerAgreement.special_note) {
            updates += "Please Enter the agreement note..... ";
        }
    }

    return updates;
}

// customer agreement form update function
const customerAgreementFormUpdate = () => {

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
                    confirmButton :'btn-3d btn-3d-submit'
                }
            }).then((userConfirm) => {
                if (userConfirm.isConfirmed) {
                    //call putt service
                    let putResponse = httpServiceRequest("/customeragreement/update", "PUT", customerAgreement);
                    if (putResponse == "ok") {
                        Swal.fire({
                            title: "Update!",
                            text: "Updated Successfully",
                            icon: "success",
                            customClass :{
                                confirmButton :'btn-3d btn-3d-other'
                            }
                        });
                        loadCustomerAgreementTable();
                        refreshCustomerAgreementForm();
                        $("#customerAgreementModal").modal("hide");

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

// refresh customer agreement form
const refreshCustomerAgreementForm = () => {

    customerAgreement = new Object();

    customerAgreementForm.reset();

    //form get intial color when refresh the form
    setDefault([selectCompanyName, textCustomerAgreementDate, textCustomerAgreementPeriod, textCustomerAgreementEndDate, textCustomerDeliveryFrequency, selectVehicleType, selectPackageType, textCustomerAgreementCharge, textCustomerAgreementAdditionalCharge, textCustomerAgreementDistance, textCustomerAgreementTotalAmount, textCustomerAgreementNote]);


    let compnayNames = getServiceRequest('/customer/bycustomerstatus');
    dataFilIntoSelect(selectCompanyName, "Select Company Name", compnayNames, "company_name")

    let vehicleTypes = getServiceRequest('/vehicletype/alldata');;
    dataFilIntoSelect(selectVehicleType, "Select Vehicle Type", vehicleTypes, "name")

    let packageTypes = getServiceRequest('/package/bypackagestatus');
    dataFilIntoSelect(selectPackageType, "Select Package Type", packageTypes, "name")

    selectPackageType.style.display = "none";
    submitButton.style.display = "";
    updateButton.style.display = "none";
};

// filetr function and validation function 
let vehicleTypeElement = document.querySelector("#selectVehicleType");
vehicleTypeElement.addEventListener("change", () => {

    let vehicleType = JSON.parse(vehicleTypeElement.value);
    customerAgreement.vehicle_type_id = JSON.parse(vehicleTypeElement.value);

    selectVehicleType.classList.remove("is-invalid");
    selectVehicleType.classList.add("is-valid");

    selectPackageType.style.display = "";


    let packageByVehicleType = getServiceRequest('package/byvehicletype?vehicletypeid=' + vehicleType.id);
    dataFilIntoSelect(selectPackageType, "Select Package Type", packageByVehicleType, "name")
})

//Alert Box Call function
Swal.isVisible();