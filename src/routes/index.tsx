import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowDownRight, ArrowUpRight, Check, CheckCircle2, ChevronRight, Droplets, Flower2, Hammer, Leaf, Menu, Scissors, ShieldCheck, Sprout, Sun, TreePine, X, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatePresence, MotionConfig, motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import verygreenLogo from '@/assets/verygreen-logo-leaves.png'
import heroGarden from '@/assets/hero-garden.jpg'
import lawnPhoto from '@/assets/hero.jpg'
import gardenPhoto from '@/assets/patio.jpg'
import carePhoto from '@/assets/garden.jpg'
import plantingPhoto from '@/assets/path.jpg'

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'VeryGreen — Gardens that stay impossibly green' },
    { name: 'description', content: 'Thoughtful landscape design, garden planting, lawn care and outdoor improvements. Explore garden inspiration and prepare your project enquiry with VeryGreen.' },
    { property: 'og:title', content: 'VeryGreen — Landscape design, build & care' },
    { property: 'og:description', content: 'Good gardens start with a thoughtful plan. Discover practical landscaping services, real garden photography and seasonal care.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { property: 'og:image', content: heroGarden },
    { name: 'twitter:image', content: heroGarden },
  ] }),
  component: Index,
})

const services = [
  { icon: Scissors, title: 'Weekly Lawn Care', description: 'Regular mowing, clean edges and tidy paths. Cutting heights are adjusted to the season and your lawn’s condition.', detail: 'Weekly or fortnightly' },
  { icon: Flower2, title: 'Garden Design', description: 'Planting plans shaped by your soil, sunlight and everyday life. Year-round interest, not just a good first summer.', detail: 'Designed for your space' },
  { icon: Hammer, title: 'Patios & Stonework', description: 'Patios, paths and garden walls with considered drainage, a solid base and materials that suit your home.', detail: 'Site-specific quotes' },
  { icon: TreePine, title: 'Tree & Hedge', description: 'Seasonal hedge shaping and careful shrub pruning. Specialist tree work is assessed separately before scheduling.', detail: 'Seasonal maintenance' },
  { icon: Droplets, title: 'Smart Irrigation', description: 'Targeted watering for lawns and planting beds. Practical layouts that reduce waste and reach the roots.', detail: 'Water-wise planning' },
  { icon: Sun, title: 'Night Lighting', description: 'Warm, low-voltage lighting for paths, seating areas and planting. A little light, exactly where it belongs.', detail: 'Thoughtfully placed' },
]
const projects = [
  { photo: gardenPhoto, category: 'Garden inspiration · Established planting', name: 'A garden with room to breathe', alt: 'Real landscaped garden with mature trees, a pond, lawn and colourful flowering shrubs' },
  { photo: lawnPhoto, category: 'Lawn care · Healthy foundations', name: 'The everyday green lawn', alt: 'Real freshly maintained green lawn beside a contemporary home' },
  { photo: plantingPhoto, category: 'Planting · From the ground up', name: 'Small beginnings, lasting colour', alt: 'Real young plants growing in individual pots in a sunlit nursery' },
  { photo: carePhoto, category: 'Garden care · Hands-on details', name: 'Good gardens start in the soil', alt: 'Real garden trowel, potting soil and plants on a gardening workbench' },
]
const steps = [
  ['Walkthrough', 'A site visit starts with your ideas, then sunlight, soil, access and drainage. We work out what your garden needs before recommending a solution.'],
  ['The plan', 'A clear scope, considered materials and a written estimate. Design, preparation and ongoing care are discussed before work begins.'],
  ['The work', 'The agreed plan becomes a practical schedule. Weather, access and the size of the project determine the timing — not a one-size-fits-all promise.'],
  ['Kept green', 'A useful care plan covers watering, feeding and seasonal pruning. Choose regular maintenance or look after your new garden yourself.'],
]
const links = [['Services', '#services'], ['Work', '#work'], ['Process', '#process'], ['Care', '#care']]
const rv={initial:{opacity:0,y:48,filter:'blur(8px)'},whileInView:{opacity:1,y:0,filter:'blur(0px)'},viewport:{once:true,amount:0.12}} as const
const rvClip={initial:{opacity:0,clipPath:'inset(18% 8% 18% 8% round 28px)',scale:1.04},whileInView:{opacity:1,clipPath:'inset(0% 0% 0% 0% round 28px)',scale:1},viewport:{once:true,amount:0.2}} as const
const rvSide={initial:{opacity:0,x:-60},whileInView:{opacity:1,x:0},viewport:{once:true,amount:0.3}} as const
function ScrollProgress(){const {scrollYProgress}=useScroll();const x=useSpring(scrollYProgress,{stiffness:120,damping:30});return <motion.div className="scroll-progress" style={{scaleX:x}} aria-hidden />}
const ease=[0.16,1,0.3,1] as const
function HeroPhoto() {
  const { scrollY } = useScroll()
  const reducedMotion = useReducedMotion()
  const smoothScroll = useSpring(scrollY, { stiffness: 80, damping: 30, restDelta: 0.5 })
  const y = useTransform(smoothScroll, [0, 900], [0, 160])
  const scale = useTransform(smoothScroll, [0, 900], [1.06, 1.14])
  return <motion.img className="hero-photo" src={heroGarden} alt="Manicured emerald lawn and sculpted hedges at golden hour" fetchPriority="high" style={{ y: reducedMotion ? 0 : y, scale: reducedMotion ? 1 : scale }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4 }} />
}
function Brand() { return <a href="#top" className="brand" aria-label="VeryGreen home"><span className="brand-mark"><img src={verygreenLogo} alt="" width={1024} height={1024} /></span><span>Very<span className="brand-green">Green</span></span></a> }

