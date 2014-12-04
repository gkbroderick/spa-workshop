angular.module('directives').directive('barsChart', function($parse) {

  return {
    restrict: 'EA',
    replace: false,
    transclude: true,
    scope: {data: '='},
    link: function(scope, element, attr) {

      var watcher = function() {
        if (!scope.data) return;

        var margin = {top: 20, right: 30, bottom: 30, left: 40};
        var HEIGHT = 500 - (margin.top + margin.bottom);
        var BAR_WIDTH = 55;
        var WIDTH = BAR_WIDTH * scope.data.length;
        var dateFormat = d3.time.format('%X');

        var y = d3.scale.linear()
          .domain([0, d3.max(scope.data, function(d) { return d.temperature; })])
          .range([HEIGHT, 0]);

        var x = d3.scale.ordinal()
          .domain(scope.data.map(function(d) { return d.time; }))
          .rangeRoundBands([0, WIDTH], 0.1);

        var xAxis = d3.svg.axis()
          .scale(x)
          .ticks(dateFormat)
          .orient('bottom');

        var yAxis = d3.svg.axis()
          .scale(y)
          .orient('left');

        var chart = d3.select(element[0])
            .attr('width', BAR_WIDTH * scope.data.length)
            .attr('height', HEIGHT + margin.top + margin.bottom)
          .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.right + ')');

        chart.append('g')
          .attr('class', 'x axis')
          .attr('transform', 'translate(0, ' + HEIGHT + ')')
          .call(xAxis);

        chart.append('g')
          .attr('class', 'y axis')
          .call(yAxis);

        var bar = chart.selectAll('.bar')
          .data(scope.data)
        .enter().append('rect')
          .attr('class', 'bar')
          .attr('transform', function(d, i) { return 'translate(' + x(d.time) + ', 0)'; })
          .attr('y', function(d) { return y(d.temperature); })
          .attr('height', function(d) { return HEIGHT - y(d.temperature); })
          .attr('width', x.rangeBand());

      }

      function type(d) {
        d.temperature = +d.temperature; // coerce to number
        return d;
      }

      scope.$watch('data', watcher);
    }
  };

});