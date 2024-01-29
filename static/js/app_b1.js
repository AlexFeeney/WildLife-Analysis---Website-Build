let knownSpecies;
let criticallyEndangeredSpecies;
let endangeredSpecies;
let threatenedSpecies;
let vulenerableSpecies;
let countries;
let selectedRiskData;

(async function () {
    // Loading CSV data
    knownSpecies = await d3.csv("/api/knownSpecies");
    console.log("known species", knownSpecies);

    criticallyEndangeredSpecies = await d3.csv("/api/criticallyEndangeredSpecies");
    console.log("critically endangered", criticallyEndangeredSpecies);

    endangeredSpecies = await d3.csv("/api/endangeredSpecies");
    console.log("endangered", endangeredSpecies);

    threatenedSpecies = await d3.csv("/api/threatenedSpecies");
    console.log("threatened", threatenedSpecies);

    vulenerableSpecies = await d3.csv("/api/vulenerableSpecies");
    console.log("vulnerable", vulenerableSpecies);

    countries = await d3.csv("/api/countries");
    console.log("countries", countries);

    // Converting Arrays to List --------------------------
    const countryList = processDataList(countries);
    const knownSpeciesList = processDataList(knownSpecies);
    const criticallyEndangeredSpeciesList = processDataList(criticallyEndangeredSpecies);
    const endangeredSpeciesList = processDataList(endangeredSpecies);
    const threatenedSpeciesList = processDataList(threatenedSpecies);
    const vulenerableSpeciesList = processDataList(vulenerableSpecies);
    //---------------------------------------------------------

    function processDataList(data) {
        return data.columns.map(function (item) {
            return item.trim().replace(/[\[\]"]+/g, '').replace('{country:', '').replace('}', '');
        });
    }

    async function loadAndProcessData(url) {
        const data = await d3.csv(url);
        return processDataList(data);
    }

    const riskList = [
        "Known Species",
        "Critically Endangered Species",
        "Endangered Species",
        "Threatened Species",
        "Vulnerable Species"
    ];

    const dropdownRisk = document.createElement('select');
    dropdownRisk.className = "riskSelect";

    for (let i = 0; i < riskList.length; ++i) {
        const risk = riskList[i];

        const option = document.createElement('option');
        option.value = risk;
        option.text = risk;

        dropdownRisk.appendChild(option);
    }

    const dropdownCountry = document.createElement('select');
    dropdownCountry.className = "countrySelect";

    for (let i = 0; i < countryList.length; i++) {
        const country = countryList[i];

        const option = document.createElement('option');
        option.value = country;
        option.text = country;

        dropdownCountry.appendChild(option);
    }

    // Appending dropdowns to pieChartContainer
    const pieChartContainer = document.getElementById("pieChart");

    pieChartContainer.appendChild(dropdownRisk);
    pieChartContainer.appendChild(dropdownCountry);
    //---------------------------------------------------------

    // Set initial values for selectedRisk and selectedCountry
    let selectedRisk = dropdownRisk.value;
    let selectedCountry = dropdownCountry.value;


    // Assigning datasets ---------------------------------------
    dropdownRisk.addEventListener('change', function () {
        selectedRisk = this.value;
        console.log("selected risk", selectedRisk);

        // Update selectedRiskData here
        if (selectedRisk === "Known Species") {
            selectedRiskData = knownSpeciesList;
        } else if (selectedRisk === "Critically Endangered Species") {
            selectedRiskData = criticallyEndangeredSpeciesList;
        } else if (selectedRisk === "Endangered Species") {
            selectedRiskData = endangeredSpeciesList;
        } else if (selectedRisk === "Threatened Species") {
            selectedRiskData = threatenedSpeciesList;
        } else if (selectedRisk === "Vulnerable Species") {
            selectedRiskData = vulenerableSpeciesList;
        } else {
            console.log("Unknown risk category");
            return;
        }

        updateChartData(); // Call the function to update the chart
    });

    dropdownCountry.addEventListener('change', function () {
        selectedCountry = this.value;
        console.log("selected country", selectedCountry);
        updateChartData(); // Call the function to update the chart
    });

    let labels = ['Mammals', 'Birds', 'Reptiles', 'Amphibians', 'Fish', 'Marine Fish', 'Freshwater Fish', 'Vascular Plants', 'Mosses', 'Invertebrates'];

    function updateChartData() {
        let selectedData = {};

        // Loop through the labels array (e.g., ['Mammals', 'Birds', ...])
        for (let i = 0; i < labels.length; i++) {
            let countVariableName = labels[i];
            selectedData[countVariableName] = 0;  // Initialize counts to 0
        }

        // Loop through the selectedRiskData array
        for (let i = 0; i < selectedRiskData.length; i++) {
            let country = selectedRiskData[i];
            let speciesClass = selectedRiskData[i + 1];
            let total = parseInt(selectedRiskData[i + 2]);

            // Check if the current entry matches the selected country
            if (country === selectedCountry) {
                selectedData[speciesClass] += total;  // Update counts based on species class
            }
        }

        // Filter out NaN values and own properties only
        const validCounts = Object.entries(selectedData)
            .filter(([key, value]) => !isNaN(value) && selectedData.hasOwnProperty(key))
            .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

        // Use validCounts for creating the pie chart
        const chartData = [{
            values: Object.values(validCounts),
            labels: Object.keys(validCounts),
            title: `${selectedRisk} in ${selectedCountry}`,
            type: 'pie'
        }];

        // Layout for the chart
        const layout = {
            height: 400,
            width: 500,
            showLegend: false,
            autosize: true
        };

        // Create or update the pie chart using Plotly
        Plotly.newPlot('pieChart', chartData, layout);
    }
})();
