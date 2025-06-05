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
            tr.appendChild(td);
        }

        //Button List
        let tdbutton = document.createElement("td");

    
        let editButton = document.createElement("button");
        editButton.className = "btn table-button-edit";
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
        viewButton.className = "btn table-button-view";
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
        deleteButton.className = "btn table-button-delete";
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

// const dataFillIntoDataList =(parentId, dataList, displayProperties) => {
//     parentId.innerHTML = "";

//     dataList.forEach(dataOb => {
//         let option = document.createElement("Option");
//         option.setAttribute("data-value", JSON.stringify(dataOb));
//         option.innerHTML = dataOb[displayProperties];
//         parentId.appendChild(option);
//     });
// }