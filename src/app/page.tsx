import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { WhyUs } from './components/WhyUs'
import { Portfolio } from './components/Portfolio'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Hero />
      <Services />
      <WhyUs />
      <Portfolio />
      <Contact />
      <Footer />
    </div>
  )
}
