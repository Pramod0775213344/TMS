window.addEventListener("load", function () {
    refresh();
})


const loadBookingReportTable = () =>{

    let bookingReportTableData = getServiceRequest("/reportbooking/bydaterangeandtype?startdate="+ textStarDate.value +"&endtdate="+textEndDate.value )

//     array eke length eka 0 nam table eka display karanna epa
if (bookingReportTableData.length == 0) {
    // td eke css clean karala text ekak display karanawa
    bookingReportTableBody.innerHTML = `<tr> <td colspan="7" class="text-center fs-5  m-2">No Data Found</td></tr>`;
    const tr = document.getElementsByTagName("tr");
    tr.removeAttribute("style");
} else {
    let propertyList = [
        {propertyName: "booking_no", dataType: "string"},
        {propertyName: getCustomer, dataType: "function"},
        {propertyName: getPickupLoaction, dataType: "function"},
        {propertyName: getViaLoaction, dataType: "function"},
        {propertyName: getDeliveryLoaction, dataType: "function"}
        ]

    dataFillIntoTheReportTable(bookingReportTableBody, bookingReportTableData, propertyList);

    $('#bookingReportTable').DataTable();
}
}

// get customer name from data object
const getCustomer = (dataOb) => {
    return dataOb.customer_id.company_name;
}

// get pickup location
const getPickupLoaction = (dataOb) => {
    return dataOb.pickup_locations_id.name;
}

// get via locations if available
const getViaLoaction = (dataOb) => {
    if (dataOb.locations.length > 0) {
        let locations = "";
        dataOb.locations.forEach((vialocation, index) => {
            if (dataOb.locations.length - 1 == index) {
                locations += vialocation.name;
            } else {
                locations += vialocation.name + ",<br>";
            }
        });
        return locations;
    } else {
        return " - "
    }

}

// get delivery location
const getDeliveryLoaction = (dataOb) => {
    return dataOb.delivery_locations_id.name;
}

// print view eka
const printBookingReport = () =>{
    let newWindow = window.open();
    let preview = "<head><title>TMS</title><link rel='stylesheet' href='/css/common.css'><link rel='stylesheet' href='bootstrap/bootstrap-5.2.3/css/bootstrap.min.css'></head><body><h1 class='bg-secondary p-2 text-dark bg-opacity-25 text-center'>Booking Report</h1><br>" +
        "<div class='row'><div class = 'col-1'></div><div class='col-10'> "+ bookingReportTable.outerHTML +"</div><div class='col-1'></div> </div></body>";

    newWindow.document.write(preview);

    setTimeout(()=>{
        newWindow.stop();
        newWindow.print();
        newWindow.close();
    },500)
}

//refersh input types and clear the table
const refresh = () => {
    textStarDate.value = "";
    textEndDate.value = "";

    // td eke css clean karala text ekak display karanawa
    bookingReportTableBody.innerHTML = `<tr> <td colspan="7" class="text-center fs-5 m-2">No Data Found</td></tr>`;
    const tr = document.getElementsByTagName("tr");
    tr.removeAttribute("style");

}