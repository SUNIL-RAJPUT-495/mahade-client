export const baseURL = "https://matka-backend-xi.vercel.app";

const SummaryApi = {
    creatUser: {
        url: baseURL + "/api/user/create-user",
        method: "post"
    },
    loginUser: {
        url: baseURL + "/api/user/login-user",
        method: "post"
    },
    getUserProfile: {
        url: baseURL + "/api/user/get-user-profile",
        method: "get"
    },
    addGame: {
        url: baseURL + "/api/market/add-market",
        method: "post"

    },
    getGame: {
        url: baseURL + "/api/market/get-all-markets",
        method: "get"
    },
    placeBid: {
        url: baseURL + "/api/bid/place-bid",
        method: "post"
    },

    addMoney: {
        url: baseURL + "/api/transaction/create-deposit-request",
        method: "post"
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
    getUserBids: {
        url: baseURL + "/api/bid/get-user-bids",
        method: "get"
    },
    getAllBids: {
        url: baseURL + "/api/bid/get-all-bids",
        method: "get"
    },
    declareResult: {
        url: baseURL + "/api/market/declare-result",
        method: "post"
    },
    createWithdrawalRequest: {
        url: baseURL + "/api/transaction/withdraw",
        method: "post"
    },
    getAllWithdrawals: {
        url: baseURL + "/api/transaction/all-withdrawals",
        method: "get"
    },
    updateWithdrawalStatus: {
        url: baseURL + "/api/transaction/update-withdrawal-status",
        method: "put"
    },
    getAllUsers: {
        url: baseURL + "/api/user/get-all-users",
        method: "get"
    },
    getAdminDashboardStats: {
        url: baseURL + "/api/user/admin-dashboard-stats",
        method: "get"
    },
    getUserPassbook: {
        url: baseURL + "/api/user/my-passbook",
        method: "get"
    },
    // Chat Support APIs
    getChatUsers: {
        url: baseURL + "/api/chat/get-users",
        method: "get"
    },
    getChatHistory: {
        url: baseURL + "/api/chat/getUserChatHistory",
        method: "get"
    },
    sendMessage: {
        url: baseURL + "/api/chat/send",
        method: "post"
    },
    getUnreadCount: {
        url: baseURL + "/api/chat/unread-count",
        method: "get"
    },
    markAsRead: {
        url: baseURL + "/api/chat/mark-read",
        method: "post"
    },
    getAllResults: {
        url: baseURL + "/api/market/get-all-results",
        method: "get"
    },
    getAllNotifications: {
        url: baseURL + "/api/notification/get-all-notifications",
        method: "get"
    },
    changePassword: {
        url: baseURL + "/api/user/change-password",
        method: "put"
    },
    addUpi: {
        url: baseURL + "/api/upi/add-upi",
        method: "post"
    },
    getAllUpis: {
        url: baseURL + "/api/upi/all-upi",
        method: "get"
    },
    setActiveUpi: {
        url: baseURL + "/api/upi/set-active-upi",
        method: "put"
    },
    deleteUpi: {
        url: baseURL + "/api/upi/delete-upi",
        method: "delete"
    },
    updateUpi: {
        url: baseURL + "/api/upi/update-upi",
        method: "put"
    },
    getActiveUpi: {
        url: baseURL + "/api/upi/active-upi",
        method: "get"
    },
    getTransactionSettings: {
        url: baseURL + "/api/transaction-setting/get-transaction-settings",
        method: "get"
    },
    updateTransactionSettings: {
        url: baseURL + "/api/transaction-setting/update-transaction-settings",
        method: "post"
    }
}
export default SummaryApi
