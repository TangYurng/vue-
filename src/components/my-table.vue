<template>
  <div class="table" ref="mytable">
    <div class="content">
      <div class="tab-fixed-left">
        <div class="leftheader">
          <table
            cellspacing="0"
            cellpadding="0"
            border="0"
            :style="{width: leftsetwidth}"
            ref="tabheader"
          >
            <colgroup>
              <col v-if="ShowCheckbox" style="width: 36px;" />
              <col
                v-for="(cell, colIndex) in fixedheader"
                :key="colIndex"
                :style="{width: cell.width+'px'}"
              />
            </colgroup>
            <thead>
              <tr :style="{height: HeaderHeight + 'px'}">
                <th v-if="ShowCheckbox" class="checkbox">
                  <input type="checkbox" @click="checkedAll" :checked="CheckedALL" />
                </th>
                <th v-for="(cell, colIndex) in fixedheader" :key="colIndex">
                  <div class="headerdiv">
                    <span>{{cell.value}}</span>
                    <div v-if="cell.showfilter" ref="showfilter" style="display:inline-block">
                      <span class="caret-wrapper" @click="cilckfilter($event)">
                        <i class="filter-caret filtertop"></i>
                        <i class="filterbottom"></i>
                      </span>
                      <div v-if="filters" class="filters">
                        <ul>
                          <li>
                            <input type="checkbox" name id />
                            <span>已确认</span>
                          </li>
                          <li>
                            <input type="checkbox" name id />
                            <span>已确认</span>
                          </li>
                          <li>
                            <input type="checkbox" name id />
                            <span>已确认</span>
                          </li>
                          <li>
                            <span>重置</span>
                            <span>确认</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div v-if="cell.showsort" ref="showsort" style="display:inline-block">
                      <span class="caret-wrapper">
                        <i class="sort-caret ascending" @click="clicksort($event)"></i>
                        <i class="sort-caret descending" @click="clicksort($event)"></i>
                      </span>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
          </table>
        </div>
        <div class="leftbody">
          <table
            cellspacing="0"
            cellpadding="0"
            border="0"
            :class="{'isstripe':stripe}"
            :style="{width: leftsetwidth}"
            ref="tabbody"
          >
            <colgroup>
              <col v-if="ShowCheckbox" style="width: 36px;" />
              <col
                v-for="(cell, colIndex) in fixedheader"
                :key="colIndex"
                :style="{width: cell.width+'px'}"
              />
            </colgroup>
            <tbody>
              <tr
                v-for="(row, rowIndex) in fixedbody"
                :key="rowIndex"
                :style="{height: BodyHeight + 'px'}"
                ref="bodytr"
              >
                <td v-if="ShowCheckbox" class="checkbox">
                  <input type="checkbox" @click="checkedItem" :checked="CheckedItem" />
                </td>
                <td v-for="(cell,colIndex) in row" :key="colIndex">
                  <div>
                    <span>{{cell}}</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="tab-scroll">
        <div class="header">
          <table
            cellspacing="0"
            cellpadding="0"
            border="0"
            :style="{width: setwidth}"
            ref="tabheader"
          >
            <colgroup class="headercg">
              <col v-if="ShowCheckbox" style="width: 36px;" />
              <col
                v-for="(cell, colIndex) in header"
                :key="colIndex"
                :style="{width: cell.width+'px'}"
              />
            </colgroup>
            <thead>
              <!-- 正常表头 -->
              <tr :style="{height: HeaderHeight + 'px'}" v-if="!showgroup" ref="headertr">
                <th v-if="ShowCheckbox" class="checkbox">
                  <input type="checkbox" @click="checkedAll" :checked="CheckedALL" />
                </th>
                <th v-for="(cell, colIndex) in header" :key="colIndex">
                  <div class="headerdiv">
                    <span>{{cell.value}}</span>
                    <div v-if="cell.showfilter" ref="showfilter" style="display:inline-block">
                      <span class="caret-wrapper" @click="cilckfilter($event)">
                        <i class="filter-caret filtertop"></i>
                        <i class="filterbottom"></i>
                      </span>
                      <div v-if="filters" class="filters">
                        <ul>
                          <li>
                            <input type="checkbox" name id />
                            <span>已确认</span>
                          </li>
                          <li>
                            <input type="checkbox" name id />
                            <span>已确认</span>
                          </li>
                          <li>
                            <input type="checkbox" name id />
                            <span>已确认</span>
                          </li>
                          <li>
                            <span>重置</span>
                            <span>确认</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div v-if="cell.showsort" ref="showsort" style="display:inline-block">
                      <span class="caret-wrapper">
                        <i class="sort-caret ascending" @click="clicksort($event)"></i>
                        <i class="sort-caret descending" @click="clicksort($event)"></i>
                      </span>
                    </div>
                  </div>
                </th>
              </tr>
              <!-- 一级表头 -->
              <tr v-if="showgroup" ref="primarytr">
                <th v-if="ShowCheckbox" class="checkbox" rowspan="2">
                  <input type="checkbox" @click="checkedAll" :checked="CheckedALL" />
                </th>
                <th v-for="(cell, colIndex) in primary" :key="colIndex">
                  <div class="headerdiv">
                    <span v-if="cell.groupname">{{cell.groupname}}</span>
                    <span v-else>{{cell.value}}</span>
                  </div>
                </th>
              </tr>
              <!-- 二级表头 -->
              <tr v-if="showgroup">
                <th v-for="(cell,colIndex) in secondary" :key="colIndex">
                  <div>
                    <span>{{cell.value}}</span>
                  </div>
                </th>
              </tr>
            </thead>
          </table>
        </div>
        <div class="body">
          <table
            cellspacing="0"
            cellpadding="0"
            border="0"
            :class="{'isstripe':stripe}"
            :style="{width: setwidth}"
            ref="tabbody"
          >
            <colgroup class="bodycg">
              <col v-if="ShowCheckbox" style="width: 36px;" />
              <col
                v-for="(cell, colIndex) in header"
                :key="colIndex"
                :style="{width: cell.width+'px'}"
              />
            </colgroup>
            <tbody>
              <tr
                v-for="(row, rowIndex) in body"
                :key="rowIndex"
                :style="{height: BodyHeight + 'px'}"
                ref="bodytr"
              >
                <td v-if="ShowCheckbox" class="checkbox">
                  <input type="checkbox" :checked="CheckedItem" @click="checkedItem" />
                </td>
                <td v-for="(cell,colIndex) in header" :key="colIndex">
                  <div>
                    <span>{{row[cell.key]}}</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="tab-fixed-right">
        <div class="rightheader">
          <table
            cellspacing="0"
            cellpadding="0"
            border="0"
            :style="{width: rightsetwidth}"
            ref="tabheader"
          >
            <colgroup>
              <col
                v-for="(cell, colIndex) in rfixedheader"
                :key="colIndex"
                :style="{width: cell.width+'px'}"
              />
            </colgroup>
            <thead>
              <tr :style="{height: HeaderHeight + 'px'}">
                <th v-for="(cell, colIndex) in rfixedheader" :key="colIndex">
                  <div class="headerdiv">
                    <span>{{cell.value}}</span>
                    <div v-if="cell.showfilter" ref="showfilter" style="display:inline-block">
                      <span class="caret-wrapper" @click="cilckfilter($event)">
                        <i class="filter-caret filtertop"></i>
                        <i class="filterbottom"></i>
                      </span>
                      <div v-if="filters" class="filters">
                        <ul>
                          <li>
                            <input type="checkbox" name id />
                            <span>已确认</span>
                          </li>
                          <li>
                            <input type="checkbox" name id />
                            <span>已确认</span>
                          </li>
                          <li>
                            <input type="checkbox" name id />
                            <span>已确认</span>
                          </li>
                          <li>
                            <span>重置</span>
                            <span>确认</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div v-if="cell.showsort" ref="showsort" style="display:inline-block">
                      <span class="caret-wrapper">
                        <i class="sort-caret ascending" @click="clicksort($event)"></i>
                        <i class="sort-caret descending" @click="clicksort($event)"></i>
                      </span>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
          </table>
        </div>
        <div class="rightbody">
          <table
            cellspacing="0"
            cellpadding="0"
            border="0"
            :class="{'isstripe':stripe}"
            :style="{width: rightsetwidth}"
            ref="tabbody"
          >
            <colgroup>
              <col
                v-for="(cell, colIndex) in rfixedheader"
                :key="colIndex"
                :style="{width: cell.width+'px'}"
              />
            </colgroup>
            <tbody>
              <tr
                v-for="(row, rowIndex) in rfixedbody"
                :key="rowIndex"
                :style="{height: BodyHeight + 'px'}"
                ref="bodytr"
              >
                <td v-for="(cell,colIndex) in row" :key="colIndex">
                  <div>
                    <span>{{cell}}</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
    };
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
  methods: {
    // 表格初始化宽度
    initTableWidth() {
      let allwidth = 0,
        leftallwidth = 0,
        rightallwidth = 0;
      if (this.ShowCheckbox) {
        let num = 0;
        this.header.forEach((el) => {
          if (!el.fixed) {
            num++;
          }
        });
        allwidth += 35;
        leftallwidth += 35;
        //判断是否显示左右固定列
        if (num >= this.header.length) {
          document.getElementsByClassName("tab-fixed-left")[0].style.display =
            "none";
          document.getElementsByClassName("tab-fixed-right")[0].style.display =
            "none";
        } else {
          document.getElementsByClassName("tab-fixed-left")[0].style.display =
            "block";
          document.getElementsByClassName("tab-fixed-right")[0].style.display =
            "block";
        }
      }
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
            document.getElementsByClassName("tab-fixed-left")[0].style.display =
              "none";
            // flag = true;
          } else if (item.fixed == "right") {
            rightkey.push(item.key);
            frheader.push(item);
          }
        }
      });
      // 当有固定列的时候，当显示多选框的时候，中间input的隐藏
      // if (flag) {
      //   if (this.ShowCheckbox) {
      //     let trs = document.querySelectorAll(".tab-scroll tr");
      //     trs.forEach((el) => {
      //       el.cells[0].firstChild.style.display = "none";
      //     });
      //   }
      // }
      setTimeout(() => {
        Array.from(this.body).forEach((item) => {
          let data1 = [],
            data2 = [];
          headerkey.forEach((el) => {
            for (var al in item) {
              if (al == el) {
                data1.push(item[al]);
              }
            }
          });
          rightkey.forEach((el) => {
            for (var al in item) {
              if (al == el) {
                data2.push(item[al]);
              }
            }
          });
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
    checkedItem(e){
      console.log(e)
    },
    //筛选
    cilckfilter(e) {
      console.log(e);
      this.filters = !this.filters;
    },
    //排序
    clicksort(sort) {
      console.log(sort);
    },
  },
  created() {},
  mounted() {
    this.init();
    this.initGroup();
    // 斑马纹
    if (this.stripe) {
      this.$refs.bodytr.forEach((item, index) => {
        if (index % 2) {
          item.style.background = "#F6F7FB";
        }
      });
    }
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
      table.addEventListener(
        "scroll",
        function (e) {
          // 监听表格容器的滚动事件
          let currentScrollTop = e.target.scrollLeft,
            maxScrollTop = e.target.scrollWidth - e.target.offsetWidth;
          if (currentScrollTop == 0) {
            document.getElementsByClassName("tab-fixed-left")[0].style.display =
              "none";
          } else if (currentScrollTop == maxScrollTop) {
            document.getElementsByClassName(
              "tab-fixed-right"
            )[0].style.display = "none";
          } else {
            document.getElementsByClassName("tab-fixed-left")[0].style.display =
              "block";
            document.getElementsByClassName(
              "tab-fixed-right"
            )[0].style.display = "block";
          }
          let leftbody = table.getElementsByClassName("tab-fixed-left");
          let rightbody = table.getElementsByClassName("tab-fixed-right");
          leftbody[0].style.left = currentScrollTop + "px";
          rightbody[0].style.right = -currentScrollTop + "px";
        },
        false
      );
    });
  },
  watch: {
    data() {
      this.init();
      this.initTableWidth();
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