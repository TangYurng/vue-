<template>
<div>
    <table class="table table-bordered">
    <thead>
      <th></th>
      <th v-for="(cell, colIndex) in header" :key="colIndex">
        <span v-text="cell.value"></span>
        <info-element v-if="cell.info" :info="cell.info" />
        <filter-element v-if="cell.filter" />
        <sort-element v-if="cell.sort" />
      </th>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) in body" :key="rowIndex">
        <td v-text="rowIndex"></td>
        <td v-for="(cell, colIndex) in row" :key="colIndex">
          <cell-element :cell="cell" />
        </td>
      </tr>
    </tbody>
</table>
</div>
  
</template>

<script>
export default {
    props: {
    header: {
      type: Array,
      require: true,
      default: () => {
        return [
          { value: "col1", info: "这是第一列" },
          { value: "col2", filter: true },
          { value: "col3", sort: true }
        ];
      }
    },
    body: {
      type: Array,
      require: true,
      default: () => {
        return [
          [{ value: "col1", color: "red" }, { value: "col2", type: "percent"}, { value: "col3", type: "float" }],
          [{ value: "col1" }, { value: "col2" }, { value: "col3" }]
        ];
      }
    }
}

}
</script>

<style>

</style>