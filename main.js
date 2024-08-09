function getUrl() {
    const API_key = "b2b60eb14ffad37febf37478";
    const base_code = document.getElementById('dropdown-menu-left');
    const target_code = document.getElementById('dropdown-menu-right');
    const amount = document.getElementById('num-input-left');
    return `https://v6.exchangerate-api.com/v6/${API_key}/pair/${base_code.value}/${target_code.value}/${Number(amount.value)}`;
}

async function fetchData(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Couldn't fetch the resource!");
        }

        const data = await response.json();
        return await data.conversion_result;
    }
    catch (error) {
        console.error(error);
    }

}

async function convertCur(data = fetchData(getUrl())) {
    data.then(result => document.getElementById('num-input-right').value = result);
}

function swapCurs() {
    const base_code = document.getElementById('dropdown-menu-left');
    const target_code = document.getElementById('dropdown-menu-right');
    [base_code.value, target_code.value] = [target_code.value, base_code.value];
}

function fastChoiceBtn() {
    const allCurBtnLeft = document.querySelectorAll('button.btn-cur-left');
    const allCurBtnRight = document.querySelectorAll('button.btn-cur-right');
    allCurBtnLeft.forEach(button => {
        button.onclick = () => {
            if (button.value !== document.getElementById('dropdown-menu-right').value) {
                document.getElementById('dropdown-menu-left').value = button.value;
            }
        }
    });
    allCurBtnRight.forEach(button => {
        button.onclick = () => {
            if (button.value !== document.getElementById('dropdown-menu-left').value) {
                document.getElementById('dropdown-menu-right').value = button.value;
            }
        }
    });
}


function fillOptions(curs_array = currencies) {
    const dropdown_menu_left = document.getElementById('dropdown-menu-left');
    const dropdown_menu_right = document.getElementById('dropdown-menu-right');
    curs_array.forEach(currency => {
        dropdown_menu_left.insertAdjacentHTML("beforeend",
            `<option class="dropdown-menu-item" id="option-item-${currency}" value="${currency}">${currency}</option>`
        )
        dropdown_menu_right.insertAdjacentHTML("beforeend",
            `<option class="dropdown-menu-item" id="option-item-${currency}" value="${currency}">${currency}</option>`
        )
    });
    dropdown_menu_right.value = "EUR";
}

function checkMenuValues(cur_val1, cur_val2) {
    if (cur_val1.value === cur_val2.value) {
        cur_val1.value = dd_menu_left_value;
        swapCurs();
    }
    if (cur_val2.value === cur_val1.value) {
        cur_val1.value = dd_menu_right_value;
        swapCurs();
    }
}

