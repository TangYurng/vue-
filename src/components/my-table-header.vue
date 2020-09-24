
<template>
  <table
    cellspacing="0"
    cellpadding="0"
    border="0"
    :style="{ width: setwidth }"
  >
    <colgroup class="headercg">
      <col v-if="ShowCheckbox" style="width: 36px" />
      <col
        v-for="(cell, colIndex) in header"
        :key="colIndex"
        :style="{ width: cell.width + 'px' }"
      />
      <col v-if="ShowOperation" class="ShowOperation" />
    </colgroup>
    <thead>
      <slot name="header" v-if="!showgroup"></slot>
      <!-- 多表头 -->
      <tr v-if="showgroup" ref="primarytr">
        <th v-if="ShowCheckbox" class="checkbox" rowspan="2">
          <input type="checkbox" @click="checkedAll" :checked="CheckedALL" />
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
                <i class="sort-caret ascending" @click="clicksort($event)"></i>
                <i class="sort-caret descending" @click="clicksort($event)"></i>
              </span>
            </div>
          </div>
        </th>
        <th v-if="ShowOperation" class="ShowOperation" rowspan="2">
          <span>操作</span>
        </th>
      </tr>
      <!-- 二级表头 -->
      <tr v-if="showgroup">
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
                <i class="sort-caret ascending" @click="clicksort($event)"></i>
                <i class="sort-caret descending" @click="clicksort($event)"></i>
              </span>
            </div>
          </div>
        </th>
      </tr>
    </thead>
  </table>
</template>
 
<script>
export default {
  name: "my-table-tr",
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
  mounted() {},
};
</script>
