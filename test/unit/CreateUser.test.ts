import test, { describe } from "node:test";
import { CreateUser } from "../../src/application/use-cases/CreateUser";
import { IUser } from "../../src/domain/entities/IUser.interface";
import assert from "node:assert";

describe('Registrar usuario', () => {
    test('Registrar usuario exitosamente', async () => {
        const userMock = {
            email:'edward.cruzcruz@hotmail.com'
            ,password:'Edward123'
            ,name:'Edward'
        };
        const userRepository = {
            createUser: async (data: IUser) => ({
                ...data
            }),
            findByEmail: async () => null
        };
        const createUser = new CreateUser(userRepository);
        const response = await createUser.execute(userMock);
        assert.equal(response.email, 'edward.cruzcruz@hotmail.com');
        assert.equal(response.name, 'Edward');
    });
});