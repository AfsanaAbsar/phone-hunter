const searchPhone = () => {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    console.log(searchText);


    // load api
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => showResult(data.data.slice(0, 20)));
}


const showResult = phones => {
    const searchResult = document.getElementById('search-result')
    searchResult.textContent = "";
    console.log(searchResult);
    phones.forEach(phone => {
        console.log(phone);
        var id = phone.slug;
        console.log(id);
        // var lastFive = id.substr(id.length - 5);
        // console.log(lastFive);
        // var lastFiveInt = parseInt(lastFive);
        // console.log(lastFiveInt);


        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
        <div class="card h-100 text-center">
                <img src="${phone.image}" class="card-img-top img-fluid p-5" alt="...">
                <div class="card-body mt-5">
                        <h4 class="card-title">${phone.phone_name}</h4>
                        <h5 class="card-title">Brand : ${phone.brand} </h5>
                 
                        <button onclick="loadPhoneDetails('${phone.slug}')" class="details-btn ps-4 pe-4 pt-2 pb-2">click</button>
                </div>
            </div>
        `
        searchResult.appendChild(div)
    });
}

const loadPhoneDetails = phoneId => {
    console.log(phoneId);
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(url)
        .then(res => res.json())
        .then(data => showDetails(data))
}

const showDetails = () => {
    const details = document.getElementById('phone-details');

    const div = document.createElement('div')
    div.classList.add('col')
    div.innerHTML = `
        <div>
        <h1>ddddddd</h1>
    </div>
        `

    details.appendChild(div);
}