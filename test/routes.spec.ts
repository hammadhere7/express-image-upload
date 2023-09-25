import request from 'supertest';
import express from 'express';
import router from '../src/routes/images'
import {describe} from "node:test";


const app =express();
app.use('/images', router);

describe('Image Endpoints', function () {

    test('responds to /images', async () => {
        const res = await request(app).get('/images');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
    });

    test('upload image endpoint is active', async ()=>{
        const res= await request(app).post('/images/upload');
        expect(res.statusCode).toBe(400);
    });
});