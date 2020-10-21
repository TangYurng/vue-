<template>
  <div class="my-table-body">
    <table
      border="0"
      cellspacing="0"
      cellpadding="0"
      :class="{ isstripe: stripe }"
      :style="{ width: fixed ? '100%' : setwidth }"
      ref="tabbody"
      v-if="type == '1'"
    >
      <colgroup class="bodycg">
        <col v-if="ShowCheckbox" style="width: 36px" />
        <template v-if="fixed == 'left'">
          <col
            v-for="(cell, colIndex) in fixedheader"
            :key="colIndex"
            :style="{ width: cell.width + 'px' }"
          />
        </template>
        <template v-else-if="fixed == 'right'">
          <col
            v-for="(cell, colIndex) in rfixedheader"
            :key="colIndex"
            :style="{ width: cell.width + 'px' }"
          />
        </template>
        <template v-else>
          <col
            v-for="(col, index) in header"
            :key="index"
            :width="col.width || ''"
          />
        </template>
      </colgroup>
      <tbody>
        <template v-if="fixed == 'left'">
          <tr
            v-for="(row, index) in fixedbody"
            :key="index"
            :style="{ height: BodyHeight + 'px' }"
            ref="bodytr"
          >
            <td v-if="ShowCheckbox" class="checkbox">
              <input
                type="checkbox"
                @click="checkedItem"
                :checked="CheckedItem"
              />
            </td>
            <td v-for="(col, colIndex) in row" :key="colIndex">
              <div>
                <render
                  v-if="typeof col == 'function'"
                  :row="row"
                  :column="col"
                  :index="index"
                  :render="col"
                ></render>
                <template v-else>
                  <span :name="col.key">{{ col }}</span>
                </template>
              </div>
            </td>
          </tr>
        </template>
        <template v-else-if="fixed == 'right'">
          <tr
            v-for="(row, index) in rfixedbody"
            :key="index"
            :style="{ height: BodyHeight + 'px' }"
            ref="bodytr"
            name="rightfixed"
          >
            <td v-for="(col, colIndex) in row" :key="colIndex">
              <div>
                <render
                  v-if="typeof col == 'function'"
                  :row="row"
                  :column="col"
                  :index="index"
                  :render="col"
                ></render>
                <template v-else>
                  <span>{{ col.name }}</span>
                </template>
              </div>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr
            v-for="(row, index) in body"
            :key="index"
            :style="{ height: BodyHeight + 'px' }"
            ref="bodytr"
          >
            <td v-if="ShowCheckbox" class="checkbox">
              <input
                type="checkbox"
                @click="checkedItem"
                :checked="CheckedItem"
              />
            </td>
            <td v-for="col in header" :key="col.key">
              <div>
                <render
                  v-if="col.type === 'render'"
                  :row="row"
                  :column="col"
                  :index="index"
                  :render="col.render"
                ></render>
                <template v-else>
                  <span :name="col.key">{{ row[col.key] }}</span>
                </template>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <table
      border="0"
      cellspacing="0"
      cellpadding="0"
      :class="{ isstripe: stripe }"
      :style="{ width: setwidth }"
      ref="tabbody"
      v-else-if="type == '2'"
    >
      <!-- <colgroup class="bodycg">
        <col />
        <col
          v-for="(col, index) in header"
          :key="index"
          :width="col.width +'px'|| ''"
        />
      </colgroup> -->
      <tbody>
        <tr
          v-for="(row, index) in body"
          :key="index"
          :style="{ height: BodyHeight + 'px' }"
          ref="bodytr"
        >
          <td>
            <!-- location:head -->
            <div class="head">
              <template v-for="col in header">
                <span :key="col.key" v-if="col.location == 'head'">{{
                  row[col.key]
                }}</span>
              </template>
            </div>
            <!-- location:body -->
            <div class="body">
              <template v-for="col in header">
                <span
                  :key="col.key"
                  v-if="col.location == 'body'"
                  :style="{ width: col.width + 'px' }"
                  >{{ row[col.key] }}</span
                >
              </template>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import render from "./render.js";
export default {
  name: "my-table-body",
  components: {
    render,
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
      default: () => [],
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
      this.header.forEach((el) => {
        allwidth += el.width;
      });
      this.fixedheader.forEach((el) => {
        leftallwidth += el.width;
      });
      this.rfixedheader.forEach((el) => {
        rightallwidth += el.width;
      });
      if (allwidth > this.$refs.tabbody.offsetWidth) {
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
                    data2.push({ name: item[al] });
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
      // else if (this.rfixedheader.length == 0) {
      //   document.getElementsByClassName("tab-fixed-right")[0].style.visibility =
      //     "hidden";
      // } else if (this.fixedheader.length == 0) {
      //   document.getElementsByClassName("tab-fixed-left")[0].style.visibility =
      //     "hidden";
      // }
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
    this.init();
    this.initGroup();
    this.initTableWidth();
    if (this.stripe) {
      this.$refs.bodytr.forEach((item, index) => {
        if (index % 2) {
          item.style.background = "#F6F7FB";
        }
      });
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
  },
};
</script>

 <style  scoped>
* {
  font-size: 13px;
}
.head {
  height: 40px;
  background-color: #eaf8ff;
  border: 1px solid #dbf3ff;
}
.body {
  height: 100px;
  background: #ffffff;
  /* border: 1px solid #dbf3ff; */
}
.head > span {
  height: 40px;
  display: table-cell;
  vertical-align: middle;
}
.body > span {
  height: 100px;
  display: table-cell;
  border: 1px solid #dbf3ff;
  border-right: none;
  vertical-align: middle;
}
.body > span:last-child {
  border-right: 1px solid #dbf3ff;
}
</style>
