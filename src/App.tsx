import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SiteHeader } from './components/SiteHeader'
import { SiteFooter } from './components/SiteFooter'
import { CookieBanner } from './components/CookieBanner'
import { ScrollToTop } from './components/ScrollToTop'
import Home from './pages/Home'
import Pricing from './pages/Pricing'
import HowItWorks from './pages/HowItWorks'
import Contact from './pages/Contact'
import PlanDetail from './pages/PlanDetail'
import OrderForm from './pages/OrderForm'
import Privacy from './pages/Privacy'
import Cookies from './pages/Cookies'
import Terms from './pages/Terms'
import Admin from './pages/Admin'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <SiteHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/plans/:planId" element={<PlanDetail />} />
        <Route path="/order/:planId" element={<OrderForm />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <SiteFooter />
      <CookieBanner />
    </BrowserRouter>
  )
}