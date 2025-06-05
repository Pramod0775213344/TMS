
//Common Validator
const validator = (element, dataPattern, object, property) => {
    const elementValue = element.value;
    const regExp = new RegExp(dataPattern);
    const ob = window[object];

    if (elementValue != "") {
        if (regExp.test(elementValue)) {
            element.classList.remove("is-invalid");
            element.classList.add("is-valid");
            ob[property] = elementValue;
        } else {
            element.classList.remove("is-valid");
            element.classList.add("is-invalid");
            ob[property] = null;
        }
    } else {
        if (element.required) {
            element.classList.remove("is-valid");
            element.classList.add("is-invalid");
            ob[property] = null;
        } else {
            element.classList.remove("is-invalid");
            ob[property] = "";
        }
    }
}

// date Validator for 
const dateElementValidator = (element, object, property) => {
    const elementValue = element.value;
    const ob = window[object];

    if (elementValue != "") {
        element.classList.remove("is-invalid");
        element.classList.add("is-valid");
        ob[property] = elementValue;
    } else {
        if (element.required) {
            element.classList.remove("is-valid");
            element.classList.add("is-invalid");
            ob[property] = null;
        } else {
            element.classList.remove("is-invalid");
            ob[property] = "";
        }
    }
}

// date range validator
const dateRangeValidator = (end, start, object, property) => {
    const startDate = start;
    const endDate = end.value;
    console.log(startDate,endDate)
    const ob = window[object];

    if (endDate != "") {
        if (new Date(startDate) < new Date(endDate)) {
            end.classList.remove("is-invalid");
            end.classList.add("is-valid");
            ob[property] = endDate;
        } else {
            end.classList.remove("is-valid");
            end.classList.add("is-invalid");
            ob[property] = null;
        }
    } else {
        if (end.required) {
            end.classList.remove("is-valid");
            end.classList.add("is-invalid");
            ob[property] = null;
        } else {
            end.classList.remove("is-invalid");
            ob[property] = "";
        }
    }
}

// statice select Element Validator
const selectElementValidator = (element, object, property) => {
    const elementValue = element.value;
    const ob = window[object];

    if (elementValue != "") {
        element.classList.remove("is-invalid");
        element.classList.add("is-valid");
        ob[property] = elementValue;
    }else {
        if (element.required) {
            element.classList.remove("is-valid");
            element.classList.add("is-invalid");
            ob[property] = null;
        } else {
            element.classList.remove("is-invalid");
            ob[property] = "";
        }
    }
}

//Dynamic select validator
const selectDynamicElementValidator = (element, object, property) => {
    const elementValue = element.value;
    const ob = window[object];

    if (elementValue != "") {
        element.classList.remove("is-invalid");
        element.classList.add("is-valid");
        ob[property] = JSON.parse(elementValue);
    } else {
        if (element.required) {
            element.classList.remove("is-valid");
            element.classList.add("is-invalid");
            ob[property] = null;
        } else {
            element.classList.remove("is-invalid");
            ob[property] = "";
        }
    }
}








