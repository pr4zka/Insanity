import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Stats } from './components/Stats'
import { Services } from './components/Services'
import { WhyUs } from './components/WhyUs'
import { Portfolio } from './components/Portfolio'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { SectionScroller } from './components/SectionScroller'
import { SectionDots } from './components/SectionDots'

export default function Home() {
  return (
    <div className="h-screen overflow-hidden bg-black">
      <Navbar />
      <SectionScroller overlay={<SectionDots />}>
        <Hero />
        <Stats />
        <Services />
        <WhyUs />
        <Portfolio />
        <Contact />
        <Footer />
      </SectionScroller>
    </div>
  )
}
