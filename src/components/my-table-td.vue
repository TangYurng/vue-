<template>
  <td class="my-tatble-td" :fixed="fixed" :value="value">
    <slot></slot>
  </td>
</template>
 
<script>
export default {
  name: "my-table-td",
  data() {
    return {};
  },
  props: {
    fixed: [String, Number],
    value: [String],
  },
  mounted() {
    if (this.fixed != null || this.fixed != undefined) {
      console.log(this);
    }
    if (this.value != null || this.value != undefined) {
      console.log(this);
      this.$el.innerHTML= this.value
    }
  },
};
</script>