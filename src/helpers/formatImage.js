export const formatImageFromDB = (image) => {
  const imageProfile = image.replace(/\\/g, "/")
  const avatar = 'http://localhost:3000/' + imageProfile
  return avatar
}