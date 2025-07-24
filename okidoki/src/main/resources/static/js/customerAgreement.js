window.addEventListener("load", () => {

    // load the customer agreement table
    loadCustomerAgreementTable();

    // refresh the customer agreement form
    refreshCustomerAgreementForm();

//     enable type and search of the select element

        $('#selectCompanyName').select2({
            theme: 'bootstrap-5',
            dropdownParent: $('#customerAgreementModal'),
        });

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

// customer agreement view
const customerAgreemnentView = (dataOb) => {

    dataCus_Reg_No.innerHTML = dataOb.customer_id.customer_reg_no;
    dataCompanyname.innerHTML = dataOb.customer_id.company_name;
    dataCompanyEmail.innerHTML = dataOb.customer_id.direct_email_no;
    dataCompanyAddress.innerHTML = dataOb.customer_id.company_address;
    dataContactPersonName.innerHTML = dataOb.customer_id.contact_person_fullname;
    dataContactPersonEmail.innerHTML = dataOb.customer_id.contact_person_email;
    dataContactPersonMobile.innerHTML = dataOb.customer_id.contact_person_mobileno;


    dataPackageName.innerHTML = dataOb.package_id.name;
    dataVehicleType.innerHTML = dataOb.package_id.vehicle_type_id.name;
    dataCustomerRate.innerHTML = dataOb.package_id.package_charge_cus;
    dataSupplierRate.innerHTML = dataOb.package_id.package_charge_sup;
    dataDistance.innerHTML = dataOb.package_id.distance;
    dataAdditionalKMChargeCustomer.innerHTML = dataOb.package_id.additinal_km_charge_cus;
    dataAdditionalKMChargeSupplier.innerHTML = dataOb.package_id.additinal_km_charge_sup;


    dataAgreementRegNo.innerHTML = dataOb.cus_agreement_no;
    dataAgreementStartDate.innerHTML = dataOb.agreement_date;
    dataAgreementPeriod.innerHTML = dataOb.agreement_period;
    dataEndDate.innerHTML = dataOb.agreement_end_date;
    if (dataOb.agreement_charge != null){
        dataAgreementCharge.innerHTML = dataOb.agreement_charge;
    }else {
        dataAgreementCharge.innerText = "Not Include"
    }
    if (dataOb.agreement_charge != null){
        dataAdditionalChargersCustomer.innerHTML = dataOb.additional_charge;
    }else {
        dataAdditionalChargersCustomer.innerHTML = "Not Include"
    }


    termesCompanyName.innerText = dataOb.customer_id.company_name;
    termsAgreemantStartDate.innerText = dataOb.agreement_date;
    termsVehicleType.innerText = dataOb.package_id.vehicle_type_id.name;
    termsAgreementperiod.innerText = dataOb.agreement_period;
    termsCustomerRate.innerText = dataOb.package_id.package_charge_cus;
    termsPackagedistance.innerText = dataOb.package_id.distance;
    termsadditionaKmCharge.innerText = dataOb.package_id.additinal_km_charge_cus;

    $("#customerAgreementViewModal").modal('show');
};

const customerAgreementFromPrint = () => {
    let newWindow = window.open();
    let printView = "<head><title>TMS</title><link rel='stylesheet' href='/css/customerAgreement.css'><link rel='stylesheet' href='/bootstrap/bootstrap-5.2.3/css/bootstrap.min.css'></head><body>" +
        "<div class='row'><div style='background-color: #2c3e50; color: white; padding: 20px; text-align: center; position: relative;'>" +
        "<h1 class='document-title'>Customer Service Agreement</h1>" +
        "<div class='document-subtitle'>Dedicated Vehicle Contract</div>" +
        "</div>" + viewModal.outerHTML + "</div></body>";
    newWindow.document.write(printView);

    setTimeout(() => {
        newWindow.stop();
        newWindow.print();
        newWindow.close();
    },1500)
}

// agreement delete function
const customerAgreemnentDelete = (dataOb) => {

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

// agreement refill karana finction eka
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

    textCustomerAgreementNote.value = dataOb.special_note;

    textCustomerAgreementApprovalNote.value = dataOb.approval_note;

    // update button dispaly and submit button hide
    updateButton.style.display = "";
    submitButton.style.display = "none";

    // when click the edit button the form will be display
    $("#customerAgreementModal").modal("show");

    customerAgreement = JSON.parse(JSON.stringify(dataOb));
    oldCustomerAgreement = JSON.parse(JSON.stringify(dataOb));

    refreshChargersInnerForm();


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
            updates += "Changed the company name..... ";
        }
        if (customerAgreement.agreement_date != oldCustomerAgreement.agreement_date) {
            updates += "Changed the agreement date..... ";
        }
        if (customerAgreement.agreement_period != oldCustomerAgreement.agreement_period) {
            updates += "Changed the agreement period..... ";
        }
        if (customerAgreement.agreement_end_date != oldCustomerAgreement.agreement_end_date) {
            updates += "Changed the agreement end date..... ";
        }
        if (customerAgreement.delivery_frequency != oldCustomerAgreement.delivery_frequency) {
            updates += "Changed the delivery frequency..... ";
        }
        if (customerAgreement.vehicle_type_id.name != oldCustomerAgreement.vehicle_type_id.name) {
            updates += "Changed the vehicle type..... ";
        }
        if (customerAgreement.package_id.name != oldCustomerAgreement.package_id.name) {
            updates += "Changed the package..... ";
        }
        if (customerAgreement.special_note != oldCustomerAgreement.special_note) {
            updates += "Changed  agreement note..... ";
        }
        if (customerAgreement.customerAgreementHasAdditionalChargersList.length !== oldCustomerAgreement.customerAgreementHasAdditionalChargersList.length ||
            !customerAgreement.customerAgreementHasAdditionalChargersList.every((elemnt, index) =>
                JSON.stringify(elemnt) === JSON.stringify(oldCustomerAgreement.customerAgreementHasAdditionalChargersList[index]))
        ) {
            updates += "Change the additional chargers list..... ";
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
    // main onbject eka
    customerAgreement = new Object();
    // main object ekata list ekak adda karanawa


    customerAgreementForm.reset();

    //form get intial color when refresh the form
    setDefault([selectCompanyName, textCustomerAgreementDate, textCustomerAgreementPeriod, textCustomerAgreementEndDate, textCustomerDeliveryFrequency, selectVehicleType, selectPackageType, textCustomerAgreementNote]);


    let compnayNames = getServiceRequest('/customer/bycustomerstatus');
    dataFilIntoSelect(selectCompanyName, "Select Company Name", compnayNames, "company_name")

    let vehicleTypes = getServiceRequest('/vehicletype/alldata');;
    dataFilIntoSelect(selectVehicleType, "Select Vehicle Type", vehicleTypes, "name")

    let packageTypes = getServiceRequest('/package/bypackagestatus');
    dataFilIntoSelect(selectPackageType, "Select Package Type", packageTypes, "name")

    selectPackageType.style.display = "none";
    submitButton.style.display = "";
    updateButton.style.display = "none";

    //removing validation at refresh
    if (selectCompanyName.parentNode.children[2] != undefined) {
        selectCompanyName.parentNode.children[2].children[0].children[0].style.border = "1px solid #ced4da";
        selectCompanyName.parentNode.children[2].children[0].children[0].classList.remove("is-valid");
        selectCompanyName.parentNode.children[2].children[0].children[0].classList.remove("is-invalid");
    }

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

//calclate end date using given date and time period
let agreementEndDate = (startDateStr, periodValue) => {
    const startdate = new Date(startDateStr);
    const enddate = new Date(startdate);
    enddate.setMonth(startdate.getMonth() + Number(periodValue));

    // input type ekata galapena widihata date input format ekata convert karanna
    return `${enddate.getFullYear()}-${(enddate.getMonth() + 1).toString().padStart(2, '0')}-${enddate.getDate().toString().padStart(2, '0')}`;
};

document.getElementById('textCustomerAgreementPeriod').onchange = () => {
    const agreementStartDate = document.getElementById('textCustomerAgreementDate').value;
    const agreementPeriod = document.getElementById('textCustomerAgreementPeriod').value;

    //object ekata bind karanawa
    customerAgreement.agreement_period = agreementPeriod;
    // validation
    textCustomerAgreementPeriod.classList.remove("is-invalid");
    textCustomerAgreementPeriod.classList.add("is-valid");

    const endDate = agreementEndDate(agreementStartDate, agreementPeriod);
    document.getElementById('textCustomerAgreementEndDate').value = endDate;

    // object ekata bind karanawa
    customerAgreement.agreement_end_date = endDate;
    // validation
    textCustomerAgreementEndDate.classList.remove("is-invalid");
    textCustomerAgreementEndDate.classList.add("is-valid");
    console.log(endDate); // "7/15/2024"
};

// ------------------------------------------------------------------------------------------------------------------------

//Alert Box Call function
Swal.isVisible();
