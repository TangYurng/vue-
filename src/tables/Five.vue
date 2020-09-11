<template>
  <div>
    <h1>按钮</h1>
    <h3>有背景色</h3>
    <MyButton type="primary">更多操作</MyButton>
    <MyButton type="danger">删除</MyButton>
    <MyButton type="warning">修改</MyButton>
    <h3>无背景色</h3>
    <MyButton type="primary" plain>新增</MyButton>
    <h1>图标</h1>
    <h1>选择器</h1>
    <MySelect v-model="input" placeholder="请输入内容"></MySelect>
  </div>
</template>

<script>
import MyButton from "../components/my-button";
import MySelect from "../components/my-select";
export default {
  name: "Five",

  props: {},

  components: {
    MyButton,
    MySelect,
  },

  data() {
    return {
      input:''
    };
  },

  computed: {},

  watch: {},

  methods: {},

  mounted() {},
};
</script>

<style lang="scss" scoped>
</style>
