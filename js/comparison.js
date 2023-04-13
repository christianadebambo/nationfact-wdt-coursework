// add a click event listener for the submit button
$('#compare').on('click', function () {
    // get the input values from two input fields for city 1 and city 2
    const city1Name = $('#city1').val();
    const city1Country = $('#country1').val();
    const city2Name = $('#city2').val();
    const city2Country = $('#country2').val();
  
    const pricesSettings1 = {
      "async": true,
      "crossDomain": true,
      "url": `https://cost-of-living-and-prices.p.rapidapi.com/prices?city_name=${city1Name}&country_name=${city1Country}`,
      "method": "GET",
      "headers": {
        "X-RapidAPI-Key": "YOUR-API-KEY",
        "X-RapidAPI-Host": "cost-of-living-and-prices.p.rapidapi.com"
      }
    };
  
    const pricesSettings2 = {
      "async": true,
      "crossDomain": true,
      "url": `https://cost-of-living-and-prices.p.rapidapi.com/prices?city_name=${city2Name}&country_name=${city2Country}`,
      "method": "GET",
      "headers": {
        "X-RapidAPI-Key": "YOUR-API-KEY",
        "X-RapidAPI-Host": "cost-of-living-and-prices.p.rapidapi.com"
      }
    };

    // fetch prices data for city 1
    $.ajax(pricesSettings1)
    .done(function (data1) {
        console.log(`Prices data for City 1: ${city1Name}, ${city1Country}`);
        console.log(data1);

        if (!data1 || !data1.prices || data1.prices.length === 0) {
            // display error message when city 1 data is not found
            console.error(`City 1 data not found: ${city1Name}, ${city1Country}. Try Another City with the correct Country Name`);
            alert(`City 1 data not found: ${city1Name}, ${city1Country}. Try Another City with the correct Country Name`);
            return;              
        }

        // fetch prices data for city 2
        $.ajax(pricesSettings2)
        .done(function (data2) {
            console.log(`Prices data for City 2: ${city2Name}, ${city2Country}`);
            console.log(data2);

            if (!data2 || !data2.prices || data2.prices.length === 0) {
                // display error message when city 2 data is not found
                console.error(`City 2 data not found: ${city2Name}, ${city2Country}. Try Another City with the correct Country Name`);
                alert(`City 2 data not found: ${city2Name}, ${city2Country}. Try Another City with the correct Country Name`);
                return;            
            }

            $.getJSON("../json/usd-exchange-rate.json", function(data){
                console.log('USD Exchange Rates:'); 
                console.log(data);

                // display data in a table comparison format
                var table = document.createElement("table");

                table.classList.add("comparison-table");
                
                // create a table header row
                var headerRow = table.insertRow(0);

                // create table header cells
                var categoryHeader = document.createElement("th");
                categoryHeader.textContent = "Category Name";
                headerRow.appendChild(categoryHeader);

                var itemHeader = document.createElement("th");
                itemHeader.textContent = "Item Name";
                headerRow.appendChild(itemHeader);

                var city1Header = document.createElement("th");
                city1Header.textContent = "Average Cost (" + city1Name + ", " + city1Country + ")";
                headerRow.appendChild(city1Header);

                var city2Header = document.createElement("th");
                city2Header.textContent = "Average Cost (" + city2Name + ", " + city2Country + ")";
                headerRow.appendChild(city2Header);

                var city1CurrencyCode = data1.prices[0].currency_code.toLowerCase();
                var city2CurrencyCode = data2.prices[0].currency_code.toLowerCase();

                // extract currency codes and rates from the currencyData object
                var currencyCodes = Object.keys(data);
                var currencyRates = {};

                // loop through the currency codes and add them as keys with their corresponding rates as values
                for (var i = 0; i < currencyCodes.length; i++) {
                    var currencyCode = currencyCodes[i];
                    var currencyRate = data[currencyCode].rate;
                    currencyRates[currencyCode] = currencyRate;
                }

                var currencyRate1 = currencyRates[city1CurrencyCode];
                var currencyRate2 = currencyRates[city2CurrencyCode];

                if (typeof currencyRate1 === 'undefined') {
                    console.error('Invalid currency code for city1');
                }

                if (typeof currencyRate2 === 'undefined') {
                    console.error('Invalid currency code for city2');
                }

                console.log('Currency Rate 1:', currencyRate1);
                console.log('Currency Rate 2:', currencyRate2);


                // loop through the data and populate the table rows
                for (var i = 0; i < data1.prices.length; i++) {
                    var city1Item = data1.prices[i];
                    var city2Item = (i < data2.prices.length) ? data2.prices[i] : null; // check if data2.prices[i] exists, otherwise set it to null

                     // convert city1Item.avg to USD using exchange rate
                    var city1AvgCostInUSD = city1Item.avg / currencyRate1;

                    // convert city2Item.avg to USD using exchange rate, if city2Item exists
                    var city2AvgCostInUSD = city2Item ? city2Item.avg / currencyRate2 : null;

                    // create a table row
                    var row = table.insertRow(i + 1);
                
                    // create table cells and populate with data
                    var categoryCell = row.insertCell(0);
                    categoryCell.textContent = city1Item.category_name;
                
                    var itemCell = row.insertCell(1);
                    itemCell.textContent = city1Item.item_name;
                
                    var city1AvgCostCell = row.insertCell(2);
                    city1AvgCostCell.textContent = "USD " + city1AvgCostInUSD.toFixed(2); // display average cost in USD with 2 decimal places

                    var city2AvgCostCell = row.insertCell(3);
                    city2AvgCostCell.textContent = city2AvgCostInUSD ? "USD " + city2AvgCostInUSD.toFixed(2) : "N/A"; // check if city2AvgCostInUSD exists, otherwise set it to N/A 
                }

                // create an array to hold the data for each category
                var categoryData1 = [];
                var categoryData2 = [];

                // loop through the data and populate the categoryData arrays
                for (var i = 0; i < data1.prices.length; i++) {
                    var city1Item = data1.prices[i];
                    var city2Item = (i < data2.prices.length) ? data2.prices[i] : null; // check if data2.prices[i] exists, otherwise set it to null

                    // convert city1Item.avg to USD using exchange rate
                    var city1AvgCostInUSD = city1Item.avg / currencyRate1;

                    // convert city2Item.avg to USD using exchange rate, if city2Item exists
                    var city2AvgCostInUSD = city2Item ? city2Item.avg / currencyRate2 : null;

                    // group the data by category name and sum the average costs for each category
                    if (!categoryData1[city1Item.category_name]) {
                        categoryData1[city1Item.category_name] = city1AvgCostInUSD;
                    } else {
                        categoryData1[city1Item.category_name] += city1AvgCostInUSD;
                    }

                    if (city2AvgCostInUSD) {
                        if (!categoryData2[city2Item.category_name]) {
                            categoryData2[city2Item.category_name] = city2AvgCostInUSD;
                        } else {
                            categoryData2[city2Item.category_name] += city2AvgCostInUSD;
                        }
                    }
                }

                // convert categoryData arrays to arrays of objects for chartJS data format
                var chartData1 = [];
                var chartData2 = [];

                for (var category in categoryData1) {
                    chartData1.push({ category_name: category, avg_cost: categoryData1[category] });
                }

                for (var category in categoryData2) {
                    chartData2.push({ category_name: category, avg_cost: categoryData2[category] });
                }

                // sort the data by average cost in descending order
                chartData1.sort(function (a, b) {
                    return b.avg_cost - a.avg_cost;
                });

                chartData2.sort(function (a, b) {
                    return b.avg_cost - a.avg_cost;
                });

                // create an array to hold the labels for the chart
                var labels = [];

                // loop through the sorted data and populate the labels array
                for (var i = 0; i < chartData1.length; i++) {
                    labels.push(chartData1[i].category_name);
                }

                // create a data object for chartJS
                var chartData = {
                    labels: labels,
                    datasets: [
                        {
                            label: city1Name + ' (' + city1Country + ')',
                            data: chartData1.map(function (item) { return item.avg_cost; }),
                            backgroundColor: 'rgb(135, 206, 235)', 
                            borderColor: 'rgba(54, 162, 235, 1)', 
                            borderWidth: 1 
                        },
                        {
                            label: city2Name + ' (' + city2Country + ')',
                            data: chartData2.map(function (item) { return item.avg_cost; }),
                            backgroundColor: 'rgb(0,128,0)', 
                            borderColor: 'rgba(255, 99, 132, 1)', 
                            borderWidth: 1 
                        }
                    ]
                };

                // create a chart object using chartJS
                var ctx = document.getElementById('chart').getContext('2d');
                var myChart = new Chart(ctx, {
                    type: 'bar', 
                    data: chartData,
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                                maxTicksLimit: 10 
                            }
                        },
                        plugins: {
                            title: {
                                display: true,
                                text: 'Average Cost of Living by Category for ' + city1Name + ' and ' + city2Name 
                            },
                            legend: {
                                display: true,
                                position: 'bottom' 
                            }
                        }
                    }
                });


                // append the chart to DOM
                $("#chart").html(myChart);
                
                // append the table to DOM
                $("#data-container").html(table);                
            })
            .fail(function (error) {
                console.error(`Error fetching prices data for City 2: ${city2Name}, ${city2Country}`, error);
            });
        })
        .fail(function (error) {
            console.error(`Error fetching prices data for City 1: ${city1Name}, ${city1Country}`, error);
        });
    }); 
    });  