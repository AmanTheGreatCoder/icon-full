import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  NODE_ENV: Joi.string().default('development'),
  JWT_SECRET: Joi.string().default('secret'),
  ACCESS_TOKEN_COOKIE_NAME: Joi.string().default('access_token'),
  REFRESH_TOKEN_COOKIE_NAME: Joi.string().default('refresh_token'),
  ACCESS_TOKEN_EXPIRES_IN: Joi.string().required(),
  REFRESH_TOKEN_EXPIRES_IN: Joi.string().required(),
  SMTP_HOST: Joi.string().required(),
  SMTP_PORT: Joi.number().required(),
  SMTP_PASS: Joi.string().required(),
  SMTP_EMAIL: Joi.string().required(),
  CLOUDINARY_CLOUD_NAME: Joi.string().required(),
  CLOUDINARY_API_KEY: Joi.string().required(),
  CLOUDINARY_API_SECRET: Joi.string().required(),
  FRONTEND_URL: Joi.string().required(),
  BACKEND_URL: Joi.string().required(),
  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOOGLE_CLIENT_SECRET: Joi.string().required(),
  FACEBOOK_CLIENT_ID: Joi.string().default('id'),
  FACEBOOK_CLIENT_SECRET: Joi.string().default('secret'),
});

export default registerAs('app', () => {
  const config = {
    port: parseInt(process.env.PORT, 10),
    jwtSecret: process.env.JWT_SECRET,
    frontendUrl: process.env.FRONTEND_URL,
    backendUrl: process.env.BACKEND_URL,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    facebookClientId: process.env.FACEBOOK_CLIENT_ID,
    facebookClientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    accessTokenCookieName: process.env.ACCESS_TOKEN_COOKIE_NAME,
    refreshTokenCookieName: process.env.REFRESH_TOKEN_COOKIE_NAME,
    accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    smtpHost: process.env.SMTP_HOST,
    smtpPort: process.env.SMTP_PORT,
    smtpPass: process.env.SMTP_PASS,
    smtpEmail: process.env.SMTP_EMAIL,
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
    nodeEnv: process.env.NODE_ENV,
  };

  const { error } = configValidationSchema.validate(process.env, {
    allowUnknown: true,
    abortEarly: false,
  });

  if (error) {
    throw new Error(`Configuration validation error: ${error.message}`);
  }

  return config;
});
