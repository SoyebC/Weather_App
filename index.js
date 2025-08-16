document.addEventListener("DOMContentLoaded", () => {
  let cityinput = document.getElementById("city-input");
  let weatherbtn = document.getElementById("getWeather-btn");
  let weatherinfo = document.getElementById("weatherinfo");
  let citynamedisplay = document.getElementById("city-name");
  let tempdisplay = document.getElementById("temp");
  let descriptiondisplay = document.getElementById("description");
  let errormsg = document.getElementById("error-msg");
  let Api_key = `2976925c73822f568dcc8301a4aab86c`;

  weatherbtn.addEventListener("click", () => {
    let inputvalue = cityinput.value.trim();

    if (!inputvalue) return;
    fetchdata(inputvalue);
    cityinput.value = "";
  });
  async function fetchdata(inputvalue) {
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${inputvalue}&appid=${Api_key}&units=metric`;
    try {
      let response = await fetch(apiurl);
      console.log("RESPONSE", response);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      let data = await response.json();
      console.log(data);
      displayweather(data);
    } catch (error) {
      showerror();
    }
  }
  function displayweather(weather) {
    //  Hide error
    errormsg.classList.add("hidden");
    weatherinfo.classList.remove("hidden");

    //  Fill data
    citynamedisplay.textContent = `${weather.name}, ${weather.sys.country}`;
    tempdisplay.textContent = `${weather.main.temp}°C`;
    descriptiondisplay.textContent = weather.weather[0].description;
  }
  function showerror() {
    errormsg.classList.remove("hidden");
    weatherinfo.classList.add("hidden");
  }
});
