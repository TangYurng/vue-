<template>
  <table
    cellspacing="0"
    cellpadding="0"
    border="0"
    :class="{ isstripe: stripe }"
    :style="{ width: setwidth }"
    ref="tabbody"
  >
    <colgroup class="bodycg">
      <col v-if="ShowCheckbox" style="width: 36px" />
      <col
        v-for="(cell, colIndex) in header"
        :key="colIndex"
        :style="{ width: cell.width + 'px' }"
      />
      <col v-if="ShowOperation" class="ShowOperation" />
    </colgroup>
    <tbody>
      <slot name="body"></slot>
    </tbody>
  </table>
</template>
 
<script>
export default {
  name: "my-table-td",
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
};
</script>