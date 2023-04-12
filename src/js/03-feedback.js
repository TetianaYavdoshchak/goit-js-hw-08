const throttle = require('lodash.throttle');

const dataUserJson = localStorage.getItem("feedback-form-state");
const form = document.querySelector('.feedback-form');
const objectData = {
    email: "",
    message: ""
};

form.addEventListener('input', throttle(onSaveUserData, 500));
form.addEventListener('submit', onSendForm);

if (dataUserJson) {
    try {
        const dataUserSave = JSON.parse(dataUserJson);
        if (dataUserSave.email) {
            form.elements.email.value = dataUserSave.email;
            objectData.email = dataUserSave.email;
        }
        if (dataUserSave.message) {
            form.elements.message.value = dataUserSave.message;
            objectData.message = dataUserSave.message;
        }
             } catch (error) {
        console.log(error.name); // "SyntaxError"
        console.log(error.message); // "Unexpected token u in JSON at position 1"
    }
}

function onSaveUserData(event) {
    objectData[event.target.name] = event.target.value;
    localStorage.setItem("feedback-form-state", JSON.stringify(objectData));
    }

function onSendForm(event) {
    event.preventDefault();
    const { email, message } = event.currentTarget.elements;
    if (!email.value || !message.value) {
        alert('Please fill in all fields');
    } else {
        const formData = {
            email: email.value,
            message: message.value,
        };
        console.log(formData);
        event.currentTarget.reset();
        localStorage.removeItem("feedback-form-state");
        objectData.email = "";
        objectData.message = "";
    }
}
