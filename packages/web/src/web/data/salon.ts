export const instagram = "https://www.instagram.com/zincyshairbeautyandspa/";
export const facebook = "https://www.facebook.com/p/Zincyshairbeautyandspa-61585093180522/";
export const mapLink = "https://www.google.com/maps/search/?api=1&query=Zincys+Hair+Beauty+Spa+54+Spur+Road+Freetown";
export const whatsapp = (text: string) => `https://wa.me/23279700150?text=${encodeURIComponent(text)}`;
export const services = [
  { name: "Hair & styling", short: "Hair", image: "salon/hair", alt: "Braiding detail from the salon's supplied social photographs", caption: "Your hair. Your expression.", description: "A fresh look, a new style, or a little love for your natural hair. Tell us what you have in mind and let’s make it yours.", items: "Hairstyling · Braids · Curls", number: "01" },
  { name: "Nails & pedicure", short: "Nails", image: "salon/nails", alt: "Pink manicure photographed at the salon", caption: "The beauty is in the details.", description: "From your fingertips to your toes, find your next moment of polish. Ask about available nail looks and pedicure options.", items: "Nail care · Nail art · Pedicure", number: "02" },
  { name: "Lashes & beauty", short: "Beauty", image: "salon/beauty", alt: "Beauty treatment in progress at the salon", caption: "A little extra confidence.", description: "Complete your look with lashes and beauty care. Share your inspiration and we’ll help you explore the available options.", items: "Lashes · Beauty consultation", number: "03" },
  { name: "Massage & relaxation", short: "Spa", image: "salon/massage", alt: "Massage treatment in progress at the salon", caption: "Slow down. Breathe out.", description: "Make a little room for yourself. Enquire about massage options and take a break from the pace of everyday life.", items: "Massage · Time to unwind", number: "04" },
] as const;
export const serviceNames = [...services.map(s=>s.name), "Bridal / group enquiry", "Help me choose"] as const;
export type ServiceName = typeof serviceNames[number];
export const gallery = [
  { image: "salon/hair", category: "Hair", title: "Braids, beautifully detailed.", alt: "Close-up of braids being styled" },
  { image: "salon/nails", category: "Nails", title: "A fresh set. A little confidence.", alt: "Pink polished nails holding a phone" },
  { image: "salon/interior", category: "Salon", title: "Step inside Zincy's.", alt: "Zincy's salon interior with pink styling chairs" },
  { image: "salon/massage", category: "Spa", title: "Your time to unwind.", alt: "A massage at Zincy's" },
  { image: "salon/pedicure", category: "Nails", title: "Care from your fingertips to your toes.", alt: "Pedicure in progress at the salon" },
  { image: "salon/beauty", category: "Beauty", title: "A moment of beauty care.", alt: "A beauty treatment at Zincy's" },
  { image: "salon/styling", category: "Hair", title: "A fresh look in the making.", alt: "Stylist working on a client's hair at Zincy's" },
  { image: "salon/hair-wash", category: "Hair", title: "The beginning of a good hair day.", alt: "Hair washing at the salon's shampoo basins" },
  { image: "salon/spa-room", category: "Spa", title: "A quieter corner of your day.", alt: "Spa treatment room with a massage bed" },
  { image: "salon/manicure", category: "Nails", title: "The beauty is in the detail.", alt: "Nail technician giving a manicure" },
  { image: "salon/lounge", category: "Salon", title: "A warm welcome on Spur Road.", alt: "Pink lounge chairs and plants in Zincy's salon" },
  { image: "salon/reception", category: "Salon", title: "Your self-care starts here.", alt: "Zincy's salon reception desk" },
  { image: "salon/october-post", category: "Updates", title: "From our socials: an October greeting.", alt: "Zincy's October greeting with hair, beauty, nails and spa services", note: "Past social post · October greeting, not a current promotion" },
  { image: "salon/hair-products", category: "Updates", title: "Beauty & care, from the salon's socials.", alt: "Zincy's branded hair-care product photograph", note: "Social media post · Ask the salon about current products and availability" },
];