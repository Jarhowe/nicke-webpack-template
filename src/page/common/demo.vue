<template>
    <div class="container flex-row flex-column align-center">
        <div class="image">
            <img src="~@/assets/images/180x180.png"/>
        </div>
        <h1>{{$t('title')}}</h1>
        <h3>{{getTitle}}</h3>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
    name: 'demo',
    computed: {
        ...mapGetters(['getTitle'])
    }
};
</script>

<style lang="scss">
.container {
    height: 100%;
    margin-top: 100px;
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