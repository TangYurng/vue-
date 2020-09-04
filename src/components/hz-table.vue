
<template>
  <div class="table_box" :style="{height:heights,textAlign:textAlign}">
    <div class="data-grid clearfix">
      <div class="grid-head">
        <table class="table_head" ref="thead">
          <slot name="head" />
        </table>
      </div>
      <!--{height:headChildrenLength > 1 ? 'calc(100% - ' + (headChildrenLength*32 -1) + 'px)' : 'calc(100% - 31px)' }-->
      <div class="grid-body" :style="{height:'calc(100% - ' + tableHeadHeight + 'px)'}">
        <table class="table_body" ref="tbody">
          <slot />
          <tbody ref="bodyTr">
            <slot name="body" />
          </tbody>
        </table>
        <p v-if="data === undefined || data.length === 0" class="not_data">暂无数据</p>
      </div>
    </div>
    <!--表格表头固定列-->
    <div class="table_head_left">
      <table>
        <tbody>
          <tr>
            <td
              v-for="(item,index) in headFixedList"
              :key="index"
              v-html="item.innerHTML"
              style="background: #f2f2f2"
              :style="{width:item.offsetWidth+'px',height:item.offsetHeight + 'px',borderRight:item.style.borderRight,
              minWidth:item.offsetWidth+'px',textAlign:item.style.textAlign}"
            >{{item.innerHTML}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--表格主体固定列-->
    <div
      class="table_body_left"
      :style="{top:tableHeadHeight +2+'px',width:widthHL,
    height:'calc(100% - ' + (tableHeadHeight+3) + 'px)'}"
    >
      <table class="table_scroll_box">
        <tbody>
          <tr v-for="(item,index) in bodyFixedList" :key="index">
            <td
              v-for="(item1,index) in item"
              :key="index"
              v-html="item1.innerHTML"
              :class="item1.className"
              :style="{
                width:item1.offsetWidth+'px',
                height:item1.offsetHeight + 'px',
                borderRight:item1.style.borderRight,
                background:item1.classList && item1.classList.length > 1 ? '' : item1.style.background || '#ffffff',
                minWidth:item1.offsetWidth+'px',
                textAlign:item1.style.textAlign}"
            >{{item1.innerHTML}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "hz-table",

  props: {
    data: Array, // 接收列表数组，判断是否展示有无数据
    height: { type: String, default: "" }, // 表格高度
    right: { type: Boolean, default: false }, // 表格的文字位置对于整个表格来说，区别于table-item的传值，传值时直接写right或者left，不写默认为center
    left: { type: Boolean, default: false },
  },
  data() {
    return {
      textAlign: "left", // 文字位置
      heights: "", // 表格高度
      boolean: true, // 判断是否传了表格高度值
      headChildrenLength: 0, // 表头tr的数量
      tableHeadHeight: 0, // 表头高度
      headFixedList: [], // 表头固定列数组
      bodyFixedList: [], // 表头固定列数组
    };
  },
  methods: {
    initial() {
      // 初始给表格高度赋值，如果父类没有定义height值，则使用100% 减去下面的值，否则此方法不执行
      let height = 0;
      let form = document.getElementsByClassName("hz-form"); // 表单
      let filtering = document.getElementsByClassName("hz-list-filtering"); // 横向列表
      let oper = document.getElementsByClassName("hz-oper-default"); // 表单按钮
      // let pager = document.getElementsByClassName("hz-pager")[0]; // 分页
      // let priceSettlement = document.getElementsByClassName(
      //   "price-settlement"
      // )[0]; // 收费项目下的总计
      let tabs = document.getElementsByClassName("tab_box"); // 选项卡
      let selectSeparatedLine = document.getElementsByClassName(
        "select_separated_line"
      );
      if (!!form && form.length !== 0) {
        for (let i = 0; i < form.length; i++) {
          height += form[i].offsetHeight;
        }
      }
      if (!!tabs && tabs.length !== 0) {
        for (let i = 0; i < tabs.length; i++) {
          height += tabs[i].offsetHeight;
        }
      }
      if (!!selectSeparatedLine && selectSeparatedLine.length !== 0) {
        for (let i = 0; i < selectSeparatedLine.length; i++) {
          height += selectSeparatedLine[i].offsetHeight;
        }
      }
      if (!!oper && oper.length !== 0) {
        for (let i = 0; i < oper.length; i++) {
          height += oper[i].offsetHeight;
        }
      }
      if (!!filtering && filtering.length !== 0) {
        for (let i = 0; i < filtering.length; i++) {
          height += filtering[i].offsetHeight;
        }
      }
      // if (!!pager) {
      //   // 分页只有一个
      //   height += pager.offsetHeight;
      //   height += 8;
      // }
      // if (!!priceSettlement) {
      //   height += priceSettlement.offsetHeight;
      //   height += 8;
      // }
      this.heights = "calc(100% - " + height + "px)";
    },
    init() {
      // 初始化获取表格固定列数据
      let _this = this;
      let list = [];
      Array.from(_this.$refs.thead.children[0].children).forEach((item) => {
        if (
          item.getAttribute("fixed") !== null &&
          item.getAttribute("fixed") !== undefined
        )
          list.push(item);
      });
      _this.headFixedList = list;
      // console.dir(this.headFixedList);
      setTimeout(() => {
        let data = [];
        Array.from(_this.$refs.bodyTr.children).forEach((item) => {
          let list1 = [];
          Array.from(item.children).forEach((item1) => {
            if (
              item1.getAttribute("fixed") !== null &&
              item1.getAttribute("fixed") !== undefined
            )
              list1.push(item1);
          });
          data.push(list1);
        });
        _this.bodyFixedList = data;
        // console.log(this.bodyFixedList);
      });
    },
  },
  watch: {
    data() {
      this.init();
    },
  },
  computed: {
    widthHL() {
      let widthHL = 0;
      this.headFixedList.forEach((item) => {
        if (item.style.borderRightWidth)
          widthHL += item.offsetWidth + parseInt(item.style.borderRightWidth);
        else widthHL += item.offsetWidth;
      });
      return widthHL + "px";
    },
  },
  mounted() {
    if (this.right) this.textAlign = "right";
    if (this.left) this.textAlign = "left";
    this.$nextTick(() => {
      this.headChildrenLength = this.$refs.thead.childNodes.length; // 表头tr数组长度
      this.tableHeadHeight = this.$refs.thead.clientHeight; // 表头高度
      this.init();
      let gridbody = document.querySelector(".grid-body"), // 滚动对象
        tableBL = document.querySelector(".table_body_left"); // 表格主体固定列对象;
      gridbody.addEventListener(
        "scroll",
        function (e) {
          // 监听表格容器的滚动事件
          // console.log(e);
          let currentScrollTop = e.target.scrollTop;
          let tableScrollBL = tableBL.getElementsByClassName(
            "table_scroll_box"
          ); // 获取表体左侧固定列对象
          tableScrollBL[0].style.top = -currentScrollTop + "px";
        },
        false
      );
      if (this.height.endsWith("%")) {
        // 如果是以100%结尾的
        this.heights = this.height;
      }
      if (this.height !== "") {
        // 如果是传入实际高度值的
        this.heights = this.height + "px";
      }
      if (this.heights === "") {
        this.initial();
        let _this = this;
        window.onresize = function () {
          _this.initial();
        };
      }
    });
    /**  给表格赋予最小宽度，
     * 当父级元素宽度小于表格最小宽度时给表格设置x轴横向滚动
     * 以避免表格在横向任意缩放时产生阴影效果，
     * 并且设置浏览器窗口变化监听事件
     **/
    let childrenList = this.$refs.thead.children[0]; // 以head表头宽度计算，表头会存在多级表头，以第一级为准
    // console.log(childrenList)
    if (childrenList) {
      let widths = 0;
      for (let i = 0; i < childrenList.children.length; i++) {
        if (childrenList.children[i].style.width) {
          // 如果td有宽度
          widths += parseInt(childrenList.children[i].style.width);
        } else {
          // 否则没有宽度,如果colSpan跨列值大于1，用跨列数*80，
          // console.dir(childrenList.children[i])
          childrenList.children[i].colSpan > 1
            ? (widths += childrenList.children[i].colSpan * 80)
            : (widths += 80);
        }
      }
      let _this = this;
      let parentWidth = _this.$refs.tbody.parentNode.parentNode.offsetWidth;
      // console.log(parentWidth,widths)
      if (parseInt(parentWidth) < widths) {
        _this.$refs.thead.parentNode.style.minWidth = widths + "px";
        _this.$refs.tbody.parentNode.style.minWidth = widths + "px";
      }
      window.addEventListener("resize", function () {
        if (_this.$refs.tbody) {
          let parentWidth = _this.$refs.tbody.parentNode.parentNode.offsetWidth;
          // console.log(parentWidth,widths)
          if (parseInt(parentWidth) < widths) {
            _this.$refs.thead.parentNode.style.minWidth = widths + "px";
            _this.$refs.tbody.parentNode.style.minWidth = widths + "px";
          }
        }
      });
    }
  },
};
</script>

