
window.addEventListener('load', () => {

    loadSupplierAgreementTable();

    refreshSupplierAgreementForm();



});

// table data load function
const loadSupplierAgreementTable = () => {

    supplierAgreements =  getServiceRequest('/supplieragreement/alldata');

    const propertyList = [
        { propertyName: getSupplierTransportName, dataType: "function" },
        { propertyName: getSupplierName, dataType: "function" },
        { propertyName: getVehicleType, dataType: "function" },
        { propertyName: getVehicleNo, dataType: "function" },
        { propertyName: getPackageType, dataType: "function" },
        { propertyName: getSupplierAgreementStatus, dataType: "function" }
    ];

    dataFillIntoTheTable(supplierAgreementTableBody, supplierAgreements, propertyList, supplierAgreementView,supplierAgreementEdit, supplierAgreementDelete, true);

    $("#supplierAggrementTable").dataTable();
};


// get supplier transport name
const getSupplierTransportName = (dataOb) => {
    return dataOb.supplier_id.transportname;
}

// get supplier name
const getSupplierName = (dataOb) => {
    return dataOb.supplier_id.fullname;
}

// get vehicle type
const getVehicleType = (dataOb) => {
    return dataOb.vehicle_id.vehicle_type_id.name;
}

// get vehicle no
const getVehicleNo = (dataOb) => {
    return dataOb.vehicle_id.vehicle_no;
}

// get package type
const getPackageType = (dataOb) => {
    return dataOb.package_id.name;
}

// get supplier agreement status
const getSupplierAgreementStatus = (dataOb) => {
    if (dataOb.supplier_agreement_status_id.status == 'Approved') {
        return "<span class='status-badge status-active'>" + dataOb.supplier_agreement_status_id.status + "</span>"
    }

    if (dataOb.supplier_agreement_status_id.status == 'Pending') {
        return "<span class='status-badge status-pending'> " + dataOb.supplier_agreement_status_id.status + "</span>"
    }
    if (dataOb.supplier_agreement_status_id.status == 'Expired') {
        return "<span class='status-badge status-inactive'> " + dataOb.supplier_agreement_status_id.status + "</span>"
    }
    if (dataOb.supplier_agreement_status_id.status == 'Deleted') {
        return "<span class='status-badge status-inactive'> " + dataOb.supplier_agreement_status_id.status + "</span>"
    }
    if (dataOb.supplier_agreement_status_id.status == 'Reject') {
        return "<span class='status-badge status-reject'> " + dataOb.supplier_agreement_status_id.status + "</span>"
    }
}


// supplier agreement view function
const supplierAgreementView = (dataOb) => {
}

