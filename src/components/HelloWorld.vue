<template>
  <div class="small">
    <line-chart :chart-data="datacollection"></line-chart>
    <button @click="fillData()">Randomize</button>
  </div>
</template>

<script>
  import LineChart from './LineChart.js'
  import { IEXClient } from 'iex-api'
  import axios from 'axios'

  // need to handle API to create an object to send to server [ input to go to websocket ] and then get the API 
  // input to re-render
  // you need to make a 'loading' component to render all the data

  export default {
    components: {
      LineChart
    },
    data () {
      return {
        datacollection: null,
        stock: []
      }
    },
    mounted () {
      this.fillData()
    },
    methods: {
      fillData () {
         axios.get('https://api.iextrading.com/1.0/stock/tsla/chart/1y')
          .then(response => {
            console.log(response.data)
              response.data.map( item => {
                this.stock.push(item.open)
              })
        } )
        this.datacollection = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Setember', 'October', 'November', 'December'],
          datasets: [
            {
              label: 'tesla',
              borderColor: '#249EBF',
              data: this.stock
            }, {
              label: 'Data Two',
              backgroundColor: '#05CBE1',
              data: [60, 55, 32, 10, 2, 12, 53, 60, 55, 32, 10,]
            }
          ]
        }
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
