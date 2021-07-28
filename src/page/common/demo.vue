<template>
    <div class="container flex-row flex-column align-center">
        <Button type="primary" round size="small" @click.stop="switchEvent">中/英</Button>
        <!-- <div class="image">
            <img src="~@/assets/images/180x180.png"/>
        </div> -->
        <h1>{{$t('title')}}</h1>
        <h3>{{getTitle}}</h3>
        <p>当前日期: {{localDate}}</p>
        <img src="~@/assets/images/qscode_middle.jpg" alt="">
        <p>Hello</p>
        <svg-icon iconClass="global-icon"/>
    </div>
</template>

<script>
import {Button} from 'element-ui';
import {Input} from '@/components';
import {mapGetters} from 'vuex';
import dayjs from 'dayjs';
export default {
    name: 'demo',
    components: {
        Button, Input
    }, 
    computed: {
        ...mapGetters(['getTitle']),
        localDate() {
            return dayjs().format('YYYY-MM-DD');
        }
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
.container {
    height: 100%;
    background: url("~@/assets/images/background.jpg") no-repeat fixed center;
}
.flex-row {
    display: flex;
}
.flex-column {
    flex-direction: column;
}
.align-center {
    align-items: center;
}
.image {
    border-radius: 15px;
    overflow: hidden;
}
</style>