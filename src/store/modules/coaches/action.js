export default {
   async registerCoach(context, data){
        const userId = context.rootGetters.userId;
        const coachData = {
            firstName: data.first,
            lastName: data.last,
            description: data.desc,
            hourlyRate: data.rate,
            areas: data.areas
        };

    const token = context.rootGetters.token;


      const response = await fetch(`https://find-coach-43d96-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=` + token, {
            method: 'PUT',
            body: JSON.stringify(coachData)
        });

       // const responseData = await response.json();
        if(!response.ok){
            //error...
        }

        context.commit('registerCoach', {
            ...coachData,
            id: userId
        });
    },


    async loadCoaches(context, payload) { //it can accept a payload
      
    if(!payload.forceRefresh && !context.getters.shouldUpdate){
        return;
    }
      
     const response = await fetch(`https://find-coach-43d96-default-rtdb.firebaseio.com/coaches.json`);

      const responseData = await response.json();
      if(!response.ok){
          //error handling
          const error = new Error(responseData.message || 'Failed to fetch');
          throw error;
      }

      const coaches = [];
      for(const key in responseData){
          const coach = {
            id: key,
            firstName: responseData[key].firstName,
            lastName: responseData[key].lastName,
            description: responseData[key].description,
            hourlyRate: responseData[key].hourlyRate,
            areas: responseData[key].areas
          };
          coaches.push(coach);
      }

      context.commit('setCoaches', coaches);
      context.commit('setFetchTimestamp');

    }

}