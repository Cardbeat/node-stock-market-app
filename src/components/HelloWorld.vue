<template>
  <div class="small">
    <line-chart :chart-data="datacollection"></line-chart>
    <form @submit.prevent="getFormValues" class="input">
      <input type="text" name="name">
    </form>

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
        stock: 'tsla',
      }
    },
    mounted () {
      this.fillData()
    },
    methods: {
      fillData (stock = this.stock) {
        let stockData = []
         axios.get(`https://api.iextrading.com/1.0/stock/${stock}/chart/1y`)
          .then(response => {
            console.log(response)
              response.data.map( item => {
                 stockData.push(item.open)
                 this.showData(stockData)
              })
        } )
      },
      showData(data) {
        // get all the data inside here and push to datasets inside objects

        this.datacollection = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Setember', 'October', 'November', 'December'],
          datasets: [
            {
              label: this.stock,
              borderColor: '#249EBF',
              data: data
            },
          ]
        }
      },
      getFormValues (submitEvent) {
        this.stock = submitEvent.target.elements.name.value
        this.fillData()
      }
    }
  }
</script>

<style>
  .small {
    max-width: 600px;
    margin:  150px auto;
  }

  .input {
    border: solid;
      width: 25%;
  margin: 0 auto;
  }
</style>