let map = `    "USD": 1,
    "AED": 3.6725,
    "AFN": 70.82365422,
    "ALL": 91.62977272,
    "AMD": 387.92921684,
    "ANG": 1.79,
    "AOA": 889.84784073,
    "ARS": 937.08,
    "AUD": 1.5251161,
    "AWG": 1.79,
    "AZN": 1.69994471,
    "BAM": 1.78956437,
    "BBD": 2,
    "BDT": 117.47350192,
    "BGN": 1.78964505,
    "BHD": 0.376,
    "BIF": 2882.34748306,
    "BMD": 1,
    "BND": 1.32553789,
    "BOB": 6.91975134,
    "BRL": 5.63110302,
    "BSD": 1,
    "BTN": 83.95824787,
    "BWP": 13.53583946,
    "BYN": 3.25417308,
    "BZD": 2,
    "CAD": 1.37327512,
    "CDF": 2847.22009218,
    "CHF": 0.85972704,
    "CLP": 944.22183432,
    "CNY": 7.16368007,
    "COP": 4134.33230796,
    "CRC": 527.90544163,
    "CUP": 24,
    "CVE": 100.89134268,
    "CZK": 23.11369687,
    "DJF": 177.721,
    "DKK": 6.82495753,
    "DOP": 59.52292898,
    "DZD": 134.68639824,
    "EGP": 49.19957566,
    "ERN": 15,
    "ETB": 98.85667822,
    "EUR": 0.91492401,
    "FJD": 2.24568028,
    "FKP": 0.78742667,
    "FOK": 6.82473216,
    "GBP": 0.7873419,
    "GEL": 2.70442842,
    "GGP": 0.78742667,
    "GHS": 15.58202674,
    "GIP": 0.78742667,
    "GMD": 69.68806236,
    "GNF": 8677.90821953,
    "GTQ": 7.74204018,
    "GYD": 209.24787013,
    "HKD": 7.79219806,
    "HNL": 24.75378476,
    "HRK": 6.89399013,
    "HTG": 131.58726342,
    "HUF": 363.83756785,
    "IDR": 16007.03717921,
    "ILS": 3.78780374,
    "IMP": 0.78742667,
    "INR": 83.96330773,
    "IQD": 1310.72722207,
    "IRR": 42049.58294158,
    "ISK": 138.11298656,
    "JEP": 0.78742667,
    "JMD": 156.56110741,
    "JOD": 0.709,
    "JPY": 146.28296325,
    "KES": 129.02526085,
    "KGS": 84.54331705,
    "KHR": 4120.85565533,
    "KID": 1.52506245,
    "KMF": 450.1454392,
    "KRW": 1374.38947965,
    "KWD": 0.30579788,
    "KYD": 0.833333,
    "KZT": 477.68746578,
    "LAK": 21975.81456935,
    "LBP": 89500,
    "LKR": 301.48177831,
    "LRD": 195.80843316,
    "LSL": 18.35169236,
    "LYD": 4.80650079,
    "MAD": 9.831737,
    "MDL": 17.69089656,
    "MGA": 4562.56079096,
    "MKD": 56.31564629,
    "MMK": 2103.63205816,
    "MNT": 3422.08640657,
    "MOP": 8.02718574,
    "MRU": 39.59336325,
    "MUR": 46.2663253,
    "MVR": 15.44841184,
    "MWK": 1738.16106975,
    "MXN": 19.2561275,
    "MYR": 4.46946835,
    "MZN": 63.91608936,
    "NAD": 18.35169236,
    "NGN": 1579.25206566,
    "NIO": 36.79206835,
    "NOK": 10.78338998,
    "NPR": 134.33319658,
    "NZD": 1.66542353,
    "OMR": 0.384497,
    "PAB": 1,
    "PEN": 3.73265996,
    "PGK": 3.89743853,
    "PHP": 57.41745924,
    "PKR": 278.81272056,
    "PLN": 3.95322688,
    "PYG": 7602.91172997,
    "QAR": 3.64,
    "RON": 4.55472837,
    "RSD": 107.01967439,
    "RUB": 85.80054933,
    "RWF": 1322.47238745,
    "SAR": 3.75,
    "SBD": 8.46706166,
    "SCR": 13.80407375,
    "SDG": 504.73275614,
    "SEK": 10.44503071,
    "SGD": 1.32536835,
    "SHP": 0.78742667,
    "SLE": 22.54668895,
    "SLL": 22546.68896766,
    "SOS": 571.22742431,
    "SRD": 28.99442369,
    "SSP": 1878.83578302,
    "STN": 22.41724841,
    "SYP": 12846.3399502,
    "SZL": 18.35169236,
    "THB": 35.42265663,
    "TJS": 10.58967084,
    "TMT": 3.50049839,
    "TND": 3.08923051,
    "TOP": 2.3548532,
    "TRY": 33.5471025,
    "TTD": 6.76635476,
    "TVD": 1.52506245,
    "TWD": 32.50709536,
    "TZS": 2698.1568609,
    "UAH": 40.99143608,
    "UGX": 3726.92912776,
    "UYU": 40.54264315,
    "UZS": 12677.67099369,
    "VES": 36.6806,
    "VND": 25144.03965472,
    "VUV": 121.05763465,
    "WST": 2.75352173,
    "XAF": 600.19391893,
    "XCD": 2.7,
    "XDR": 0.74885776,
    "XOF": 600.19391893,
    "XPF": 109.18755457,
    "YER": 250.2266075,
    "ZAR": 18.35810405,
    "ZMW": 26.04736441,
    "ZWL": 13.8021`
map = map.split('\n');
let i = 0;
let currencies = [];
while (i < map.length) {
    currencies.push(map[`${i}`].slice(5, 8));
    i++;
}

window.onload = () => {
    fillOptions(currencies);
    fastChoiceBtn();
}

var dd_menu_left_value;
var dd_menu_right_value; 
setInterval(() => {
    dd_menu_left_value = document.getElementById('dropdown-menu-left').value;
    dd_menu_right_value = document.getElementById('dropdown-menu-right').value;   
}, 100);