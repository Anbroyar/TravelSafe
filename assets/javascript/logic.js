
/*Javascript for Travelsafe application (Project 1)*/


$(document).ready(function() {


/*  --------------------------- Global variables -------------------------------------*/


var countryInput = "";
var countryResults = [];
var countryResultsYear = [];
var countryRankings = [];
var country = "";
var coDate = "";
var coRanking = 0;
var resultsBack = 0;


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
        console.log (response)
        console.log(response.fact[0].Value)

        for (x=0; x < response.fact.length; x++) {
            if (response.fact[x].dim.GHO == "Population (in thousands) total") {
                var pop = response.fact[x].Value;
            }

        }
        if (pop.indexOf('E') > 0) { countryPop = (pop.slice(0,3))*1000000000; }
        else {countryPop = pop * 1000; }

        countryResults[1] = countryPop;
        resultsBack ++;

    });

}


// get road traffic deaths rates

function get_rta_data (code) {

    var rtaData = "";
    var rtaURL = "http://apps.who.int/gho/athena/data/GHO/RS_196,RS_198.json?profile=simple&filter=COUNTRY:*";
    var queryURL = rtaURL.replace("COUNTRY:*", "COUNTRY:" + code);  // replace 'country:*'' with 'country:code'

    $.ajax({
      url: queryURL,
      method: 'GET',
      crossDomain: true,
      dataType: 'jsonp',

    })

    .done(function(response) {

        if (response.fact[0].dim.GHO.indexOf("per 100 000 population") > 0) { rtaData = response.fact[0].Value; rtaDataYear = response.fact[0].dim.YEAR; }
           else { rtaData = response.fact[1].Value; rtaDataYear = response.fact[1].dim.YEAR;}

        rtaData = parseInt(rtaData.replace(/ /g,''));

        if (isNaN(rtaData)) { 

            rtaData = 'no data'; 
            $('#results-table tr:nth-child(2) td:nth-child(2)').text("no data");
            }
            else { 
            (rtaData = Math.round( rtaData * 10 ) / 10); 
            $('#results-table tr:nth-child(2) td:nth-child(2)').text("yes");
            }

        countryResults[2] = rtaData;
        countryResultsYear[2] = rtaDataYear;
        resultsBack ++;

    });

}


 // get air pollution data

function get_airpoll_data (code) { 

    var airpollData = "";

    var airpollURL = "http://apps.who.int/gho/athena/data/GHO/AIR_5,AIR_50,AIR_41.json?profile=simple&filter=COUNTRY:*;REGION:*";
    var queryURL = airpollURL.replace("COUNTRY:*", "COUNTRY:" + code);  // replace 'country:*'' with 'country:code'

    $.ajax({
    url: queryURL,
    method: 'GET',
    crossDomain: true,
    dataType: 'jsonp',

    })

    .done(function(response) {

        airpollData = response.fact[0].Value; 
        airpollDataYear = response.fact[0].dim.YEAR;

        airpollData = parseInt(airpollData.replace(/ /g,''));

        if (isNaN(airpollData)) {
            airpollData = 'no data';
            $('#results-table tr:nth-child(3) td:nth-child(2)').text("no data");
            }
            else {
            airpollData = Math.round( airpollData * 10 ) / 10;
            $('#results-table tr:nth-child(3) td:nth-child(2)').text("yes");
            }

        countryResults[3] = airpollData;
        countryResultsYear[3] = airpollDataYear;
        resultsBack ++;

    });

}


// get natural disaster data 

function get_natdis_data (code) {

    var natdisData = "";

    var natdisURL = "http://apps.who.int/gho/athena/data/GHO/SDGDISASTER.json?profile=simple&filter=COUNTRY:*;REGION:*";
    var queryURL = natdisURL.replace("COUNTRY:*", "COUNTRY:" + code);  // replace 'country:*'' with 'country:code'

    $.ajax({
    url: queryURL,
    method: 'GET',
    crossDomain: true,
    dataType: 'jsonp',

    })

    .done(function(response) {

        natdisData = response.fact[0].Value; 
        natdisDataYear = response.fact[0].dim.YEAR;

        natdisData = parseInt(natdisData.replace(/</g,''));

        if (isNaN(natdisData)) { 
            natdisData = 'no data'; 
            $('#results-table tr:nth-child(4) td:nth-child(2)').text("no data");
            }
            else {
            natdisData = Math.ceil( natdisData * 10 ) / 10;
            $('#results-table tr:nth-child(4) td:nth-child(2)').text("yes");
            }
        
        countryResults[4] = natdisData;
        countryResultsYear[4] = natdisDataYear;
        resultsBack ++;    

    });

}