<style  scoped>
.table_box {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.data-grid {
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-x: auto;
  font-size: 14px;
  color: #444;
  box-sizing: border-box;
  border: 1px solid #dedede;
}
.data-grid td {
  border-right: 0;
  min-width: 80px;
}
.grid-head {
  background-color: #f2f2f2;
  border-bottom: 1px solid #dedede;
}
.table_td {
  padding: 6px 4px;
  font-size: 14px;
  position: relative;
}
.table_td .hz-select {
  width: 100%;
}

.table_td input {
  width: 100%;
}
.table_td img {
  width: 70px;
  height: 70px;
  display: inline-block;
  margin: 0 2px;
}

.table_td .date-pickers-box > .hz-text {
  /*width: 100%;*/
}
.table_head {
  width: calc(100% - 12px);
  color: #333;
  table-layout: fixed;
}
.table_body {
  width: 100%;
  color: #666;
  table-layout: fixed;
}
td .operating {
  cursor: pointer;
}

.table_body tr:hover {
  background: #ebf7ff;
}

.table_head td {
  /*border-right: 1px solid #dedede;*/
}
.table_head td:last-child {
  border-right: 1px solid #f2f2f2;
}
.table_body tr:first-child td {
  border-top: 0;
}
.table_body td:first-child {
  border-left: 0;
}
.table_body td:last-child {
  border-right: 0;
}
.table_head_left {
  position: absolute;
  left: 1px;
  top: 1px;
}
.table_body_left {
  position: absolute;
  left: 1px;
  top: 0;
  overflow: hidden;
}
.table_scroll_box {
  position: absolute;
  left: 0;
  top: 0;
}
.table_body_left td,
.table_body td {
  /*border: 1px solid #dedede;*/
  border-bottom: 1px solid #dedede;
}
.table_body .table_tr:last-child td {
  /*border-bottom: 0;*/
}

.grid-body {
  width: 100%;
  /*height: calc(100% - 32px);*/
  overflow-y: scroll;
}
.grid-body .not_data {
  width: 100%;
  font-size: 18px;
  color: #ccc;
  line-height: 100px;
  text-align: center;
  margin: 0 auto;
}
.grid-body::-webkit-scrollbar {
  /*滚动条*/
  width: 13px;
  height: 90%;
  background-color: #f2f2f2;
  border-left: 1px solid #dedede;
}
.grid-body::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 1px;
  background: #c1c1c1;
}
/*.grid-body::-webkit-scrollbar-track {!*滚动条里面轨道*!*/
/*-webkit-box-shadow: inset  rgba(0,0,0,0.2);*/
/*}*/
/*.grid-body::-webkit-scrollbar-button{*/
/*background-color: #f1f1f1;*/
/*}*/
.table_td .hz-button {
  margin: 1px;
}
.table_head_line {
  border-bottom: 1px solid #ccc;
  width: 100%;
  margin: 1px auto;
}
.table_td_colspan {
  border-top: 1px solid #dedede;
}
.table_td_colspan_lastChild {
  border-right: 1px solid #dedede;
}
</style>
