export const baseURL = "http://localhost:5000";

const SummaryApi = {
    creatUser:{
        url:baseURL+"/api/user/create-user",
        method:"post"
    },  
    loginUser:{
        url:baseURL+"/api/user/login-user",
        method:"post"
    },
    getUserProfile:{
        url:baseURL+"/api/user/get-user-profile",
        method:"get"
    },
    addGame: {
        url:baseURL+"/api/game/add-game",
        method :"post"

    },
    getGame: {
        url: baseURL + "/api/game/get-all-games",
        method: "get"
    },
    placeBid:{
        url: baseURL + "/api/game/place-bid",
        method:"post"
    },

    addMoney:{
        url: baseURL + "/api/transaction/create-deposit-request",
        method:"post"
    },
    pendingDeposits: {
        url: baseURL + "/api/transaction/pending-deposits",
        method: "get"
    },
    allTransactions: {
        url: baseURL + "/api/transaction/all-transactions",
        method: "get"
    },
    updateTransactionStatus: {
        url: baseURL + "/api/transaction/update-transaction-status",
        method: "put"
    },
    updateStatusAdmin: {
        url: baseURL + "/api/transaction/update-status",
        method: "post"
    },
    getAllBids: {
        url: baseURL + "/api/game/get-all-bids",
        method: "get"
    },
    declareResult: {
        url: baseURL + "/api/game/declare-result",
        method: "post"
    },


}
export default SummaryApi
