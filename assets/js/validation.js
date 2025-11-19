import { fallBackImg } from "./workersCRUD.js";

const validationRules = [
    {
        id: "name",
        regex: /^[a-zA-Z\s.'-]{2,50}$/,
        message:
            "Name must be 2-50 characters, only letters, spaces, and .'- allowed.",
    },
    {
        id: "role",
        regex: /^[1-6]$/, // must select a valid role (not empty)
        message: "Please select a role.",
    },
    {
        id: "email",
        regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/,
        message: "Enter a valid email address.",
    },
    {
        id: "phone",
        regex: /^\+?[1-9][0-9]{7,14}$/,
        message:
            "Enter a valid phone number (8-15 digits). including country code",
    },
    {
        id: "pic",
        regex: /^https?:\/\/\S+$/,
        message: "Enter a valid photo URL (starts with http:// or https://).",
    },
];

const expValidationRules = [
    {
        id: "exp__company",
        regex: /^[a-zA-Z0-9\s,.'-]{2,}$/,
        message: "Company name must be at least 2 characters long.",
    },
    {
        id: "exp__role",
        regex: /^[a-zA-Z0-9\s,.'-]{2,50}$/,
        message: "Job title must be 2-50 characters long.",
    },
    {
        id: "exp__from",
        regex: /^\d{4}-\d{2}-\d{2}$/, // visuale input doesn't match value getter
        message: "Please select a valid start date.",
    },
    {
        id: "exp__to",
        regex: /^\d{4}-\d{2}-\d{2}$/,
        message: "Please select a valid end date.",
    },
];

function toggleError(field, show, message = "") {
    const errSpan = field.nextElementSibling;
    errSpan.textContent = message;
    errSpan.classList.toggle("hidden", !show); // if toggle 2nd param is true it adds otherwise it removes
    field.classList.toggle("input--danger", show);
    field.classList.toggle("input--valid", !show && field.value !== "");
}

function validateField(field, rule) {
    let value = field.value;

    let isValid = rule.regex.test(value);

    if (field.type == "url") {
        const img = field.parentElement.nextElementSibling.firstElementChild;
        console.log(img.src);
        if (img.src.split("/").at(-1) == fallBackImg.split("/").at(-1)) {
            console.log("not valid");
            isValid = false;
        }
    }

    toggleError(field, !isValid, rule.message);
    return isValid;
}

function validateForm(fields) {
    let isValid = true;
    // const fields = Array.from(document.querySelectorAll("input")).slice(1);
    // const roleField = document.querySelector("#role");
    // fields.splice(1, 0, roleField);
    validationRules.forEach((rule, ind) => {
        if (!validateField(fields[ind], rule)) {
            isValid = false;
        }
    });
    fields.slice(5).forEach((exp, ind) => {
        const rule = expValidationRules[ind % 4];
        if (!validateField(exp, rule)) {
            isValid = false;
        }
    });
    return isValid;
}

// validateForm();
// document.getElementById("name").addEventListener("input", validateForm);

export { validateForm, toggleError };
