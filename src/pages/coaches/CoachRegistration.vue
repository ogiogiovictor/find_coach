<template>
<div>
    <section>
        <base-card>
        <h2>Register as a coach now!</h2>
        <coach-form @save-data="saveData"></coach-form>
        </base-card>
    </section>
</div>
</template>

<script>
import CoachForm from '@/components/coaches/CoachForm.vue';
export default {
    components :{
        CoachForm
    }, 
   
    methods: {
        saveData(data){
            console.log(data);
            //Namepsace plus action. you only dispatch an action
           this.$store.dispatch('coaches/registerCoach', data);
        // this.$router.push('/coaches');
        //Use replace when you don't want to go back to the previous page
        this.$router.replace('/coaches');
        }
    }
}
</script>
