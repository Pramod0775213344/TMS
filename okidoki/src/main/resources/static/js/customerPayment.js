window.addEventListener("load", function () {

    refresh();
})

// customerta adala data tika witharaka table eke fill wenawa
const customerNameElement = document.getElementById("selectCustomerForInvoice");
customerNameElement.addEventListener("change", () => {


    let customer = JSON.parse(customerNameElement.value);
    let bookinglist = getServiceRequest("/booking/bycustomerid?customerid=" + customer.id);
    console.log("1", bookinglist);

    const propertyList = [
        { propertyName: "booking_no", dataType: "string" },
        { propertyName: getCustomer, dataType: "function" },
        { propertyName: "distance", dataType: "string" },
        { propertyName: getAmmount, dataType: "function" },
    ];

    // table ekata data fill karana function eka
    fillDataIntoInvoiceTable(customerPaymentTableBody, bookinglist, propertyList, invoiceForm);

    // all bookings fill in to invoice form
    bookingCard("bookingInvoiceDiv", bookinglist);

    $('#customerPaymentTable').DataTable();

})

// get cutomer name
const getCustomer = (dataOb) => {
    return dataOb.customer_id.company_name;
}

// get total amount
const getAmmount = (dataOb) => {

    if (dataOb.customer_agreement_id.package_id.name == "Floating rate") {
        return (dataOb.customer_agreement_id.package_id.package_charge_cus * dataOb.distance).toLocaleString('en-US', { style: 'currency', currency: 'LKR' });
    } else {
        return (dataOb.customer_agreement_id.package_id.package_charge_cus / 30).toLocaleString('en-US', { style: 'currency', currency: 'LKR' });
    }

}

const inovoiceGenearteButton = () => {
    console.log(payment);
    // check form error for required element
    // check form error for required element

    let userConfirm = Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0ab315",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, save it!",
        allowOutsideClick: false,

    }).then((userConfirm) => {
        if (userConfirm.isConfirmed) {
            //call post service
            let postResponse = httpServiceRequest("/payment/insert", "POST", payment);
            console.log(payment);

            if (postResponse == "ok") {
                Swal.fire({
                    title: "Saved!",
                    text: "Saved Successfully",
                    icon: "success",
                    confirmButtonColor: "#0ab315"
                });
                loadEmployeeTable();
                refreshForm();
            } else {
                Swal.fire({
                    title: "Failed to Submit....?",
                    text: postResponse,
                    icon: "question"
                });
            }
        } else if (userConfirm.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
                title: "Cancelled",
                text: "Details not Saved!",
                icon: "error",
            });
        }
    });
    console.log(payment);
}

