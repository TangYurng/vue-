<template>
  <ul class="bs-list left" style="width: 200px">
    <li v-for="(item, i) in listDate" class="list-item" :key="i" style="height: 30px">
      <span>{{ item }}</span>
      <renderTest
        v-if="renderfun"
        :item="item"
        :index="i"
        :render="renderfun"
      ></renderTest>
    </li>
  </ul>
</template>
<script>
import renderTest from "./renderTest.js";
export default {
  name: "lists",
  components: { renderTest },
  props: {
    listDate: {
      type: Array,
    },
    renderfun: {
      type: Function,
      default() {
        return () => false;
      },
    },
  },
};
</script>