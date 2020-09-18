<template>
  <hz-table :data="list">
    <hz-table-item slot="head" >
      <hz-table-column width="40" text-align="center"  v-for="(item,index) in header" :key="index" >{{item.value}}</hz-table-column>
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
      header: [
        {
          value: "状态",
          width: 75,
          key: "value1",
          showfilter: true,
          fixed: true,
        },
        { value: "入库通知单", width: 165, key: "value2", fixed: true },
        { value: "合同编号", width: 112, key: "value3", showsort: true },
        { value: "采购订单", width: 157, key: "value4" },
        { value: "承运商", width: 85, key: "value5", groupname: "人员" },
        {
          value: "客户",
          width: 172,
          key: "value6",
          groupname: "人员",
        },
        { value: "计划装车日期", width: 330, key: "value7" },
        { value: "二级客户", width: 85, key: "value8" },
        { value: "驾驶员	", width: 90, key: "value9" },
        { value: "押运员	", width: 110, key: "value10", groupname: "押运员" },
        { value: "押运员1	", width: 110, key: "value11", groupname: "押运员" },
        { value: "押运员2	", width: 110, key: "value12", groupname: "押运员" },
        {
          value: "押运员3	",
          width: 110,
          key: "value13",
          groupname: "押运员",
          fixed: "right",
        },
      ],
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
          {
            a: "已确认1",
            b: "GP202",
            r: "BJYDHT0033",
            s: "BBJJ24",
            f: "上海博科5",
            g: "浙江宁6",
            h: "2020/07",
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