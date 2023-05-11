export default{
    async registerCoach(context,data){//storing data on firebase
        const userId = context.rootGetters.userId;
        const coachData = {
            firstName: data.first,
            lastName: data.last,
            description: data.desc,
            hourlyRate: data.rate,
            areas: data.areas,
        };
        
        const token = context.rootGetters.token;

        const response = await fetch(`https://coach-app-vue-c5707-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json?auth=`+token,{
            method: 'PUT', //with put data will be owerwritten if it existed or created if it didnt existed,with post a new entry would be added every time
            body: JSON.stringify(coachData)
        });

        //const responseData = await response.json(); // responce object .json method also returns a promise
        
        if (!response.ok){
            //error...
        }
        context.commit('registerCoach',{
            ...coachData,
            id: userId
        });
    },
    async loadCoaches(context,payload){//fetching data from firebase - no need for second arg we are using GET
        
        if(!payload.forceRefresh && !context.rootGetters.shouldUpdate){
            return;
        }
        
        const response = await fetch(`https://coach-app-vue-c5707-default-rtdb.europe-west1.firebasedatabase.app/coaches.json`);
        const responseData = await response.json();
        
        if(!response.ok){
            //error handling 
            const error = new Error(responseData.message || 'Failed to fetch');
            throw error;
        }
        //transforming data (object)we get from firebase into an array of objects 
        const coaches = [];

        for (const key in responseData){
            const coach = {
                id:key,
                firstName: responseData[key].firstName,
                lastName: responseData[key].lastName,
                description:  responseData[key].description,
                hourlyRate:  responseData[key].hourlyRate,
                areas:  responseData[key].areas,
            };
            coaches.push(coach);
        }

        context.commit('setCoaches',coaches);
        context.commit('setFetchTimestamp');
    }
};