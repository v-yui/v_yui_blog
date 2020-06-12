<template>
  <div class="HomeContainer">
    <div class="middle">
      <h1>This is yui's blog ;)</h1>
      <h1 id="flower">❀</h1>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="less" scoped>
.HomeContainer {
  width: 100%;
  height: 100%;
  background-color: #6589d7;
  position: absolute;
  text-align: center;
  color: white;

 .middle {
    width: 50%;
    background-color: white;
    border-radius: 5px;
    box-shadow: 5px 8px 10px rgb(50, 68, 116);
    padding: 3px;
    position: absolute;
    top: 50px;
    left: 30px;
    color: #dcdcdc;
    transition: all 0.5s;

    h1 {
      float: left;
    }
    #flower {
      transition: transform 1s;
      transform-origin: 50% 50%;
    }
    #flower:hover {
      transform: rotate(360deg);
    }
  }
  .middle:hover {
    color: #6589d7;
    box-shadow: 5px 8px 10px rgb(98, 118, 172);
  }
}
</style>
