/*Javascript for Ajax Giphy Homework game (Week 6 Homework )*/


$(document).ready(function() {


/*  --------------------------- Global variables ---------------------------------------------*/
/*  --------------------------- Global variables ---------------------------------------------*/
/*  --------------------------- Global variables ---------------------------------------------*/




    //cummicable diseases (hepB, TB, malaria, NTDs, HIV)
    //var commdisURL = "http://apps.who.int/gho/athena/data/GHO/SDGHIV,SDGMALARIA,SDGNTDTREATMENT,MDG_0000000020,WHS4_117.json?profile=simple&filter=COUNTRY:*;YEAR:2016;YEAR:2015;YEAR:2014;YEAR:2013;YEAR:2012;YEAR:2011;YEAR:2010;YEAR:2005;YEAR:2000"

    //new HIV cases/yr /1000popultaion
    //var hivURL = "http://apps.who.int/gho/athena/data/GHO/HIV_0000000026,SDGHIV.json?profile=simple&filter=COUNTRY:*;REGION:*"

    //malaria cases/year
    //var malariaURL = "http://apps.who.int/gho/athena/data/GHO/MALARIA002.json?profile=simple&filter=COUNTRY:*"

    // reported cases of cholera
    //var choleraURL = "http://apps.who.int/gho/athena/data/GHO/CHOLERA_0000000001.json?profile=simple&filter=COUNTRY:*;REGION:*"

    //deaths from ambient air pollution
    //var airpollURL = "http://apps.who.int/gho/athena/data/GHO/AIR_5,AIR_50,AIR_41.json?profile=simple&filter=COUNTRY:*;REGION:*"

    //death rate from natural disasters (/100,000population)
    //var natdisURL = "http://apps.who.int/gho/athena/data/GHO/SDGDISASTER.json?profile=simple&filter=COUNTRY:*;REGION:*";

    //mortality rate attributable to unsafe water, sanination and hygeine (/100,000)
    //var waterURL = "http://apps.who.int/gho/athena/data/GHO/SDGWSHBOD.json?profile=simple&filter=COUNTRY:*";

    //road traffic deaths/100,000 population
    //var rtaURL = "http://apps.who.int/gho/athena/data/GHO/RS_196,RS_198.json?profile=simple&filter=COUNTRY:*";

    //homocide rates
    //var homocideURL = "http://apps.who.int/gho/athena/data/GHO/VIOLENCE_HOMICIDENUM,VIOLENCE_HOMICIDERATE.json?profile=simple&filter=COUNTRY:*;AGEGROUP:-;SEX:-"

    // healthcare personal per 100,000 population
    //var healthcareURL = "http://apps.who.int/gho/athena/data/GHO/HRH_26,HRH_33,HRH_28,HRH_25,HRH_27,HRH_31,HRH_29,HRH_30,HRH_32.json?profile=simple&filter=COUNTRY:*"


/*    //US GOv acute travel alerts (XML)
    var newalertsURL="https://travel.state.gov/_res/rss/TAs.xml";

    //US gov chronic travel alerts (xml)
    var allalertsURL="https://travel.state.gov/_res/rss/TWs.xml";*/


    var country = inputCountry; // from input form


     // get air pollution data 
    var commdisURL = "http://apps.who.int/gho/athena/data/GHO/SDGHIV,SDGMALARIA,SDGNTDTREATMENT,MDG_0000000020,WHS4_117.json?profile=simple&filter=COUNTRY:*;YEAR:2016;YEAR:2015;YEAR:2014;YEAR:2013;YEAR:2012;YEAR:2011;YEAR:2010;YEAR:2005;YEAR:2000";
    var queryURL = commdisURL + country;  // may need furtehr processing
    var data = ajax_call (queryURL);

    var malariaDat = data;
    var hivDat = data;
    var ntdDat = data


     // get air pollution data 
    var airpollURL = "http://apps.who.int/gho/athena/data/GHO/AIR_5,AIR_50,AIR_41.json?profile=simple&filter=COUNTRY:*;REGION:*"
    var queryURL = airpollURL + country;  // may need furtehr processing
    var data = ajax_call (queryURL);

    var airpollDat = data;


    // get natural disaster data 
    var natdisURL = "http://apps.who.int/gho/athena/data/GHO/SDGDISASTER.json?profile=simple&filter=COUNTRY:*;REGION:*";
    var queryURL = natdisURL + country;  // may need furtehr processing
    var data = ajax_call (queryURL);

    var natdisDat = data;



    // get water hygeine data 
    var waterURL = "http://apps.who.int/gho/athena/data/GHO/SDGWSHBOD.json?profile=simple&filter=COUNTRY:*";
    var queryURL = waterURL + country;  // may need furtehr processing
    var data = ajax_call (queryURL);

    var waterDat = data;

    // get road traffic deaths rates
    var rtaURL = "http://apps.who.int/gho/athena/data/GHO/RS_196,RS_198.json?profile=simple&filter=COUNTRY:*";
    var queryURL = rtaURL + country;  // may need furtehr processing
    var data = ajax_call (queryURL);

    var homocideDat = data;

    
    // get homocide rates
    var homocideURL = "http://apps.who.int/gho/athena/data/GHO/VIOLENCE_HOMICIDENUM,VIOLENCE_HOMICIDERATE.json?profile=simple&filter=COUNTRY:*;AGEGROUP:-;SEX:-"
    var queryURL = homocideURL + country;  // may need furtehr processing
    var data = ajax_call (queryURL);

    var homocideDat = data;


    // get health personnel data
    var healthcareURL = "http://apps.who.int/gho/athena/data/GHO/HRH_26,HRH_33,HRH_28,HRH_25,HRH_27,HRH_31,HRH_29,HRH_30,HRH_32.json?profile=simple&filter=COUNTRY:*"
    var queryURL = healthcareURL + country;
    var data = ajax_call (queryURL);

    var physiciansDat = data;
    var dentistsDat = data
    var nursesDat = data;




function ajax_call (msg) {

    $.ajax({
      url: msg,
      method: 'GET',
      crossDomain: true,
      dataType: 'jsonp',

    }).done(function(response) {
      console.log(response);
      return response;
    });

}