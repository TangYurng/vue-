<template>
  <div class="wrap">
    <!-- 绑定主体内容data， -->
    <my-table-test
      :header="header"
      :body="body"
      :ShowCheckbox="ShowCheckbox"
      :ShowOperation="ShowOperation"
      :stripe="stripe"
      :resize="resize"
      :isgroup="isgroup"
    >
          <my-table-item type="selection">选择</my-table-item>
          <my-table-item v-for="(item, index) in header" :key="index">{{
            item.value
          }}</my-table-item>
          <my-table-item width="100px" fixed="right" value="操作"> </my-table-item>

    </my-table-test>
  </div>
</template>

<script>
import MyTableTest from "../components/my-table-test";
import MyTableItem from "../components/my-table-item";
export default {
  name: "Two",
  components: {
    MyTableTest,
    MyTableItem,
  },
  data() {
    return {
      ShowCheckbox: false,
      ShowOperation: false,
      stripe: false,
      resize: false,
      isgroup: [
        // { groupname: "押运员", groupkey: "yayun" },
        // { groupname: "人员", groupkey: "man" },
      ],
      header: [
        {
          value: "状态",
          width: "75px",
          key: "value1",
        },
        { value: "入库通知单", width: "165px", key: "value2" },
        { value: "合同编号", width: "112px", key: "value3" },
        { value: "采购订单", width: "157px", key: "value4" },
        { value: "承运商", width: "85px", key: "value5", groupname: "人员" },
        {
          value: "客户",
          width: "172px",
          key: "value6",
          groupname: "人员",
        },
        { value: "计划装车日期", width: "330px", key: "value7" },
        { value: "二级客户", width: "85px", key: "value8" },
        { value: "驾驶员	", width: "90px", key: "value9" },
        { value: "押运员	", width: "110px", key: "value10", groupname: "押运员" },
        { value: "押运员1	", width: "110px", key: "value11", groupname: "押运员" },
        { value: "押运员2	", width: "110px", key: "value12", groupname: "押运员" },
        {
          value: "押运员3	",
          width: "110px",
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
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
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