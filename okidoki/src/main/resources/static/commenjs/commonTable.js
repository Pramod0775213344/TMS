// Data filing function to table
const dataFillIntoTheTable = (tableBodyId, dataList, propertyList,viewFunction,editFunction,deleteFunction, buttonVisibilty = true) => {

    tableBodyId.innerHTML = "";

    dataList.forEach((dataOb, index) => {
        let tr = document.createElement("tr");

        let tdIndex = document.createElement("td");
        tdIndex.innerHTML = parseInt(index) + 1;
        tr.appendChild(tdIndex);

        for (const property of propertyList) {
            let td = document.createElement("td");

            if (property.dataType == "string") {
                td.innerHTML = dataOb[property.propertyName];
            }
            if (property.dataType == "function") {
                td.innerHTML = property.propertyName(dataOb)
            }
            if (property.dataType == "decimal") {
                td.innerHTML =parseFloat(dataOb[property.propertyName]).toFixed(2);
            }
            if (property.dataType == "image-array") {
                let img = document.createElement("img");
                img.className = "table-img rounded-circle"
                if (dataOb[property.propertyName] != null){
                    img.src = atob(dataOb[property.propertyName]);
                }else {
                    img.src ="images/user.png"
                }
                td.appendChild(img) ;
            }
            if (property.dataType == "truck-image-array") {
                let img = document.createElement("img");
                img.className = "table-img rounded-circle"
                if (dataOb[property.propertyName] != null){
                    img.src = atob(dataOb[property.propertyName]);
                }else {
                    img.src ="images/truck.png"
                }
                td.appendChild(img) ;
            }
            tr.appendChild(td);
        }

        //Button List
        let tdbutton = document.createElement("td");

    
        let editButton = document.createElement("button");
        editButton.className = "btn-icon table-button-edit";
        editButton.innerHTML = "<i class='fas fa-edit'></i>";
        editButton.setAttribute("data-bs-toggle", "tooltip");
        editButton.setAttribute("data-bs-placement", "top");
        editButton.setAttribute("title", "Edit");
        editButton.onclick = () => {
            console.log("edit", dataOb);
            editFunction(dataOb, index);
        };
        tdbutton.appendChild(editButton);

        let viewButton = document.createElement("button");
        viewButton.className = "btn-icon table-button-view";
        viewButton.innerHTML = "<i class='fas fa-eye'></i>";
        viewButton.setAttribute("data-bs-toggle", "tooltip");
        viewButton.setAttribute("data-bs-placement", "top");
        viewButton.setAttribute("title", "View");
        viewButton.onclick = () => {
            console.log("View", dataOb);
            viewFunction(dataOb, index);
        };
        tdbutton.appendChild(viewButton);

        let deleteButton = document.createElement("button");
        deleteButton.className = "btn-icon table-button-delete";
        deleteButton.innerHTML = "<i class='fas fa-trash-alt'></i>";
        deleteButton.setAttribute("data-bs-toggle", "tooltip");
        deleteButton.setAttribute("data-bs-placement", "top");
        deleteButton.setAttribute("title", "Delete");
        deleteButton.onclick = () => {
            console.log("delete", dataOb);
            deleteFunction(dataOb, index);
        };
        tdbutton.appendChild(deleteButton);

        tr.appendChild(tdbutton);
        tableBodyId.appendChild(tr);
    });
}

// data fill in to the report tables
const dataFillIntoTheReportTable = (tableBodyId, dataList, propertyList) => {

    tableBodyId.innerHTML = "";

    dataList.forEach((dataOb, index) => {
        let tr = document.createElement("tr");

        let tdIndex = document.createElement("td");
        tdIndex.innerHTML = parseInt(index) + 1;
        tr.appendChild(tdIndex);

        for (const property of propertyList) {
            let td = document.createElement("td");

            if (property.dataType == "string") {
                td.innerHTML = dataOb[property.propertyName];
            }
            if (property.dataType == "function") {
                td.innerHTML = property.propertyName(dataOb)
            }
            if (property.dataType == "decimal") {
                td.innerText =parseFloat(dataOb[property.propertyName]).toFixed(2);
            }
            if (property.dataType == "image-array") {
                let img = document.createElement("img");
                img.className = "table-img rounded-circle"
                if (dataOb[property.propertyName] != null){
                    img.src = atob(dataOb[property.propertyName]);
                }else {
                    img.src ="images/user.png"
                }
                td.appendChild(img) ;
            }
            if (property.dataType == "truck-image-array") {
                let img = document.createElement("img");
                img.className = "table-img rounded-circle"
                if (dataOb[property.propertyName] != null){
                    img.src = atob(dataOb[property.propertyName]);
                }else {
                    img.src ="images/truck.png"
                }
                td.appendChild(img) ;
            }
            tr.appendChild(td);
        }
        tableBodyId.appendChild(tr);
    });
}