function Index() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [estimateOpen, setEstimateOpen] = useState(false)
  const [service, setService] = useState('Garden Design')
  const requestEstimate = (value?: string) => { if (value) setService(value); setEstimateOpen(true); setMenuOpen(false) }
  return <MotionConfig reducedMotion="user" transition={{ duration: 0.7, ease }}><main id="top">
    <header className="header"><div className="shell header-inner"><Brand /><nav aria-label="Main navigation" className={`nav ${menuOpen ? 'is-open' : ''}`}>{links.map(([name, href]) => <a key={name} href={href} onClick={() => setMenuOpen(false)}>{name}</a>)}</nav><div className="header-actions"><span className="header-note">Design. Build. Care.</span><Button variant="lime" className="h-10 px-6 text-xs" onClick={() => requestEstimate()}>Free estimate</Button><Button variant="heroGhost" size="icon" className="mobile-menu" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button></div></div></header>
    <ScrollProgress /><section className="hero" aria-labelledby="hero-title"><HeroPhoto /><div className="shell hero-content"><div className="eyebrow hero-tag"><Sprout size={12} /> Landscape design · Build · Care</div><h1 id="hero-title">{["Gardens","that stay","impossibly","green."].map((w,i)=><span key={w} className="hero-line"><motion.span className={i===3?"green-word block":"block"} initial={{y:"110%"}} animate={{y:0}} transition={{duration:1.1,delay:0.15+i*0.12,ease:[0.16,1,0.3,1]}}>{w}</motion.span></span>)}</h1><div className="hero-bottom"><p>Thoughtful design, careful planting and dependable maintenance. Outdoor spaces made for real life — from your first morning coffee to the last light of summer.</p><div className="hero-cta"><Button variant="lime" className="h-14 px-8 text-xs" onClick={() => requestEstimate()}>Book a walkthrough <ArrowDownRight size={15} /></Button><span className="hero-assurance"><Leaf size={15} /> Good gardens. Grounded in care.</span></div></div><a href="#services" className="scroll-note">SCROLL <ArrowDown size={12} /></a></div></section>
    <div className="ticker" aria-hidden="true"><div className="ticker-track">{[0,1].map(n => <span key={n}>{['Lawn care','Hardscaping','Garden design','Irrigation','Tree & hedge','Night lighting','Seasonal colour'].map(item => <span key={item}>{item.toUpperCase()}<b>✦</b></span>)}</span>)}</div></div>
    <section id="services" className="section"><div className="shell"><motion.div {...rv} transition={{duration:0.9,ease}} className="section-heading"><h2>Everything<br />outside your<br />front door.</h2><p>One garden, a considered approach. Choose a single service or bring the whole outdoor space together with a complete plan.</p></motion.div><div className="services-grid">{services.map(({icon: Icon, title, description, detail}, index) => <motion.article {...rv} transition={{duration:0.75,delay:(index % 3)*0.08,ease}} className="service-card" key={title}><span className="service-icon"><Icon size={22} strokeWidth={1.6} /></span><h3>{title}</h3><p>{description}</p><div className="service-detail"><span>{detail}</span><Button variant="ghost" size="icon" aria-label={`Enquire about ${title}`} onClick={() => requestEstimate(title)}><ArrowUpRight size={16}/></Button></div></motion.article>)}</div></div></section>
    <section id="work" className="section work-section"><div className="shell"><div className="eyebrow">The possibilities</div><motion.div {...rv} transition={{duration:0.9,ease}} className="section-heading"><h2>Yards worth<br />slowing down for.</h2><p>Real gardens. Real growing things. A little inspiration for the outdoor space you’ve been imagining.</p></motion.div><div className="work-grid">{projects.map((project, index) => <motion.article {...rvClip} transition={{duration:1.2,delay:(index % 2)*0.12,ease}} className="work-item" key={project.name}><img src={project.photo} alt={project.alt} loading="lazy" /><div className="work-caption"><div className="eyebrow">{project.category}</div><h3>{project.name}<Leaf size={19} /></h3></div></motion.article>)}</div><p className="photo-credit">Real photography from Unsplash and Pexels. Images show garden inspiration, not completed VeryGreen projects.</p></div></section>
    <section id="process" className="section"><div className="shell process-layout"><div><h2>Four steps.<br />Then life<br />moves outside.</h2><p className="process-intro">Less guesswork. More good mornings in the garden. Here’s how an outdoor space comes together.</p></div><div>{steps.map(([title, description], index) => <motion.article {...rvSide} transition={{duration:0.9,delay:index*0.08,ease}} className="process-step" key={title}><span className="step-number">0{index+1}</span><div><h3>{title}</h3><p>{description}</p></div></motion.article>)}</div></div></section>
    <div className="shell"><div className="facts">{[['01','A plan for your property'],['04','Seasons of considered care'],['100%','Clear scope before work begins'],['Your pace','One service or ongoing care']].map(([number,text]) => <div className="fact" key={number}><div className="fact-number">{number}</div><p>{text}</p></div>)}</div></div>
    <section id="care" className="section care-section"><div className="shell"><motion.div {...rv} transition={{duration:0.9,ease}} className="section-heading"><h2>Good care.<br />Not empty promises.</h2><p>The difference is in the details. Practical decisions that make a garden easier to enjoy, season after season.</p></motion.div><div className="care-grid"><motion.article {...rv} transition={{duration:0.9,ease}} className="care-item"><Droplets size={25}/><h3>Water the roots,<br />not the pavement.</h3><p>Deep, less frequent watering encourages stronger roots. Soil type and weather matter more than a fixed timer.</p></motion.article><motion.article {...rv} transition={{duration:0.9,ease}} className="care-item"><Flower2 size={25}/><h3>Right plant.<br />Right place.</h3><p>Match planting to the light and soil you actually have. Locally suited species need less intervention and support wildlife.</p></motion.article><motion.article {...rv} transition={{duration:0.9,ease}} className="care-item"><Scissors size={25}/><h3>A little often.<br />A lot less worry.</h3><p>Seasonal pruning, sensible mowing heights and regular attention keep small jobs from turning into big ones.</p></motion.article></div></div></section>
    <section id="contact" className="contact-section"><div className="shell contact-layout"><div><h2>Let’s get your yard<br />on the schedule.</h2><p>Tell us about your space and what you’d like to change. Start with a clear brief for a proper on-site estimate.</p><div className="contact-checks"><span><Check/> Clear project scope</span><span><Check/> Site-specific estimates</span><span><Check/> Practical care plans</span></div></div><Button variant="forest" className="h-14 px-8 shrink-0 text-xs" onClick={() => requestEstimate()}>Get my estimate <ArrowUpRight/></Button></div></section>
    <footer className="footer"><div className="shell"><div className="footer-top"><div><Brand/><p>Landscape design, build and care.<br />For gardens that feel like home.</p></div><div className="footer-col"><h4>SERVICES</h4>{['Lawn care','Garden design','Patios & stonework','Irrigation','Lighting'].map(text => <a href="#services" key={text}>{text}</a>)}</div><div className="footer-col"><h4>EXPLORE</h4><a href="#work">Garden inspiration</a><a href="#process">Our approach</a><a href="#care">Seasonal care</a><a href="#contact">Start a project</a></div></div><div className="footer-word" aria-hidden="true">VERYGREEN</div><div className="footer-bottom"><span>© {new Date().getFullYear()} VeryGreen.</span><span>Thoughtful spaces. Naturally better.</span></div></div></footer>
    <AnimatePresence>{estimateOpen && <EstimateForm key="enquiry" service={service} onClose={() => setEstimateOpen(false)} />}</AnimatePresence>
  </main></MotionConfig>
}

