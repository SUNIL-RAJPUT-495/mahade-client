import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ProtectedRoute, ProtectedRouteAdmin } from "./components/ProtectedRoute"
import { Sign } from "./pages/Sign"
import { Login } from "./pages/Login"

import MainLayerOut from "./layerout/MainLayerOut"
import Profile from "./pages/userDeshbord/Profile"
import GamerRatesPage from "./pages/userDeshbord/GamerRatesPage"
import Home from "./pages/userDeshbord/Home"
import { BidPage } from "./pages/userDeshbord/BidPage"
import { PassbookPage } from "./pages/userDeshbord/passbookPage"
import { PaymentPage } from "./pages/userDeshbord/PaymentPage"
import { AboutPage } from "./pages/userDeshbord/AboutPage"
import { ReferPage } from "./pages/userDeshbord/ReferPage"
import { NoticePage } from "./pages/userDeshbord/NoticePage"
import { HowTOPlay } from "./pages/userDeshbord/HowTOPlay"
import GamePlay from "./pages/userDeshbord/GamePlay"
import DepositPage from "./pages/userDeshbord/DepositPage"

// admin 
import { AdminLogin } from "./pages/AdminLogin"
import { AdminSign } from "./pages/AdminSign"
import { AdminLayout } from "./layerout/AdminLayout"
import { AdminDashboard } from "./pages/adminDashbord/AdminDashboard"
import { AddGamesPages } from "./pages/adminDashbord/AddGamesPages"
import { AdminBidPage } from "./pages/adminDashbord/AdminBidPage"
import { UpiSettingsPage } from "./pages/adminDashbord/UpiSettingsPage"
import { ReferralManagementPage } from "./pages/adminDashbord/ReferralManagementPage"
import { BonusManagementPage } from "./pages/adminDashbord/BonusManagementPage"
import { HowToPlayManager } from "./pages/adminDashbord/HowToPlayManager"
import { NotificationSenderPage } from "./pages/adminDashbord/NotificationSenderPage"
import { DeclearResult } from "./pages/adminDashbord/DeclearResult"
import { WithdrawalRequestsPage } from "./pages/adminDashbord/WithdrawalRequestsPage"
import { DepositRequestsManagement } from "./pages/adminDashbord/DepositRequestsManagement"
import { GameRatesManagement } from "./pages/adminDashbord/GameRatesManagement"
import { GameResultAdminPanel } from "./pages/adminDashbord/GameResultAdminPanel"
import { ContactManagementPage } from "./pages/adminDashbord/ContactManagementPage"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/Login" element={<Login />} />
                <Route path="/sign" element={<Sign />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/admin-signup" element={<AdminSign />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<MainLayerOut />}>
                        <Route index element={<Home />} />
                        <Route path="Profile" element={<Profile />} />
                        <Route path="GamerRatesPage" element={<GamerRatesPage />} />
                        <Route path="history" element={<BidPage />} />
                        <Route path="BidPage" element={<BidPage />} />
                        <Route path="passbook" element={<PassbookPage />} />
                        <Route path="payment" element={<PaymentPage />} />
                        <Route path="wallet" element={<PaymentPage />} />
                        <Route path="about" element={<AboutPage />} />
                        <Route path="support" element={<AboutPage />} />
                        <Route path="refer" element={<ReferPage />} />
                        <Route path="notice" element={<NoticePage />} />
                        <Route path="HowTOPlay" element={<HowTOPlay />} />
                        <Route path="add-funds" element={<DepositPage />} />
                    </Route>
                    <Route path="/play/:id" element={<GamePlay />} />
                </Route>
                <Route element={<ProtectedRouteAdmin />}>
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<AdminDashboard />} />
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="AddGame" element={<AddGamesPages />} />
                        <Route path="AdminBid" element={<AdminBidPage />} />
                        <Route path="upi" element={<UpiSettingsPage />} />
                        <Route path="contact" element={<ContactManagementPage />} />
                        <Route path="referal" element={<ReferralManagementPage />} />
                        <Route path="bonus" element={<BonusManagementPage />} />
                        <Route path="NotificationSender" element={<NotificationSenderPage />} />
                        <Route path="HowToPlay" element={<HowToPlayManager />} />
                        <Route path="DeclearResult" element={<DeclearResult />} />
                        <Route path="Withdraw" element={<WithdrawalRequestsPage />} />
                        <Route path="Payment" element={<DepositRequestsManagement />} />
                        <Route path="GameRatesAdmin" element={<GameRatesManagement />} />
                        <Route path="ResultDecleare" element={<GameResultAdminPanel />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter >
    )
}

export default App;