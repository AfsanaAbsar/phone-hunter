const searchPhone = () => {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    console.log(searchText);


    // load api
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => showResult(data.data));
}


const showResult = phones => {
    const searchResult = document.getElementById('search-result')
    console.log(searchResult);
    phones.forEach(phone => {
        console.log(phone);

        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
        <div class="card h-100 text-center">
                <img src="${phone.image}" class="card-img-top img-fluid p-5" alt="...">
                <div class="card-body mt-5">
                        <h5 class="card-title">${phone.brand} ${phone.phone_name}</h5>
                 
                        <button class="details-btn ps-4 pe-4 pt-2 pb-2" onclick = loadPhoneDetails(${phone.slug})>click</button>
                </div>
            </div>
        `
        searchResult.appendChild(div)
    });
}

// const loadPhoneDetails = phoneId => {
//     const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
//     fetch(url)
//         .then(res => res.json())
//         .then(data => console.log(data))
// }