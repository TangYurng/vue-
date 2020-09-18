<template>
  <td class="my-tatble-td"  >
    <slot></slot>
  </td>
</template>
 
<script>
export default {
  name: "my-table-td",
  data() {
    return {
    };
  },
  props: {
      defaultwidth:{
          type:Number,
          default:30
      }
  },
};
</script>