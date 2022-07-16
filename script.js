function add_error_highlighting() {
    let error_message = document.getElementById("error_message");
    error_message.classList.add("text-red-500", "font-bold", "font-sans", "border-2", "my-2", "rounded-md", "py-3", "px-5", "border-red-500", "hover:bg-red-500", "hover:text-white");
}

function validator() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let dob = document.getElementById("dob").value;
    let error_message = document.getElementById("error_message");

    let errors = 0;

    let text;

    if (name.length < 3) {
        text = "Name must be at least 3 characters long.";
        error_message.innerText += `\n${text}`;
        add_error_highlighting();
        errors++;
    }

    if (password.length < 10) {
        text = "Please enter a valid contact number.";
        error_message.innerText += `\n${text}`;
        add_error_highlighting();
        errors++;
    }

    if (email.indexOf("@") == -1 || email.length < 6) {
        text = "Please enter a valid email address.";
        error_message.innerText += `\n${text}`;
        add_error_highlighting();
        errors++;
    }
    if ((new Date() - new Date(dob)) / 31536000000 < 18 || (new Date() - new Date(dob)) / 31536000000 > 55) {
        text = "Age must be from 18 years to 55 years!";
        error_message.innerText += `\n${text}`;
        add_error_highlighting();
        errors++;
    }

    if (errors > 0) {
        return false;
    }
    alert("Thank you for your entry!");
    return true;
}

function fetchFromStorage() {
    if (localStorage.getItem("form_entries") == null) {
        return [];
    }
    return JSON.parse(localStorage.getItem("form_entries"));
}

function writeToStorage(list_entries) {
    localStorage.setItem("form_entries", JSON.stringify(list_entries));
}

function writeNewEntry() {
    let list_entries = fetchFromStorage();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let dob = document.getElementById("dob").value;

    let new_entry = {
        "name": name,
        "email": email,
        "password": password,
        "dob": dob,
    }

    list_entries.push(new_entry);

    writeToStorage(list_entries);
}

function showEntries() {
    let list_entries = fetchFromStorage();
    let html_string = "";
    list_entries.map((ele, index) => {
        html_string += `<tr><td class="border px-4 py-2">${index+1}</td><td class="border px-4 py-2">${ele.name}</td><td class="border px-4 py-2">${ele.email}</td><td class="border px-4 py-2">${ele.password}</td><td class="border px-4 py-2">${ele.dob}</td><td><button class="hover:cursor-pointer text-white px-5 py-3 rounded-md" onclick="deleteEntry(${index})">&#x274C;</button></td></tr>`;
    })
    document.getElementById("entries").innerHTML = html_string;
}

function hideEntries() {
    document.getElementById("entries").innerHTML = null;
}

function deleteEntry(index) {
    let list_entries = fetchFromStorage();
    list_entries.splice(index, 1);
    alert(`Removed Element ${index+1}`);
    writeToStorage(list_entries);
    hideEntries();
    showEntries();
}

function clearEntries() {
    alert("Do you want to clear all entries? Refresh the page if you don't want to");
    hideEntries();
    localStorage.removeItem("form_entries");
}

function validate() {
    if (validator()) {
        writeNewEntry();
    }
}

function clearErrorContents() {
    document.getElementById("error_message").innerText = "";
    document.getElementById("error_message").classList.remove("text-red-500", "font-bold", "font-sans", "border-2", "my-2", "rounded-md", "py-3", "px-5", "border-red-500", "hover:bg-red-500", "hover:text-white");
}

function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("dob").value = "";
}