import { ArrowRight, Boxes, Check, ChevronDown, ClipboardList, Container as ContainerIcon, FileCheck2, MapPin, MessagesSquare, PackageCheck, Route, Truck } from 'lucide-react'
import { Container } from '../../ui/Container'
import { Button } from '../../ui/Button'
import { serviceVisuals } from '../../../config/service-assets'

const cargoTypes = [
  { icon: ContainerIcon, title: 'Containerised cargo', description: 'Coordinated transport for containerised shipments moving from the coast to inland destinations.', points: ['Port and collection arrangements', 'Container and load information', 'Destination handling requirements'] },
  { icon: Boxes, title: 'Bulk cargo', description: 'Planning around the load, the route and the handling requirements of each bulk shipment.', points: ['Cargo dimensions and weight', 'Loading and unloading arrangements', 'Collection and delivery coordination'] },
  { icon: Truck, title: 'Commercial freight', description: 'Transport enquiries for businesses connecting suppliers, customers and inland logistics destinations.', points: ['Shipment-specific planning', 'Kenya–Uganda movements', 'Clear communication throughout planning'] },
]
export function CargoSection() {
  return <section className="home-details home-details--tinted" aria-labelledby="cargo-heading"><Container><div className="home-details-heading"><span className="home-section-label">YOUR CARGO, OUR FOCUS</span><h2 id="cargo-heading">Different loads. The same attention to detail.</h2><p>Every shipment starts with understanding what needs to move. Tell us about your cargo so we can discuss the right transport arrangements.</p></div><div className="home-detail-cards">{cargoTypes.map(({ icon: Icon, title, description, points }) => <article className="home-detail-card" key={title}><Icon aria-hidden="true" /><h3>{title}</h3><p>{description}</p><ul>{points.map(point => <li key={point}><Check aria-hidden="true" />{point}</li>)}</ul></article>)}</div><div className="home-section-action"><Button to="/services">Explore Our Services</Button></div></Container></section>
}

const steps = [
  { icon: MessagesSquare, title: 'Tell us what you need', text: 'Share the cargo type, collection point, destination and preferred timing.' },
  { icon: ClipboardList, title: 'Review the requirements', text: 'Discuss the load, handling arrangements and any clearing support required.' },
  { icon: FileCheck2, title: 'Prepare for movement', text: 'Coordinate documentation, collection and the receiving arrangements.' },
  { icon: PackageCheck, title: 'Connect to your destination', text: 'Bring transport and destination coordination together for the onward journey.' },
]
const stepLabels = ['THE ENQUIRY', 'THE PLAN', 'THE PREPARATION', 'THE CONNECTION']
export function FreightProcessSection() {
  return <section className="home-details freight-process-section" aria-labelledby="process-heading"><Container>
    <div className="freight-journey-heading"><div className="home-details-heading"><span className="home-section-label">HOW IT WORKS</span><h2 id="process-heading">Your cargo. A clear way forward.</h2><p>Four connected steps, with the right conversations at every stage.</p></div><div className="freight-journey-intro"><Route size={22} aria-hidden="true" /><span>From the first conversation<br /><strong>to the onward journey.</strong></span></div></div>
    <ol className="freight-journey" role="list">{steps.map(({ icon: Icon, title, text }, index) => <li key={title}>
      <span className="journey-stop" aria-hidden="true" /><div className="journey-card"><div className="journey-card-top"><span className="journey-icon"><Icon size={26} strokeWidth={1.6} aria-hidden="true" /></span><span className="journey-number" aria-hidden="true">0{index + 1}</span></div><span className="journey-label">{stepLabels[index]}</span><h3>{title}</h3><p>{text}</p><span className="journey-card-rule" aria-hidden="true" /></div>
      {index < steps.length - 1 && <span className="journey-next" aria-hidden="true"><ArrowRight size={16} /></span>}
    </li>)}</ol>
    <div className="freight-journey-bottom"><p><span aria-hidden="true" />Every journey starts with understanding your shipment.</p><Button to="/request-quote">Let’s Plan Your Shipment</Button></div>
  </Container></section>
}

