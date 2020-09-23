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
    <span class="iconfont icondanju_A"></span>
    <span class="iconfont icondanju_B"></span>
    <h1>选择器</h1>
    <MySelect></MySelect>
    <h1>状态标志</h1>
    <div style="width:100px;height:50px;border:1px solid #000;position:relative;margin:auto;">
      <MyStatus :status="status"></MyStatus>
    </div>
    <h1>进度条</h1>
    <MyProgress :show="show"></MyProgress>
  </div>
</template>

<script>
import MyButton from "../components/my-button";
import MySelect from "../components/my-select";
import MyStatus from "../components/my-status";
import MyProgress from "../components/my-progress";
export default {
  name: "Five",

  props: {},

  components: {
    MyButton,
    MySelect,
    MyStatus,
    MyProgress
  },

  data() {
    return {
      status:"已提交",
      show:'已送达'
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
