<template>
  <button
    class="my-button"
    :type="nativeType"
    :class="[
      type ? 'my-button--' + type : '',
      {
        'is-plain': plain,
        'is-round': round,
      }
    ]"
  >
    <i :class="icon" v-if="icon"></i>
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>
<script>
export default {
  name: "Mybutton",
  props: {
    type: {
      type: String,
      default: "default",
    },
    icon: {
      type: String,
      default: "",
    },
    nativeType: {
      type: String,
      default: "button",
    },
    plain: Boolean,
    round: Boolean,
  },
  methods: {
    handleClick(evt) {
      this.$emit("click", evt);
    },
  },
};
</script>
<style scoped>
.my-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 2px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 3px;
}
.my-button+.my-button{
  margin-left: 10px;
}
/* 有背景色 */
.my-button--primary {
  color: #fff;
  background-color: #68CFEB;
  border-color: #68CFEB;
}
.my-button--danger {
  color: #fff;
  background-color: #E6614F;
  border-color: #E6614F;
}
.my-button--warning {
  color: #fff;
  background-color: #F1C434;
  border-color: #F1C434;
}
/* 无背景色 */
.my-button--primary.is-plain {
    color: #006C89;
    background: #ffffff;
    border-color: #6FA4FF;
    border-radius: 2px;
}
</style>