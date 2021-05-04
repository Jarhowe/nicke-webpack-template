<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
import {Button} from 'element-ui';
export default {
    name: 'App',
    components: {
        Button
    },
    methods: {
        switchEvent() {
            let lang = this.$i18n.locale === 'zh_cn' ? 'en_us' : 'zh_cn';
            this.$i18n.locale = lang;
        }
    }
};
</script>

<style lang="scss">
// do something...
</style>