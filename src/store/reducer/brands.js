const initialState = {
    brands:[]
}
const brandsReducer = (state = initialState,action)=>{
    switch(action.type)
    {
        case "BRANDS":
            return {...state,brands:action.brands};
       
        
    }
    return state;
}
export default brandsReducer;