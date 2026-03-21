import { BrowserRouter, Route, Routes, Router } from "react-router-dom"
import { Sign } from "./pages/Sign"
import {Login} from "./pages/Login"
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
function App() {
    return (<>
        <BrowserRouter>
            <Routes>
                <Route path="/Login" element={<Login />} />
                <Route path="/sign" element={<Sign />} />
                <Route path="/" element={<MainLayerOut />}>
                    <Route index element={<Home />} />
                    <Route path="/" element={<Home />}/>
                    <Route path="Profile" element={<Profile />} />
                    <Route path="GamerRatesPage" element={<GamerRatesPage />} />
                    <Route path="BidPage" element={<BidPage/>}/>
                    <Route path="passbook" element={<PassbookPage/>}/>
                    <Route path="payment" element={<PaymentPage/>}/>
                    <Route path="about" element={<AboutPage/>}/>
                    <Route path="refer" element={<ReferPage/>}/>
                    <Route path="notice" element={<NoticePage/>}/>
                    <Route path="HowTOPlay" element={<HowTOPlay/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </>
    )

}
export default App