// get water hygeine data 

function get_hygeine_data (code) {

    var hygeineData = "";

    var hygeineURL = "http://apps.who.int/gho/athena/data/GHO/SDGWSHBOD.json?profile=simple&filter=COUNTRY:*";
    var queryURL = hygeineURL.replace("COUNTRY:*", "COUNTRY:" + code);  // replace 'country:*'' with 'country:code'

    $.ajax({
    url: queryURL,
    method: 'GET',
    crossDomain: true,
    dataType: 'jsonp',

    })

    .done(function(response) {

        hygeineData = response.fact[0].Value; 
        hygeineDataYear = response.fact[0].dim.YEAR; 

        hygeineData = parseInt(hygeineData.replace(/ /g,''));

        if (isNaN(hygeineData)) { 

            hygeineData = "no data"; 
            $('#results-table tr:nth-child(5) td:nth-child(2)').text("no data");
            }
            else {
            hygeineData = Math.round( hygeineData * 10 ) / 10;
            $('#results-table tr:nth-child(5) td:nth-child(2)').text("yes");
            }

        countryResults[5] = hygeineData;
        countryResultsYear[5] = hygeineDataYear;
        resultsBack ++;

    });

}
    
// get homocide rates

function get_homocide_data (code) {

    var homocideData = "";

    var homocideURL = "http://apps.who.int/gho/athena/data/GHO/VIOLENCE_HOMICIDENUM,VIOLENCE_HOMICIDERATE.json?profile=simple&filter=COUNTRY:*;AGEGROUP:-;SEX:-";
    var queryURL = homocideURL.replace("COUNTRY:*", "COUNTRY:" + code);  // replace 'country:*'' with 'country:code

    $.ajax({
    url: queryURL,
    method: 'GET',
    crossDomain: true,
    dataType: 'jsonp',

    })

    .done(function(response) {

        console.log(response);

        if (response.fact[0].dim.GHO.indexOf("per 100 000 population") > 0) { homocideData = response.fact[0].Value; homocideDataYear = response.fact[0].dim.YEAR; }
           else { homocideData = response.fact[1].Value; homocideDataYear = response.fact[1].dim.YEAR;} 

        homocideData = parseInt(homocideData.replace(/ /g,''));

        if (isNaN(homocideData)) { 

            homocideData = "no data"; 
            $('#results-table tr:nth-child(6) td:nth-child(2)').text("no data");
            }
            else {homocideData = Math.round( homocideData * 10 ) / 10;
            $('#results-table tr:nth-child(6) td:nth-child(2)').text("yes");
            }

        countryResults[6] = homocideData;
        countryResultsYear[6] = homocideDataYear;
        resultsBack ++;

    });

}

