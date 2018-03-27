var contactListDefault = [{
    name: 'Настя',
    phone: '+79112668643',
    img: 'https://pp.userapi.com/c846122/v846122630/12e0/syE4M4cLYzc.jpg'
}, {
    name: 'Ваня',
    phone: '+79991234576',
    img: 'https://sun9-2.userapi.com/c840732/v840732276/34f11/9HNq9rX7_mQ.jpg'
}, {
    name: 'Аня',
    phone: '+79991234576',
    img: 'https://pp.userapi.com/c845520/v845520728/e70a/Xz1mFLgSfzQ.jpg'
}, {
    name: 'Артём',
    phone: '+71234567892',
    img: 'https://sun9-8.userapi.com/c831309/v831309463/a9589/OYm2UeJO7Yw.jpg'
}];

if (!localStorage.getItem("contactList")) {
    localStorage.setItem("contactList", JSON.stringify(contactListDefault));
}

var contactList = JSON.parse(localStorage.getItem("contactList"));

var contactsWrap = document.querySelector('.contacts__wrap');

function renderList(search) {
    contactsWrap.innerHTML = null;
    for (var i = 0; i < contactList.length; i++) {
        var name = contactList[i]['name'];
        var phone = contactList[i]['phone'];
        var img = contactList[i]['img'];
        var contact = createContact(img, name, phone);
        contact.setAttribute('data-contactid', i)
        if (arguments.length == 0) {
            contactsWrap.appendChild(contact);
        } else if (name.toLowerCase().indexOf(search.trim().toLowerCase()) >= 0) {
            contactsWrap.appendChild(contact);
        }
    }
};

renderList();

document.querySelector('.contact-list__input').oninput = function() {
    renderList(this.value);
}

function createContact(img, name, phone) {
    var contact = document.createElement('div');
    contact.className = 'contact-list__item contact clearfix';

    var contactImg = document.createElement('div');
    contactImg.style.backgroundImage = "url(" + img + ")";
    contactImg.className = 'contact__img';

    var contactName = document.createElement('div');
    contactName.className = 'contact__name';
    contactName.innerHTML = name;

    var contactNumber = document.createElement('div');
    contactNumber.className = 'contact__number';
    contactNumber.innerHTML = phone;

    contact.appendChild(contactImg);
    contact.appendChild(contactName);
    contact.appendChild(contactNumber);

    return contact;
}

document.querySelector('.add-contact__btn').onclick = function() {
    var name = document.querySelector('.add-contact__name');
    var phone = document.querySelector('.add-contact__phone');
    var img = document.querySelector('.add-contact__img');
    if (name.value !== "" && phone.value !== "" && img.value !== "") {
        var contact = {
            name: name.value,
            phone: phone.value,
            img: img.value
        }
        contactList.push(contact);   
        renderList();
        localStorage.setItem("contactList", JSON.stringify(contactList));
        name.value = null;
        phone.value = null;
        img.value = null;
        hidePopup(document.querySelector('.add-contact-popup'));
    }
    else alert('Нужно заполнить все поля!');
}

function showPopup (popup) {
    popup.style.display = "block";
    setTimeout(function () {
        popup.style.opacity = 1;
    } ,10);
}

function hidePopup (popup) {
    popup.style.opacity = 0;
    setTimeout(function () {
        popup.style.display = "none";
    } ,300);
}

document.getElementById('add-btn').onclick = function () {
    showPopup(document.querySelector('.add-contact-popup'));
}

document.querySelector('.add-contact-popup').onclick = function (e) {
    if (e.target == this) {
        hidePopup(this);
    }
}

document.querySelector('.edit-contact-popup').onclick = function (e) {
    if (e.target == this) {
        hidePopup(this);
    }
}

document.getElementById('clear-btn').onclick = function() {
    localStorage.setItem("contactList", JSON.stringify(contactListDefault));
    contactList = JSON.parse(localStorage.getItem("contactList"));
    renderList();
}

contactsWrap.addEventListener('click', function (e) {
    if (e.target.classList.contains('contact__img')) {
        var contact = e.target.parentNode;
        var contactId = contact.getAttribute('data-contactid');
        var nameInput = document.querySelector('.edit-contact__name-input');
        var phoneInput = document.querySelector('.edit-contact__phone-input');
        var imgInput = document.querySelector('.edit-contact__img-input');
        var editBtn = document.querySelector('.edit-contact__edit-btn');
        var delBtn = document.querySelector('.edit-contact__delete-btn');
        var img = document.querySelector('.edit-contact__img');

        nameInput.value = contactList[contactId]["name"];
        phoneInput.value = contactList[contactId]["phone"];
        imgInput.value = contactList[contactId]["img"];
        img.style.backgroundImage = 'URL(' + imgInput.value + ')';

        
        showPopup(document.querySelector('.edit-contact-popup'));

        imgInput.oninput = () => {
            img.style.backgroundImage = 'URL(' + imgInput.value + ')';
        }

        editBtn.onclick = () => {
            if (confirm('Изменить контакт?')) {
                contactList[contactId]["name"] = nameInput.value;
                contactList[contactId]["phone"] = phoneInput.value;
                contactList[contactId]["img"] = imgInput.value;
                localStorage.setItem('contactList', JSON.stringify(contactList));
                renderList();
                hidePopup(document.querySelector('.edit-contact-popup'));
            }
        }

        delBtn.onclick = () => {
            if (confirm('Удалить контакт?')) {
                contactList.splice(contactId, 1);
                localStorage.setItem('contactList', JSON.stringify(contactList));
                renderList();
                hidePopup(document.querySelector('.edit-contact-popup'));
            }
        }
    }
});