import app from "../server";
import supertest from "supertest";

const request = supertest(app);

describe('Endpoints test', () => {
    it('Test main endpoint /', async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200)
    })

    it("Test Image endpoint", async () => {
        const name = "fjord";
        const width = "500";
        const height = "400";
        const respond = await request.get(`/image/?name=${name}&width=${width}&height=${height}`);;
        expect(respond.status).toBe(200);
    });

})