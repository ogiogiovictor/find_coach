<template>
<div>
<base-dialogue @close="handleError" :show="!!error" title="An error occured">
    <p>{{ error }}</p>
</base-dialogue>
    <section>
        <base-card>
         <header>
             <h2>Requests Recived</h2>
         </header>
         <base-spinner v-if="isLoading"></base-spinner>
          <ul v-else-if="hasRequest && !isLoading">
            <request-item v-for="req in recivedRequest" 
            :key="req.id" 
            :email="req.userEmail"
            :message="req.userMessage"></request-item>
          </ul>
        <h3 v-else>You haven't recievvd any request yet!</h3>
        </base-card>
    </section>
</div>
</template>

<script>
import RequestItem from '@/components/requests/RequestItem.vue';

export default {
    components: {
        RequestItem
    },
    data() {
      return {
        isLoading: false,
        error: null
      }
    },

    computed: {
        recivedRequest() {
          console.log(this.$store.getters['request/requests'])
            return this.$store.getters['request/requests']
        },
        hasRequest(){
            return this.$store.getters['request/hasRequests']
        }
    },

    created() {
      this.loadRequest();
    },

    methods: {
      async loadRequest() {
        this.isLoading = true;
        try{
          await this.$store.dispatch('request/fetchRequest')
        
        }catch(error) {
          this.error = error.message || 'Something failed!';
        }
       this.isLoading = false;
      },

      handleError() {
        this.error = null
      }
    }
}
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>