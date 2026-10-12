// Restaurant contact details shown in the header and footer. Edit them here.
// NOTE: the address, phone number and social links are SAMPLES.
// Replace them with the real ones before launch.

export const location = {
  street: '1234 School Dr',
  city: 'Harrisonburg, VA',
}

// Opens Google Maps (or the Maps app on phones) with the address filled in.
export const directionsUrl =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent(`${location.street}, ${location.city}`)

export const phone = {
  display: '(540) 555-0123',
  // Used by the "tap to call" link: country code + number, digits only.
  tel: '+15405550123',
}

export const social = [
  { name: 'Instagram', url: 'https://www.instagram.com/' },
  { name: 'Facebook', url: 'https://www.facebook.com/' },
  { name: 'TikTok', url: 'https://www.tiktok.com/' },
]
