<template>
  <div class="my-table-header">
    <!-- type==1 -->
    <table
      cellspacing="0"
      cellpadding="0"
      border="0"
      :style="{ width: fixed ? '100%' : setwidth }"
      ref="tabheader"
      v-if="type == '1'"
    >
      <colgroup class="headercg">
        <col v-if="ShowCheckbox" style="width: 36px" />
        <template v-if="fixed == 'left' && !showgroup">
          <col
            v-for="(cell, colIndex) in fixedheader"
            :key="colIndex"
            :style="{ width: cell.width + 'px' }"
          />
        </template>
        <template v-else-if="fixed == 'right' && !showgroup">
          <col
            v-for="(cell, colIndex) in rfixedheader"
            :key="colIndex"
            :style="{ width: cell.width + 'px' }"
          />
        </template>
        <template v-else>
          <col
            v-for="(cell, colIndex) in header"
            :key="colIndex"
            :style="{ width: cell.width + 'px' }"
          />
        </template>
      </colgroup>
      <thead>
        <!-- 正常表头\固定列 -->
        <template v-if="!showgroup || fixed == 'left' || fixed == 'right'">
          <tr :style="{ height: HeaderHeight + 'px' }" ref="headertr">
            <th v-if="ShowCheckbox" class="checkbox">
              <input
                type="checkbox"
                @click="checkedAll"
                :checked="CheckedALL"
              />
            </th>
            <template v-if="fixed == 'left'">
              <th v-for="(cell, colIndex) in fixedheader" :key="colIndex">
                <div class="headerdiv">
                  <span>{{ cell.value }}</span>
                </div>
              </th>
            </template>
            <template v-else-if="fixed == 'right'">
              <th v-for="(cell, colIndex) in rfixedheader" :key="colIndex">
                <div class="headerdiv">
                  <span>{{ cell.value }}</span>
                </div>
              </th>
            </template>
            <template v-else>
              <th
                v-for="(cell, colIndex) in header"
                :key="colIndex"
                :name="cell.key"
              >
                <div class="headerdiv">
                  <span>{{ cell.value }}</span>
                  <div
                    v-if="cell.showfilter"
                    ref="showfilter"
                    style="display: inline-block"
                  >
                    <span class="caret-wrapper" @click="cilckfilter($event)">
                      <i class="filter-caret filtertop"></i>
                      <i class="filterbottom"></i>
                    </span>
                    <div v-if="filters" class="filters">
                      <ul>
                        <!-- <li v-for="(item,Index) in body" :key="Index">
                            <input type="checkbox" name id />
                            <span>{{item[cell.key] |filterkey}}</span>
                          </li>-->
                        <li v-for="(item, Index) in filteritems" :key="Index">
                          <input type="checkbox" name id />
                          <span>{{ item }}</span>
                        </li>
                        <li>
                          <span @click="resetfilter($event)">重置</span>
                          <span @click="surefilter($event)">确认</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div
                    v-if="cell.showsort"
                    ref="showsort"
                    style="display: inline-block"
                  >
                    <span class="caret-wrapper">
                      <i
                        class="sort-caret ascending"
                        @click="clicksort($event)"
                      ></i>
                      <i
                        class="sort-caret descending"
                        @click="clicksort($event)"
                      ></i>
                    </span>
                  </div>
                </div>
              </th>
            </template>
          </tr>
        </template>
        <!-- 多表头 -->
        <template v-else-if="showgroup">
          <!-- 一级表头 -->
          <tr ref="primarytr" name="primarytr">
            <th v-if="ShowCheckbox" class="checkbox" rowspan="2">
              <input
                type="checkbox"
                @click="checkedAll"
                :checked="CheckedALL"
              />
            </th>
            <th v-for="(cell, colIndex) in primary" :key="colIndex">
              <div class="headerdiv">
                <span v-if="cell.groupname">{{ cell.groupname }}</span>
                <span v-else>{{ cell.value }}</span>
                <div
                  v-if="cell.showfilter"
                  ref="showfilter"
                  style="display: inline-block"
                >
                  <span class="caret-wrapper" @click="cilckfilter($event)">
                    <i class="filter-caret filtertop"></i>
                    <i class="filterbottom"></i>
                  </span>
                  <div v-if="filters" class="filters">
                    <ul>
                      <li v-for="(item, Index) in filteritems" :key="Index">
                        <input type="checkbox" name id />
                        <span>{{ item }}</span>
                      </li>
                      <li>
                        <span @click="resetfilter($event)">重置</span>
                        <span @click="surefilter($event)">确认</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  v-if="cell.showsort"
                  ref="showsort"
                  style="display: inline-block"
                >
                  <span class="caret-wrapper">
                    <i
                      class="sort-caret ascending"
                      @click="clicksort($event)"
                    ></i>
                    <i
                      class="sort-caret descending"
                      @click="clicksort($event)"
                    ></i>
                  </span>
                </div>
              </div>
            </th>
          </tr>
          <!-- 二级表头 -->
          <tr>
            <th v-for="(cell, colIndex) in secondary" :key="colIndex">
              <div>
                <span>{{ cell.value }}</span>
                <div
                  v-if="cell.showfilter"
                  ref="showfilter"
                  style="display: inline-block"
                >
                  <span class="caret-wrapper" @click="cilckfilter($event)">
                    <i class="filter-caret filtertop"></i>
                    <i class="filterbottom"></i>
                  </span>
                  <div v-if="filters" class="filters">
                    <ul>
                      <!-- <li v-for="(item,Index) in body" :key="Index">
                            <input type="checkbox" name id />
                            <span>{{item[cell.key] |filterkey}}</span>
                          </li>-->
                      <li v-for="(item, Index) in filteritems" :key="Index">
                        <input type="checkbox" name id />
                        <span>{{ item }}</span>
                      </li>
                      <li>
                        <span @click="resetfilter($event)">重置</span>
                        <span @click="surefilter($event)">确认</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  v-if="cell.showsort"
                  ref="showsort"
                  style="display: inline-block"
                >
                  <span class="caret-wrapper">
                    <i
                      class="sort-caret ascending"
                      @click="clicksort($event)"
                    ></i>
                    <i
                      class="sort-caret descending"
                      @click="clicksort($event)"
                    ></i>
                  </span>
                </div>
              </div>
            </th>
          </tr>
        </template>
      </thead>
    </table>
    <!-- type==2 -->
    <table
      cellspacing="0"
      cellpadding="0"
      border="0"
      :style="{ width: fixed ? '100%' : setwidth }"
      ref="tabheader"
      v-else-if="type == '2'"
    >
      <colgroup class="headercg">
        <template v-for="(cell, colIndex) in header">
          <col
            v-if="cell.location == 'body'"
            :key="colIndex"
            :style="{ width: cell.width + 'px' }"
          />
        </template>
      </colgroup>
      <thead>
        <tr :style="{ height: HeaderHeight + 'px' }" ref="headertr" class="headertr">
          <template v-for="(cell, colIndex) in header">
            <th :key="colIndex" :name="cell.key" v-if="cell.location == 'body'">
              <div class="headerdiv">
                <span>{{ cell.value }}</span>
              </div>
            </th>
          </template>
        </tr>
      </thead>
    </table>
  </div>
