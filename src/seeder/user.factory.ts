import { FileCompressionPipe } from '../pipes/file-compression.pipe';
import { Position } from '../positions/entities/position.entity';
import { faker } from '@faker-js/faker';

export class UserFactory {
  constructor(private positions: Position[]) {}
  async create() {
    const photo = await this.getFakePhoto();
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    return [
      {
        name: firstName + ' ' + lastName,
        email: faker.internet.email({ firstName, lastName }),
        phone: '+380' + faker.string.numeric({ length: 9 }),
        position_id: this.getRandomPositionId(),
      },
      photo,
    ];
  }

  private getRandomPositionId() {
    const total_positions = this.positions.length;
    return this.positions[Math.floor(Math.random() * total_positions)].id;
  }

  private async getFakePhoto() {
    const buffer = await this.getPhotoBuffer();
    const photo = {
      fieldname: 'photo',
      filename: 'fake.jpg',
      mimetype: 'image/jpg',
      originalname: 'fake.jpg',
      buffer,
      size: buffer.byteLength,
    } as Express.Multer.File;
    return this.getCompressedPhoto(photo);
  }

  private async getPhotoBuffer() {
    const res = await fetch('https://thispersondoesnotexist.com/');
    const resBuffer = await res.arrayBuffer();
    const buff = Buffer.from(resBuffer);
    return buff;
  }

  private async getCompressedPhoto(photo: Express.Multer.File) {
    const compressionPipe = new FileCompressionPipe({ targetResolution: 70 });
    const processed = await compressionPipe.transform(photo, { type: 'body' });
    return processed;
  }
}
