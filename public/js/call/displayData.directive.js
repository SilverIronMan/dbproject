function generateToneDataDisplay(toneDataJSON) {
  const data = toneDataJSON.document_tone.tone_categories;

  const fontSize = 10;
  const fontFamily = 'Arial';

  // Loop through three times to create three bar charts
  for (let index = 0; index < data.length; index++) {
    // Create the svg
    const margin = { top: 20, right: 40, bottom: 30, left: 100 };
    const width = 460 - margin.left - margin.right;
    const height = 230 - margin.top - margin.bottom;

    const svg = d3.select('#watsonTone')
      .append('svg')
      .attr('height', height + margin.top + margin.bottom)
      .attr('width', width + margin.right + margin.left);

    const y = d3.scaleBand().rangeRound([0, height]);
    const x = d3.scaleLinear().rangeRound([0, width]);

    const g = svg.append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // The names of the tones and their corresponding score for the axis and bars
    const toneData = [];
    const toneName = [];
    for (let toneIndex = 0; toneIndex < data[index].tones.length; toneIndex++) {
      toneData[toneIndex] = data[index].tones[toneIndex].score;
      toneName[toneIndex] = data[index].tones[toneIndex].tone_name;
    }
    y.domain(toneName);
    x.domain([0, 1]);

    // Draw the x-axis
    g.append('g')
      .attr('class', 'axis axis-x')
      .attr('transform', 'translate(' + 0 + ',' + (height) + ')')
      .call(d3.axisBottom(x));

    // Draw the y-axis
    g.append('g')
      .attr('class', 'axis axis-y')
      .call(d3.axisLeft(y))
      .append('text');

    // Draw the bars
    g.selectAll('.bar')
      .data(toneData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('y', (d, i) => {
        const yPos = height * (i / (data[index].tones.length));
        return yPos + 1;
      })
      .attr('x', () => { return 1; })
      .attr('height', () => { return y.bandwidth() - 2; })
      .attr('width', (d) => {
        if ((d * width) - 2 < 0) {
          return 0;
        } else {
          return (d * width) - 2;
        }
      });

    g.selectAll('.value')
      .data(toneData)
      .enter()
      .append('text')
      .attr('class', 'value')
      .attr('transform', (d, i) => {
        const xPos = (width + 5);
        let yPos = height * (i / (data[index].tones.length));
        yPos += ((height / data[index].tones.length) + fontSize) / 2;
        return 'translate(' + xPos + ', ' + yPos + ')';
      })
      .text((d) => { return (d * 100).toFixed(2); })
      .style('font-size', fontSize)
      .style('font-family', fontFamily);
  }
}

angular.module('app').directive('toneData', function () {
  return {
    restrict: 'E',
    link: function (scope, element) {
      element.text('Loading...');
      scope.$watch(function () { return scope.callData; },
        function () {
          if (scope.callData) {
            element.text('');
            generateToneDataDisplay(scope.callData);
          }
        // eslint-disable-next-line comma-dangle
        }
      );
    },
  };
});
