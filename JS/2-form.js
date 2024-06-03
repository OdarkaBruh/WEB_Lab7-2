const submitBlank =
{
    email:"",
    message: ""
}

let form = document.getElementsByClassName("feedback-form")[0];
document.addEventListener("load", checkLocalStorage());
form.addEventListener('change', () => {submitChanged()});
form.addEventListener("submit", (e) => {handleSubmit(e)});

checkErr = false;

function handleSubmit(event) {
    event.preventDefault();
    checkErr = false;
    console.log("Submited! Is checking....");
    if (!CheckSubmit(form)){
        SaveSubmit(form);
    }
}

function CheckSubmit(form) {
    for (var i = 0; i < 2; i++){
        if(form.elements[i].value == ""){
            alert("Fill please all fields");
            return(true);
        }
    }
    return(false);
}

function checkLocalStorage(){
    const formLocal = JSON.parse(window.localStorage.getItem("feedback-form-state"));
    if (formLocal != null){
        form.elements["email"].value = formLocal.email;
        form.elements["message"].value = formLocal.message;
    }
}

function SaveSubmit() {
    const formLocal = JSON.parse(window.localStorage.getItem("feedback-form-state"));
    console.log("Submit is saved! Email: " + formLocal.email + "; " + "message: " + formLocal.message);
    clearInputAndStorage();
}

function submitChanged(){
    const newInput = Object.create(submitBlank);
    const inputs = form.elements;

    newInput.email = inputs[0].value
    newInput.message = inputs[1].value

    window.localStorage.clear();
    window.localStorage.setItem("feedback-form-state", JSON.stringify(newInput));
    console.log("Changed!");
}

document.getElementById("fillLocalTest").addEventListener("click", ()=>{fillForm()});

function fillForm(){
    const email =  'abc@gmail.com';
    const message =  '123 Hi hullo!';
    form.elements["email"].value = email;
    form.elements["message"].value = message;
    submitChanged();
}

document.getElementById("clearLocalTest").addEventListener("click", ()=>{clearStorage()});
function clearStorage(){
    clearInputAndStorage();
    console.log("Clean!");
}

function clearInputAndStorage(){
    window.localStorage.clear();
    form.elements["email"].value = "";
    form.elements["message"].value = "";
}