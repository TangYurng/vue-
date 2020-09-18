<template>
  <div class="wrap">
    <my-table-test
      :header="header"
      :body="body"
      :ShowCheckbox="ShowCheckbox"
      :stripe="stripe"
      :resize="resize"
      :isgroup="isgroup"
    >
      <template v-slot:header>
        <my-table-tr :style="{height: 44 + 'px'}">
          <my-table-td v-for="(item,index) in header" :key="index">{{item.value}}</my-table-td>
          <my-table-td style="width:50px">操作</my-table-td>
        </my-table-tr>
      </template>
      <template v-slot:body>
        <my-table-tr v-for="(row, rowIndex) in body" :key="rowIndex" :style="{height: 42 + 'px'}">
          <my-table-td v-for="(cell,colIndex) in header" :key="colIndex">{{row[cell.key]}}</my-table-td>
          <my-table-td>
            <div>
              <span>1</span>
              <!-- <span>新增</span> -->
            </div>
          </my-table-td>
        </my-table-tr>
      </template>
    </my-table-test>
  </div>
</template>

<script>
import MyTableTest from "../components/my-table-test";
import MyTableTr from "../components/my-table-tr";
import MyTableTd from "../components/my-table-td";
export default {
  name: "Two",
  components: {
    MyTableTest,
    MyTableTr,
    MyTableTd,
    // MyTableBody
  },
  data() {
    return {
      ShowCheckbox: false,
      stripe: false,
      resize: false,
      isgroup: [
        // { groupname: "押运员", groupkey: "yayun" },
        // { groupname: "人员", groupkey: "man" },
      ],
      header: [
        {
          value: "状态",
          width: 75,
          key: "value1",
          showfilter: true,
        },
        { value: "入库通知单", width: 165, key: "value2" },
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
        },
      ],
      body: [
        {
          value1: "已确认",
          value2: "GP201903230000016",
          value3: "003",
          value4: "BBJJ20200430-001",
          value5: "上海博科",
          value6: "浙江宁波新能源有限公司",
          value7: "2020/09/09 00:00:00 - 2020/09/09 23:59:59",
          value8: "",
          value9: "冯春梅",
          value10: "刘航",
          value11: "刘航",
          value12: "刘航",
          value13: "刘航",
        },
        {
          value1: "已完成",
          value2: "GP201903230000017",
          value3: "004",
          value4: "BBJJ20200430-002",
          value5: "上海博科",
          value6: "浙江宁波新能源有限公司",
          value7: "2020/09/09 00:00:00 - 2020/09/09 23:59:59",
          value8: "",
          value9: "冯春梅",
          value10: "刘航",
          value11: "刘航",
          value12: "刘航",
          value13: "刘航",
        },
        {
          value1: "已结束",
          value2: "GP201903230000017",
          value3: "008",
          value4: "BBJJ20200430-002",
          value5: "上海博科",
          value6: "浙江宁波新能源有限公司",
          value7: "2020/09/09 00:00:00 - 2020/09/09 23:59:59",
          value8: "",
          value9: "冯春梅",
          value10: "刘航",
          value11: "刘航",
          value12: "刘航",
          value13: "刘航",
        },
        {
          value1: "已完成",
          value2: "GP201903230000017",
          value3: "006",
          value4: "BBJJ20200430-002",
          value5: "上海博科",
          value6: "浙江宁波新能源有限公司",
          value7: "2020/09/09 00:00:00 - 2020/09/09 23:59:59",
          value8: "",
          value9: "冯春梅",
          value10: "刘航",
          value11: "刘航",
          value12: "刘航",
          value13: "刘航",
        },
        {
          value1: "已结束",
          value2: "GP201903230000017",
          value3: "001",
          value4: "BBJJ20200430-002",
          value5: "上海博科",
          value6: "浙江宁波新能源有限公司",
          value7: "2020/09/09 00:00:00 - 2020/09/09 23:59:59",
          value8: "",
          value9: "冯春梅",
          value10: "刘航",
          value11: "刘航",
          value12: "刘航",
          value13: "刘航",
        },
        {
          value1: "已确认",
          value2: "GP201903230000017",
          value3: "000",
          value4: "BBJJ20200430-002",
          value5: "上海博科",
          value6: "浙江宁波新能源有限公司",
          value7: "2020/09/09 00:00:00 - 2020/09/09 23:59:59",
          value8: "",
          value9: "冯春梅",
          value10: "刘航",
          value11: "刘航",
          value12: "刘航",
          value13: "刘航",
        },
      ],
    };
  },
  mounted() {
    // console.log(document.querySelectorAll("tr")[0].querySelectorAll("td"));
  },
};
</script>

<style scoped>
.wrap {
  width: 1500px;
  height: 200px;
  margin: 0 auto;
}
</style>