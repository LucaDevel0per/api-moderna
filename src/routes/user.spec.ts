import  request  from "supertest";
import { app } from '../server'
import { prisma } from '../lib/prisma'
// import { after, describe, it, beforeAll } from "node:test";

describe('User Routes', () => {
    beforeAll(async () => {
        await prisma.user.deleteMany({});
    });

    afterAll(async () => {
        await prisma.user.deleteMany({});
        await prisma.$disconnect();
    });

    it('should be able to create a new User', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                name: 'John Doe',
                email: 'john.doe@email.com',
                password: 'senha123'
            });

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.email).toBe('john.doe@email.com');
        });

    it('should not be able to create a user with a duplicate email', async () => {
        await request(app)
            .post('/users')
            .send({
                name: 'John Doe',
                email: 'john.doe@email.com',
                password: 'senha123'
            });

        const response = await request(app)
            .post('/users')
            .send({
              name: 'Jane Smith',
              email: 'john.doe@email.com', // Email duplicado
              password: 'password456',
            });

            // Esperamos um erro 400 (Bad Request)
            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Este email já está em uso.');
      
    })
})