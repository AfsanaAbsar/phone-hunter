// spinner function
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
const searchPhone = () => {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    //clear input value
    searchInput.value = "";

    toggleSpinner('block');
    // load api
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => showResult(data.data.slice(0, 20)));
}
//display search result
const showResult = phones => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = "";


    if (phones.length == 0) {
        const details = document.getElementById('phone-details');
        details.textContent = '';
        document.getElementById('error-search').style.display = 'block';
    }

    else {
        const details = document.getElementById('phone-details');
        details.textContent = '';
        document.getElementById('error-search').style.display = 'none';
        phones.forEach(phone => {

            const div = document.createElement('div')
            div.classList.add('col')
            div.innerHTML = `
                <div class="card h-100 text-center">
                     <img src="${phone.image}" class="card-img-top img-fluid p-5" alt="...">
                <div class="card-body mt-5">
                        <h4 class="card-title pb-2">${phone.phone_name}</h4>
                        <h5 class="card-title pb-2">Brand : ${phone.brand} </h5>
                 
                        <button onclick="loadPhoneDetails('${phone.slug}')" class="details-btn ps-4 pe-4 pt-2 pb-2">Details</button>
                </div>
                </div>
             `
            searchResult.appendChild(div)
        });

    }

    toggleSpinner('none')
}

//show phone details

const loadPhoneDetails = phoneId => {
    console.log(phoneId);
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(url)
        .then(res => res.json())
        .then(data => showDetails(data.data))
}

const showDetails = data => {

    const release = () => {
        if (data.releaseDate.length == 0) {
            return "Release Date Not Found"
        }
        else {
            return data.releaseDate;
        }
    }

    const details = document.getElementById('phone-details');
    details.textContent = '';

    const div = document.createElement('div')
    div.classList.add('col')
    div.innerHTML = `
    
        <div class="card h-100 text-center">
           <img src="${data.image}" class="img-fluid p-5" alt="...">
         <div class="card-body mt-5">
           <h4>${data.name}</h4>
           <h5>Brand : ${data.brand} </h5>
           <p>${release()}</p>
           <h4>Features</h4>
           <p><span class="details-title">Chipset :</span> ${data.mainFeatures.chipSet}</p>
           <p><span class="details-title">Displaysize :</span> ${data.mainFeatures.displaySize}</p>
           <p><span class="details-title">Memory :</span> ${data.mainFeatures.memory}</p>
           <p><span class="details-title">Sensors :</span> ${data.mainFeatures.sensors[0]},${data.mainFeatures.sensors[1]},${data.mainFeatures.sensors[2]}</p>
         </div>
        </div>
   
        `

    details.appendChild(div);


}