function get_commdis_data (code) {

    var ntdData = 0;
    var malariaData = "";
    var ntdDataYear = "";
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

        ntdData = parseInt(ntdData.replace(/ /g,''));
        malariaData = parseInt(malariaData.replace(/ /g,''));

        if (isNaN(ntdData)) {
            ntdData = "no data"; 
            $('#results-table tr:nth-child(7) td:nth-child(2)').text("no data");
            }
            else { 
            ntdData = Math.round( ntdData * 10 ) / 10;
            $('#results-table tr:nth-child(7) td:nth-child(2)').text("yes");
            }

        if (isNaN(malariaData)) {
            malariaData = "0"; 
            $('#results-table tr:nth-child(8) td:nth-child(2)').text("yes");
            }
            else { 
            malariaData = Math.round( malariaData * 10 ) / 10;
            $('#results-table tr:nth-child(8) td:nth-child(2)').text("yes");
            }

        countryResults[7] = malariaData;
        countryResultsYear[7] = malariaDataYear;
        countryResults[8] = ntdData;
        countryResultsYear[8] = ntdDataYear;
        resultsBack ++;

    });

}

    // get health personnel data 

    function get_healthworkers_data (code) {

    var physiciansData = "";
    var nursesData = "";
    var physiciansDataYear = 0;
    var nursesDataYear = 0;
    var x = 0;

    var healthworkersURL = "http://apps.who.int/gho/athena/data/GHO/HRH_26,HRH_33,HRH_28,HRH_25,HRH_27,HRH_31,HRH_29,HRH_30,HRH_32.json?profile=simple&filter=COUNTRY:*";
    var queryURL = healthworkersURL.replace("COUNTRY:*", "COUNTRY:" + code);  // replace 'country:*'' with 'country:code'

    $.ajax({
    url: queryURL,
    method: 'GET',
    crossDomain: true,
    dataType: 'jsonp',

    })

    .done(function(response) {

        for (x=0; x < response.fact.length; x++) {
            if (response.fact[x].dim.GHO == "Physicians density (per 1000 population)" && response.fact[x].dim.YEAR > physiciansDataYear) {
                physiciansData = response.fact[x].Value;
                physiciansDataYear = response.fact[x].dim.YEAR;
            }
        }

          for (x=0; x < response.fact.length; x++) {
            if (response.fact[x].dim.GHO == "Nursing and midwifery personnel density (per 1000 population)" && response.fact[x].dim.YEAR > nursesDataYear) {
                nursesData = response.fact[x].Value;
                nursesDataYear = response.fact[x].dim.YEAR;
            }
        }

        physiciansData = physiciansData.replace(/ /g,'');
        nursesData = nursesData.replace(/ /g,'');

        if (isNaN(physiciansData)) {
            physiciansData = "no data"; 
            $('#results-table tr:nth-child(10) td:nth-child(2)').text("no data");
            }
            else { 
            physiciansData = Math.round( physiciansData * 10 ) / 10;
            $('#results-table tr:nth-child(10) td:nth-child(2)').text("yes");
            }

        if (isNaN(nursesData)) {
            nursesData = "no data"; 
            $('#results-table tr:nth-child(11) td:nth-child(2)').text("no data");
            }
            else { 
            nursesData = Math.round( nursesData * 10 ) / 10;
            $('#results-table tr:nth-child(11) td:nth-child(2)').text("yes");
            }

        countryResults[9] = physiciansData;
        countryResultsYear[9] = physiciansDataYear;
        countryResults[10] = nursesData;
        countryResultsYear[10] = nursesDataYear;
        resultsBack ++;

   });

}


function set_up () {

    // set up page as required
}


function display_searches () {

    // load from firebase and display results of previous searches on page
}


function calculate_rank () {

    //console.log(countryResults);
    //console.log(countryResultsYear);

    if (countryResults[3] != "no data") { countryResults[3] = Math.round(countryResults[3]/(parseInt(countryResults[1])/100000)); }
    if (countryResults[7] != "no data") { countryResults[7] = countryResults[7]*100; }
    if (countryResults[8] != "no data") { countryResults[8] = Math.round(countryResults[8]/((parseInt(countryResults[1]))/100000)); }
    if (countryResults[9] != "no data") { countryResults[9] = countryResults[9]*100; }
    if (countryResults[10] != "no data") { countryResults[10] = countryResults[10]*100; }


    $('#results-table tr:nth-child(2) td:nth-child(3)').text(countryResults[2].toLocaleString());
    $('#results-table tr:nth-child(3) td:nth-child(3)').text(countryResults[3].toLocaleString());
    $('#results-table tr:nth-child(4) td:nth-child(3)').text(countryResults[4].toLocaleString());
    $('#results-table tr:nth-child(5) td:nth-child(3)').text(countryResults[5].toLocaleString());
    $('#results-table tr:nth-child(6) td:nth-child(3)').text(countryResults[6].toLocaleString());
    $('#results-table tr:nth-child(7) td:nth-child(3)').text(countryResults[7].toLocaleString());
    $('#results-table tr:nth-child(8) td:nth-child(3)').text(countryResults[8].toLocaleString());
    $('#results-table tr:nth-child(10) td:nth-child(3)').text(countryResults[9].toLocaleString());
    $('#results-table tr:nth-child(11) td:nth-child(3)').text(countryResults[10].toLocaleString());


    countryRankings[2] = Math.ceil((countryResults[2]/40)*10);
    countryRankings[3] = Math.ceil((countryResults[3]/100)*10);
    countryRankings[4] = Math.ceil((countryResults[4]/8)*10);
    countryRankings[5] = Math.ceil((countryResults[5]/120)*10);
    countryRankings[6] = Math.ceil((countryResults[6]/85)*10);
    countryRankings[7] = Math.ceil((countryResults[7]/20000)*10);
    countryRankings[8] = Math.ceil((countryResults[8]/100000)*10);

    countryRankings[9] = Math.ceil((countryResults[9]/400)*10);
    countryRankings[10] = Math.ceil((countryResults[10]/1250)*10);

    $('#results-table tr:nth-child(2) td:nth-child(4)').text(countryRankings[2]);
    $('#results-table tr:nth-child(3) td:nth-child(4)').text(countryRankings[3]);
    $('#results-table tr:nth-child(4) td:nth-child(4)').text(countryRankings[4]);
    $('#results-table tr:nth-child(5) td:nth-child(4)').text(countryRankings[5]);
    $('#results-table tr:nth-child(6) td:nth-child(4)').text(countryRankings[6]);
    $('#results-table tr:nth-child(7) td:nth-child(4)').text(countryRankings[7]);
    $('#results-table tr:nth-child(8) td:nth-child(4)').text(countryRankings[8]);
    $('#results-table tr:nth-child(10) td:nth-child(4)').text(countryRankings[9]);
    $('#results-table tr:nth-child(11) td:nth-child(4)').text(countryRankings[10]);

    var hazardRank = 0;
    var healthRank = 0;
    var travelsafeRank = 0;



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
    });
});

