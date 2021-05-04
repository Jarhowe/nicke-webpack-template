<template>
    <div class="container flex-row flex-column align-center">
        <div>
            <img src="~@/assets/images/180x180.png"/>
        </div>
        <h1>Welcome to use nicke-webpack-template</h1>
    </div>
</template>

<script>
export default {
    name: 'demo'
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
</style>