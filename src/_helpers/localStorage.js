export const loadState = () => {
    try {
        const serializedState = sessionStorage.getItem('state');
        //console.log('loadState has retrieved state : ', JSON.parse(serializedState))
        if(serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state) => {
    //console.log('saveState has received state : ', state)
    try {
        const serializedState = JSON.stringify(state);
        sessionStorage.setItem('state', serializedState);
    } catch (err) {
        //Ignore logging the error
        console.log(err);
    }
};