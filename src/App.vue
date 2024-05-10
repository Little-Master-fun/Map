<script>
import Map from './views/map.vue'

export default {
  components:{
    Map
  }
}
</script>

<template>
  <el-container>
    <el-header>
    </el-header>
    <el-main>
      <Map></Map>
    </el-main>
    <el-footer>
    </el-footer>
  </el-container>
</template>

<style scoped>

  .el-main {
    background-color: #e9eef3;
    color: var(--el-text-color-primary);
    text-align: center;
    line-height: 667px;
    --el-main-padding: 0px
  }
  .el-header {
    --el-header-padding: 0 20px;
    --el-header-height: 0px;
    box-sizing: border-box;
    flex-shrink: 0;
    height: var(--el-header-height);
    padding: var(--el-header-padding);
}
.el-footer {
    --el-footer-padding: 0px;
    --el-footer-height: 0px;
    box-sizing: border-box;
    flex-shrink: 0;
    height: var(--el-footer-height);
    padding: var(--el-footer-padding);
}
</style>