// supplier agreement delete function
const supplierAgreementDelete = (dataOb) => {
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
            let deleteResponse = httpServiceRequest("/supplieragreement/delete", "DELETE", dataOb);
            if (deleteResponse == "ok") {
                Swal.fire({
                    title: "Deleted!",
                    text: "Deletd Successfully",
                    icon: "success",
                    iconColor: "#d33",
                    timer: 1000,
                    showConfirmButton: false,
                    customClass :{
                        confirmButton :'btn-3d btn-3d-other'
                    }
                });
                loadSupplierAgreementTable();
                refreshSupplierAgreementForm();
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

// supplier agreement edit function
const supplierAgreementEdit = (dataOb) => {

    // check the status of the agreementa and if it is approved can't edit the details
    if (dataOb.supplier_agreement_status_id.status == 'Approved' ) {
        Swal.fire({
            title: "Opps?",
            text: "Can't Edit Approved Details",
            icon: "question",
            allowOutsideClick: false,
        });
        return;
    }

       // check the status of the agreementa and if it is Deletd can't edit the details
       if (dataOb.supplier_agreement_status_id.status == 'Deleted' ) {
        Swal.fire({
            title: "Opps?",
            text: "Can't Edit Deleted Details",
            icon: "question",
            allowOutsideClick: false,
        });
        return;
    }

    selectTransportName.value = JSON.stringify(dataOb.supplier_id);

    let vehicleBySupplier = getServiceRequest('/vehicle/bysupplierid?supplierid=' + dataOb.supplier_id.id);
    dataFilIntoSelect(selectVehicleNo, "Select Vehicle", vehicleBySupplier, "vehicle_no")

    selectVehicleNo.value = JSON.stringify(dataOb.vehicle_id);

    // ----------------------------------------------------------------------
    if (dataOb.agreement_charge == null || dataOb.agreement_charge == undefined) {
        
        textSupplierAgreementCharge.value = dataOb.agreement_charge;
    } else {
        textSupplierAgreementCharge.value = "";
    }

    // ----------------------------------------------------------------------
    if (dataOb.additional_charge == null || dataOb.additional_charge == undefined) {
       
        textSupplierAgreementAdditionalCharge.value = dataOb.additional_charge; 
    } else {
        textSupplierAgreementAdditionalCharge.value = "";
    }

    // ----------------------------------------------------------------------
    if (dataOb.special_note == null || dataOb.special_note == undefined) {
        textSupplierAgreementNote.value = dataOb.special_note;
        
    } else {
        textSupplierAgreementNote.value = "";
    }

    textSupplierAgreementDate.value = dataOb.agreement_date;

    textSupplierAgreementPeriod.value = dataOb.agreement_period;

    textSupplierAgreementEndDate.value = dataOb.agreement_end_date;

    selectPackageType.value = JSON.stringify(dataOb.package_id);

    textSupplierAgreementTotalAmount.value = dataOb.total_amount;

    textSupplierAgreementApprovalNote.value = dataOb.approval_note;



    supplierAgreement = JSON.parse(JSON.stringify(dataOb));
    oldSupplierAgreement = JSON.parse(JSON.stringify(dataOb));

    // when click the edit button the form will be display
    $("#supplierAgreementFormModal").modal("show");

    selectVehicleNo.disabled = false;

    updateButton.style.display = "";
    submitButton.style.display = "none";

}

// check form errros
const checkFormError = () => {
    let errors = "";

    if (supplierAgreement.supplier_id == null) {
        errors = errors + "Please Select Supplier Name........";
    }
    if (supplierAgreement.vehicle_id == null) {
        errors = errors + "Please Select Vehicle Number........";
    }
    if (supplierAgreement.agreement_date == null) {
        errors = errors + "Please Select Agreement Date........";
    }
    if (supplierAgreement.agreement_period == null) {
        errors = errors + "Please Select Agreement Period........";
    }
    if (supplierAgreement.agreement_end_date == null) {
        errors = errors + "Please Select Agreement End Date........";
    }
    if (supplierAgreement.package_id == null) {
        errors = errors + "Please Select Package Type........";
    }

    return errors;
}

// supplier agreement form submit
const supplierAgreementFormSubmit = () => {
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
                let postResponse = httpServiceRequest("/supplieragreement/insert", "POST", supplierAgreement);
                if (postResponse == "ok") {
                    Swal.fire({
                        title: "Saved!",
                        text: "Saved Successfully",
                        icon: "success",
                        customClass :{
                            confirmButton :'btn-3d btn-3d-other'
                        }
                    });
                    loadSupplierAgreementTable();
                    refreshSupplierAgreementForm();

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

    if (supplierAgreement != null && oldSupplierAgreement != null) {

        if (supplierAgreement.supplier_id.transportname != oldSupplierAgreement.supplier_id.transportname) {
            updates = updates + "Transport Name is changed.....";
        }
        if (supplierAgreement.vehicle_id.vehicle_no != oldSupplierAgreement.vehicle_id.vehicle_no) {
            updates = updates + "Vehicle Number is changed ";
        }
        if (supplierAgreement.agreement_date != oldSupplierAgreement.agreement_date) {
            updates = updates + "Agreement Date is changed  ";
        }
        if (supplierAgreement.agreement_period != oldSupplierAgreement.agreement_period) {
            updates = updates + "Agreement Period is changed  ";
        }
        if (supplierAgreement.agreement_end_date != oldSupplierAgreement.agreement_end_date) {
            updates = updates + "Agreement End Date is changed  ";
        }
       
        if (supplierAgreement.package_id.name != oldSupplierAgreement.package_id.name) {
            updates = updates + "Package Type is changed  ";
        }
        if (supplierAgreement.agreement_charge != oldSupplierAgreement.agreement_charge) {
            updates = updates + "Agreement Charge is changed  ";
        }
        if (supplierAgreement.additional_charge != oldSupplierAgreement.additional_charge) {
            updates = updates + "Additional Charge is changed  ";
        }
        if (supplierAgreement.distance != oldSupplierAgreement.distance) {
            updates = updates + "Distance is changed  ";
        }
        if (supplierAgreement.total_amount != oldSupplierAgreement.total_amount) {
            updates = updates + "Total Amount is changed  ";
        }

        if (supplierAgreement.special_note != oldSupplierAgreement.special_note) {
            updates = updates + "Note is changed  ";
        }
    }
    return updates;
}

// supplier agreement form update
const supplierAgreementFormUpdate = () => {

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
            });
            console.log(oldSupplierAgreement);
            console.log(supplierAgreement);
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
                    //call putt service
                    let putResponse = httpServiceRequest("/supplieragreement/update", "PUT", supplierAgreement);
                    if (putResponse == "ok") {
                        Swal.fire({
                            title: "Update!",
                            text: "Updated Successfully",
                            icon: "success",
                            customClass :{
                                confirmButton :'btn-3d btn-3d-other'
                            }
                        });
                        loadSupplierAgreementTable();
                        refreshSupplierAgreementForm();
                        $("#supplierAgreementFormModal").modal("hide");

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

// refresh supplier agreement form
const refreshSupplierAgreementForm = () => {

    supplierAgreement = new Object();

    supplierAgreementForm.reset();

    setDefault([selectTransportName, selectVehicleNo, textSupplierAgreementDate, textSupplierAgreementPeriod, textSupplierAgreementEndDate, selectPackageType, textSupplierAgreementCharge, textSupplierAgreementAdditionalCharge, textSupplierAgreementTotalAmount, textSupplierAgreementNote]);

    let transportnames =  getServiceRequest('/supplier/alldatabystatus');
    dataFilIntoSelect(selectTransportName, "Select Transport Name", transportnames, "transportname")

    let vehicles = getServiceRequest('/vehicle/alldata');
    dataFilIntoSelect(selectVehicleNo, "Select Vehicle ", vehicles, "vehicle_no")

    let packageTypes =  getServiceRequest('/package/bypackagestatus');
    dataFilIntoSelect(selectPackageType, "Select Package Type", packageTypes, "name")

    selectVehicleNo.disabled = true;
    selectPackageType.disabled = true;

    submitButton.style.display = "";
    updateButton.style.display = "none";
}

// filter function for select transport name
let transportNameElement = document.querySelector("#selectTransportName");
transportNameElement.addEventListener("change", () => {

    let supplier = JSON.parse(transportNameElement.value);
    supplierAgreement.supplier_id = JSON.parse(transportNameElement.value);

    selectTransportName.classList.remove("is-invalid");
    selectTransportName.classList.add("is-valid");

    selectVehicleNo.disabled = false;

    let vehicleBySupplier = getServiceRequest('/vehicle/bysupplierid?supplierid=' + supplier.id);
    dataFilIntoSelect(selectVehicleNo, "Select Vehicle", vehicleBySupplier, "vehicle_no")
})

// filter function for selct package type using vehicle id
let vehicleElement = document.querySelector("#selectVehicleNo");
vehicleElement.addEventListener("change", () => {

    let vehicle = JSON.parse(vehicleElement.value);
    supplierAgreement.vehicle_id = JSON.parse(vehicleElement.value);

    
    selectVehicleNo.classList.remove("is-invalid");
    selectVehicleNo.classList.add("is-valid");

    selectPackageType.disabled = false;
   
    let packageByVehicle = getServiceRequest('/package/byvehicleid?vehicleid=' + vehicle.id);
    dataFilIntoSelect(selectPackageType, "Select Package Type", packageByVehicle, "name")
})

//Alert Box Call function
Swal.isVisible();

//calclate end date using given date and time period

let agreementEndDate = (startDateStr, periodValue) => {
    const startdate = new Date(startDateStr);
    const enddate = new Date(startdate);
    enddate.setMonth(startdate.getMonth() + Number(periodValue));

    // input type ekata galapena widihata date input format ekata convert karanna
    return `${enddate.getFullYear()}-${(enddate.getMonth() + 1).toString().padStart(2, '0')}-${enddate.getDate().toString().padStart(2, '0')}`;
};

document.getElementById('textSupplierAgreementPeriod').onchange = () => {
    const agreementStartDate = document.getElementById('textSupplierAgreementDate').value;
    const agreementPeriod = document.getElementById('textSupplierAgreementPeriod').value;

    //object ekata bind karanawa
    supplierAgreement.agreement_period = agreementPeriod;
    // validation
    textSupplierAgreementPeriod.classList.remove("is-invalid");
    textSupplierAgreementPeriod.classList.add("is-valid");

    const endDate = agreementEndDate(agreementStartDate, agreementPeriod);
    document.getElementById('textSupplierAgreementEndDate').value = endDate;

    // object ekata bind karanawa
    supplierAgreement.agreement_end_date = endDate;
    // validation
    textSupplierAgreementEndDate.classList.remove("is-invalid");
    textSupplierAgreementEndDate.classList.add("is-valid");
    console.log(endDate); // "7/15/2024"
};