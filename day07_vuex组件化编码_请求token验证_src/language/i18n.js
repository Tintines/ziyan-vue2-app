import Vue from 'vue'
import VueI18n from 'vue-i18n'      // 全局多了$t() 方法

Vue.use(VueI18n)

function loadLocaleMessages () {
    /* 自定义时需要修改地址 */
    const locales = require.context('./lang', true, /[A-Za-z0-9-_,\s]+\.json$/i)
    const messages = {}
    locales.keys().forEach(key => {
        const matched = key.match(/([A-Za-z0-9-_]+)\./i)
        if (matched && matched.length > 1) {
            const locale = matched[1]
            messages[locale] = locales(key)
        }
    })
    return messages
}

export default new VueI18n({
    /* locale先从localStorage中读取之前自己 切换语言功能可能 存起来的修改值; 没有的话再取自己的默认值 */
    locale: localStorage.getItem('locale_key') || 'zh_CN' || 'en',  // 主文件
    // locale: localStorage.getItem('locale_key') || process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',  // 主文件
    fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',                       // 备用文件
    messages: loadLocaleMessages()
})