// data fill table clicking the row
const dataFillIntoTheReportTableWithRowClick = (tableBodyId, dataList, propertyList, editFunction, buttonVisibility = false) => {

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
            if (property.dataType == "decimal") {
                if (dataob[property.propertyName] == null || dataob[property.propertyName] == undefined) {
                    td.innerHTML = "-";
                }else{
                    td.innerHTML =parseFloat(dataob[property.propertyName]).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

                }
            }
            tr.appendChild(td);
        }

        // if you click the tr edita function call
        tr.onclick = () => {
            editFunction(dataob, index);
            window['editOb'] = dataob;
            window['editRowIndex'] = index;
        };


        tableBodyId.appendChild(tr);

    });
}

// Data filing function to innertable
const dataFillIntoTheInnerTable = (tableBodyId, dataList, propertyList,editFunction,deleteFunction, buttonVisibilty = true) => {

    tableBodyId.innerHTML = "";

    dataList.forEach((dataOb, index) => {
        let tr = document.createElement("tr");

        let tdIndex = document.createElement("td");
        tdIndex.innerHTML = parseInt(index) + 1;
        tr.appendChild(tdIndex);

        for (const property of propertyList) {
            let td = document.createElement("td");

            if (property.dataType == "string") {
                td.innerHTML = dataOb[property.propertyName];
            }
            if (property.dataType == "function") {
                td.innerHTML = property.propertyName(dataOb)
            }
            if (property.dataType == "decimal") {
                td.innerText =parseFloat(dataOb[property.propertyName]).toFixed(2);
            }
            if (property.dataType == "image-array") {
                let img = document.createElement("img");
                img.className = "table-img rounded-circle"
                if (dataOb[property.propertyName] != null){
                    img.src = atob(dataOb[property.propertyName]);
                }else {
                    img.src ="images/user.png"
                }
                td.appendChild(img) ;
            }
            if (property.dataType == "truck-image-array") {
                let img = document.createElement("img");
                img.className = "table-img rounded-circle"
                if (dataOb[property.propertyName] != null){
                    img.src = atob(dataOb[property.propertyName]);
                }else {
                    img.src ="images/truck.png"
                }
                td.appendChild(img) ;
            }
            tr.appendChild(td);
        }

        //Button List
        let tdbutton = document.createElement("td");


        let editButton = document.createElement("button");
        editButton.className = "btn-icon table-button-edit";
        editButton.innerHTML = "<i class='fas fa-edit'></i>";
        editButton.setAttribute("data-bs-toggle", "tooltip");
        editButton.setAttribute("data-bs-placement", "top");
        editButton.setAttribute("title", "Edit");
        editButton.onclick = () => {
            console.log("edit", dataOb);
            editFunction(dataOb, index);
        };
        tdbutton.appendChild(editButton);

        let deleteButton = document.createElement("button");
        deleteButton.className = "btn-icon table-button-delete";
        deleteButton.innerHTML = "<i class='fas fa-trash-alt'></i>";
        deleteButton.setAttribute("data-bs-toggle", "tooltip");
        deleteButton.setAttribute("data-bs-placement", "top");
        deleteButton.setAttribute("title", "Delete");
        deleteButton.onclick = () => {
            console.log("delete", dataOb);
            deleteFunction(dataOb, index);
        };
        tdbutton.appendChild(deleteButton);

        tr.appendChild(tdbutton);
        tableBodyId.appendChild(tr);
    });
}

// Data fill in to the dynamic select elements
const dataFilIntoSelect = (parentId, massage, dataList, displayProperties) => {
    parentId.innerHTML = "";
if (massage != ""){
    let optionMsgEs = document.createElement("option");
    optionMsgEs.value = " ";
    optionMsgEs.selected = "selected";
    optionMsgEs.disabled = "disabled";
    optionMsgEs.innerText = massage;
    parentId.appendChild(optionMsgEs);
}


    dataList.forEach(dataOb => {
        let option = document.createElement("Option");
        option.value = JSON.stringify(dataOb);
        option.innerText = dataOb[displayProperties];
        parentId.appendChild(option);
    });

}

//nama dekak join karala ekata pennana puluwan
const dataFillIntoSelectWithTwoNames = (parentId, massage, dataList, displayProperties1, displayProperties2) => {
    parentId.innerHTML = "";
    if (massage != ""){
        let optionMsgEs = document.createElement("option");
        optionMsgEs.value = " ";
        optionMsgEs.selected = "selected";
        optionMsgEs.disabled = "disabled";
        optionMsgEs.innerText = massage;
        parentId.appendChild(optionMsgEs);
    }

    dataList.forEach(dataOb => {
        let option = document.createElement("Option");
        option.value = JSON.stringify(dataOb);
        option.innerText = dataOb[displayProperties1] + " - " + dataOb[displayProperties2];
        parentId.appendChild(option);
    });
}

// dynamically fill data into the datalist
const dataFillIntoDataList =(parentId, dataList, displayProperties) => {
    parentId.innerHTML = "";

    dataList.forEach(dataOb => {
        let option = document.createElement("Option");
        option.value= dataOb[displayProperties];
        option.innerHTML = dataOb[displayProperties];
        parentId.appendChild(option);
    });
}