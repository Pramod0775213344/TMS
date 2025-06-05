
window.addEventListener("load", () => {

    loadCustomerTable();

    refreshCustomerForm();

})

const loadCustomerTable = () => {

    //Data array
    let customer = getServiceRequest('/customer/alldata');

    let propertyList = [
        { propertyName: "company_name", dataType: "string" },
        { propertyName: getBusinessType, dataType: "function" },
        { propertyName: "contact_person_fullname", dataType: "string" },
        { propertyName: "contact_person_mobileno", dataType: "string" },
        { propertyName: getCustomerStatus, dataType: "function" },

    ]

    dataFillIntoTheTable(customerTableBody, customer, propertyList, customerView, customerEdit, customerDelete, true);

    $('#customerTable').DataTable();

};

// status Function
const getCustomerStatus = (dataOb) => {
    if (dataOb.customer_status_id.status == 'Active') {
        return "<span class='status-badge status-active'> <span class='dot'> </span>" + dataOb.customer_status_id.status + "</span>"
    }

    if (dataOb.customer_status_id.status == 'Inactive') {
        return "<span class='status-badge status-pending'> <span class='dot'> </span>" + dataOb.customer_status_id.status + "</span>"
    }

    if (dataOb.customer_status_id.status == 'Deleted') {
        return "<span class='status-badge status-inactive'> <span class='dot'> </span>" + dataOb.customer_status_id.status + "</span>"
    }
};

// Business Type Function
const getBusinessType = (dataOb) => {
    return dataOb.business_type_id.name;
}

// Table Delete Button
const customerDelete = (dataOb) => {
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
            let deleteResponse = httpServiceRequest("/customer/delete", "DELETE", dataOb);;
            if (deleteResponse == "ok") {
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
                loadCustomerTable();
                refreshCustomerForm();
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

// Table View Button
const customerView = () => {

}

// Table edit button
const customerEdit = (dataOb) => {

    textCustomerName.value = dataOb.company_name;

    textBusinessType.value = JSON.stringify(dataOb.business_type_id);
if (dataOb.business_registration_no == null){
    textBusinessRegistrationNo.value = "";
}else{
    textBusinessRegistrationNo.value = dataOb.business_registration_no;
}


    textEmail.value = dataOb.direct_email_no;

    textTelephoneNo.value = dataOb.direct_telephone_no;

    textContactPersonFullName.value = dataOb.contact_person_fullname;

    textContactPersonEmail.value = dataOb.contact_person_email;

    textContactPersonMobileNo.value = dataOb.contact_person_mobileno;

    textCompanyAddress.value = dataOb.company_address;

    textCustomerStatus.value = JSON.stringify(dataOb.customer_status_id);

    updateButton.style.display = "";
    submitButton.style.display = "none";

    statusDiv.style.display = "";


    customer = JSON.parse(JSON.stringify(dataOb));
    oldcustomer = JSON.parse(JSON.stringify(dataOb));

    $('#customerModal').modal('show');
}

// check form errror function
const checkFormError = () => {

    let errors = "";

    if (customer.company_name == null) {
         errors += "Please Enter the Customer Name.....";
    }

    if (customer.business_type_id == null) {
         errors += "Select  the Business Type.....";
    }

    if (customer.direct_email_no == null) {
         errors += "Please Enter the Customer Direct Email.....";
    }

    if (customer.direct_telephone_no == null) {
         errors += "Please Enter the Customer Direct Telephone No.....";
    }

    if (customer.contact_person_fullname == null) {
         errors += "Please Enter the Contact Person Name.....";
    }

    if (customer.contact_person_email == null) {
         errors += "Please Enter the Contact Person Email.....";
    }

    if (customer.contact_person_mobileno == null) {
         errors += "Please Enter the Contact Person Mobile no.....";
    }

    if (customer.company_address == null) {
         errors += "Please Enter the Company address.....";
    }

    return errors;
}

// form submit function
const customerFormSubmit = () => {
    console.log(customer);
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
                let postResponse = httpServiceRequest("/customer/insert", "POST", customer);
                console.log(customer);

                if (postResponse == "ok") {
                    Swal.fire({
                        title: "Saved!",
                        text: "Saved Successfully",
                        icon: "success",
                        customClass :{
                            confirmButton :'btn-3d btn-3d-other'
                        }
                    });
                    loadCustomerTable();
                    refreshCustomerForm();
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
    console.log(customer);

}

// check form updates
const checkFormUpdates = () => {

    let updates = "";

    if(customer != null && oldcustomer != null){
        if (customer.company_name != oldcustomer.company_name) {
            updates += "Customer Name Changed..!";
        }
        if (customer.business_type_id.name != oldcustomer.business_type_id.name) {
            updates += "Business Type Changed..!";
        }
        if (customer.business_registration_no != oldcustomer.business_registration_no) {
            updates += "Business Registration No Changed..! ";
        }
        if (customer.direct_email_no != oldcustomer.direct_email_no) {
            updates += "Direct Email Changed..! ";
        }
        if (customer.direct_telephone_no != oldcustomer.direct_telephone_no) {
            updates += "Direct Telephone No Changed..! ";
        }
        if (customer.contact_person_fullname != oldcustomer.contact_person_fullname) {
            updates += "Contact Person Name Changed..! ";
        }
        if (customer.contact_person_email != oldcustomer.contact_person_email) {
            updates += "Contact Person Email Changed..! ";
        }
        if (customer.contact_person_mobileno != oldcustomer.contact_person_mobileno) {
            updates += "Contact Person Mobile No Changed..! ";
        }
        if (customer.company_address != oldcustomer.company_address) {
            updates += "Company Address Changed..! ";
        }
        if (customer.customer_status_id.status != oldcustomer.customer_status_id.status) {
            updates += "Customer Status Changed..! ";
        }
    }
    return updates;
}

// from update function
const customerFormUpdate = () => {
    console.log(customer);
    console.log(oldcustomer);
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
                    //call putt service
                    let putResponse = httpServiceRequest("/customer/update", "PUT", customer);;
                    if (putResponse == "ok") {
                        Swal.fire({
                            title: "Update!",
                            text: "Updated Successfully",
                            icon: "success",
                            customClass :{
                                confirmButton :'btn-3d btn-3d-other'
                            }
                        });
                        loadCustomerTable();
                        refreshCustomerForm();
                        $("#customerModal").modal("hide");

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

// form refresh function
const refreshCustomerForm = () => {

    customer = new Object();

    companyRegistrationForm.reset();

    setDefault([textCustomerName, textBusinessType, textBusinessRegistrationNo, textEmail, textTelephoneNo, textContactPersonFullName, textContactPersonEmail, textContactPersonMobileNo, textCompanyAddress, textCustomerStatus]);

    let businessTypes = getServiceRequest('/businesstype/alldata');
    let customerStatus = getServiceRequest('/customerstatus/statuswithoutdelete');


    dataFilIntoSelect(textBusinessType, "Select Business Type", businessTypes, "name");
    dataFilIntoSelect(textCustomerStatus, "Select Status", customerStatus, "status");

    submitButton.style.display = "";
    updateButton.style.display = "none";

    statusDiv.style.display = "none";

}

//Alert Box Call function
Swal.isVisible();

