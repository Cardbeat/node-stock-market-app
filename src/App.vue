<template>
    <v-content>
      <stockChart/>
    </v-content>
</template>

<script>
import stockChart from './components/stockChart'

export default {
  name: 'App',
  components: {
    stockChart
  },
  data () {
    return {
      //
    }
  }
}
</script>
