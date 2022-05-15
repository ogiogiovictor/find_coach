<template>
<div>
<base-dialogue @close="handleError" :show="!!error" title="An error occured">
    <p>{{ error }}</p>
</base-dialogue>

    <section>
        <coach-filter @change-filter="setFilters"></coach-filter>
    </section>

    <section>
        <base-card>
        <div class="controls">
            <!-- <button>Refresh</button> -->
            <base-button @click="loadCoaches(true)" mode="outline">Refresh</base-button>
             <base-button link to="/auth?redirect=register" v-if="!isLoggedIn">Login</base-button>
            <base-button v-if="isLoggedIn && !isCoach && !isLoading" link to="/register">Login to Register as Coach</base-button>
            <!-- <router-link to="/register">Register</router-link> -->
        </div>
        <div v-if="isLoading">
            <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches">
            <coach-item v-for="coach in filteredCoaches" 
            :key="coach.id" 
            :id="coach.id" 
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"
            ></coach-item>
            <!-- <li v-for="coach in filteredCoaches" :key="coach.id"> {{ coach.firstName }}</li> -->
        </ul>
        <h3 v-else>No coache Found</h3>
        </base-card>
    </section>
    </div>
</template>


<script>
import CoachItem from '@/components/coaches/CoachItem.vue';
import CoachFilter from '@/components/coaches/CoachFilter.vue';


export default {
  components: { CoachItem, CoachFilter },
  data(){
      return {
          isLoading: false,
          error: null,
          activeFilters: {
              frontend: true,
              backend: true,
              career: true,
          }
      }
  },
    //We can reach out to coaches getters with the computed property
    // The first coaches is the name space and the send coaches is the getter name
    computed: {
        isLoggedIn(){
            return this.$store.getters.isAuthenticated;
        },
        isCoach() {
            return this.$store.getters['coaches/isCoach']
        },

        filteredCoaches() {
            // return this.$store.getters['coaches/coaches'];
         const coaches = this.$store.getters['coaches/coaches'];
         return coaches.filter(coach => {
             if(this.activeFilters.frontend && coach.areas.includes('frontend')){
                 return true;
             }
             if(this.activeFilters.backend && coach.areas.includes('backend')){
                 return true;
             }
             if(this.activeFilters.career && coach.areas.includes('career')){
                 return true;
             }

             return false;
         });
        },
        hasCoaches(){
            return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
        }
    },

    created(){
        this.loadCoaches();
    },

    methods: {
        setFilters(updatedFilters) {
            this.activeFilters = updatedFilters
        },
        async loadCoaches(refresh = false){
            this.isLoading = true;

            try{
                await  this.$store.dispatch('coaches/loadCoaches', {forceRefresh: refresh});
            }catch(error){
                this.error = error.message || 'Something went wrong';
            }
            this.isLoading = false;
       },

       handleError(){
           this.error = null;
       }
    }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>