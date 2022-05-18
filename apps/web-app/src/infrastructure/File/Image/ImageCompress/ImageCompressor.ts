import imageCompression from 'browser-image-compression'

export class ImageCompressor {
  private readonly maxSizeMb: number

  constructor() {
    this.maxSizeMb = import.meta.env.VITE_MAX_IMAGE_COMPRESSION_SIZE ?? 0.4
  }

  public async compressImage(originalFile: File): Promise<File> {
    console.log('originalFile instanceof Blob', originalFile instanceof Blob) // true
    console.log(`originalFile size ${originalFile.size / 1024 / 1024} MB`)

    const options = {
      maxSizeMB: this.maxSizeMb,
      maxWidthOrHeight: 800,
      useWebWorker: true
    }
    try {
      const compressedFile = await imageCompression(originalFile, options)
      console.log('compressedFile instanceof Blob', compressedFile instanceof Blob) // true
      console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`) // smaller than maxSizeMB

      return compressedFile
    } catch (error) {
      console.log('error while compressing an image')
      console.log(error)
      return originalFile
    }
  }

}
