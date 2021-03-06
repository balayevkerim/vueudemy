export default {
    async registerCoach(context,data){
        const userId = context.rootGetters.getUser;
        const token = context.rootGetters.getToken
        const payload = {
            firstName:data.firstName,
            lastName:data.lastName,
            description:data.description,
            hourlyRate:data.rate,
            areas:data.areas
        }
        const response  =await fetch(`https://vue-demo-54831-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json?auth=${token}`,{
            method:'PUT',
            body:JSON.stringify(payload)
        })
        if(!response.ok){
            //error
        }
        // const responseData= await response.json();

        context.commit('registerCoach',{
            ...payload,
            id:userId
        })
    },

    async loadCoachesFromServer(context){

        const response  = await fetch('https://vue-demo-54831-default-rtdb.europe-west1.firebasedatabase.app/coaches.json')
        const responseData = await response.json()
        if(!response.ok){
            const error  = new Error(responseData.message || 'Failed to fetch, Something went wrong');

            throw error
        }
        const coaches = []

        for (const key in responseData) {
            const coach = {
                id:key,
                firstName:responseData[key].firstName,
                lastName:responseData[key].lastName,
                description:responseData[key].description,
                hourlyRate:responseData[key].hourlyRate,
                areas:responseData[key].areas

            }
            coaches.push(coach)
        }
        context.commit('setCoaches',coaches)

    }
}