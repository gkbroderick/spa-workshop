angular.module('directives').directive('barsChart', function($parse) {

  return {
    restrict: 'EA',
    replace: false,
    transclude: true,
    scope: {data: '='},
    link: function(scope, element, attr) {

      var watcher = function() {
        if (!scope.data) return;

        var HEIGHT = 500;
        var BAR_WIDTH = 55;

        var x = d3.scale.linear()
            .domain([0, d3.max(scope.data, function(d) { return d.temperature; })])
            .range([0, HEIGHT]);

        var chart = d3.select(element[0])
            .attr('width', BAR_WIDTH * scope.data.length)
            .attr('height', HEIGHT);

        var bar = chart.selectAll('g')
            .data(scope.data)
          .enter().append('g')
            .attr('transform', function(d, i) { return 'translate(' + i * BAR_WIDTH + ', 0)'; });

        bar.append('rect')
            .attr('height', function(d) { return x(d.temperature); })
            .attr('y', function(d) { return HEIGHT - x(d.temperature); })
            .attr('width', BAR_WIDTH - 1);

        bar.append('text')
            .attr('y', function(d) { return HEIGHT - x(d.temperature) - 10; })
            .attr('x', BAR_WIDTH / 2)
            //.attr('dy', '.1em')
            .text(function(d) { return d.temperature; });
      }

      function type(d) {
        d.temperature = +d.temperature; // coerce to number
        return d;
      }

      scope.$watch('data', watcher);
    }
  };

});