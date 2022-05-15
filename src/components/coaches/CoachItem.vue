<template>
    <li>
        <h3>{{  fullName }}</h3>
        <h4>${{ rate }}/hour</h4>
        <div>
            <!-- <span v-for="area in areas" :key="area">{{ area }}</span> -->

            <base-badge :type="area" :title="area" v-for="area in areas" :key="area"></base-badge>
        </div>
        <div class="actions">
            <!-- <router-link :to="coachContactLink">Contact</router-link>
            <router-link :to="coachDetails">View Details</router-link> -->

            <base-button mode="outline" link :to="coachContactLink">Contact</base-button>
            <base-button link :to="coachDetails">View Details</base-button>
        </div>
    </li>
</template>

<script>
import BaseBadge from '../ui/BaseBadge.vue';
export default {
  components: { BaseBadge },
    props:['id', 'firstName', 'lastName', 'rate', 'areas'],
    computed: {
        fullName() {
            return this.firstName + ' ' + this.lastName
        },
        coachContactLink() {
            //This is better than just declaring it
            return this.$route.path + '/' + this.id + '/contact'; //coaches/c1/contact
        },
        coachDetails() {
            return '/coaches/' + this.id; //coaches/c1
        }
    }
}
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>