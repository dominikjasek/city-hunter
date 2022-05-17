import { Test, TestingModule } from '@nestjs/testing'
import { FileService } from '~/file/file.service'
import { PlaceSuggestDto } from '~/place/dto/placeSuggestDto'
import { PlaceService } from '~/place/place.service'
import { PrismaModule } from '~/prisma/prisma.module'
import { PrismaService } from '~/prisma/prisma.service'
import { RiddleModule } from '~/riddle/riddle.module'

describe('PlaceService', () => {
  let userId = 0  // initial value - will be resolved in beforeEach
  let prisma: PrismaService
  let placeService: PlaceService
  let fileService: FileService
  // let riddeService: RiddleService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlaceService, FileService],
      imports: [RiddleModule, PrismaModule]
    }).compile()

    placeService = module.get<PlaceService>(PlaceService)
    prisma = module.get<PrismaService>(PrismaService)
    fileService = module.get<FileService>(FileService)
    // riddeService = module.get<RiddleService>(RiddleService)

    const uploadFileMock = jest.spyOn(fileService, 'uploadFile')
    uploadFileMock.mockImplementation(async () =>
      Promise.resolve({
        url: 'http://localhost:3000/files/test.jpg',
        key: 'test.jpg',
      })
    )
  })

  beforeEach(async () => {
    await prisma.cleanDatabase()

    const user = await prisma.user.create({
      data: {
        firstName: 'John',
        lastName: 'Doe',
        photoUrl: 'https://photo-url.com',
        provider: 'google',
        email: 'john.doe@gmail.com',
        thirdPartyId: '211321342',
        currentRiddleId: null,
      },
    })

    userId = user.id
  })

  it('should be defined', () => {
    expect(placeService).toBeDefined()
  })

  it('should create a place without solutionPhoto', async () => {
    const placeSuggestionDto: PlaceSuggestDto = {
      name: 'Test name of the place',
      lng: '1.23',
      lat: '2.34',
      riddlePhotoUrl: 'http://localhost:3000/files/test.jpg'
    }

    const place = await placeService.createPlace(userId, placeSuggestionDto)

    expect(place).toBeDefined()
    expect(place.name).toBe(placeSuggestionDto.name)
    expect(place.location.lng).toBe(placeSuggestionDto.lng)
    expect(place.location.lat).toBe(placeSuggestionDto.lat)
    expect(place.riddlePhotoUrl).toBe('http://localhost:3000/files/test.jpg')
    expect(place.solutionPhotoUrl).toBeUndefined()
  })

  it('should create a place with solutionPhoto', async () => {
    const placeSuggestionDto: PlaceSuggestDto = {
      name: 'Test name of the place',
      lng: '1.23',
      lat: '2.34',
      riddlePhotoUrl: 'http://localhost:3000/files/test.jpg',
      solutionPhotoUrl: 'http://localhost:3000/files/test.jpg'
    }

    const place = await placeService.createPlace(userId, placeSuggestionDto)

    expect(place).toBeDefined()
    expect(place.name).toBe(placeSuggestionDto.name)
    expect(place.location.lng).toBe(placeSuggestionDto.lng)
    expect(place.location.lat).toBe(placeSuggestionDto.lat)
    expect(place.riddlePhotoUrl).toBe('http://localhost:3000/files/test.jpg')
    expect(place.solutionPhotoUrl).toBe('http://localhost:3000/files/test.jpg')
  })

  it('should update status of place', async () => {
    const placeSuggestionDto: PlaceSuggestDto = {
      name: 'Test name of the place',
      lng: '1.23',
      lat: '2.34',
      riddlePhotoUrl: 'http://localhost:3000/files/test.jpg',
      solutionPhotoUrl: 'http://localhost:3000/files/test.jpg'
    }

    const createdPlace = await placeService.createPlace(userId, placeSuggestionDto)

    await placeService.updateStatus(createdPlace.id, 'accepted')
    const place = await prisma.place.findUnique({ where: { id: createdPlace.id } })

    expect(place).toHaveProperty('status', 'accepted')
  })
})
