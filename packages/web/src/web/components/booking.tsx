import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Loader2, MessageCircle } from "lucide-react";
import { Dialog } from "./dialog";
import { useBookingRequest } from "../queries/bookings";
import { serviceNames, whatsapp, type ServiceName } from "../data/salon";

export function Booking({ initialService, onClose }: { initialService: ServiceName; onClose: () => void }) {
  const mutation = useBookingRequest();
  const [id] = useState(() => crypto.randomUUID());
  const [service, setService] = useState<ServiceName>(initialService);
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const today = new Date().toISOString().slice(0,10);
  const max = new Date(Date.now()+179*86400000).toISOString().slice(0,10);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = { id, name: String(form.get("name")), phone: String(form.get("phone")), service, date: String(form.get("date")), time: String(form.get("time")) as "Morning"|"Afternoon"|"Evening"|"Flexible", notes: String(form.get("notes")), consent: true as const, website: String(form.get("website")) };
    try {
      const result = await mutation.mutateAsync(data);
      setMessage(`Hello Zincy's! I'd like to enquire about ${data.service}.\nName: ${data.name}\nPhone: ${data.phone}\nPreferred date: ${data.date}\nPreferred time: ${data.time}\n${data.notes ? `Notes: ${data.notes}\n` : ""}Request reference: ${result.reference}\nPlease confirm availability and pricing. Thank you!`);
    } catch { /* Mutation error is rendered below; same ID makes retries safe. */ }
  }
  return <Dialog title="Request an appointment" onClose={onClose} className="booking-dialog">
    {!mutation.isSuccess ? <>
      <p className="eyebrow">A LITTLE TIME FOR YOU</p><h2>Let’s plan your<br/><em>next visit.</em></h2>
      <p className="dialog-intro">Choose your treatment and a preferred date. The salon will need to confirm the time and price.</p>
      <div className="preview-notice">Website preview: requests are saved for demonstration. To contact the salon, continue to WhatsApp after saving. Nothing is sent automatically.</div>
      <form onSubmit={submit}>
        <div className="form-row"><label>Your name<input aria-label="Your name" name="name" autoComplete="name" placeholder="Full name" minLength={2} maxLength={80} required/></label><label>Phone number<input aria-label="Phone number" name="phone" autoComplete="tel" type="tel" placeholder="+232 …" minLength={8} maxLength={25} pattern="\+?[0-9\s\(\)\-]+" required/></label></div>
        <label>What would you like?<select aria-label="What would you like?" value={service} onChange={e=>setService(e.target.value as ServiceName)}>{serviceNames.map(s=><option key={s}>{s}</option>)}</select></label>
        <div className="form-row"><label>Preferred date<input aria-label="Preferred date" name="date" type="date" min={today} max={max} required/></label><label>Preferred time<select aria-label="Preferred time" name="time" defaultValue="Flexible"><option>Flexible</option><option>Morning</option><option>Afternoon</option><option>Evening</option></select></label></div>
        <label>Anything we should know? <span className="optional">(optional)</span><textarea aria-label="Anything we should know?" name="notes" placeholder="Your style inspiration, group size, or questions…" maxLength={500} rows={3}/></label>
        <div className="honeypot" aria-hidden="true"><label>Website<input aria-label="Website" name="website" tabIndex={-1} autoComplete="off" defaultValue=""/></label></div>
        <label className="consent"><input aria-label="Consent to save preview enquiry details" type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)} required/><span>I agree to my details being saved in this website preview for this enquiry. I can request deletion through the developer who shared this preview. Please do not include sensitive information.</span></label>
        {mutation.isError && <p className="form-error" role="alert">{mutation.error.message || "Could not save your request. Please try again, or call +232 79 700150."}</p>}
        <button className="button full" disabled={mutation.isPending || !consent}>{mutation.isPending ? <><Loader2 className="spin" size={17}/>Saving request…</> : <>Save & continue <ArrowUpRight size={18}/></>}</button>
        <p className="form-footnote">No payment needed. This is a request, not a confirmed booking.</p>
      </form>
    </> : <div className="success"><span className="success-icon"><Check size={30}/></span><p className="eyebrow">REQUEST SAVED · {mutation.data.reference}</p><h2>One more step<br/><em>to your me-time.</em></h2><p>Your request is saved in this website preview. Send it to the salon on WhatsApp to ask about availability and pricing.</p><a className="button full" href={whatsapp(message)} target="_blank" rel="noopener noreferrer"><MessageCircle size={19}/>Continue on WhatsApp<ArrowUpRight size={18}/></a><p className="form-footnote">WhatsApp opens a draft. You choose whether to send it. The salon has not been notified yet.</p><button className="text-button" onClick={onClose}>Back to exploring</button></div>}
  </Dialog>;
}