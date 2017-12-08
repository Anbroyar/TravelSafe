
/*Javascript for Travelsafe application (Project 1)*/


$(document).ready(function() {


/*  --------------------------- Global variables -------------------------------------*/


var countryInput = "";
var countryResults = [];


/*  --------------------------- Objects ----------------------------------------------*/





/*  --------------------------- functions ---------------------------------------------*/


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

        console.log(code + ": Annual road traffic deaths (/100,000 population 2016) = " + rtaData);

        // check to see if result returned
        // display raw result with explanation to div in UX
        // calculate ranking 1-10 
        // place ranking result to countryResults[] array

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

        console.log(code + ": Air pollution annual deaths (number)= " + airpollData);

        // check to see if result returned
        // display raw result with explanation to div in UX
        // calculate ranking 1-10 
        // place ranking result to countryResults[] array

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

        console.log(code + ": Average deaths from natural disasters (/100,000 population (2011-2015) = " + natdisData);

        // check to see if result returned
        // display raw result with explanation to div in UX
        // calculate ranking 1-10 
        // place ranking result to countryResults[] array

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

        console.log(code + ": Deaths attributed to unsafe water hygeine (/100,000 population (year) = " + hygeineData);

        // check to see if result returned
        // display raw result with explanation to div in UX
        // calculate ranking 1-10 
        // place ranking result to countryResults[] array

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

        console.log(code + ": Homocides (/100,000 population (year) = " + homocideData);

        // check to see if result returned
        // display raw result with explanation to div in UX
        // calculate ranking 1-10 
        // place ranking result to countryResults[] array

    });

}

// get comm disesases data 

function get_commdiseases_data (code) {

    var commdiseasesURL = "http://apps.who.int/gho/athena/data/GHO/SDGHIV,SDGMALARIA,SDGNTDTREATMENT,MDG_0000000020,WHS4_117.json?profile=simple&filter=COUNTRY:*;YEAR:2016;YEAR:2015;YEAR:2014;YEAR:2013;YEAR:2012;YEAR:2011;YEAR:2010;YEAR:2005;YEAR:2000";
    var queryURL = commdiseasesURL.replace("COUNTRY:*", "COUNTRY:" + code);  // replace 'country:*'' with 'country:code'

    $.ajax({
    url: queryURL,
    method: 'GET',
    crossDomain: true,
    dataType: 'jsonp',

    })

    .done(function(response) {

        console.log(response);

        //var malariaData = response.fact[0].Value;
        //var hivData = response.fact[0].Value;
        //var ntdData = response.fact[0].Value;

        //console.log(code + ": Malaria (/100,000 population (year) = " + hygeineData);
        //console.log(code + ": Malaria (/100,000 population (year) = " + hygeineData);
        //console.log(code + ": Malaria (/100,000 population (year) = " + hygeineData);
  
        // check to see if result returned
        // display raw result with explanation to div in UX
        // calculate ranking 1-10 
        // place ranking result to countryResults[] array

    });

}

    // get health personnel data

    function get_commdiseases_data (code) {

    var healthworkersURL = "http://apps.who.int/gho/athena/data/GHO/HRH_26,HRH_33,HRH_28,HRH_25,HRH_27,HRH_31,HRH_29,HRH_30,HRH_32.json?profile=simple&filter=COUNTRY:*";
    var queryURL = healthworkersURL.replace("COUNTRY:*", "COUNTRY:" + code);  // replace 'country:*'' with 'country:code'

    $.ajax({
    url: queryURL,
    method: 'GET',
    crossDomain: true,
    dataType: 'jsonp',

    })

    .done(function(response) {

        console.log(response);

        // var physiciansData = response.fact[0].Value;
        // var nursesData = response.fact[0].Value;
        // var dentistsData = response.fact[0].Value;

        //console.log(code + ": Physicians  (/100,000 population (year) = " + physiciansData);
        //console.log(code + ": Nurses (/100,000 population (year) = " + nursesData);
        //console.log(code + ": Dentists (/100,000 population (year) = " + dentistsData);

        // check to see if result returned
        // display raw result with explanation to div in UX
        // calculate ranking 1-10 
        // place ranking result to countryResults[] array

    });


    // Ajax request error handling here

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



/*  --------------------------- Event listeners ---------------------------------------------*/


// Autocomplete Country input AND code generation based on input

$(function() {
    $('#country').typeahead({
        source: countries
    })
    .change(function() {
        var country = $(this).typeahead("getActive");
        console.log(country);
        $('#result').show();
        $('#country-name').text(country.name);
        $('#country-code').text(country.alpha3Code);

        countryInput = country.alpha3Code;

       // call all the ajax requests

        var countryRTAData = get_rta_data (countryInput);
        var countryAirpollData = get_airpoll_data(countryInput);
        var counryNatdisData = get_natdis_data(countryInput);
        var hygeineData = get_hygeine_data(countryInput);
        var homocideData = get_homocide_data(countryInput);
        var commdiseasesdata = get_commdiseases_data(countryInput);
        var healthworkersData = get_healthworkers_data(countryInput);

        //set interval timer to wait for countryResults[] arraty to be full then move on to rankig calculations using data in countryResults[] 

        var intervalId = setInterval( function() { 

                while (countryResults.length < x /*total size data set*/ ) { /* dispaly "waiting .... " message in UX */ 
                                                                             /*continue checking every 100ms*/
                                                                             /*check to make sure a max time not exceeded as well*/                          
                }

          }, 100);

        intervalId.clear();

        /* call calculate-rank() */
        /* call display-rank() */
        /* call interpret-rank() */
        /* if user logged in call save-search() */

    });

});






});  // close of document ready function.