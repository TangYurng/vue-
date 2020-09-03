<template>
  <div class="table" ref="mytable">
    <div class="content">
      <div class="tab-fixed-left"></div>
      <div class="tab-scroll">
        <div class="header">
          <table cellspacing="0" cellpadding="0" border="0" :style="{width: setwidth}">
            <colgroup>
              <col v-if="ShowCheckbox" style="width: 36px;" />
              <col
                v-for="(cell, colIndex) in header"
                :key="colIndex"
                :style="{width: cell.width+'px'}"
              />
            </colgroup>
            <thead>
              <tr :style="{height: HeaderHeight + 'px'}">
                <th v-if="ShowCheckbox" class="checkbox">
                  <input type="checkbox" />
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
                            <span>重置</span><span>确认</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div v-if="cell.showsort" ref="showsort" style="display:inline-block">
                      <span class="caret-wrapper" @click="clicksort">
                        <i class="sort-caret ascending"></i>
                        <i class="sort-caret descending"></i>
                      </span>
                    </div>
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
          >
            <colgroup>
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
                  <input type="checkbox" />
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
      <div class="tab-fixed-right"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Three",
  data() {
    return {
      setwidth: "auto",
      filters: false,
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
    // showfilter: {
    //   type: Boolean,
    //   default: false,
    // },
    // showsort: {
    //   type: Boolean,
    //   default: false,
    // },
    width: [String, Number],
    height: [String, Number],
  },
  methods: {
    // 表格初始化宽度
    initTableWidth() {
      let allwidth = 0;
      if (!this.ShowCheckbox) {
        this.ShowCheckbox = 0;
      } else {
        allwidth += 50;
      }
      this.header.forEach((el) => {
        allwidth += el.width;
      });
      if (allwidth > this.$refs.mytable.offsetWidth) {
        this.setwidth = allwidth + "px";
      } else {
        this.setwidth = "100%";
      }
    },
    cilckfilter(e) {
      console.log(e);
      this.filters = !this.filters;
    },
    clicksort(){
      console.log(this.$refs.showsort.firstChild.)
    }
  },
  created() {},
  mounted() {
    console.log(this.header);
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
.header {
  color: #4e546c;
  font-size: 14px;
  font-weight: bold;
}
.header tr {
  background-color: #e4eafa;
}
.header th:nth-child(n + 2) {
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
.filters li{
  padding: 4px 10px;
  margin-bottom: 5px;
}
.filters li:last-child{
  border-top: 1px solid #000;
}
.filters .line{
  width: 100%;
  height: 1px;
  background: #000;
}
.filters input{
  margin-right: 8px;
}
.filters span{
  color: #353944;
  font-size: 13px;
  font-weight: normal;
  padding-left: 5px;
  padding-right: 15px;
}
.body {
  color: #353944;
  font-size: 13px;
}
.body td:nth-child(n + 2) {
  border-left: 1px dashed #e9e9e9;
}
.body td {
  cursor: pointer;
}
</style>