const invoiceForm = (dataOb) => {
    $("#invoiceviewform").modal('show');

    viewCustomername.innerText = dataOb.customer_id.company_name;


    viewCustomerAddress.innerText = dataOb.customer_id.company_address;
    viewCustomerRegNo.innerText = 'Customer Reg No : - ' + dataOb.customer_id.customer_reg_no;
    viewPickupLocation.innerText = dataOb.pickup_locations_id.name
    viewDeliveryLocation.innerText = dataOb.delivery_locations_id.name
    viewDistance.innerText = dataOb.distance + ' Km'
    viewPickupDateTime.innerText = dataOb.pickup_date_time
    viewDeliveryDateTime.innerText = dataOb.delivery_date_time
    viewVehicleType.innerText = dataOb.vehicle_type_id.name

    viewBookingNo.innerText = dataOb.booking_no;
    viewBookingStatus.innerText = dataOb.booking_status_id.status;

    viewDistanceQuantity.innerText = dataOb.distance
    viewDistanceRate.innerText = dataOb.customer_agreement_id.package_id.package_charge_cus;

    // total amount for distance
    totalamountfordistance = dataOb.customer_agreement_id.package_id.package_charge_cus * dataOb.distance;
    // total amount additional km
    totalamountforadditionalkm = dataOb.customer_agreement_id.package_id.additinal_km_charge_cus * dataOb.additional_km;


    viewDistanceTotal.innerText = (totalamountfordistance).toLocaleString('en-US', { style: 'currency', currency: 'LKR' });

    // additional km thiyenw nam meka wada karanwa
    if (dataOb.additional_km != null) {

        invoicetotal = totalamountfordistance + totalamountforadditionalkm;

        viewAdditionalKm.innerText = dataOb.additional_km;
        viewAdditionalDistanceTotal.innerText = (totalamountforadditionalkm).toLocaleString('en-US', { style: 'currency', currency: 'LKR' });

        // subtotal value
        subtotalValue.innerText = (invoicetotal).toLocaleString('en-US', { style: 'currency', currency: 'LKR' });

        // tax
        taxtotal = (dataOb.customer_agreement_id.package_id.package_charge_cus * dataOb.distance + dataOb.customer_agreement_id.package_id.additinal_km_charge_cus * dataOb.additional_km) * 18 / 100;
        taxValue.innerText = (taxtotal).toLocaleString('en-US', { style: 'currency', currency: 'LKR' });

        //total  with tax value
        fulltotalwithtax = taxtotal + invoicetotal;
        lastTotalValue.innerText = (fulltotalwithtax).toLocaleString('en-US', { style: 'currency', currency: 'LKR' });

        // last invoice amount
        totalInvoiceAmount.innerText = (fulltotalwithtax).toLocaleString('en-US', { style: 'currency', currency: 'LKR' });

        // object eke total amount ekata bind karanwa
        payment.total_amount = fulltotalwithtax;
        payment.due_amount = fulltotalwithtax;
    } else {
        // additional km naththan meka inner wenawa
        viewAdditionalKm.innerText = '-'
        viewAdditionalDistanceTotal.innerText = '-'

        // subtotal value
        subtotalValue.innerText = (totalamountfordistance).toLocaleString('en-US', { style: 'currency', currency: 'LKR' });

        // tax
        taxtotal = (dataOb.customer_agreement_id.package_id.package_charge_cus * dataOb.distance * 18 / 100);
        taxValue.innerText = (taxtotal).toLocaleString('en-US', { style: 'currency', currency: 'LKR' });

        //total  with tax value
        fulltotalwithtax = taxtotal + totalamountfordistance;
        lastTotalValue.innerText = (fulltotalwithtax).toLocaleString('en-US', { style: 'currency', currency: 'LKR' });

        // last invoice amount
        totalInvoiceAmount.innerText = (fulltotalwithtax).toLocaleString('en-US', { style: 'currency', currency: 'LKR' });

        // object eke total amount ekata bind karanwa
        payment.total_amount = fulltotalwithtax;
        payment.due_amount = fulltotalwithtax;

    }

    // additional km rate
    viewAdditionalKmRate.innerText = dataOb.customer_agreement_id.package_id.additinal_km_charge_cus;

}

const refresh = () => {

    payment = new Object();

    let compnayNames = getServiceRequest('/customer/bycustomerstatus');
    dataFilIntoSelect(selectCustomerForInvoice, "Select Company Name", compnayNames, "company_name")
}

// me table ekata data fill karana function eka
const fillDataIntoInvoiceTable = (tableBodyId, dataList, propertyList, editFunction, buttonVisibility = true) => {

    tableBodyId.innerHTML = "";

    dataList.forEach((dataob, index) => {
        let tr = document.createElement("tr");

        let tdIndex = document.createElement("td");
        tdIndex.innerHTML = parseInt(index) + 1;
        tr.appendChild(tdIndex);

        for (const property of propertyList) {
            let td = document.createElement("td");

            if (property.dataType == "string") {
                td.innerText = dataob[property.propertyName];
            }
            if (property.dataType == "function") {
                td.innerHTML = property.propertyName(dataob);
            }
            tr.appendChild(td);
        }
        //Button list

        let tdButton = document.createElement("td");

        let button = document.createElement("button");
        button.className = "btn btn-success";
        button.innerText = "Genearte Invoice"
        // if you want to open button with clicking the row.you should change the button.onclick to tr.onclick
        button.onclick = () => {
            editFunction(dataob, index);
            window['editOb'] = dataob;
            window['editRowIndex'] = index;
        };

        tdButton.appendChild(button);

        if (buttonVisibility) {
            tr.appendChild(tdButton)
        }

        tableBodyId.appendChild(tr);

    });
}

//dynamic card create karanawa

