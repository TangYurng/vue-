<template>
  <td
    class="table_td"
    :style="{width:width+'px',textAlign:textAlign,borderRight:borderRight + 'px solid #dedede'}"
    @click="_click"
  >
    <slot />
  </td>
</template>
 
<script>
export default {
  name: "hz-table-column",
  props: {
    width: { type: String }, // 表格的列宽，在表头处设置宽度即可
    fixedLeft: { type: Boolean, default: false }, // 固定列表左侧列
    textAlign: { type: String, default: "" },
    borderRight: { type: String, default: "" },
  },
  methods: {
    _click() {
      this.$emit("click");
    },
  },
};
</script>