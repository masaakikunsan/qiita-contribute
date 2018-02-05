<template lang="html">
  <div />
</template>

<script>
import queryString from 'query-string'
import axios from 'axios'

export default {
  data () {
    return {
      code: null
    }
  },
  created () {
    this.code = queryString.parse(location.search).code
    if (!this.code) {
      alert('missing')
    } else {
      console.log(this.code)
      axios.post(`https://qiita.com/api/v2/access_tokens?client_id=8f6a2128c7be42bbec9331f4c463c19095bb4a81&client_secret=22e992bac4de1edccbd399c351af955c1635caaf&code=${this.code}`)
        .then(res => {
          console.log(res)
          localStorage.setItem('token', res.data.token)
          location.href = '/'
        })
        .catch(err => {
          console.log('error: ' + err)
        })
    }
  }
}
</script>