const bookingCard = (ParentId, bookings) => {



    let cardContainer = document.getElementById(ParentId);

    cardContainer.innerHTML = "";

    bookings.forEach(booking => {

        viewCustomerNameAll.innerText =booking.customer_id.company_name;
        viewCustomerAddressAll.innerText = booking.customer_id.company_address
        viewCustomerRegNoAll.innerText ='Customer Reg No : - ' + booking.customer_id.customer_reg_no;
        // Create card container
        const cardDiv = document.createElement("div");
        cardDiv.className = "card mb-3";

        // Create card header
        const divCardHeader = document.createElement("div");
        divCardHeader.className = "card-header";

        // h3 for booking number
        const h3BookingNo = document.createElement("h3");
        h3BookingNo.innerText = `Booking #:${booking.booking_no}`
        h3BookingNo.className = "viewBooking";

        // h3 for booking status
        const h3BookingStatus = document.createElement("h3");
        h3BookingStatus.innerText = booking.booking_status_id.status;
        h3BookingStatus.classList.add("booking-status", "status-completed");

        divCardHeader.appendChild(h3BookingNo);
        divCardHeader.appendChild(h3BookingStatus);

        // Create card body
        const divCardBody = document.createElement("div");
        divCardBody.className = "card-body";

        // Add booking details
        const bookingDetails = `
            <div class="bookingDetails"><h4>Pickup</h4> <p>${booking.pickup_locations_id.name}</p></div>
             <div class="bookingDetails"><h4>Delivery</h4><p> ${booking.delivery_locations_id.name}</p></div>
             <div class="bookingDetails"><h4>Distance</h4> <p>${booking.distance} Km</p></div>
             <div class="bookingDetails"><h4>Pickup Date</h4><p> ${booking.pickup_date_time}</p></div>
             <div class="bookingDetails"><h4>Delivery Date</h4><p> ${booking.delivery_date_time}</p></div>
             <div class="bookingDetails"><h4>Vehicle Type</h4><p> ${booking.vehicle_type_id.name}</p></div>
        `;
        divCardBody.innerHTML = bookingDetails;

        // booking table
        const bookingTable = `
         <div class="bookingDetailsTable">
                    <table class="table">
                        <thead>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Unit</th>
                        <th>Rate</th>
                        <th>Amount</th>
                        </thead>
                        <tbody>
                        <tr>
                        <td>Distance</td>
                        <td >${booking.distance}</td>
                        <td>Km</td>
                        <td>${booking.customer_agreement_id.package_id.package_charge_cus}</td>
                        <td id="viewDistanceTotalAll" class="text-end"></td>
                        </tr>
                        <tr>
                        <td>Additional Distance</td>
                        <td id="viewAdditionalKmAll"></td>
                        <td>Km</td>
                        <td id="viewAdditionalKmRateAll"></td>
                        <td id="viewAdditionalDistanceTotalAll" class="text-end"></td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
        `;
         // total amount for distance
         totalamountfordistance = booking.customer_agreement_id.package_id.package_charge_cus * booking.distance;
         // total amount additional km
         totalamountforadditionalkm = booking.customer_agreement_id.package_id.additinal_km_charge_cus * booking.additional_km;

         viewDistanceTotalAll = (totalamountfordistance).toLocaleString('en-US', { style: 'currency', currency: 'LKR' });
 
         // additional km thiyenw nam meka wada karanwa
         if (booking.additional_km != null) {
 
             invoicetotal = totalamountfordistance + totalamountforadditionalkm;
 
             viewAdditionalKmAll = booking.additional_km;
             viewAdditionalDistanceTotalAll = (totalamountforadditionalkm).toLocaleString('en-US', { style: 'currency', currency: 'LKR' });
 
             // subtotal value
             subtotalValueAll = (invoicetotal).toLocaleString('en-US', { style: 'currency', currency: 'LKR' });
 
             // tax
             taxtotal = (booking.customer_agreement_id.package_id.package_charge_cus * booking.distance + booking.customer_agreement_id.package_id.additinal_km_charge_cus * booking.additional_km) * 18 / 100;
             taxValueAll = (taxtotal).toLocaleString('en-US', { style: 'currency', currency: 'LKR' });
 
             //total  with tax value
             fulltotalwithtax = taxtotal + invoicetotal;
             lastTotalValueAll = (fulltotalwithtax).toLocaleString('en-US', { style: 'currency', currency: 'LKR' });
 
             // last invoice amount
             totalInvoiceAmountAll = (fulltotalwithtax).toLocaleString('en-US', { style: 'currency', currency: 'LKR' });
 
             // object eke total amount ekata bind karanwa
             payment.total_amount = fulltotalwithtax;
             payment.due_amount = fulltotalwithtax;
         } else {
             // additional km naththan meka inner wenawa
             viewAdditionalKmAll = '-'
             viewAdditionalDistanceTotalAll = '-'
 
             // subtotal value
             subtotalValueAll = (totalamountfordistance).toLocaleString('en-US', { style: 'currency', currency: 'LKR' });
 
             // tax
             taxtotal = (booking.customer_agreement_id.package_id.package_charge_cus * booking.distance * 18 / 100);
             taxValueAll = (taxtotal).toLocaleString('en-US', { style: 'currency', currency: 'LKR' });
 
             //total  with tax value
             fulltotalwithtax = taxtotal + totalamountfordistance;
             lastTotalValueAll = (fulltotalwithtax).toLocaleString('en-US', { style: 'currency', currency: 'LKR' });
 
             // last invoice amount
             totalInvoiceAmountAll = (fulltotalwithtax).toLocaleString('en-US', { style: 'currency', currency: 'LKR' });
 
             // object eke total amount ekata bind karanwa
             // payment.total_amount = fulltotalwithtax;
             // payment.due_amount = fulltotalwithtax;
 
         }
        
        //  subtotal table create dynamicly
        const bookingTotal = document.createElement("div");
        bookingTotal.className = "booking-subtotal";

        const subtotalTable = document.createElement("table");
        subtotalTable.className = "subtotal-table";

        const subtotalRow = document.createElement("tr");
        const subtotalLabel = document.createElement("td");
        subtotalLabel.innerText =`Subtotal: `;
        const subtotalValue = document.createElement("td");
        subtotalValue.classList.add("subtotal-value","text-end");
        subtotalValue.innerText = `${subtotalValueAll}`;
        subtotalRow.appendChild(subtotalLabel);
        subtotalRow.appendChild(subtotalValue);

        const taxRow = document.createElement("tr");
        const taxLabel = document.createElement("td");
        taxLabel.innerText = `Tax (18%):`;
        const taxValue = document.createElement("td");
        taxValue.classList.add( "subtotal-value","text-end")
        taxValue.innerText = `${taxValueAll}`;
        taxRow.appendChild(taxLabel);
        taxRow.appendChild(taxValue);

        const totalRow = document.createElement("tr");
        const totalLabel = document.createElement("td");
        totalLabel.innerHTML = `<strong>Booking Total:</strong>`;
        const totalValue = document.createElement("td");
        totalValue.classList.add("subtotal-value","text-end");
        totalValue.innerHTML = `<strong> ${lastTotalValueAll}</strong>`;
        totalRow.appendChild(totalLabel);
        totalRow.appendChild(totalValue);

        subtotalTable.appendChild(subtotalRow);
        subtotalTable.appendChild(taxRow);
        subtotalTable.appendChild(totalRow);

        bookingTotal.appendChild(subtotalTable);


        // Append header and body to card
        cardDiv.appendChild(divCardHeader);
        cardDiv.appendChild(divCardBody);
        cardDiv.innerHTML +=bookingTable;
        cardDiv.appendChild(bookingTotal);

        // Append card to container
        cardContainer.appendChild(cardDiv);

    // Calculate the total of all bookings
    let totalOfAllBookings = 0;

    bookings.forEach(booking => {
        let totalamountfordistance = booking.customer_agreement_id.package_id.package_charge_cus * booking.distance;
        let totalamountforadditionalkm = booking.additional_km 
        ? booking.customer_agreement_id.package_id.additinal_km_charge_cus * booking.additional_km 
        : 0;

        let invoicetotal = totalamountfordistance + totalamountforadditionalkm;
        let taxtotal = invoicetotal * 18 / 100;
        let fulltotalwithtax = invoicetotal + taxtotal;

        totalOfAllBookings += fulltotalwithtax;
    });
        viewlastTotalValueAll.innerText = totalOfAllBookings.toLocaleString('en-US', { style: 'currency', currency: 'LKR' });
        selectedCustomerTotalAmount.value = totalOfAllBookings.toLocaleString('en-US', { style: 'currency', currency: 'LKR' });

        // object eke total amount ekata bind karanwa
         payment.total_amount = totalOfAllBookings;
         payment.due_amount = totalOfAllBookings;
    });
};