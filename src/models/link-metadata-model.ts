import { getLinkPreview } from 'link-preview-js'

async function getLinkMetadata(url: string) {
  try {
    return await getLinkPreview(url)
  } catch (error) {
    return
  }
}

export default Object.freeze({
  getLinkMetadata
})
