<template>
  <i :class="'el-icon-' + name"></i>
</template>

<script>
export default {
  name: "",
  props: {
    name: String,
  },
};
</script>

<style>
.van-icon-new:before {

    content: "\e7d7";}
  
.van-icon-editor:before {

    content: "\e7d7";
  
  }
.van-icon-copy:before {

    content: "\e7d7";
  
  }
.van-icon-delete:before {

    content: "\e7d7";
  
  }
.van-icon-share:before {

    content: "\e7d7";
  
  }
.van-icon-round:before {

    content: "\e7d7";
  
  }
.van-icon-caret-right:before {

    content: "\e7d7";
  
  }
  .van-icon-caret-left:before {

    content: "\e7d7";
  
  }
  .van-icon-caret-more:before {

    content: "\e7d7";
  }
  .van-icon-break:before {

    content: "\e7d7";
  
  }
  .van-icon-move-up:before {

    content: "\e7d7";
  
  }
  .van-icon-move-down:before {

    content: "\e7d7";
  
  }
</style>