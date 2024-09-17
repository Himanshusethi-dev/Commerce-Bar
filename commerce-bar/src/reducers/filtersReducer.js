export  const filtersReducer = (state,action)=>{

    switch(action.type){
        case 'add' : {
            let entry = {
               [action.label] : action.input
            }
            return [...state,entry]
        }
        case 'remove' :{
            return state.filter((filter)=>{
                if(!filter[action.label]){
                    return filter;
                }
            })
        }
        case 'priceChange' : {
            // console.log(action.input,action.label)
            let removedDuplicate = state.filter((filter)=>{
                if(!filter[action.label]){
                    return filter
                }
            })
            return [...removedDuplicate,action.input]
        }
        default: {
             return [...state]
        }
    }
}