
<template>
  <tr class="table_tr" :style="{textAlign:textAlign}">
    <slot />
  </tr>
</template>
 
<script>
export default {
  name: "hz-table-item",
  props: {
    right: { type: Boolean, default: false }, // 表格的文字位置对于整个表格来说，区别于table-item的传值，传值时直接写right或者left，不写默认为center
    left: { type: Boolean, default: false },
  },
  data() {
    return {
      textAlign: "",
    };
  },
  mounted() {
    if (this.right) this.textAlign = "right";
    if (this.left) this.textAlign = "left";
  },
};
</script>
