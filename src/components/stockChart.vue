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
  import axios from 'axios'

  export default {
    components: {
      LineChart
    },
    data () {
      return {
        datacollection: null,
        stock: [ 'aapl'],
      }
    },
    mounted () {
      this.fillData()
    },
    sockets: {
      connect() {
        console.log('socket client connected')
      },
      companies(data) {
        this.stock = data
        this.fillData()
      }
    },
    methods: {
      fillData () {
        let store = []
        let company = []
        this.stock.map( name => {
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
        this.stock.map(() => {
          if(this.stock.includes(word)) {
            alert('Company already on chart!')
          } else {
            this.stock = [...this.stock, word]
            submitEvent.target.elements.name.value = ''
            this.fillData()
            this.$socket.emit('companies', this.stock)
          }

        })
      },
      getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        console.log(color)
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
  }
</style>
