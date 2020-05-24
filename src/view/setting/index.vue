<template>
  <div>
    <el-card class="box-card" style="margin-top:40px;">
      <div slot="header" class="clearfix">
        <svg-icon icon-class="international" />
        <span style="margin-left:10px;">{{ $t("message.slang") }}</span>
      </div>
      <div>
        <el-radio-group v-model="lang" size="small" @change="agreeChange">
          <el-radio label="zhCHT" border>
            繁體中文
          </el-radio>
          <el-radio label="en" border>
            English
          </el-radio>
        </el-radio-group>
        <el-tag style="margin-top:15px;display:block;" type="info">
          {{  }}
        </el-tag>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lang:''
    }
  },
  methods: {
        agreeChange:function(lang){
         this.$i18n.locale = lang  
        }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>
