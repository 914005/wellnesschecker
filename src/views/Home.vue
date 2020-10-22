<template>
  <div class="home">
    <wellnessform />
  </div>
  
</template>

<script>
// @ is an alias to /src
import wellnessform from '@/components/wellnessform.vue'

export default {
  name: 'Home',
  components: {
    wellnessform
  }
}
</script>
