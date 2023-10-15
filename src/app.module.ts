import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'neko_post',
      retryDelay: 500,
      retryAttempts: 10,
      synchronize: true, // 是否将表映射为实体
      autoLoadEntities: true // 是否自动映射
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
