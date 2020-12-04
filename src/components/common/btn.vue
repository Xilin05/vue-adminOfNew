<template>
    <div class='btn'>
        <el-button @click="onclick(btntext)">{{btntext}}</el-button>
    </div>
</template>

<script>
export default {
    props: {
        btntext: {
            type: String,
            default: ""
        },
        onclick: {
            type: Function,
            default: () => {}
        }
    }
};
</script>

<style>
</style>
