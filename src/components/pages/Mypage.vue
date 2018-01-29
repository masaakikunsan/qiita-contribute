<template>
  <div class="content">
    <h1>Contribute</h1>
    <div id="cal-heatmap"></div>
  </div>
</template>

<script>
import axios from 'axios'
import CalHeatMap from 'cal-heatmap/cal-heatmap'
import moment from 'moment'

export default {
  data () {
    return {
      postReport: '',
      seconds: '',
      contribute: {}
    }
  },
  mounted () {
    axios.get(`https://qiita.com/api/v2/authenticated_user/items`, { headers: { 'Authorization': `Bearer ${localStorage.token}` } })
      .then(res => {
        this.postReport = res.data
        Object.keys(res.data).forEach(key => {
          this.seconds = String(Math.floor(moment(res.data[key].created_at, "YYYY-MM-DD'T'HH:mm:ssZ").unix()))
          this.contribute[this.seconds] = res.data[key].comments_count + res.data[key].likes_count
        })
        this.calInit()
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    calInit () {
      const cal = new CalHeatMap()
      cal.init({
        domain: 'month',
        start: moment().add(-1, 'year').add(1, 'month').toDate(),
        data: this.contribute,
        domainLabelFormat: '%Y-%m',
        cellSize: 7
      })
    }
  }
}
</script>

<style scoped>
  .content {
    width: 100%;
    max-width: 600px;
    margin: 30px auto 0;
  }

  h1 {
    margin-bottom: 30px;
  }
</style>
