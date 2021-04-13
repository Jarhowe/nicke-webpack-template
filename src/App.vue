<template>
    <div id="app">
        <h1>语言测试: {{$t('title')}}</h1>
        <Button type="primary" @click="switchEvent">{{$t('buttonText')}}</Button>
        <hr/>
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