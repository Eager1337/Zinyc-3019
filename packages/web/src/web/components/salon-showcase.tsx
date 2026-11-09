import { ArrowUpRight } from "lucide-react";
import type { ServiceName } from "../data/salon";

export function SalonShowcase({ onBook }: { onBook: (service: ServiceName) => void }) {
  return <>
    <section className="inside-salon section reveal" aria-labelledby="inside-title">
      <div className="inside-images"><img className="inside-main" src="/images/salon/salon-space.webp" alt="Inside Zincy's salon with pink chairs, plants and gold details" loading="lazy"/><img className="inside-detail" src="/images/salon/hair-wash.webp" alt="Hair being washed at the salon" loading="lazy"/></div>
      <div className="inside-copy"><p className="eyebrow">REAL PEOPLE. REAL CARE. RIGHT HERE IN FREETOWN.</p><h2 id="inside-title">Come for the beauty.<br/><em>Stay for the care.</em></h2><p>From your first hair wash to the finishing touches, make your next beauty visit a moment to enjoy. Take a look inside Zincy's on Spur Road.</p><div className="local-detail"><span>54</span><div><strong>Spur Road, Freetown</strong><p>Opposite Babadorie Junction</p></div></div><button className="underlined" onClick={()=>onBook("Hair & styling")}>Let’s plan your next hair day<ArrowUpRight size={18}/></button></div>
    </section>
    <section id="care" className="care-section section" aria-labelledby="care-title">
      <div className="section-heading reveal"><div><p className="eyebrow">THE DETAILS BEHIND YOUR BEAUTY ROUTINE</p><h2 id="care-title">A little polish.<br className="mobile-only"/><em> A little care.</em></h2></div><p>Product photographs from the salon’s socials.<br/>Ask about current products and treatment options.</p></div>
      <div className="care-grid">
        <article className="care-card reveal"><img src="/images/salon/nail-products.webp" alt="CND Shellac nail polishes photographed at Zincy's" loading="lazy"/><div><span className="eyebrow">NAILS & FINISHING TOUCHES</span><h3>Find your next shade.</h3><p>Seen a colour you love? Send the salon your inspiration and ask which shades are available for your next visit.</p><button className="underlined" onClick={()=>onBook("Nails & pedicure")}>Ask about your next set<ArrowUpRight size={17}/></button></div></article>
        <article className="care-card product-poster reveal"><img src="/images/salon/hair-products.webp" alt="Zincy's Beauty & Care post showing Luseta hair-care products" loading="lazy"/><div><span className="eyebrow">HAIR & EVERYDAY CARE</span><h3>A little love for your hair.</h3><p>Explore the salon’s hair-care routine and ask about the products and treatments suited to your next style.</p><button className="underlined" onClick={()=>onBook("Hair & styling")}>Talk hair care with us<ArrowUpRight size={17}/></button></div></article>
      </div>
    </section>
  </>;
}

export function TeamSection() {
  return <section className="team-section section reveal" aria-labelledby="team-title"><img src="/images/salon/team.webp" alt="Zincy's team pictured together inside the salon" loading="lazy"/><div><p className="eyebrow">THE PEOPLE BEHIND YOUR NEXT VISIT</p><h2 id="team-title">Meet the faces<br/><em>of Zincy's.</em></h2><p>Hair, nails, beauty and spa care — brought together in one place in Freetown. Share your plans with the salon and ask who can help you create your next look.</p><a className="underlined" href="#visit">Come and say hello<ArrowUpRight size={17}/></a></div></section>;
}