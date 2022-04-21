const { Int32 } = require("mongodb");
const request = require("supertest");
const server = 'http://localhost:5001';

describe("POST /api/login", function() {
    it('responds with 200', async function() {
        const response = await request(server).post("/api/login").send({
            username: "a",
            password: "b"
        })
        expect(response.statusCode).toBe(200)
    });
  });

describe("POST /api/login", function() {
    it("Verify unregisted account is not logged in", async function() {
        const response = await request(server).post("/api/login").send({
            username: "fshlfjasjdkl",
            password: "dsdbaj,msadd"
        })
        expect(response.statusCode).toBe(200)
        expect(response.body.id).toEqual("-1")
    });
});

describe("POST /api/register", function() {
    it("Verify register user works for only new emails", async function() {
        const response = await request(server).post("/api/register").send({
            login: "rickL",
            password: "rickL",
            firstName: "Rick",
            lastName: "L",
            email: "rickL@gmail.com"
        })
        expect(response.statusCode).toBe(200)
        expect(response.body.success).toBe(false)
    });
});


describe("POST /api/addPlayedGame", function() {
    it("Verify games may be added to players profiles", async function() {
        const response = await request(server).post("/api/addPlayedGame").send({
            email: "rickL@gmail.com",
            startPage: "startPage", 
            endPage: "endPage", 
            time: 10, 
            clicks: 10
        })
        expect(response.statusCode).toBe(200)
        expect(response.body.success).toBe(true)
        expect(response.body.modified).toBe(1)
    });
});

describe("POST /api/getPlayedGames", function() {
    it("Verify games may be retreived from player profiles", async function() {
        const response = await request(server).post("/api/getPlayedGames").send({
            email: "rickL@gmail.com",
        })
        leng = response.body.playedGames.length - 1
        expect(response.statusCode).toBe(200)
        expect(response.body.playedGames[leng].clicks).toBe(10)
    });
});


verificationCode = ''

describe("POST /api/sendVerificationEmail", function() {
    it("Test if verification code is generated", async function() {
        const response = await request(server).post("/api/sendVerificationEmail").send({
            email: "rickL@gmail.com",
        })
        expect(response.statusCode).toBe(200)
        expect(response.body.success).toBe(true)
        verificationCode = response.body.code
    });
});

describe("POST /api/verifyCode", function() {
    it("Test if the code generated matches the players", async function() {
        const response = await request(server).post("/api/verifyCode").send({
            verifyEmail: true,
            email: "rickL@gmail.com",
            code: verificationCode
        })
        expect(response.statusCode).toBe(200)
        expect(response.body.verified).toBe(true)
    });
});

describe("POST /api/verifyCode", function() {
    it("Test to make sure false code generated does not verify players", async function() {
        const response = await request(server).post("/api/verifyCode").send({
            verifyEmail: true,
            email: "rickL@gmail.com",
            code: 1
        })
        expect(response.statusCode).toBe(200)
        expect(response.body.verified).toBe(false)
    });
});

describe("POST /api/changePassword", function() {
    it("Change players password", async function() {
        const response = await request(server).post("/api/changePassword").send({
            email: "rickL@gmail.com",
            newPassword: "123"
        })
        expect(response.statusCode).toBe(200)
    });
});


describe("POST /api/login", function() {
    it('Login after changing password', async function() {
        const response = await request(server).post("/api/login").send({
            username: "rickL@gmail.com",
            password: "123"
        })
        expect(response.statusCode).toBe(200)
        expect(response.body.success).toBe(true)
    });
});


describe("POST /api/getDailyLeaderboard", function() {
    it('Making sure the daily leaderboard is being returned', async function() {
        const response = await request(server).post("/api/getDailyLeaderboard").send({
        })
        expect(response.statusCode).toBe(200)
    });
});