function EstimateForm({ service, onClose }: { service: string; onClose: () => void }) {
  const [downloaded, setDownloaded] = useState(false)
  const panel = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const old = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panel.current?.querySelector<HTMLInputElement>('input')?.focus()
    const onKey = (event: KeyboardEvent) => {
      if(event.key === 'Escape') onClose()
      if(event.key === 'Tab') {
        const items = panel.current?.querySelectorAll<HTMLElement>('button, input, select, textarea, a[href]')
        if (!items?.length) return
        const first = items[0]; const last = items[items.length-1]
        if(event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
        else if(!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = old; document.removeEventListener('keydown', onKey); previous?.focus() }
  }, [onClose])
  function downloadRequest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const text = `VERYGREEN — PROJECT ENQUIRY\n\nName: ${data.get('name')}\nEmail: ${data.get('email')}\nPhone: ${data.get('phone')}\nProperty location: ${data.get('address')}\nService: ${data.get('service')}\n\nProject details\n${data.get('details')}\n\nThis is a prepared enquiry, not a submitted booking or price quote.`
    const url = URL.createObjectURL(new Blob([text], {type:'text/plain'}))
    const link = document.createElement('a'); link.href=url; link.download='verygreen-project-enquiry.txt'; link.click(); URL.revokeObjectURL(url)
    setDownloaded(true)
  }
  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="estimate-overlay" onClick={event => {if(event.target === event.currentTarget) onClose()}}><motion.div initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.98 }} transition={{ duration: 0.35, ease }} ref={panel} className="estimate-panel" role="dialog" aria-modal="true" aria-labelledby="estimate-title"><div className="estimate-title"><h2 id="estimate-title">{downloaded ? 'Your brief is ready.' : 'Let’s talk gardens.'}</h2><Button variant="ghost" size="icon" aria-label="Close enquiry" onClick={onClose}><X/></Button></div>{downloaded ? <div className="success-content"><CheckCircle2 size={40}/><h3>A good place to start.</h3><p>Your project enquiry has been downloaded. It has not been sent, and no visit is booked.</p><Button variant="forest" className="mt-5 h-11 px-6" onClick={onClose}>Back to the garden <ChevronRight/></Button></div> : <><p>A few details to prepare your project enquiry.</p><form onSubmit={downloadRequest} className="form-grid"><label>Your name<input name="name" autoComplete="name" placeholder="Full name" required maxLength={100}/></label><label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required/></label><label className="full">Phone number <input name="phone" type="tel" autoComplete="tel" placeholder="Optional"/></label><label className="full">Property location<input name="address" autoComplete="street-address" placeholder="Street or neighbourhood" required maxLength={200}/></label><label className="full">What do you have in mind?<select name="service" defaultValue={service}>{services.map(item => <option key={item.title}>{item.title}</option>)}<option>Complete Landscape Project</option></select></label><label className="full">Tell us about your space<textarea name="details" placeholder="What would you like to change? Add an approximate size, your priorities and any timing you have in mind." required maxLength={3000}/></label><span className="full form-note">Enquiries aren’t connected to a business inbox yet. Download your brief to keep it; no personal details are stored or sent.</span><Button type="submit" variant="forest" className="full h-12"><Download/> Download my enquiry</Button></form></>}</motion.div></motion.div>
}
