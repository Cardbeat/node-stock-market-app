<template>
  <div class="small">
    <line-chart :chart-data="datacollection"></line-chart>
    <div class="list">
      <div class="item" v-for="(stock, index) in stocks" :key="index">
         <button v-on:click="remove(stock)">{{stock}}</button>
      </div>
    </div>
    <form @submit.prevent="getFormValues" class="input">
      <input type="text" name="name">
    </form>

  </div>
</template>

<script>
  import LineChart from './LineChart.js'
  import axios from 'axios'

  export default {
    components: {
      LineChart
    },
    data () {
      return {
        datacollection: null,
        stocks: [],
      }
    },
    mounted () {
      this.getCollection()
    },
    sockets: {
      connect() {
        console.log('socket client connected')
      },
      companies(data) {
        this.stocks = data
        this.fillData()
        if(data.length === 0) {
          location.reload(); 
        }
      }
    },
    methods: {
      fillData () {
        let store = []
        let company = []
        this.stocks.map( (name='') => {
          axios.get(`https://api.iextrading.com/1.0/stock/${name}/chart/1y`)
            .then(response => {
              company = {
                name: name,
                data: []
              }
              response.data.map( item => {
                company.data.push(item.open)
              })
            })
            .then( () => {
              store.push(company)
              this.showData(store)
            })
        })
      },
      getCollection() {
        axios.get('/data').then(response => {
           this.stocks = response.data
           this.fillData()
        })
      },
      showData(data) {
        console.log(data)
        let chartSet =[]
        data.map( company => {
          chartSet.push({
              label: company.name,
              borderColor: this.getRandomColor(),
              backgroundColor: 'transparent',
              data: company.data
          })
          
        })


        this.datacollection = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Setember', 'October', 'November', 'December'],
          datasets: chartSet
        }
      },
      getFormValues (submitEvent) {
        submitEvent.preventDefault()
        let word = submitEvent.target.elements.name.value
        if(word.length > 4) {
          alert('the brand isnt more than 4 letterss, please try again !')
        } else {
          if(this.stocks.includes(word)) {
            alert('already on chart')
          } else {
            axios.get(`https://api.iextrading.com/1.0/stock/${word}/chart/1y`)
              .then(() => {
                this.stocks = [...this.stocks, word]
                submitEvent.target.elements.name.value = ''
                this.$socket.emit('companies', this.stocks)
              })
              .catch( () => alert('cant get data from this'))
          }
        }
      },

      remove(item) {
        if(confirm('Are you sure that you want to remove this from the chart?')) {
          let newStocks = this.stocks.filter((stock) => {
                return stock !== item
              })
              console.log(newStocks)
        this.stocks = newStocks
        this.$socket.emit('companies', this.stocks)
        if(newStocks.length === 0) {
          location.reload(); 
        }
        }
      },

      getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
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
    margin-top: 20px;
  }

  .list{
    display: flex;
    flex-direction: row;
    justify-content: center;
     align-content: space-between
  }

  .item{
    align-self: auto;
    margin: auto;
    border: solid;
    padding: 10px;
    width: 100px;
    text-align: center;
  }
</style>
