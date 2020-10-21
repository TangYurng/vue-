<template>
  <div>
    <h1>按钮</h1>
    <h3>有背景色</h3>
    <MyButton type="primary">更多操作</MyButton>
    <MyButton type="danger">删除</MyButton>
    <MyButton type="warning">修改</MyButton>
    <h3>无背景色</h3>
    <MyButton type="primary" plain>新增</MyButton>
    <h1>图标</h1>
    <span class="iconfont icondanju_A"></span>
    <span class="iconfont icondanju_B"></span>
    <h1>选择器</h1>
    <MySelect></MySelect>
    <h1>状态标志</h1>
    <div style="width:100px;height:50px;border:1px solid #000;position:relative;margin:auto;">
      <MyStatus :status="status"></MyStatus>
    </div>
    <h1>进度条</h1>
    <MyProgress :show="show"></MyProgress>
    <!-- <i-table
      width="550"
      height="200"
      border
      :columns="columns2"
      :data="data4"
    ></i-table> -->
  </div>
</template>

<script>
import MyButton from "../components/my-button";
import MySelect from "../components/my-select";
import MyStatus from "../components/my-status";
import MyProgress from "../components/my-progress";
export default {
  name: "Five",

  props: {},

  components: {
    MyButton,
    MySelect,
    MyStatus,
    MyProgress
  },

  data() {
    return {
      status: "已提交",
      show: "已送达",
      columns2: [
        {
          title: "姓名",
          key: "name",
          width: 100,
        },
        {
          title: "年龄",
          key: "age",
          width: 100,
        },
        {
          title: "省份",
          key: "province",
          width: 100,
        },
        {
          title: "市区",
          key: "city",
          width: 100,
        },
        {
          title: "地址",
          key: "address",
          width: 200,
        },
        {
          title: "邮编",
          key: "zip",
          width: 100,
        },
        {
          title: "操作",
          key: "action",
          width: 120,
          render: (row, column, index) => {
            return (
              <div>
                <i-button type="primary" size="small">
                  查看
                </i-button>
                <i-button type="error" size="small">
                  删除
                </i-button>
              </div>
            );
          },
        },
      ],
      data4: [
        {
          name: "王小明",
          age: 18,
          address: "北京市朝阳区芍药居",
          province: "北京市",
          city: "朝阳区",
          zip: 100000,
        },
        {
          name: "张小刚",
          age: 25,
          address: "北京市海淀区西二旗",
          province: "北京市",
          city: "海淀区",
          zip: 100000,
        },
        {
          name: "李小红",
          age: 30,
          address: "上海市浦东新区世纪大道",
          province: "上海市",
          city: "浦东新区",
          zip: 100000,
        },
        {
          name: "周小伟",
          age: 26,
          address: "深圳市南山区深南大道",
          province: "广东",
          city: "南山区",
          zip: 100000,
        },
        {
          name: "王小明",
          age: 18,
          address: "北京市朝阳区芍药居",
          province: "北京市",
          city: "朝阳区",
          zip: 100000,
        },
        {
          name: "张小刚",
          age: 25,
          address: "北京市海淀区西二旗",
          province: "北京市",
          city: "海淀区",
          zip: 100000,
        },
        {
          name: "李小红",
          age: 30,
          address: "上海市浦东新区世纪大道",
          province: "上海市",
          city: "浦东新区",
          zip: 100000,
        },
        {
          name: "周小伟",
          age: 26,
          address: "深圳市南山区深南大道",
          province: "广东",
          city: "南山区",
          zip: 100000,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
