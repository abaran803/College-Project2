const allAccounts = [];
export const signup = async (email, password) => {
    const isExist = allAccounts.find(item => item.email);
    if(isExist) {
        return false;
    }
    allAccounts.push({email, password});
    console.log(allAccounts);
    return true;
}
export const login = async (email, password) => {
    const isExist = allAccounts.find(item => item.email === email);
    console.log(allAccounts, isExist);
    if(!isExist) {
        return false;
    }
    const ind = allAccounts.findIndex(item => item.email);
    if(allAccounts[ind].password === password) {
        return true;
    }
}