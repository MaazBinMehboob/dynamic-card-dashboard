
var input1 = document.getElementById('input1')
var input2 = document.getElementById('input2')
var input3 = document.getElementById('input3')
var getcard = document.getElementById('card')
var alldata = JSON.parse(localStorage.getItem('dashboard-data')) || [];

window.onload = function () {
    for (var i = 0; i < alldata.length; i++) {
        getcard.innerHTML += alldata[i]
    }
    hidecheckbox()
}
function hidecheckbox() {
    var checkbox = document.getElementsByClassName('select-card');
    for (var i = 0; i < checkbox.length; i++) {
        checkbox[i].hidden = true;
    }
}

function createcard() {
    if (!input1.value || !input2.value || !input3.files[0]) {
        alert("Please fill all fields");
        return;
    }

    var file = input3.files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
        var base64string = e.target.result;

        var cardHTML = `<div class="cards">
            <input type="checkbox" class="select-card" />
            <h2>${input1.value}</h2>
            <p>${input2.value}</p>
            <img src="${base64string}" class="card-img" />
        
        </div>`;

        getcard.innerHTML += cardHTML;
        alldata.push(cardHTML);
        localStorage.setItem('dashboard-data', JSON.stringify(alldata));

        hidecheckbox();
        input1.value = "";
        input2.value = "";
        input3.value = "";
    };
    reader.readAsDataURL(file);
}


function deletecard() {
    var checkbox = document.getElementsByClassName('select-card')

    for (var i = 0; i < checkbox.length; i++) {
        checkbox[i].hidden = false
    }
    var btn = document.getElementById('mybtn')
    btn.hidden = false
}
function delfoot() {
    var checkboxes = document.getElementsByClassName('select-card');
    var newdata = [];

    for (var i = checkboxes.length - 1; i >= 0; i--) {
        if (checkboxes[i].checked) {
            checkboxes[i].parentNode.remove();
        } else {
            newdata.unshift(alldata[i]);
        }
    }
    alldata = newdata;
    localStorage.setItem('dashboard-data', JSON.stringify(alldata));
    hidecheckbox()


    document.getElementById('mybtn').hidden = true;
}

