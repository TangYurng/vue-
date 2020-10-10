<!-- table.vue，部分代码省略 -->
<template>
   <table>
    <thead>
      <tr>
        <th v-for="(col,colIndex) in columns" :key="colIndex">{{ col.title }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) in data" :key="rowIndex">
        <td v-for="(col,colIndex) in columns" :key="colIndex">
          <template v-if="'render' in col">
            <Render :row="row" :column="col" :index="rowIndex" :render="col.render"></Render>
          </template>
          <template v-else>{{ row[col.key] }}</template>
      </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
  import Render from './render.js';

  export default {
    components: { Render },
    props: {
      columns: {
        type: Array,
        default () {
          return [];
        }
      },
      data: {
        type: Array,
        default () {
          return [];
        }
      }
    }
  }
</script>
