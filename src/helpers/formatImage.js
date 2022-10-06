export const formatImageFromDB = (image) => {
  if(!image) return ''
  const imageProfile = image.replace(/\\/g, "/")
  const avatar = 'http://localhost:3000/' + imageProfile
  return avatar
}