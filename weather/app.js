$('.current-city-weather').addClass('fadeInUp');


document.querySelector("#pulse").addEventListener('click', function () {
    var city = "Dallas";
    var state = "Texas";
    var API_Key = 'AIzaSyDf4-FPjN9B4j1XYcZzr5BKZLuL49H3QGw';

    var geocode_url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city},${state}&key=${API_Key}`;
    // console.log(geocode_url);

    var weather = function get_weather() {
        $.ajax({
            type: 'GET',
            url: geocode_url,
            error: function (jqXHR, textStatus, errorThrown) {
                // console.log(jqXHR);
            },
            success: function (geo_val) {
                // console.log(geo_val);
            }
        }).done(function (geocode_val) {
            // console.log(geocode_val);
            var lat = geocode_val.results[0].geometry.location.lat;
            var long = geocode_val.results[0].geometry.location.lng;
            var start_url = `https://api.weather.gov/points/${lat},${long}`;
            $.ajax({
                type: 'GET',
                url: start_url,
                error: function (jqXHR, textStatus, errorThrown) {
                    // console.log(jqXHR);
                },
                success: function (data_val) {
                    // console.log(data_val);
                }
            }).done(function (data_url_unmade) {
                data_url = data_url_unmade.properties.forecast;
                $.ajax({
                    type: 'GET',
                    url: data_url,
                    error: function (jqXHR, textStatus, errorThrown) {
                        // console.log(jqXHR);
                    },
                    success: function (data) {

                        var full_data = data.properties.periods;
                        // console.log(full_data);
                        //     // var weather_val = [];
                        //      for (var i = 0; i < 10; i++) {
                        //       weather_val.push = (`<div>${full_data[i].temperature}</div>`);
                        // //     }


                        // var weather_icon = "./img/sun.png";

                        // for (var i = 0; i < full_data.length; i++) {
                        //     // console.log(i);
                        //     if (full_data[i].shortForecast.indexOf('Rain') !== -1) {
                        //         weather_icon = './img/rain-clouds.png';
                        //     } else if (full_data[i].shortForecast.indexOf('Clear') !== -1) {
                        //         weather_icon = './img/sun.png';
                        //     } else if (full_data[i].shortForecast.indexOf('Sunny') !== -1) {
                        //         weather_icon = './img/sun.png';
                        //     } else if (full_data[i].shortForecast.indexOf('Thunderstorms') !== -1) {
                        //         weather_icon = './img/stormrain-thunders.png';
                        //     } else {
                        //         weather_icon = './img/sun.png';
                        //     }
                        // };
                        var weather_id = document.querySelector("#weather-body");
                        var weather_id2 = document.querySelector("#weather-body2");
                        var num = 0;
                        weather_id.innerHTML = `
                                <div class="col-md-6 py-3">
                                    <div class="row">
                                        <div class="col-12 pb-2">
                                            <div class="card transp text-center">
                    <h3 class="card-header current-city-weather">${full_data[num].temperature}<sup class="font-weight-light">o <sub>F</sub></sup> | ${full_data[num].shortForecast}</h3>
                                                <img class="current-city-weather" style="margin: 0 auto;" width="150px;" src="" alt="Card image">
                                                <h4 class="current-city-weather px-0">${full_data[num].name}</h4>
                                                <h6 class="current-city-weather px-3 text-justify">${full_data[num].detailedForecast}</h6>
                                                <div class="card-footer">
                                                <div class="row">
                                                    <div class="col"> <i class="wi wi-strong-wind pr-2"></i><span class="value">${full_data[num].windSpeed}</span></div>
                                                    <div class="col"> <i class="wi wi-wind-default pr-2"></i><span class="value">${full_data[num].windDirection}</span></div>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="row no-gutters">
                                                <div class="col-4 sm-days">
                                                    <div class="card transp text-center">
                                                        <h6 class="card-header hc px-0">${full_data[num+1].name}</h6>
                                                        <img class="current-city-weather" style="margin: 0 auto;" width="80px;" src="${weather_icon}"
                                                            alt="Card image">
                                                        <div class="card-footer">
                                                        ${full_data[num+1].temperature}<sup>o<sub>F</sub></sup>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-4 sm-days">
                                                    <div class="card transp text-center">
                                                        <h6 class="card-header hc px-0">${full_data[num+2].name}</h6>
                                                        <img class="current-city-weather" style="margin: 0 auto;" width="80px;" src="${weather_icon}"
                                                            alt="Card image">
                                                        <div class="card-footer">
                                                        ${full_data[num+2].temperature}<sup>o<sub>F</sub></sup>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-4 sm-days">
                                                    <div class="card transp text-center">
                                                        <h6 class="card-header hc">${full_data[num+3].name}</h6>
                                                        <img class="current-city-weather" style="margin: 0 auto;" width="80px;" src="${weather_icon}"
                                                            alt="Card image">
                                                        <div class="card-footer">
                                                        ${full_data[num+3].temperature}<sup>o <sub>F</sub></sup>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 text-right text-white">
                                    <span class="loc">${city}, ${state}</span>
                                        <img style="margin: 0 auto;" width="120px;" src="./img/sun.png" alt="Card image"> 
                                        <h4></h4> 
                                </div>`



                        // create handler to return day values only using name values
                        var nums = 0;
                        switch (full_data[0].name) {
                            case 'This Afternoon':
                                nums = nums + 2;
                                break;
                            case 'Tonight':
                                nums = nums + 1;
                                break;
                            case 'Today':
                                nums = nums + 2;
                                break;
                            default:
                                nums = nums + 3;
                        }
                        
                       
                        let x = full_data.filter(function(element, index){
                            return index % 2 == 0;
                        });
                       
                        var weather_icon = " ";
                        // use template literals to create and array of 6 items and then itereate through using map
                        // Array(5).fill() instead of Array(5).join(0).split(0)
                        // Array(5 + 1).fill('').reduce((finalMarkup) => finalMarkup + `stuff to be repeated \n`);
                        weather_id2.innerHTML = `  
                        ${Array(6).join(0).split(0).map(function(item , i){

                            if (full_data[i].shortForecast.indexOf('Rain') !== -1) {
                                weather_icon = './img/rain-clouds.png';
                            } else if (full_data[i].shortForecast.indexOf('Clear') !== -1) {
                                weather_icon = './img/sun.png';
                            } else if (full_data[i].shortForecast.indexOf('Sunny') !== -1) {
                                weather_icon = './img/sun.png';
                            } else if (full_data[i].shortForecast.indexOf('Thunderstorms') !== -1) {
                                weather_icon = './img/stormrain-thunders.png';
                            } else {
                                weather_icon = './img/sun.png';
                            }

                            return `
                        <div class="col-md-2 sm-days pb-3">
                            <div class="card transp text-center">
                                <h5 class="card-header hc">${full_data[i].name}</h5>
                                <img class="current-city-weather" style="margin: 0 auto;" width="120px;" src="${weather_icon}" alt="Card image">
                                <div class="card-footer">
                                    <h3> ${full_data[i].temperature}<sup class="font-weight-light">o <sub>F</sub></sup></h3>   
                                </div>
                            </div>
                        </div> `}).join('')};`
                        $('.current-city-weather').addClass('fadeInUp');
                    }
                });
            });
        });

    };
    weather();

    var time_url = `http://worldclockapi.com/api/json/utc/now`
    var get_time = function () {
        $.ajax({
            type: 'GET',
            url: time_url,
            error: function (jqXHR, textStatus, errorThrown) {
                // console.log(jqXHR);
            },
            success: function (data_val) {
                date_time = data_val.currentDateTime;
                console.log(date_time);
                // var myVar = setInterval(myTimer, 1000);
                // console.log("myvar : ", myVar);
                // function myTimer() {
                //     var d = new Date();
                //     document.getElementById("tick_tock").innerHTML = d.toLocaleTimeString();
                // }
            }
        });
    };

    get_time();

});