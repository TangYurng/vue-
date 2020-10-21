<template>
  <div name="td">
    <render
      :row="row"
      :col="col"
      :index="index"
      :render="col.render"
    ></render>
  </div>
</template>
 
<script>
import render from "./render.js";
export default {
  name: "my-table-td",
  components: {
    render,
  },
  props: {
    row: Object,
    col: Object,
    index: Number,
  },
};
</script>