$("#submit-button").on("click", function() {

    $('#country-name').text(country.name);
    $('#country-code').text(country.alpha3Code);
    $('#country-code2').text(country.alpha2Code);

    countryName = country.name;
    countryInput = country.alpha3Code;
    countryResults[0] = country.name;

        $('#result').empty();
        countryResults.length = 0;
        resultsBack = 0;

        var countryPop = get_pop_data (countryInput);
        var countryRTAData = get_rta_data (countryInput);
        var countryAirpollData = get_airpoll_data(countryInput);
        var counryNatdisData = get_natdis_data(countryInput);
        var hygeineData = get_hygeine_data(countryInput);
        var homocideData = get_homocide_data(countryInput);
        var commdisData = get_commdis_data(countryInput);
        var healthworkersData = get_healthworkers_data(countryInput);

        updateMap(countryName);


    //set up the table to hold the results

    $('#result').append("<h3>" + country.name + "</h3>");

    var resultsTable = $('<table>').addClass("results-table").attr("id", 'results-table');
    $('#result').append(resultsTable);


    $('#results-table').append("<tr><th>Hazards</th><th>Available</th><th>Per 100,000 population</th><th>Ranking</th></tr>");
    $('#results-table').append("<tr><td>Road traffic deaths</td><td></td><td></td><td></td></tr>");
    $('#results-table').append("<tr><td>Annual deaths due to air pollution</td><td></td><td></td><td></td></tr>");
    $('#results-table').append("<tr><td>Average annual deaths from natural disasters</td><td></td><td></td><td></td></tr>");
    $('#results-table').append("<tr><td>Deaths attributed to unsafe water hygeine</td><td></td><td></td><td></td></tr>");
    $('#results-table').append("<tr><td>Deaths from homocide</td><td></td><td></td><td></td></tr>");
    $('#results-table').append("<tr><td>Malaria incidence</td><td></td><td></td><td></td></tr>");
    $('#results-table').append("<tr><td>Tropical diseases</td><td></td><td></td><td></td></tr>");
    $('#results-table').append("<tr><td>Overall Hazard rank</td><td></td><td></td><td></td></tr>");


    $('#results-table').append("<tr> <th>Healthcare</th> <th></th> <th></th> <th></th> </tr>");
    $('#results-table').append("<tr> <td>Number of physicians</td> <td></td> <td></td> <td></td> </tr>");
    $('#results-table').append("<tr> <td>Number of nurses</td> <td> </td> <td></td> <td></td> </tr>");
    $('#results-table').append("<tr> <td>Overall healthcare rank</td> <td></td> <td></td> <td></td> </tr>");

    $('#results-table').append("<tr><td>Overall TravelSafe ranking</td><td></td><td></td><td></td></tr>");



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


    //set interval timer to wait for all results to be back and then call calculate_rank function

    var intervalCount = 0;
    var intervalId = setInterval( function() { 

        if (resultsBack < 8) { 
            console.log("waiting .... "); 
            intervalCount++;

            if (intervalCount == 20) {
                clearInterval(intervalId); 
                calculate_rank();
            }
        }
            
        else { 
            clearInterval(intervalId); 
            calculate_rank();
            }                                                                     
    }, 100);

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