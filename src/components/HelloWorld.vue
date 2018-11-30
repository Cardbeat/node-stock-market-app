<template>
  <div class="small">
    <line-chart :chart-data="datacollection"></line-chart>
    <button @click="fillData()">Randomize</button>
  </div>
</template>

<script>
  import LineChart from './LineChart.js'

  // need to handle API to create an object to send to server [ input to go DB ] and then get the API 

  export default {
    components: {
      LineChart
    },
    data () {
      return {
        datacollection: null
      }
    },
    mounted () {
      this.fillData()
    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Setember', 'October', 'November', 'December'],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [40, 39, 10, 40, 39, 80, 40, 10, 40, 39, 80, 40]
            }, {
              label: 'Data Two',
              backgroundColor: '#05CBE1',
              data: [60, 55, 32, 10, 2, 12, 53, 60, 55, 32, 10,]
            }
          ]
        }
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      }
    }
  }
</script>

<style>
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>