const destinations = [
  { city: 'Mombasa', country: 'KENYA · COASTAL GATEWAY', description: 'Port arrival, customs clearing coordination and preparation for the inland journey.', tags: 'Port cargo · Clearing · Collection' },
  { city: 'Nairobi', country: 'KENYA · COMMERCIAL HUB', description: 'A key connection for cargo origins, commercial activity and onward regional transport.', tags: 'Commercial freight · Transit · Coordination' },
  { city: 'Kampala', country: 'UGANDA · INLAND CONNECTION', description: 'Connections to inland container depots and receiving arrangements in Uganda.', tags: 'Inland depots · Destination handling · Delivery' },
]
export function DestinationsSection() {
  return <section className="home-details home-details--navy" aria-labelledby="destinations-heading"><Container><div className="home-details-heading"><span className="home-section-label">REGIONAL CONNECTIONS</span><h2 id="destinations-heading">Three cities at the heart of the journey.</h2><p>Connecting the coast with the businesses and logistics destinations that depend on regional trade.</p></div><div className="home-detail-cards">{destinations.map(({ city, country, description, tags }) => <article className="destination-card" key={city}><MapPin aria-hidden="true" /><span>{country}</span><h3>{city}</h3><p>{description}</p><small>{tags}</small></article>)}</div><div className="home-section-action"><Button to="/transport-corridors">View Transport Corridors</Button></div></Container></section>
}

export function ClearingSupportSection() {
  return <section className="home-details" aria-labelledby="clearing-heading"><Container className="home-clearing-layout"><figure className="operations-image"><div className="operations-image-frame"><img src={serviceVisuals[2].src} alt={serviceVisuals[2].alt} loading="lazy" decoding="async" /></div></figure><div><span className="home-section-label">CLEARING & FORWARDING</span><h2 id="clearing-heading">Connect port arrival with the road ahead.</h2><p>Cargo arriving through Mombasa needs more than onward transport. Documentation, port processes and release requirements all form part of the journey.</p><p>Daneva brings clearing and transport discussions together to help prepare containerised and bulk cargo for inland movement.</p><ul className="home-check-list">{['Customs documentation coordination', 'Port process and cargo release requirements', 'Onward transport planning'].map(item => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul><Button to="/services#mombasa-clearing">Learn About Clearing</Button></div></Container></section>
}

const questions = [
  { question: 'Which routes does Daneva cover?', answer: 'Our primary freight connections run from Mombasa and Nairobi in Kenya to Kampala’s inland container depots in Uganda. Contact the team to discuss collection and destination requirements for your shipment.' },
  { question: 'What information do I need for a freight quote?', answer: 'Share your contact details, cargo description, origin and destination. Include the weight, dimensions, container details, preferred dates and any loading or clearing requirements you already know.' },
  { question: 'Can I discuss transport and clearing together?', answer: 'Yes. Daneva provides long-distance haulage and Mombasa clearing services. Include your clearing requirements when submitting a freight enquiry so the team can discuss both parts of the journey.' },
  { question: 'Do you transport both containerised and bulk cargo?', answer: 'Daneva handles enquiries for containerised and bulk cargo movements. The team will need the load details and handling requirements to discuss suitable arrangements for a particular shipment.' },
  { question: 'How long will my shipment take?', answer: 'Timing depends on the route, cargo readiness, clearing and border procedures, and receiving arrangements. Share your preferred schedule with the team to discuss shipment-specific expectations.' },
]
export function HomeFAQSection() {
  return <section className="home-details home-details--tinted" aria-labelledby="faq-heading"><Container className="home-faq-layout"><div><span className="home-section-label">FREIGHT QUESTIONS</span><h2 id="faq-heading">A little clarity before you book.</h2><p>Planning a shipment? Here are a few useful starting points.</p><Button to="/contact">Speak to Our Team</Button></div><div className="home-faq-list">{questions.map(({ question, answer }) => <details key={question}><summary>{question}<ChevronDown aria-hidden="true" /></summary><p>{answer}</p></details>)}</div></Container></section>
}

export function ShipmentChecklistSection() {
  return <section className="home-details" aria-labelledby="shipment-heading"><Container className="shipment-checklist"><div className="shipment-checklist-copy"><Route aria-hidden="true" /><span className="home-section-label">READY FOR THE NEXT STEP?</span><h2 id="shipment-heading">Let’s start with your shipment details.</h2><p>A few details help us understand the journey you have in mind.</p><Button to="/request-quote">Request a Freight Quote</Button></div><ul>{['What are you shipping?', 'Where should we collect it?', 'Where does it need to go?', 'When would you like it to move?', 'Do you need clearing support?'].map((item, index) => <li key={item}><span>0{index + 1}</span>{item}<Check aria-hidden="true" /></li>)}</ul></Container></section>
}
