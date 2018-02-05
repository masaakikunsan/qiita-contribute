<template>
  <header>
    <div class="header-container">
      <div class="header-start">
        <a href="/" class="header-logo">
          きーた
        </a>
      </div>
      <div class="header-end" v-if="!isLogin">
        <a href="https://qiita.com/api/v2/oauth/authorize?client_id=8f6a2128c7be42bbec9331f4c463c19095bb4a81&scope=read_qiita" class="signin">ログイン</a>
      </div>
      <div class="header-end" v-else>
        <el-dropdown>
          <span class="el-dropdown-link">
            <img :src="this.img"><i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><a href="/mypage" class="mypage">マイページ</a></el-dropdown-item>
            <el-dropdown-item><el-button type="text" class="logout" @click="logout">ログアウト</el-button></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </header>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      isLogin: false,
      img: null
    }
  },
  created () {
    if (localStorage.token) {
      this.isLogin = true
      axios.get('https://qiita.com/api/v2/authenticated_user', { headers: { 'Authorization': `Bearer ${localStorage.token}` } })
        .then(res => {
          this.img = res.data.profile_image_url
        })
        .catch(err => {
          console.log('error: ' + err)
        })
    }
  },
  methods: {
    logout () {
      localStorage.removeItem('token')
    }
  }
}
</script>

<style scoped>
  header {
    padding-right: 16px;
    padding-left: 16px;
    background-color: #55c500;
    color: #fff;
  }

  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 56px;
    max-width: 600px;
    margin: 0 auto;
  }

  .header-logo {
    display: flex;
    align-items: center;
    margin-right: 8px;
  }

  .header-logo > svg {
    width: 74px;
    height: 25px;
    fill: #fff;
  }

  .header-start, .header-end{
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header-end > .signin {
    font-size: 1.2rem;
    color: #fff;
  }

  .mypage, .logout {
    color: #333;
  }

  .el-dropdown-link  > img {
    width: 32px;
    height: 32px;
    border-radius: 4px;
  }

  .el-dropdown-link {
    cursor: pointer;
    display: flex;
    align-items: center;
  }
</style>
