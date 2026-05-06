import Hero     from '../component/CompHome/Hero'
import About    from '../component/CompHome/About'
import Features from '../component/CompHome/Features'
import Team     from '../component/CompHome/Team'
import CTA      from '../component/CompHome/Cta'
import Footer   from '../component/Footer'
import Navbar   from '../component/Navbar'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Team />
      <CTA />
      <Footer />
    </>
  )
}