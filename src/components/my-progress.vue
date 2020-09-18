<template>
  <div>
    <div class="progress-bar">
      <div class="progress-bar__outer" style="height: 26px;">
        <div class="progress-bar__inner" style="width: 70%;">
          <div class="progress-bar__innerTip"></div>
          <div class="progress-bar__innerRound"></div>
        </div>
        <div class="progress-bar__innerText">{{show}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyProgress",
  props: ["show"],
};
</script>

<style>
.progress-bar {
  display: inline-block;
  vertical-align: middle;
  width: 300px;
  box-sizing: border-box;
}
.progress-bar__outer {
  height: 6px;
  background-color: #eff4f8;
  /* overflow: hidden; */
  position: relative;
  vertical-align: middle;
}
.progress-bar__inner {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background-image: linear-gradient(90deg, #06c485 0%, #30c3f9 100%);
  text-align: right;
  line-height: 1;
  white-space: nowrap;
  transition: width 0.6s ease;
}
.progress-bar__innerTip{
    position: absolute;
    right: -2px;
    bottom: 0;
    width: 2px;
    height: 30px;
    background: #30c3f9;
}
.progress-bar__innerRound{
    position: absolute;
    right: -8px;
    bottom: 30px;
    width: 0;
    height: 0;
    border: 7px solid #30c3f9;
    border-radius: 50%;
}
.progress-bar__innerText {
    position: absolute;
  display: inline-block;
  vertical-align: middle;
  color: #0bc492;
  font-size: 12px;
  /* margin: 0 5px; */
  top: 26px;
  left: 192px;
}
</style>