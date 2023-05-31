// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('User API Tests', () => {
  test('should successfully retrieve an existing user', async ({ request }) => {
    const response = await request.get('/users/1');
    const responseBody = await response.json();
  
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(responseBody.id).toBe(1);
  });
  
  test('should fetch a list of existing users with valid parameters', async ({ request }) => {
    const response = await request.get('/users?_limit=5');
    const responseBody = await response.json();
  
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(responseBody[0].id).toBe(1);
    expect(responseBody[0].address.geo.lat).toBe('-37.3159');
    expect(responseBody.map(user => user.id)).toHaveLength(5);
  });
  
  test('should create a new user with valid parameters', async ({ request }) => {
    const newUser = {
        id: 11,
        name: 'Gil Alexander'
    };
  
    const response = await request.post('/users', {
        data: newUser
    });
    const responseBody = await response.json();
  
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(201);
  });
  
  test('should update an existing user with valid parameters', async ({ request }) => {
    const updateUser1 = {
        isCoding: true
    };
  
    const response1 = await request.put('/users/2', {
        data: updateUser1
    });
    const responseBody1 = await response1.json();
  
    expect(response1.ok()).toBeTruthy();
    expect(response1.status()).toBe(200);
    expect(responseBody1.isCoding).toBe(true);
  
    const updateUser2 = {
        sleep: null
    };
  
    const response2 = await request.put('/users/2', {
        data: updateUser2
    });
    const responseBody2 = await response2.json();
  
    expect(response2.ok()).toBeTruthy();
    expect(response2.status()).toBe(200);
    expect(responseBody2.sleep).toBeNull();
  
    const updateUser3 = {
        pockets: '',
        money: 0.02
    };
  
    const response3 = await request.put('/users/2', {
        data: updateUser3
    });
    const responseBody3 = await response3.json();
  
    expect(response3.ok()).toBeTruthy();
    expect(response3.status()).toBe(200);
    expect(responseBody3.pockets).toBe('');
    expect(responseBody3.money).toBeCloseTo(0.02, 2);
    expect(responseBody3.moving).toBeUndefined();
  });
  
  test('should partially update an existing user by reusing response properties', async ({ request }) => {
    const response = await request.get('/users/3');
    const responseBody = await response.json();
  
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(responseBody.name).toBe('Clementine Bauch');
  
    const updateUser4 = {
        name: responseBody.name
    };
  
    const patchResponse = await request.patch('/users/4', {
        data: updateUser4
    });
    const patchResponseBody = await patchResponse.json();
  
    expect(patchResponse.ok()).toBeTruthy();
    expect(patchResponse.status()).toBe(200);
    expect(patchResponseBody.name).toBe('Clementine Bauch');
  
    const updateUser5 = {
        name: 'Julie Langford'
    };
  
    const patchResponse2 = await request.patch('/users/5', {
        data: updateUser5
    });
    const patchResponseBody2 = await patchResponse2.json();
  
    expect(patchResponse2.ok()).toBeTruthy();
    expect(patchResponse2.status()).toBe(200);
    expect(patchResponseBody2.name).toBe('Julie Langford');
  });
  
  test('should delete an existing user and verify successful deletion', async ({ request }) => {
    const response = await request.delete('/users/6');
    const responseBody = await response.json();
  
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
  });
});
