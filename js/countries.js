// wait for DOM to fully load before executing code
$(document).ready(function() {
    $("#fetch-data-btn").click(function() {
      const searchTerm = $("#search-input").val().trim().toLowerCase(); // get the search term inputted by user, trim & convert to lowercase
      const settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://restcountries.com/v3.1/name/${searchTerm}`,
        "method": "GET"
      };
  
      $.ajax(settings).done(function (response) {
        if(response.length === 0){
          $("#data-container").html("<p>No results found.</p>");
        } else {
          const country = response[0]; // get the first country object from the response
          // HTML code to display country information
          const divHTML = `
          <div class="flex-row2">
          <div class="flex-item flex-item-stretch-0 flex-column">
          <a>
              <img class="image max-width-400" src=${country.flags.png}>
          </a>
         </div>
         <div class="flex-item flex-item-stretch-0 flex-column">
          <p class="text-medium">${country.name.common}</p>
          <p><strong>Capital City: </strong>${country.capital}<br><br>
             <strong>Capital City Coordinates: </strong>${country.capitalInfo.latlng}<br><br>
             <strong>Region: </strong>${country.region}<br><br>
             <strong>Population: </strong>${country.population}
          </p>
         </div>
         `;

  
          // update the HTML of the data container with the divHTML
          $("#data-container").html(divHTML);

          // create a Bing Maps instance in the element with id "map-container"
          const map = new Microsoft.Maps.Map('#map-container', {
            center: new Microsoft.Maps.Location(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1]),
            zoom: 6
          });

		  const pin = new Microsoft.Maps.Pushpin(map.getCenter(), {
            title: country.name,
            icon: 'https://www.bingmapsportal.com/Content/images/poi_custom.png'
          });

		  map.entities.push(pin);        
        }
      }).fail(function(){
        $("#data-container").html("<p>Failed to fetch data.</p>");
      });
    });
  });
  