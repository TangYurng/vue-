<template>
  <div class="table" ref="mytable">
    <div class="content" v-if="type=='1'">
      <div class="tab-fixed-left">
        <div class="tab-content" v-if="fixedheader.length">
          <div class="leftheader">
            <my-table-header
             :type="type"
              fixed="left"
              :header="header"
              :body="body"
              :ShowCheckbox="ShowCheckbox"
              :stripe="stripe"
              :resize="resize"
              :isgroup="isgroup"
              ref="mytableheader"
            ></my-table-header>
          </div>
          <div class="leftbody">
             <my-table-body
              :type="type"
             fixed="left"
            :header="header"
            :body="body"
            :ShowCheckbox="ShowCheckbox"
            :stripe="stripe"
            :resize="resize"
            :isgroup="isgroup"
            ref="tabbody"
          ></my-table-body>
          </div>
        </div>
      </div>
      <div class="tab-scroll">
        <div class="header">
          <my-table-header
           :type="type"
            :header="header"
            :body="body"
            :ShowCheckbox="ShowCheckbox"
            :stripe="stripe"
            :resize="resize"
            :isgroup="isgroup"
            ref="mytableheader"
          >
          </my-table-header>
        </div>
        <div class="body">
          <my-table-body
           :type="type"
            :header="header"
            :body="body"
            :ShowCheckbox="ShowCheckbox"
            :stripe="stripe"
            :resize="resize"
            :isgroup="isgroup"
            ref="tabbody"
          ></my-table-body>
        </div>
      </div>
      <div class="tab-fixed-right">
        <div class="tab-content" v-if="rfixedheader.length">
          <div class="rightheader">
            <my-table-header
             :type="type"
              fixed="right"
              :header="header"
              :body="body"
              :ShowCheckbox="ShowCheckbox"
              :stripe="stripe"
              :resize="resize"
              :isgroup="isgroup"
              ref="mytableheader"
            ></my-table-header>
          </div>
          <div class="rightbody">
             <my-table-body
              :type="type"
             fixed="right"
            :header="header"
            :body="body"
            :ShowCheckbox="ShowCheckbox"
            :stripe="stripe"
            :resize="resize"
            :isgroup="isgroup"
            ref="tabbody"
          ></my-table-body>
          </div>
        </div>
      </div>
    </div>
    <div class="content" v-else-if="type=='2'">
      <div class="tab-scroll">
        <div class="header">
          <my-table-header
            :type="type"
            :header="header"
            :body="body"
            :ShowCheckbox="ShowCheckbox"
            :stripe="stripe"
            :resize="resize"
            :isgroup="isgroup"
            ref="mytableheader"
          >
          </my-table-header>
        </div>
        <div class="body">
          <my-table-body
            :type="type"
            :header="header"
            :body="body"
            :ShowCheckbox="ShowCheckbox"
            :stripe="stripe"
            :resize="resize"
            :isgroup="isgroup"
            ref="tabbody"
          ></my-table-body>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import header from "../iview/src/components/table/header";
