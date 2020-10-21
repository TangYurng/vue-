<template>
  <div class="table" ref="mytable">
    <div class="content">
      <div class="tab-scroll">
        <div class="header">
          <table cellspacing="0" cellpadding="0" border="0" ref="tabheader">
            <thead>
              <tr ref="headertr">
                <th
                  v-for="(col, colIndex) in column"
                  :key="colIndex"
                  :name="col.key"
                >
                  <div class="headerdiv">
                    <span>{{ col.value }}</span>
                  </div>
                </th>
              </tr>
            </thead>
          </table>
        </div>
        <div class="body">
          <table border="0" :style="{ width: setwidth }" ref="tabbody">
            <tbody>
              <template v-for="(row, index) in data">
                <tr :key="row.key || index">
                  <td v-for="col in column" :key="col.key">
                    <render
                      v-if="col.type === 'render'"
                      :row="row"
                      :col="col"
                      :index="index"
                      :render="col.render"
                    ></render>
                    <template v-else>
                      <span :name="col.key">{{ row[col.key] }}</span>
                    </template>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import TableItem from "./table-item.vue";
import render from "./render.js";
export default {
  name: "MyTable",
  data() {
    return {
      setwidth: "auto",
    };
  },
  props: {
    column: {
      type: Array,
      default: () => {
        return [];
      },
    },
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  components: {
    // TableItem,
    render,
  },
  mounted() {
    
  },
};
</script>

<style scoped>
</style>