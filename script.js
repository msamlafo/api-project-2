const yearsCombo = document.querySelector('#yearsCombo');
const countryCombo = document.querySelector('#countryCombo');
const submitButton = document.querySelector('button');
const monthsCombo = document.querySelector('#monthCombo');

submitButton.addEventListener('click', (event) => respondToClick(event));

const calendarificBaseUrl = 'https://calendarific.com/api/v2/';
const calendarificApiKey = 'f04c51fea884a0ef2633f1bf1826c1e874b1ac96';

const endpoints = {
    'countries': 'countries',
    'languages': 'languages',
    'holidays': 'holidays'
};

const currentYear = new Date().getFullYear();

async function getAllCountries() {
    const allCountriesEndpoint =
        `${calendarificBaseUrl}${endpoints.countries}?api_key=${calendarificApiKey}`;

    let result = await fetch(allCountriesEndpoint)
        .then(data => data.json()
            .then(results => {
                if (results.meta.code === 200) {
                    populateCountryList(results.response.countries);
                    return results.response;
                } else {
                    console.log('It failed', results);
                }
            }));

    // console.log(result);

}

async function getHolidays(countryCode, year, month) {
    const holidaysEndpoint =
        `${calendarificBaseUrl}${endpoints.holidays}?api_key=${calendarificApiKey}&year=${year}&country=${countryCode}&month=${month}`;

    let result = await fetch(holidaysEndpoint)
        .then(data => data.json()
            .then(results => {
                console.log(results);
                if (results.meta.code === 200) {
                    // populateCountryList(results.response.countries);
                    displayHoliday(results.response);
                    return results.response;
                } else {
                    console.log('It failed', results);

                }
            }));

    console.log(result);
}

function displayHoliday(results) {
    let allTheHolidays = results.holidays;

    let allCardDisplayArea = document.querySelector('.allCardDisplayArea');
    allCardDisplayArea.innerHTML = '';

    let statementDisplay = document.querySelector(".statementDisplay");
    
    let whatToDisplay = "";

    // {country} has {countOfHolidays} in {month}, {year}

    [monthsCombo.selectedIndex].innerText;
    let displayDate = (monthsCombo.value === '') 
        ? yearsCombo.value 
        : `${monthsCombo.options[monthsCombo.selectedIndex].innerText}, ${yearsCombo.value}`;

    whatToDisplay = `${countryCombo.options[countryCombo.selectedIndex].innerText} has ${allTheHolidays.length} holidays in ${displayDate}.`;

    statementDisplay.innerText = whatToDisplay;

    if(allTheHolidays.length > 0){

        for (let oneHoliday of allTheHolidays) {
            // remove this before submitting code
            console.log(oneHoliday);
            
            let card = document.createElement('div');
            card.className = 'card';
    
            let cardBody = document.createElement('div');
            cardBody.className = 'card-body';
    
            let holidayName = document.createElement('h5');
            holidayName.className = 'card-title';
            holidayName.innerText = oneHoliday.name;
    
            let holidayDate = document.createElement('h6');
            holidayDate.className = 'card-subtitle mb-2 text-muted';
            holidayDate.innerText = oneHoliday.date.iso;
    
            let holidayDescription = document.createElement('p');
            holidayDescription.className = '.card-text';
            holidayDescription.innerText = oneHoliday.description;
    
            let holidayType = document.createElement('h6');
            holidayType.className = 'card-subtitle mb2 text-muted';
            holidayType.innerText = oneHoliday.type;
    
    
            cardBody.appendChild(holidayName);
            cardBody.appendChild(holidayDate);
            cardBody.appendChild(holidayDescription);
            cardBody.appendChild(holidayType);
            card.appendChild(cardBody);
    
            allCardDisplayArea.appendChild(card);
    
    
        }
    
        displayFlag();
    }
}

function populateCountryList(countryList) {

    // Grab the select element
    // Loop through the countries list
    // Create an option 
    // Add the option to the select element 

    for (let i = 0; i < countryList.length; i++) {
        let countryOptions = document.createElement('option');
        countryOptions.value = countryList[i]['iso-3166'];
        countryOptions.innerText = countryList[i].country_name;
        countryCombo.appendChild(countryOptions);
    }
}

function getYearList() {
    // create a list of the last 10 years

    let years = [];
    let comboYearStart = currentYear + 5;

    for (let i = 15; i >= 1; i--) {
        years.push(comboYearStart);
        comboYearStart--;
    }

    populateYearsCombo(years);

}

function populateYearsCombo(yearsList) {
    for (year of yearsList) {
        let yrOption = document.createElement('option');
        yrOption.value = year;
        yrOption.innerText = year;
        if (year === currentYear) {
            yrOption.selected = true;
        }

        yearsCombo.appendChild(yrOption);
    }
}

function respondToClick(event) {
    event.preventDefault();
    // console.log(`Selected Country is ${countryCombo.value}`);
    // console.log(`Selected Year is ${yearsCombo.value}`);

    getHolidays(countryCombo.value, yearsCombo.value, monthsCombo.value);
}

function monthsDisplay() {
    let monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
        "October", "November", "December"
    ];

    for (let month = 0; month < monthList.length; month++) {

        const monthOption = document.createElement('option');
        monthOption.value = month + 1;
        monthOption.innerHTML = monthList[month];
        monthCombo.appendChild(monthOption);

    }
}

function initializeForm() {

    getAllCountries();

    getYearList();

    monthsDisplay();
}

initializeForm();

function displayFlag(){

//     let countryFlags {
//         AF = 'Afghanistan',
//         AL = 'Albania',
//         AS = 'American Samoa',
//         AO = 'Angola',
//         AI = 'Anguilla',
//         AR = 'Argentina',

// }
//     let countryFlags = ['AF', 'AL']


   


let flagBaseUrl = "https://www.countryflags.io/";
let remainingUrl = "flat/64.png";

fullUrl =  `${flagBaseUrl}/${countryCombo.value}/${remainingUrl}`;

let selectedFlag = document.querySelector('.selectedFlag')
selectedFlag.src = fullUrl;

}    