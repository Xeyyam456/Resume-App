export function usePhotoUpload(onUpdate) {
  return e => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => onUpdate('photo', ev.target.result)
    reader.readAsDataURL(file)
  }
}
