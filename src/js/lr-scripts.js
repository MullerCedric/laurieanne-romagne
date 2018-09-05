/*
 * Form validation
 */
var regExName = new RegExp("^^([^\\s]|[^\\s].*[^\\s])(\\s[^\\s])*$"); // detects first name and last name
var regExMail = new RegExp("^[A-Za-z0-9\\._%\\+\\-]+@[A-Za-z0-9\\.\\-]+\\.[A-Za-z]{2,}$"); // detects e-mail
var regExMessage = new RegExp("^.{10,}$"); // dectects message with at least 10 characters

var fFocusOnInput = function (e) {
    e.currentTarget.parentNode.querySelector(".c-form__error").classList.remove("c-form__error--visible");
    e.currentTarget.parentNode.querySelector(".c-form__input").classList.remove("c-form__input--error");
    if (document.getElementsByClassName('c-form__input--error').length <= 0) {
        document.querySelector(".c-form input[type='submit']").removeAttribute("disabled");
    }
};
var fCheckNameField = function (e) {
    if (!regExName.test(e.currentTarget.value)) {
        e.currentTarget.parentNode.querySelector(".c-form__error").classList.add("c-form__error--visible");
        e.currentTarget.parentNode.querySelector(".c-form__input").classList.add("c-form__input--error");
        document.querySelector(".c-form input[type='submit']").setAttribute("disabled", "disabled");
    }
};
var fCheckMailField = function (e) {
    if (!regExMail.test(e.currentTarget.value)) {
        e.currentTarget.parentNode.querySelector(".c-form__error").classList.add("c-form__error--visible");
        e.currentTarget.parentNode.querySelector(".c-form__input").classList.add("c-form__input--error");
        document.querySelector(".c-form input[type='submit']").setAttribute("disabled", "disabled");
    }
};
var fCheckMessageField = function (e) {
    if (!regExMessage.test(e.currentTarget.value)) {
        e.currentTarget.parentNode.querySelector(".c-form__error").classList.add("c-form__error--visible");
        e.currentTarget.parentNode.querySelector(".c-form__input").classList.add("c-form__input--error");
        document.querySelector(".c-form input[type='submit']").setAttribute("disabled", "disabled");
    }
};
var fSubmitField = function (e) {
    e.preventDefault();
    if (document.getElementsByClassName('c-form__input--error').length <= 0) {
        document.querySelector(".c-form").classList.add("c-form--hide");
        document.querySelector(".c-form__sent").classList.add("c-form__sent--visible");
    }
};

/*
 * Filter projects
 */
window.filterSelection = function (filter) {
    var x, i;
    x = document.getElementsByClassName("c-project");
    if (filter === "all") filter = "";
    for (i = 0; i < x.length; i++) {
        lrRemoveClass(x[i], "c-project--visible");
        if (x[i].className.indexOf(filter) > -1) lrAddClass(x[i], "c-project--visible");
    }
};

function lrAddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) === -1) {
            element.className += " " + arr2[i];
        }
    }
}

function lrRemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}

// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("f-btn-containe");
if (btnContainer !== null) {
    var btns = btnContainer.getElementsByClassName("c-project__filter");
    if (btns.length > 0) {
        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener("click", function () {
                var current = document.getElementsByClassName("c-project__filter--active");
                current[0].className = current[0].className.replace(" c-project__filter--active", "");
                this.className += " c-project__filter--active";
            });
        }
    }
}

/*
 * Onload functions
 */
var fPageIsLoaded = function () {
    document.body.classList.remove("nojs");
    filterSelection("all");

    if(document.getElementsByClassName('c-form').length > 0) {
        document.getElementsByClassName('c-form__name')[0].addEventListener("focus", fFocusOnInput, false);
        document.getElementsByClassName('c-form__name')[0].addEventListener("blur", fCheckNameField, false);
        document.getElementsByClassName('c-form__mail')[0].addEventListener("focus", fFocusOnInput, false);
        document.getElementsByClassName('c-form__mail')[0].addEventListener("blur", fCheckMailField, false);
        document.getElementsByClassName('c-form__message')[0].addEventListener("focus", fFocusOnInput, false);
        document.getElementsByClassName('c-form__message')[0].addEventListener("blur", fCheckMessageField, false);
        document.getElementsByClassName('c-form__submit')[0].addEventListener("click", fSubmitField, false);
    }
};

window.addEventListener("load", fPageIsLoaded, false);