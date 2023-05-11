//accesing state with getters 
export default{
    coaches(state){
        return state.coaches;
    },
    hasCoaches(state){ //helper - whether we have coaches or no returns true or false
        return state.coaches && state.coaches.length > 0;
    },
    isCoach(_,getters,_2,rootGetters){
        const coaches = getters.coaches;
        const userId = rootGetters.userId;
        return coaches.some(coach => coach.id === userId);
    },
    shouldUpdate(state){
        const lastFetch = state.lastFetch;
        if(!lastFetch){
            return true; // if we have no timestamp we should update
        }
        const currentTimeStamp = new Date().getTime();

        return(currentTimeStamp - lastFetch) / 1000 > 60; //return true if it is more then a minute ago. then we should update
    }
};