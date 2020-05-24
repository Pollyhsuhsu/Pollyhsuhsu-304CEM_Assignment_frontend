import Vue from 'vue'
import VueI18n from 'vue-i18n'

import LangEn from '../lang/en'
import LangZhCHT from '../lang/zhCHT'

Vue.use(VueI18n)

const locale = 'cn'

const i18n = new VueI18n({
  locale: 'en', 
  messages:{
    'en': LangEn,
    'zhCHT': LangZhCHT
  }
})

export default i18n