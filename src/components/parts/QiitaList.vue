<template>
  <el-collapse-item :title="`${title}`">
    <template v-for="(value, key) in qiitaData">
      <a :href="`${value.url}`" :key="key" target="_blank" class="mb-10">
        <el-card class="box-card">
          <div class="card-style">
            <div class="content-left">
              <p>{{value.title}}</p>
              <div class="tag-wrapper">
                <template v-for="(tag, key) in value.tags">
                  <el-tag size="small" class="mr-10" :key="key">{{tag.name}}</el-tag>
                </template>
              </div>
              <small>by: {{value.user.id}} : {{value.likes_count}}</small>
            </div>
            <div class="content-right">
              <img :src="`${value.user.profile_image_url}`">
            </div>
          </div>
        </el-card>
      </a>
    </template>
  </el-collapse-item>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    title: String,
    keyword: String
  },
  data () {
    return {
      qiitaData: null
    }
  },
  mounted () {
    axios.get(`https://qiita.com/api/v2/items?page=1&per_page=10&query=${this.keyword}`)
      .then(res => {
        this.qiitaData = res.data
      })
      .catch(err => {
        console.log('error: ' + err)
      })
  }
}
</script>

<style scoped>
  .mb-10 {
    margin-bottom: 10px;
  }

  .mr-10 {
    margin-right: 10px;
  }

  .card-style {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  small {
    color: #aaa;
  }

  .content-right > img {
    width: 40px;
    height: 40px;
  }

  .tag-wrapper {
    display: flex;
    align-items: center;
  }
</style>
