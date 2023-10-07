
//Show the total number of users
function showUsersTotalNumber(){
    let totalNumber = users.length;
    document.querySelector('.page-header.cf h3').innerHTML = `Total: ${totalNumber}`;
}

//Show the pagination buttons
function showPagination(){
    const numberPages = Math.ceil(users.length / 10);
    const ul = document.querySelector(`.pagination`);

    for (let i = 0; i < numberPages; i++)
    {
        const a = document.createElement('a');
        a.setAttribute('href', '#');
        a.textContent = `${i+1}`;
        a.addEventListener('click', prepareSelectedPage);

        const li = document.createElement('li');
        li.textContent = "  ";
        li.appendChild(a);
        ul.appendChild(li);
    }
}

function prepareSelectedPage(e){
    e.preventDefault();
    displaySelectedPage(Number(e.target.innerHTML));
}

//Display the users. Will be called by the pagination buttons and also when loading the page first time
function displaySelectedPage(pageNumber){
    const selectedUsers = selectUsersToDisplay(pageNumber);
    displaySelectedUsers(selectedUsers);
}

// Select from user object which ones will be shown in the page, based on the page number
function selectUsersToDisplay(pageNumber){

    const usersNum = users.length;

    let lastUser = pageNumber * 10;
    let firstUser = lastUser - 9;
    lastUser = lastUser > usersNum ? usersNum : lastUser; //For the last page, to select the correct last index

    return users.slice(firstUser-1, lastUser);

}

// Loop through the selected users array to show their information
function displaySelectedUsers(selectedUsers)
{
    const contactDetails = document.querySelector(`.contact-list`);
    let contactList = "";

    for (let i = 0; i < selectedUsers.length; i++)
    {
        contactList += displayUserDetail(selectedUsers[i]);
    }

    contactDetails.innerHTML = contactList;

}

//Build the html for each user
function displayUserDetail(userDetail){

    //format the date information
    let joinedDate = new Date(userDetail.registered.date);
    let formattedDate = (`${joinedDate.getMonth()+1}/${joinedDate.getDate()}/${joinedDate.getFullYear()}`);

    return `
    <li class="contact-item cf">
        <div class="contact-details">
            <img class="avatar" src="${userDetail.picture.thumbnail}">
            <h3>${userDetail.name.first} ${userDetail.name.last}</h3>
            <span class="email">${userDetail.email}</span>
        </div>
        <div class="joined-details">
            <span class="date">Joined ${formattedDate}</span>
        </div>
    </li>`
}

//Called to load the page for the first time
function loadPage(){
    showUsersTotalNumber();
    showPagination();
    displaySelectedPage(1);
}

loadPage();