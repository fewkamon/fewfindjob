// aws.config.ts

import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as sharp from 'sharp';

@Injectable()
export class AwsS3Service {
    AWS_S3_BUCKET = 'tewtetwe';
    s3 = new AWS.S3({
        accessKeyId: 'ASIA3FLD3AEIUBTZQZNQ',
        secretAccessKey: 'eFlkSdJO5/5YgrNLrhPsMysCDZUE0KxiFcZ0jIXm',
    });


    async uploadFile(file, file_name) {
        const originalname = `${file_name}.webp`;
        const webpBuffer = await this.convertToWebP(file.buffer);
        return await this.s3_upload(
            webpBuffer,
            this.AWS_S3_BUCKET,
            originalname,
            'image/webp',
        );
    }

    async convertToWebP(buffer) {
        return await sharp(buffer)
            .webp() // แปลงเป็น WebP
            .toBuffer(); // คืนค่าเป็น buffer
    }

    async s3_upload(file, bucket, name, mimetype) {
        const params = {
            Bucket: bucket,
            Key: String(name),
            Body: file,
            ContentType: mimetype,
        };

        try {
            let s3Response = await this.s3.upload(params).promise();
            return s3Response;
        } catch (e) {
            console.log(e);
        }
    }
}