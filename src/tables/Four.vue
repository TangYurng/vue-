<template>
  <hz-table :data="list">
    <hz-table-item slot="head">
      <hz-table-column width="40" text-align="center" >#</hz-table-column>
      <hz-table-column width="80"  border-right="1">标准1</hz-table-column>
      <hz-table-column width="100">标准2</hz-table-column>
      <hz-table-column width="80">标准3</hz-table-column>

      <hz-table-column width="100" border-right="1">标准4</hz-table-column>
      <hz-table-column width="165" border-right="1">标准5</hz-table-column>
      <hz-table-column border-right="1">标准6</hz-table-column>
      <hz-table-column border-right="1" width="196">标准7</hz-table-column>
      <hz-table-column width="180">标准8</hz-table-column>
      <hz-table-column border-right="1">标准9</hz-table-column>
    </hz-table-item>
    <hz-table-item slot="body" v-for="(item,index) in list" :key="index">
      <hz-table-column class="serialNumber" width="40" text-align="center" >{{index+1}}</hz-table-column>
      <hz-table-column width="80"  border-right="1">{{item.a}}</hz-table-column>
      <hz-table-column width="100">{{item.b}}</hz-table-column>
      <hz-table-column width="80" class="overflowHiddenEllipsis">{{item.s}}</hz-table-column>

      <hz-table-column width="100" border-right="1">{{item.g}}</hz-table-column>
      <hz-table-column width="165" border-right="1">{{item.r}}</hz-table-column>
      <hz-table-column border-right="1">{{item.f}}</hz-table-column>
      <hz-table-column border-right="1" width="196">{{item.h}}</hz-table-column>
      
      <hz-table-column border-right="1">{{item.f}}</hz-table-column>
      <hz-table-column width="180">
        <button @click="detailEvent(item)">详情</button>
        <button @click="editEvent(item)">修改</button>
        <button @click="deleteEvent(item)">删除</button>
      </hz-table-column>
    </hz-table-item>
  </hz-table>
</template>

<script>
import HzTable from "../components/hz-table";
import HzTableItem from "../components/hz-table-item";
import HzTableColumn from "../components/hz-table-column";
export default {
  name: "four",
  data() {
    return {
       list: [
          {
            a: "已确认",
            b: "GP20",
            r: "BJYDHT003",
            s: "BBJJ2",
            f: "上海博科",
            g: "浙江宁",
            h: "2020/0",
          },
        
      ],
    };
  },
  components: {
    HzTable,
    HzTableItem,
    HzTableColumn,
  },
};
</script>

<style>
</style>