import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const getSwaggerConfig = (app): void => {
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('This API for my project')
    .setVersion('1.0')
    .addTag('API')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};
