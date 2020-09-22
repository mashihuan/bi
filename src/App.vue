<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" :key="$route.fullPath" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" :key="$route.fullPath" />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
