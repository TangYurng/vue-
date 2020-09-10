<template>
  <div class="table">
    <vue-table :tdata="tableData" :showSelect="true" :tcolumns="tableColumns" :showHandle="true" :tdHeight="40" selectFixed handleFixed>
      <template slot="operations" slot-scope="scope">
        <span @click="edit(scope.item)">编辑</span>
        <span @click="edit(scope.item)">删除</span>
        <span @click="edit(scope.item)">禁用</span>
      </template>
    </vue-table>
  </div>
</template>

<script>
import VueTable from "../components/vue-table";
export default {
  name: "Three",
  components: {
    VueTable,
  },
  data() {
    return {
      columns1: [
        {
          title: "机构编号",
          key: "number",
          width: 85,
          textAlign: "left",
        },
        {
          title: "机构名称",
          key: "name",
          width: 292,
          textAlign: "left",
          textLine: 2,
          selectText: true,
        },
        {
          title: "类型",
          key: "type",
          width: 180,
          textAlign: "center",
        },
        {
          title: "状态",
          key: "brand",
          width: 82,
          textAlign: "center",
        },
      ],
      tableColumns: [
        { title: "状态", width: 75, key: "value1" },
        { title: "入库通知单", width: 165, key: "value2" },
        { title: "合同编号", width: 112, key: "value3" },
        { title: "采购订单", width: 157, key: "value4" },
        { title: "承运商", width: 85, key: "value5" },
        { title: "客户", width: 172, key: "value6" },
        { title: "计划装车日期", width: 330, key: "value7" },
        { title: "二级客户", width: 85, key: "value8" },
        { title: "驾驶员	", width: 90, key: "value9" },
        { title: "押运员	", width: 110, key: "value10" },
      ],
      tableData: [
        {
          value1: "已确认",
          value2: "GP201903230000016",
          value3: "BJYDHT003",
          value4: "BBJJ20200430-001",
          value5: "上海博科",
          value6: "浙江宁波新能源有限公司",
          value7: "2020/09/09 00:00:00 - 2020/09/09 23:59:59",
          value8: "",
          value9: "冯春梅",
          value10: "刘航",
        },
        {
          value1: "已确认",
          value2: "GP201903230000017",
          value3: "BJYDHT004",
          value4: "BBJJ20200430-002",
          value5: "上海博科",
          value6: "浙江宁波新能源有限公司",
          value7: "2020/09/09 00:00:00 - 2020/09/09 23:59:59",
          value8: "",
          value9: "冯春梅",
          value10: "刘航",
        },
      ],
    };
  },
};
</script>

<style scoped>
</style>