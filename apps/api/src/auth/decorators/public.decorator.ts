import { SetMetadata } from '@nestjs/common'

export const PublicMetadataKey = 'isPublic'

export const Public = () => SetMetadata(PublicMetadataKey, true)
