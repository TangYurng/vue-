<template>
  <div class="my-select">
    <div class="my-select-selection">
      <!-- 图标 -->
      <i :class="icon" v-if="icon"></i>
      <!-- 内容 -->
      <span class="select-placeholder"></span>
      <span class="select-selected-value">启用</span>
      <!-- 箭头 -->
      <i class="el-select-arrow"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: "MySelect",
  data() {
    return {
      icon: true,
    };
  },
  props: {},
  methods: {},
  mounted(){
    document.querySelector(".select-placeholder").style.display="none"
  },
};
</script>
<style scoped>
.my-select {
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
  vertical-align: middle;
  color: #657180;
  font-size: 14px;
  line-height: normal;
  width: 130px;
  margin: auto;
}
.my-select-selection {
  display: block;
  box-sizing: border-box;
  outline: 0;
  user-select: none;
  cursor: pointer;
  position: relative;
  background-color: #fff;
  border-radius: 20px;
  border: 1px solid #d7dde4;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}
.select-placeholder,
.select-selected-value {
  display: block;
  height: 38px;
  line-height: 38px;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: 24px;
  padding-right: 24px;
}
</style>