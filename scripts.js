// Load Google Charts
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawGoogleChart);


function drawGoogleChart() {
    var data = google.visualization.arrayToDataTable([
        ['Step', 'Time Spent'],
        ['Define the Problem',     15],
        ['Data Collection',        30],
        ['Model Selection',        20],
        ['Training the Model',     25],
        ['Evaluation',             5],
        ['Deployment',             5]
    ]);


    var options = {
        title: 'Time Spent on Each Step',
        pieSliceText: 'label',
        backgroundColor: '#f4f7f8',
        legend: { position: 'right' },
    };


    var chart = new google.visualization.PieChart(document.getElementById('google-chart'));
    chart.draw(data, options);
}


// D3.js Bar Chart
const d3Data = [
    { step: 'Define the Problem', time: 15 },
    { step: 'Data Collection', time: 30 },
    { step: 'Model Selection', time: 20 },
    { step: 'Training the Model', time: 25 },
    { step: 'Evaluation', time: 5 },
    { step: 'Deployment', time: 5 }
];


const d3Width = 600;
const d3Height = 400;
const margin = { top: 20, right: 30, bottom: 40, left: 40 };


const svg = d3.select('#d3-chart')
    .append('svg')
    .attr('width', d3Width)
    .attr('height', d3Height);


// Create scales
const x = d3.scaleBand()
    .domain(d3Data.map(d => d.step))
    .range([margin.left, d3Width - margin.right])
    .padding(0.1);


const y = d3.scaleLinear()
    .domain([0, d3.max(d3Data, d => d.time)]).nice()
    .range([d3Height - margin.bottom, margin.top]);


// Create X Axis
svg.append('g')
    .attr('transform', `translate(0,${d3Height - margin.bottom})`)
    .call(d3.axisBottom(x));


// Create Y Axis
svg.append('g')
    .attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));


// Create bars
svg.selectAll('.bar')
    .data(d3Data)
    .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', d => x(d.step))
    .attr('y', d => y(d.time))
    .attr('height', d => y(0) - y(d.time))
    .attr('width', x.bandwidth())
    .attr('fill', '#007acc');
