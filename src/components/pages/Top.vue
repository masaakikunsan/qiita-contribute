<template>
  <div class="content">
    <div class="add-list mb-20">
      <el-input class="pr-20" placeholder="検索キーワードを入力してください" v-model="keyword"></el-input>
      <el-button type="primary" plain @click="addList">追加</el-button>
    </div>
    <el-collapse accordion>
      <QiitaList title="JavaScript" keyword="js"></QiitaList>
      <QiitaList title="Vue.js" keyword="vue.js"></QiitaList>
      <QiitaList title="CSS" keyword="CSS"></QiitaList>
      <QiitaList title="Webpack" keyword="Webpack"></QiitaList>
      <template v-if="list" v-for="(value, key) in list">
        <QiitaList :key="key" :title="value" :keyword="value"></QiitaList>
      </template>
    </el-collapse>
  </div>
</template>

<script>
import QiitaList from '@/components/parts/QiitaList'

export default {
  components: { QiitaList },
  data () {
    return {
      keyword: '',
      list: []
    }
  },
  methods: {
    addList () {
      if (!this.list) {
        this.list.unshift(this.keyword)
      } else {
        this.list.push(this.keyword)
      }
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

.add-list {
  display: flex;
  align-items: center;
}

.mb-20 {
  margin-bottom: 20px;
}

.pr-20 {
  padding-right: 20px;
}
</style>