import MyTableHeader from "./my-table-header.vue";
import MyTableBody from "./my-table-body.vue";
// import render from "./render.js";
export default {
  name: "MyTable",
  data() {
    return {
      setwidth: "auto",
      leftsetwidth: "auto",
      rightsetwidth: "auto",
      filters: false,
      fixedheader: [],
      fixedbody: [],
      rfixedheader: [],
      rfixedbody: [],
      showgroup: false,
      primary: [],
      secondary: [],
      CheckedALL: false,
      CheckedItem: false,
      filteritems: [],
      fixed: false,
    };
  },
  components: {
    // render,
    MyTableHeader,
    MyTableBody
  },
  props: {
    header: {
      type: Array,
      default: () => {
        return [{ showfilter: false, showsort: false }];
      },
    },
    body: {
      type: Array,
      default: () => {
        return [];
      },
    },
    isgroup: {
      type: Array,
      default: () => {
        return [false];
      },
    },
    HeaderHeight: {
      type: Number,
      default: 44,
    },
    BodyHeight: {
      type: Number,
      default: 42,
    },
    type: {
      type: String,
      default: '',
    },
    ShowCheckbox: {
      type: Boolean,
      default: false,
    },
    // 斑马纹,长宽
    stripe: {
      type: Boolean,
      default: false,
    },
    resize: {
      type: Boolean,
      default: false,
    },
    width: [String, Number],
    height: [String, Number],
  },
  filters: {
    filterkey(item) {
      let newitem = item;
      if (item != newitem) {
        return item;
      }
    },
  },
  methods: {
    //初始化数据
    rebuilddata() {
      console.log("初始化数据");
    },
    // 表格初始化宽度
    initTableWidth() {
      let allwidth = 0,
        leftallwidth = 0,
        rightallwidth = 0;
      // if (this.ShowCheckbox) {
      let leftnum = 0,
        rightnum = 0,
        num = 0;
      this.header.forEach((el) => {
        if (el.fixed || el.fixed == "left") {
          this.fixed = true;
          leftnum++;
        } else if (el.fixed == "right") {
          this.fixed = true;
          rightnum++;
        } else {
          num++;
        }
      });
      allwidth += 35;
      leftallwidth += 35;
      //判断是否显示左右固定列
      // if (num >= this.header.length && leftnum != 0 && rightnum != 0) {
      //   document.getElementsByClassName("tab-fixed-left")[0].style.visibility =
      //     "hidden";
      //   document.getElementsByClassName("tab-fixed-right")[0].style.visibility =
      //     "hidden";
      // } else if (rightnum == 0 && leftnum != 0) {
      //   document.getElementsByClassName("tab-fixed-right")[0].style.visibility =
      //     "hidden";
      // } else if (rightnum != 0 && leftnum == 0) {
      //   document.getElementsByClassName("tab-fixed-left")[0].style.visibility =
      //     "hidden";
      // }
      this.header.forEach((el) => {
        allwidth += el.width;
      });
      this.fixedheader.forEach((el) => {
        leftallwidth += el.width;
      });
      this.rfixedheader.forEach((el) => {
        rightallwidth += el.width;
      });
      if (allwidth > this.$refs.mytable.offsetWidth) {
        this.setwidth = allwidth + "px";
        this.leftsetwidth = leftallwidth + "px";
        this.rightsetwidth = rightallwidth + "px";
      } else {
        this.setwidth = "100%";
        this.leftsetwidth = "100%";
        this.rightsetwidth = "100%";
      }
      if (this.resize) {
        console.log("表格可变化");
        this.$refs.headertr.cells.forEach((el, index) => {
          let th = el;
          //记录宽度
          //开始,按下
          el.onmousedown = function () {
            if (event.offsetX > this.offsetWidth - 10) {
              th.mouseDown = true;
              th.startX = event.x;
              th.firstW = th.offsetWidth;
              console.log("start", th.startX);
            }
          };
          //结束，松开
          el.onmouseup = function () {
            if (th == undefined) th = this;
            th.mouseDown = false;
            this.style.cursor = "default";
          };
          el.onmousemove = function () {
            //设置样式col-resize
            if (event.offsetX > this.offsetWidth - 10) {
              this.style.cursor = "col-resize";
            } else {
              this.style.cursor = "default";
            }
            if (th == undefined) th = this;
            //调整宽度
            if (th.mouseDown != null && th.mouseDown == true) {
              th.style.cursor = "default";
              console.log("end", event.x);
              if (th.firstW + (event.x - th.startX) > 0) {
                th.width = th.firstW + (event.x - th.startX) + "px";
              } else if (th.firstW + (event.x - th.startX) < 10)
                th.width = "10px";
              th.style.cursor = "col-resize";
              //调整th的colgroup
              let headercg = document.querySelectorAll(".headercg col");
              headercg[index].style.width = th.width;
              //调整列宽
              let bodycg = document.querySelectorAll(".bodycg col");
              bodycg[index].style.width = th.width;
            }
          };
        });
      }
    },
    //固定列表格数据
    init() {
      let fheader = [],
        frheader = [],
        fbody = [],
        frbody = [],
        // 左边固定列和右边固定列的key值
        headerkey = [],
        rightkey = [];
      //判断是否有左边固定
      // flag = false;
      Array.from(this.header).forEach((item) => {
        if (item.fixed != null || item.fixed != undefined) {
          if (
            item.fixed == true ||
            item.fixed == "left" ||
            item.fixed == "true"
          ) {
            headerkey.push(item.key);
            fheader.push(item);
          } else if (item.fixed == "right") {
            rightkey.push(item.key);
            frheader.push(item);
          }
        }
      });
      setTimeout(() => {
        Array.from(this.body).forEach((item) => {
          let data1 = [],
            data2 = [];
          let bodykey = [];
          for (var al in item) {
            bodykey.push(al);
          }
          if (headerkey.length) {
            headerkey.forEach((el) => {
              if (bodykey.indexOf(el) != -1) {
                for (var al in item) {
                  if (al == el) {
                    data1.push(item[al]);
                  }
                }
              } else {
                //自定义列
                for (var i = 0; i < this.header.length; i++) {
                  if (this.header[i].key == el) {
                    data1.push(this.header[i].render);
                  }
                }
              }
            });
            // console.log(data1);
          }
          if (rightkey != []) {
            rightkey.forEach((el) => {
              if (bodykey.indexOf(el) != -1) {
                for (var al in item) {
                  if (al == el) {
                    data2.push(item[al]);
                  }
                }
              } else {
                //自定义列
                for (var i = 0; i < this.header.length; i++) {
                  if (this.header[i].key == el) {
                    data2.push(this.header[i].render);
                  }
                }
              }
            });
          }
          fbody.push(data1);
          frbody.push(data2);
        });
      });
      this.fixedheader = fheader;
      this.fixedbody = fbody;
      this.rfixedheader = frheader;
      this.rfixedbody = frbody;
    },
    //多表头
    initGroup() {
      if (this.isgroup.length != 0 && this.isgroup[0]) {
        this.showgroup = true;
      } else {
        this.showgroup = false;
      }
      if (this.showgroup) {
        Array.from(this.header).forEach((el, index) => {
          if (el.groupname != undefined || el.groupname != null) {
            this.secondary.push(el);
            if (
              this.header[index].groupname == this.header[index - 1].groupname
            ) {
              return;
            }
          }
          this.primary.push(el);
        });
        let count = 0;
        Array.from(this.isgroup).forEach((al) => {
          Array.from(this.header).forEach((el) => {
            if (al.groupname == el.groupname) {
              count++;
            }
          });
          al.spannum = count;
          count = 0;
        });
        this.$nextTick(() => {
          Array.from(this.primary).forEach((el, index) => {
            if (this.ShowCheckbox) {
              index++;
            }
            let num = 0;
            if (el.groupname != undefined || el.groupname != null) {
              Array.from(this.isgroup).forEach((al) => {
                if (el.groupname == al.groupname) {
                  num = al.spannum;
                }
              });
              this.$refs.primarytr.cells[index].colSpan = num;
              this.$refs.primarytr.cells[index].style.height =
                this.HeaderHeight / 2 + "px";
            } else {
              this.$refs.primarytr.cells[index].rowSpan = 2;
              this.$refs.primarytr.cells[index].style.height =
                this.HeaderHeight + "px";
            }
          });
        });
      }
    },
    checkedAllItem(CheckedALL) {
      let all = document.querySelectorAll("input");
      if (CheckedALL) {
        all.forEach((el) => {
          el.checked = true;
        });
      } else {
        all.forEach((el) => {
          el.checked = false;
        });
      }
    },
    //全选
    checkedAll() {
      this.CheckedALL = !this.CheckedALL;
      this.checkedAllItem(this.CheckedALL);
    },
    //单选
    checkedItem(e) {
      console.log(e);
    },
    //筛选数据
    cilckfilter() {
      this.filters = !this.filters;
      var this_filters = [];
      this.header.forEach((el) => {
        if (el.showfilter) {
          this.body.forEach((al) => {
            this_filters.push(al[el.key]);
          });
        }
        const result = this_filters.filter((filters, index) => {
          return this_filters.indexOf(filters) === index;
        });
        this.filteritems = result;
      });
    },
    //筛选确认
    surefilter(e) {
      this.filters = !this.filters;
      console.log(e);
    },
    //筛选重置
    resetfilter() {
      this.filters = !this.filters;
    },
    //点击排序
    clicksort(e) {
      let div = e.target;
      while (div.tagName != "TH") div = div.parentElement;
      let sortkey = div.getAttribute("name");
      let sortway = e.target.classList[1];
      this.body.sort(this.sortitem(sortkey, sortway));
      this.$forceUpdate(); //不更新任何计算属性，强制重新渲染视图
    },
    //排序数据
    sortitem(sortkey, sortway) {
      // var reg = /\d+/gi;
      if (sortway == "ascending") {
        console.log("升序");
        return function (a, b) {
          return a[sortkey] - b[sortkey];
        };
      } else {
        console.log("降序");
        return function (a, b) {
          return b[sortkey] - a[sortkey];
        };
      }
    },
    //滚动监听
    scroll(e) {
      // 监听表格容器的滚动事件
      let currentScrollTop = e.target.scrollLeft,
        maxScrollTop = e.target.scrollWidth - e.target.offsetWidth;
      if (currentScrollTop == 0) {
        document.getElementsByClassName("tab-fixed-left")[0].style.visibility =
          "hidden";
      } else if (currentScrollTop == maxScrollTop) {
        document.getElementsByClassName("tab-fixed-right")[0].style.visibility =
          "hidden";
      }
      else if (this.rfixedheader.length == 0) {
        document.getElementsByClassName("tab-fixed-right")[0].style.visibility =
          "hidden";
      } else if (this.fixedheader.length == 0) {
        document.getElementsByClassName("tab-fixed-left")[0].style.visibility =
          "hidden";
      }
      else {
        document.getElementsByClassName("tab-fixed-left")[0].style.visibility =
          "visible";
        document.getElementsByClassName("tab-fixed-right")[0].style.visibility =
          "visible";
      }
      if (this.ShowCheckbox) {
        let num = 0;
        this.header.forEach((el) => {
          if (el.fixed == true || el.fixed == "left") {
            num++;
          }
        });
        //判断是否显示左右固定列
        if (num == 0) {
          document.getElementsByClassName(
            "tab-fixed-left"
          )[0].style.visibility = "hidden";
        }
      }
      let leftbody = document.getElementsByClassName("tab-fixed-left");
      let rightbody = document.getElementsByClassName("tab-fixed-right");
      leftbody[0].style.left = currentScrollTop + "px";
      rightbody[0].style.right = -currentScrollTop + "px";
    },
  },
 
  mounted() {
    this.rebuilddata();

    this.init();
    this.$refs.mytableheader.initTableWidth();
    if (this.$refs.mytable) {
      this.initTableWidth();
      window.addEventListener("resize", this.initTableWidth);
    } else {
      window.removeEventListener("resize", this.initTableWidth);
    }
    // 滚动监视
    this.$nextTick(() => {
      this.init();
      let table = document.querySelector(".table");
      table.addEventListener("scroll", this.scroll, false);
    });
  },
  watch: {
    data() {
      this.init();
      this.initTableWidth();
    },
    body: {
      handler(newValue, oldValue) {
        console.log(oldValue);
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
.table {
  position: relative;
  overflow: auto;
  box-sizing: border-box;
  flex: 1;
  width: 100%;
  max-width: 100%;
  background-color: #fff;
  font-size: 14px;
  color: #606266;
}
.content {
  position: relative;
}
.tab-fixed-left {
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0px;
  background: #fff;
  z-index: 10;
  box-shadow: 2px 0px 6px #000;
}
.tab-fixed-right {
  display: inline-block;
  position: absolute;
  top: 0;
  right: 0px;
  background: #fff;
  z-index: 10;
  box-shadow: -2px 0px 6px #000;
}
.header,
.leftheader,
.rightheader {
  color: #4e546c;
  font-size: 14px;
  font-weight: bold;
}
.header tr,
.leftheader tr,
.rightheader tr {
  background-color: #e4eafa;
}
.header th:nth-child(n + 2),
.leftheader th:nth-child(n + 2),
.rightheader th:nth-child(n + 2) {
  border-left: 1px solid #e6e6e6;
}

.caret-wrapper {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  height: 34px;
  width: 24px;
  vertical-align: middle;
  cursor: pointer;
  overflow: initial;
  position: relative;
}

.sort-caret {
  width: 0;
  height: 0;
  border: 5px solid transparent;
  position: absolute;
  left: 7px;
}
.sort-caret.ascending {
  border-bottom-color: #4e546c;
  top: 5px;
}
.sort-caret.descending {
  border-top-color: #4e546c;
  bottom: 7px;
}
.filter-caret {
  width: 0;
  height: 0;
  border: 8px solid transparent;
  position: absolute;
  left: 7px;
}
.filtertop {
  border-top-color: #4e546c;
  top: 10px;
}
.filterbottom {
  position: absolute;
  left: 13px;
  width: 4px;
  height: 10px;
  background: #4e546c;
  bottom: 9px;
}
.filters {
  position: absolute;
  border: 1px solid #fff;
  border-radius: 2px;
  box-shadow: 0px 2px 4px;
  background: #fff;
}
.filters li {
  padding: 4px 10px;
  margin-bottom: 5px;
}
.filters li:last-child {
  border-top: 1px solid #c1c1c1;
}
.filters .line {
  width: 100%;
  height: 1px;
  background: #000;
}
.filters input {
  margin-right: 8px;
}
.filters span {
  color: #353944;
  font-size: 13px;
  font-weight: normal;
  padding-left: 5px;
  padding-right: 15px;
}
.filters li:last-child span {
  color: #5498ff;
  font-size: 12px;
  cursor: pointer;
}
.body,
.leftbody,
.rightbody {
  color: #353944;
  font-size: 13px;
}
.body td:nth-child(n + 2),
.leftbody td:nth-child(n + 2),
.rightbody td:nth-child(n + 2) {
  border-left: 1px dashed #e9e9e9;
}
.body td,
.leftbody td,
.rightbody td {
  cursor: pointer;
}
</style>