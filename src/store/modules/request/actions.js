export default {
   async  contactCoach(context, payload){
        const newRequest = {
            // coachId: payload.coachId,
            userEmail: payload.email,
            userMessage: payload.message, 
        };
       // console.log(newRequest)

      const response = await fetch(`https://find-coach-43d96-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,  {
           method: 'POST',
           body: JSON.stringify(newRequest)
       });

       const responseData = await response.json();

       if(!response.ok){
        const error = new Error(responseData.message || 'Failed to send');
        throw error;
       }

       newRequest.id = responseData.name;
       newRequest.coachId = payload.coachId;

        context.commit('addRequest', newRequest);
    },



   async fetchRequest(context) {
       const coachId =  context.rootGetters.userId;
       const token = context.rootGetters.token;
       const response = await fetch(`https://find-coach-43d96-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=` + token);
       const responseData = await response.json();

       if(!response.ok){
        const error = new Error(responseData.message || 'Failed to fetch request');
        throw error;
       }

       const requests = [];

       for (const key in responseData){
           const request = {
               id: key,
               coachId: coachId,
               userEmail: responseData[key].userEmail,
               message: responseData[key].message
           }
           requests.push(request);
       }

       context.commit('setRequests', requests);

    }

}