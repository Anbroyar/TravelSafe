
/*Javascript for Travelsafe application (Project 1)*/


$(document).ready(function() {


/*  --------------------------- Global variables -------------------------------------*/


var countryInput = "";
var countryResults = [];
var country = "";
var coDate = "";
var coRanking = 0;


/*  --------------------------- Objects ----------------------------------------------*/





/*  --------------------------- functions ---------------------------------------------*/
// get road traffic deaths rates

function get_pop_data (code) {

    var rtaURL = "http://apps.who.int/gho/athena/data/GHO/WHS9_86,WHS9_88,WHS9_89,WHS9_92,WHS9_96,WHS9_97,WHS9_90.json?profile=simple&filter=COUNTRY:*;YEAR:2015";
    var queryURL = rtaURL.replace("COUNTRY:*", "COUNTRY:" + code);  // replace 'country:*'' with 'country:code'

    $.ajax({
      url: queryURL,
      method: 'GET',
      crossDomain: true,
      dataType: 'jsonp',

    })

    .done(function(response) {

        //console.log(response);

        countryPop = response.fact[1].Value * 1000;

    });

}


// get road traffic deaths rates

function get_rta_data (code) {

    var rtaURL = "http://apps.who.int/gho/athena/data/GHO/RS_196,RS_198.json?profile=simple&filter=COUNTRY:*";
    var queryURL = rtaURL.replace("COUNTRY:*", "COUNTRY:" + code);  // replace 'country:*'' with 'country:code'

    $.ajax({
      url: queryURL,
      method: 'GET',
      crossDomain: true,
      dataType: 'jsonp',

    })

    .done(function(response) {

        if (response.fact[0].dim.GHO.indexOf("per 100 000 population") > 0) { rtaData = response.fact[0].Value; }
           else { rtaData = response.fact[1].Value; }

        if (!rtaData) { rtaData = 'n/a'; }

        //console.log(code + ": Annual road traffic deaths (/100,000 population 2016) = " + rtaData);

        var elem = $('<div>').attr('id', 'results-div').text("Annual road traffic deaths (/100,000 population 2016) = " + rtaData);
        $('#result').append(elem);

    });

}


 // get air pollution data

function get_airpoll_data (code) { 

    var airpollURL = "http://apps.who.int/gho/athena/data/GHO/AIR_5,AIR_50,AIR_41.json?profile=simple&filter=COUNTRY:*;REGION:*";
    var queryURL = airpollURL.replace("COUNTRY:*", "COUNTRY:" + code);  // replace 'country:*'' with 'country:code'

    $.ajax({
    url: queryURL,
    method: 'GET',
    crossDomain: true,
    dataType: 'jsonp',

    })

    .done(function(response) {

        var airpollData = response.fact[0].Value; 

        if (!airpollData) { airpollData = 'n/a'; }

        //console.log(code + "Air pollution annual deaths (number)= " + airpollData);

        var elem = $('<div>').attr('id', 'results-div').text("Air pollution annual deaths (number)= " + airpollData);
        $('#result').append(elem);

    });

}


// get natural disaster data 

function get_natdis_data (code) {

    var natdisURL = "http://apps.who.int/gho/athena/data/GHO/SDGDISASTER.json?profile=simple&filter=COUNTRY:*;REGION:*";
    var queryURL = natdisURL.replace("COUNTRY:*", "COUNTRY:" + code);  // replace 'country:*'' with 'country:code'

    $.ajax({
    url: queryURL,
    method: 'GET',
    crossDomain: true,
    dataType: 'jsonp',

    })

    .done(function(response) {

        var natdisData = response.fact[0].Value; 

        if (!natdisData) { natdisData = 'n/a'; }

        //console.log(code + ": Average deaths from natural disasters (/100,000 population (2011-2015) = " + natdisData);

        var elem = $('<div>').attr('id', 'results-div').text("Average deaths from natural disasters (/100,000 population (2011-2015) = " + natdisData);
        $('#result').append(elem);

    });

}


// get water hygeine data 

function get_hygeine_data (code) {

    var hygeineURL = "http://apps.who.int/gho/athena/data/GHO/SDGWSHBOD.json?profile=simple&filter=COUNTRY:*";
    var queryURL = hygeineURL.replace("COUNTRY:*", "COUNTRY:" + code);  // replace 'country:*'' with 'country:code'

    $.ajax({
    url: queryURL,
    method: 'GET',
    crossDomain: true,
    dataType: 'jsonp',

    })

    .done(function(response) {

        var hygeineData = response.fact[0].Value; 

        if (!hygeineData) { hygeineData = "n/a"; }

        //console.log(code + ": Deaths attributed to unsafe water hygeine (/100,000 population (year) = " + hygeineData);

        var elem = $('<div>').attr('id', 'results-div').text("Deaths attributed to unsafe water hygeine (/100,000 population (year) = " + hygeineData);
        $('#result').append(elem);

    });


}
    
// get homocide rates

function get_homocide_data (code) {

    var homocideURL = "http://apps.who.int/gho/athena/data/GHO/VIOLENCE_HOMICIDENUM,VIOLENCE_HOMICIDERATE.json?profile=simple&filter=COUNTRY:*;AGEGROUP:-;SEX:-";
    var queryURL = homocideURL.replace("COUNTRY:*", "COUNTRY:" + code);  // replace 'country:*'' with 'country:code

    $.ajax({
    url: queryURL,
    method: 'GET',
    crossDomain: true,
    dataType: 'jsonp',

    })

    .done(function(response) {

        var homocideData = response.fact[0].Value; 

        if (!homocideData) {  homocideData = "n/a"; }
        //console.log(code + ": Homocides (/100,000 population (year) = " + homocideData);

        var elem = $('<div>').attr('id', 'results-div').text("Homocides (/100,000 population (year) = " + homocideData);
        $('#result').append(elem);

    });

}

function get_commdis_data (code) {

    var ntdData = 0;
    var malariaData = 0;
    var ntdDataYear = 0;
    var malariaDataYear = 0;
    var x = 0;

    var commdisURL = "http://apps.who.int/gho/athena/data/GHO/SDGHIV,SDGMALARIA,SDGNTDTREATMENT,MDG_0000000020,WHS4_117.json?profile=simple&filter=COUNTRY:*;YEAR:2016;YEAR:2015;YEAR:2014;YEAR:2013;YEAR:2012;YEAR:2011;YEAR:2010;YEAR:2005;YEAR:2000";
    var queryURL = commdisURL.replace("COUNTRY:*", "COUNTRY:" + code);  // replace 'country:*'' with 'country:code'

    $.ajax({
    url: queryURL,
    method: 'GET',
    crossDomain: true,
    dataType: 'jsonp',

    })

    .done(function(response) {

        console.log(response);

        for (x=0; x < response.fact.length; x++) {
            if (response.fact[x].dim.GHO == "Reported number of people requiring interventions against NTDs" && response.fact[x].dim.YEAR > ntdDataYear) {
                ntdData = response.fact[x].Value;
                ntdDataYear = response.fact[x].dim.YEAR;
            }
        }

          for (x=0; x < response.fact.length; x++) {
            if (response.fact[x].dim.GHO == "Malaria incidence (per 1 000 population at risk)" && response.fact[x].dim.YEAR > malariaDataYear) {
                malariaData = response.fact[x].Value;
                malariaDataYear = response.fact[x].dim.YEAR;
            }
        }

        if (!ntdData) { ntdData = 'n/a'; }
        if (!malariaData) {malariaData = "n/a"; }

        //console.log(code + ": Malaria (cases/100/0000) (year) = " + malariaData);
        //console.log(code + ": hiv (cases/100,000) (year) = " + hivData);
        //console.log(code + ": Tropical disease cases (year) = " + ntdData);

        var elem1 = $('<div>').attr('id', 'results-div').text("Malaria (cases/100,0000) (year) = " + malariaData + " (" + malariaDataYear + ")");
        var elem2 = $('<div>').attr('id', 'results-div').text("Tropical disease cases (year) = " + ntdData + " (" + ntdDataYear + ")");
        $('#result').append(elem1).append(elem2);

    });

}

    // get health personnel data 

    function get_healthworkers_data (code) {

    var healthworkersURL = "http://apps.who.int/gho/athena/data/GHO/HRH_26,HRH_33,HRH_28,HRH_25,HRH_27,HRH_31,HRH_29,HRH_30,HRH_32.json?profile=simple&filter=COUNTRY:*";
    var queryURL = healthworkersURL.replace("COUNTRY:*", "COUNTRY:" + code);  // replace 'country:*'' with 'country:code'

    $.ajax({
    url: queryURL,
    method: 'GET',
    crossDomain: true,
    dataType: 'jsonp',

    })

    .done(function(response) {

        var physiciansData = 0;
        var nursesData = 0;
        var physiciansDataYear = 0;
        var nursesDataYear = 0;
        var x = 0;

        for (x=0; x < response.fact.length; x++) {
            if (response.fact[x].dim.GHO == "Physicians density (per 1000 population)" && response.fact[x].dim.YEAR > physiciansDataYear) {
                physiciansData = response.fact[x].Value * 100;
                physiciansDataYear = response.fact[x].dim.YEAR;
            }
        }

          for (x=0; x < response.fact.length; x++) {
            if (response.fact[x].dim.GHO == "Nursing and midwifery personnel density (per 1000 population)" && response.fact[x].dim.YEAR > nursesDataYear) {
                nursesData = response.fact[x].Value * 100;
                nursesDataYear = response.fact[x].dim.YEAR;
            }
        }

        if (!physiciansData) { physiciansData = "n/a"; }
        if (!nursesData) { nursesData = "n/a"; }


        //console.log(code + ": Physicians  (/100,000 population (year) = " + physiciansData);
        //console.log(code + ": Nurses (/100,000 population (year) = " + nursesData);


        var elem1 = $('<div>').attr('id', 'results-div').text("Physicians  (/100,000 population (year) = " + physiciansData + " (" + physiciansDataYear + ")");
        var elem2 = $('<div>').attr('id', 'results-div').text("Nurses (/100,000 population (year) = " + nursesData + " (" + nursesDataYear + ")");

        $('#result').append(elem1).append(elem2);

   });

}


function set_up () {

    // set up page as required
}


function display_searches () {

    // load from firebase and display results of previous searches on page
}


function calculate_rank () {

  // use the data to calculate the ranking of user input country
} 


function display_rank () {

   // call function to display ranking

}


function interpret_rank () {

   // call function to interpet rankings 

}


function top_ranks () {

    // check firebase db for recent record of top/bottom 5 ranked countries- if found load and use
    // otherwise calculate the top 5 ranked country rankings (dispaly initialising " message ..."")
    // and the bottom 5 ranked countries
    // and display on page
    // calculate average ranking for top 5 and bottom 5 countries 
    //     and place them in global variables to use to calculate other country rankings on a scale top-bottom
    // store in firebase with timestamp to recalculate every week or month or so. 
}


function save_searche () {

    // save searches to firebase
}


/*  --------------------------- Calls ---------------------------------------------*/

set_up (); // set up page

top_ranks (); // get top and bottom ranking countries and dispaly

display_searches ();  // if user logged in load and dispaly users previous searches from firebase
                      // dispaly message asking user to register/login in if not already done so


// then listen for user to input a country to search


// Initialize Firebase
var config = {
    apiKey: "AIzaSyB1zD5vvuhDY0N2PLKgMkIqLCLcz8fqeIk",
    authDomain: "travelsafe-4a936.firebaseapp.com",
    databaseURL: "https://travelsafe-4a936.firebaseio.com",
    projectId: "travelsafe-4a936",
    storageBucket: "travelsafe-4a936.appspot.com",
    messagingSenderId: "1075160018454"
};

firebase.initializeApp(config);

var database = firebase.database();


/*  --------------------------- Event listeners ---------------------------------------------*/


// Autocomplete Country input AND code generation based on input

$(function() {
    $('#country').typeahead({
        source: countries
    })
    .change(function() {
        country = $(this).typeahead("getActive");
        //console.log(country);
    });
});

$("#submit-button").on("click", function() {

    $('#country-name').text(country.name);
    $('#country-code').text(country.alpha3Code);
    $('#country-code2').text(country.alpha2Code);

    countryInput = country.alpha3Code;

        $('#results').empty();

        var countryPop = get_pop_data (countryInput);
        var countryRTAData = get_rta_data (countryInput);
        var countryAirpollData = get_airpoll_data(countryInput);
        var counryNatdisData = get_natdis_data(countryInput);
        var hygeineData = get_hygeine_data(countryInput);
        var homocideData = get_homocide_data(countryInput);
        var commdisData = get_commdis_data(countryInput);
        var healthworkersData = get_healthworkers_data(countryInput);
        


    // Grab date/time using moment.js
    var coDate = moment().format('MMM Do YY, h:mm a');

    var prevCountrySearch = {
        country: country,
        time: coDate,
        ranking: coRanking,
        userWhoSearched: ""
    };


    // Firebase Inputs (push country selected to Firebase)
    database.ref().push(prevCountrySearch); 


    //set interval timer to wait for countryResults[] arraty to be full then move on to rankig calculations using data in countryResults[] 

    // var intervalId = setInterval( function() { 

    //         while (countryResults.length < x /*total size data set*/ ) { /* dispaly "waiting .... " message in UX */ 
    //                                                                      continue checking every 100ms
    //                                                                      /*check to make sure a max time not exceeded as well*/                          
    //         }

    //   }, 100);

    // intervalId.clear();

    /* call calculate-rank() */
    /* call display-rank() */
    /* call interpret-rank() */
    /* if user logged in call save-search() */
});

// Output Firebase Data to Previous Search section

    database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    //console.log(childSnapshot.val());

    // Save all firebase data as a variable
    var Name = childSnapshot.val().country.name;
    var Time = childSnapshot.val().time;
    var Ranking = childSnapshot.val().ranking;
    var User = childSnapshot.val().userWhoSearched;

    // Add the Previous search results
    //$("#recent-search-table > tbody").prepend("<tr><td>" + Name + "</td><td>" + Ranking + "</td><td>" + Time + "</td></tr>");
  
    // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
});


});  // close of document ready function.