<template>
  <div class="wrap">
    <div class="tab-detail">
      <div class="tab-head">
        <div class="tab-head-left">
          <ul class="tab-head-ul">
            <li class="tab-head-li">
              <label class="tab-head-detail headcolor">表格明细</label>
            </li>
            <li class="tab-head-li">
              <label class="tab-head-record headcolor">共</label>
              <label class="record-num">{{RecordNum}}</label>
              <label class="tab-head-record headcolor">记录</label>
            </li>
          </ul>
        </div>
        <div class="tab-head-right">
          <ul class="tab-head-ul">
            <li class="tab-head-li">
              <a class="tab-btn">
                <span class="tab-btn-txt">功能按钮</span>
              </a>
            </li>
            <li class="tab-head-li">
              <a class="tab-btn">
                <span class="tab-btn-txt">功能按钮</span>
              </a>
            </li>
            <li class="tab-head-li">
              <a class="tab-btn">
                <span class="tab-btn-txt">功能按钮</span>
              </a>
            </li>
            <li class="tab-head-li">
              <a class="tab-btn">
                <span class="tab-btn-txt">功能按钮</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <!-- ShowCheckbox:显示多选框  ,stripe:显示斑马纹  :isgroup="isgroup"-->
      <my-table
        :header="header"
        :body="body"
        :ShowCheckbox="ShowCheckbox"
        :stripe="stripe"
        :resize="resize"
      >
    <!-- <template slot-scope="scope">
        <span style="margin-left: 10px">{{ }}</span>
    </template> -->
      </my-table>
    </div>
  </div>
</template>

<script>
import MyTable from "../components/my-table";
export default {
  name: "One",

  props: {},

  components: {
    MyTable,
  },

  data() {
    return {
      RecordNum: 263,
      ShowCheckbox: true,
      stripe: false,
      resize: false,
      // header属性 fixed：true和left
      header: [
        { value: "状态", width: 75, key: "value1" ,showfilter:true},
        { value: "入库通知单", width: 165, key: "value2" },
        { value: "合同编号", width: 112, key: "value3" },
        { value: "采购订单", width: 157, key: "value4" },
        { value: "承运商", width: 85, key: "value5", groupname: "人员"},
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
        { value: "押运员3	", width: 110, key: "value13", groupname: "押运员" ,fixed:"right"},
      ],
      body: [
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
          value11: "刘航",
          value12: "刘航",
          value13: "刘航",
        },
        {
          value1: "已完成",
          value2: "GP201903230000017",
          value3: "BJYDHT004",
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
          value3: "BJYDHT004",
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
          value3: "BJYDHT004",
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
          value3: "BJYDHT004",
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
          value3: "BJYDHT004",
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
      isgroup: [
        { groupname: "押运员", groupkey: "yayun" },
        { groupname: "人员", groupkey: "man" },
      ],
    };
  },

  computed: {},

  watch: {},

  methods: {},

  mounted() {},
};
</script>

<style scoped>
body * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: 12px;
}
li {
  list-style: none;
}
a {
  text-decoration: none;
}
.headcolor {
  color: #4e546c;
}
.wrap {
  width: 1500px;
  height: 200px;
  margin: 0 auto;
}
.tab-head {
  display: flex;
  justify-content: space-between;
}
.tab-head-left .tab-head-li {
  float: left;
  margin-right: 20px;
}
.tab-head-detail {
  font-size: 16px;
  font-weight: bold;
}
.record-num {
  color: #ff0000;
  font-size: 16px;
}
.tab-head-record {
  font-size: 12px;
}
.tab-head-right .tab-head-li {
  float: left;
  margin-right: 8px;
}
.tab-btn {
  display: inline-block;
  width: 72px;
  height: 25px;
  line-height: 25px;
  background: #ffffff;
  border: 1px solid #e3e4e5;
  border-radius: 2px;
  font-size: 12px;
  cursor: pointer;
}
.tab-btn-txt {
  color: #353944;
}
.head {
  background-color: #f5f5f5;
}
.head tr {
  height: 44px;
  line-height: 44px;
}
.head th {
  border-right: 1px solid #e6e6e6;
}
.body tr {
  height: 42px;
  line-height: 42px;
}
</style>
