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
        .then(data => showDetails(data.data))
}

const showDetails = data => {
    const details = document.getElementById('phone-details');

    const div = document.createElement('div')
    div.classList.add('phone-details-card')
    div.innerHTML = `
        <div class="p-5 w-25 mx-auto bg-light ">
        <img src="${data.image}" class="img-fluid p-5" alt="...">
        <h4>${data.name}</h4>
        <h5>Brand : ${data.brand} </h5>
        <p>${data.releaseDate}</p>
        <h4>Features</h4>
        <p>Chipset : ${data.mainFeatures.chipSet}</p>
        <p>Displaysize : ${data.mainFeatures.displaySize}</p>
        <p>Memory : ${data.mainFeatures.memory}</p>
        <p>Sensors : ${data.mainFeatures.sensors[0]},${data.mainFeatures.sensors[1]},${data.mainFeatures.sensors[2]}</p>
       
        

        </div>
        `

    details.appendChild(div);
}

// mainFeatures:
// chipSet: "Apple A15 Bionic (5 nm)"
// displaySize: "5.4 inches, 71.9 cm2 (~85.1% screen-to-body ratio)"
// memory: "128GB 4GB RAM, 256GB 4GB RAM, 512GB 4GB RAM"


// sensors: Array(6)
// 0: "Face ID"
// 1: "accelerometer"
// 2: "gyro"
// 3: "proximity"
// 4: "compass"
// 5: "barometer"
