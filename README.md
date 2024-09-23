<div align="center">
  <a href="http://s2-safe-storage.s3-website.eu-west-3.amazonaws.com/">
    <img src="frontend/public/assets/logo/logo.png" alt="logo" width="200"/>
  </a>
  <a href="http://s2-safe-storage.s3-website.eu-west-3.amazonaws.com/">
    <p style="font-size: 30px; color: white;">🔒 Safe Storage ☁️</p>
  </a>
</div>

## About

A web application for user authentication and secure file upload. Users can register, log in, and upload/download files in PDF, JPEG, JPG or PNG format. Built with ReactJS and NestJS, styled with Tailwind CSS. The application is containerized using Docker and hosted on AWS EC2, with the front-end served via AWS S3.

## Technologies

- [React.js](https://react.dev/)
- [Redux](https://redux.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [NestJS](https://nestjs.com/)
- [Mongoose](https://mongoosejs.com/docs/)
- [MongoDB](https://www.mongodb.com/en-us)

## Features

- [x] Authentication with email/password
- [x] Secure APIs with JWT authentication
- [x] Account creation with email verification
- [x] Upload files in PDF, JPEG, JPG or PNG format
- [x] Rename and delete files
- [x] Download files

## Secrets to add to gitHub secrets

```bash
# AWS Credentials
AWS_ACCESS_KEY
AWS_SECRET_ACCESS_KEY

CLIENT_URL

# MongoDB URI
DB_URI

# EC2 instance Credentials
EC2_IP
EC2_PRIVATE_KEY

JWT_EXPIRES_IN
JWT_SECRET
```
