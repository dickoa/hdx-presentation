/*

HDXStatiscs class. Used to fetch
statistics from HDX's statistics service,
Funnel.Space.

*/

var HDXStatistics = {
  base: 'http://funnel.space/api/',
  available_metrics: [],
  metrics: function (callback) {
    d3.json(this.base + 'metrics', function (error, data) {
      if (error) {
        return error
      }
      data.resources.forEach(function (x) { this.HDXStatistics.available_metrics.push(x.metricid) })
      console.log('Available metrics from Funnel Space:', this.HDXStatistics.available_metrics)
    })
  },
  fetch: function (metricid) {
    d3.json(this.base + 'funnels?metricid=' + metricid, function (error, data) {
      if (error) {
        return error
      }
      console.log(data)
    })
  },
  mean: function (metricid, container_id, round_value) {
    d3.json(this.base + 'funnels?metricid=' + metricid + '&period_type=d', function (error, data) {
      if (error) {
        return error
      }
      var output = _.sumBy(data.resources, 'value') / data.resources.length
      document.getElementById(container_id).innerHTML = numeral(_.round(output.value, round_value)).format('0,0')
    })
  },
  share: function (metricid, container_id, round_value) {
    d3.json(this.base + 'funnels?metricid=' + metricid, function (error, data) {
      if (error) {
        return error
      }
      var output = _.maxBy(data.resources, 'period_end_date')
      document.getElementById(container_id).innerHTML = numeral(_.round(output.value, round_value)).format('0%')
    })
  },
  latest: function (metricid, container_id, round_value) {
    d3.json(this.base + 'funnels?metricid=' + metricid, function (error, data) {
      if (error) {
        return error
      }
      var output = _.maxBy(data.resources, 'period_end_date')
      document.getElementById(container_id).innerHTML = numeral(_.round(output.value, round_value)).format('0,0')
    })
  },
  cumulative: function (metricid, container_id, round_value) {
    d3.json(this.base + 'funnels?metricid=' + metricid + '&period_type=w', function (error, data) {
      if (error) {
        return error
      }
      var output = _.sumBy(data.resources, 'value')
      console.log(output)
      document.getElementById(container_id).innerHTML = _.round(output, round_value)
    })
  }
}
