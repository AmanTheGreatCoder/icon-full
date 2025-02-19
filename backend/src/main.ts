import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { JWT_HEADER, JWT_HEADER_ADMIN } from './common/utils/auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    // logger: WinstonModule.createLogger(winstonConfig),
  });

  app.setGlobalPrefix('/api/v1');

  // app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders:
      'Origin,X-Requested-With,Content-Type,Accept,Authorization,authorization,X-Forwarded-for,External_Network,external_network',
    credentials: true,
  });
  const logger = new Logger();

  const config = new DocumentBuilder()
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      JWT_HEADER,
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Admin JWT',
        description: 'Enter Admin JWT token',
        in: 'header',
      },
      JWT_HEADER_ADMIN,
    )
    .setTitle('Backend')
    .setDescription('Here is the API for Backend')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 5000);
  console.log(`Server is running on port ${process.env.PORT || 5000}...`);
}
bootstrap();
