<template>
  <div class="statusdiv" :class="classObject">
    <div class="borderstatus"></div>
    <div class="fstatus">{{ status }}</div>
  </div>
</template>

<script>
export default {
  name: "MyStatus",
  props: ["status"],
  computed: {
    classObject: function () {
      return {
        submit_status: this.status == "已提交",
        consignment_status: this.status == "已发货",
      };
    },
  },
};
</script>

<style lang="less">
.statusdiv {
  position: absolute;
  right: 0px;
  top: 0px;
  text-align: right;
}

.fstatus {
  float: left;
  height: 40px;
  width: 60px;
  font-size: 14px;
  color: #ffffff;
  background-color: #ffffff;
  text-align: center;
  line-height: 40px;
}

.submit_status .fstatus {
  background-color: #78b47d;
}

.consignment_status .fstatus {
  background-color: #79a2b7;
}
</style>
