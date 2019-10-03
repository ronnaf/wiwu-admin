import Geocode from 'react-geocode'

export const getAddress = async location => {
  let address

  try {
    Geocode.setApiKey('AIzaSyBwvfQvIxe14wJMbOvSoAGLeaG3t5KSsfM')
    const response = await Geocode.fromLatLng(
      location.latitude,
      location.longitude
    )
    address = response.results[0].formatted_address
  } catch (error) {
    console.log('geocode error: ', error.message)
  }

  return address
}