</template>
 
<script>
// import MyTableTr from "./components/my-table-tr";
// import MyTableTd from "./components/my-table-td";
export default {
  name: "my-table-header",
  components: {
    // MyTableTr,
    // MyTableTd
  },
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
    type: {
      type: String,
      default: "",
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
    ShowOperation: {
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
    fixed: [String, Boolean],
    width: [String, Number],
    height: [String, Number],
  },
  methods: {
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
            // console.log("查看cells",this.$refs.primarytr)
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
              //  console.log("查看cells",index,this.$refs.primarytr)
              this.$refs.primarytr.cells[index].rowSpan = 2;
              this.$refs.primarytr.cells[index].style.height =
                this.HeaderHeight + "px";
            }
          });
        });
      }
    },
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
          leftnum++;
        } else if (el.fixed == "right") {
          rightnum++;
        } else {
          num++;
        }
      });
      allwidth += 35;
      leftallwidth += 35;
      //判断是否显示左右固定列
      if (num >= this.header.length && leftnum != 0 && rightnum != 0) {
        document.getElementsByClassName("tab-fixed-left")[0].style.visibility =
          "hidden";
        document.getElementsByClassName("tab-fixed-right")[0].style.visibility =
          "hidden";
      } else if (rightnum == 0 && leftnum != 0) {
        document.getElementsByClassName("tab-fixed-right")[0].style.visibility =
          "hidden";
      } else if (rightnum != 0 && leftnum == 0) {
        document.getElementsByClassName("tab-fixed-left")[0].style.visibility =
          "hidden";
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
      if (allwidth > this.$refs.tabheader.offsetWidth) {
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
    init() {
      let fheader = [],
        frheader = [],
        fbody = [],
        frbody = [],
        // 左边固定列和右边固定列的key值
        headerkey = [],
        rightkey = [];
      //判断是否有左边固定
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
  },
  mounted() {
    this.init();
    this.initGroup();
    this.initTableWidth();
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
.my-table-header .headertr{
  background: #f5f5f5;
  border: 1px solid #e8e8e8;
}
</style>
