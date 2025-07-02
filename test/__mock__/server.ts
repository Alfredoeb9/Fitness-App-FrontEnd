import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { createMockWorkout } from '../utils/mock-factories';

interface LoginRequest {
  email: string;
  password: string;
}

interface SignupRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export const handlers = [
  http.get('/api/workouts', () => {
    return HttpResponse.json([createMockWorkout()]);
  }),

  http.post('/api/workouts', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json(createMockWorkout(body));
  }),

  http.delete('/api/workouts/:id', ({ params }) => {
    return HttpResponse.json({ message: 'Workout deleted', id: params.id });
  }),

  http.get('/api/workout-buddy/userchats', () => {
    return HttpResponse.json({
      chats: [
        { _id: 'chat-1', title: 'Test Chat 1' },
        { _id: 'chat-2', title: 'Test Chat 2' },
      ]
    });
  }),

  http.delete('/api/workout-buddy/chats/:id', ({ params }) => {
    return HttpResponse.json({ 
      message: 'Chat deleted successfully', 
      deletedChatId: params.id 
    });
  }),

  http.post('/api/user/login', async ({ request }) => {
    const { email, password } = await request.json() as LoginRequest;
    return HttpResponse.json({
      user: {
        email,
        firstName: 'Test',
        lastName: 'User',
      },
      token: 'mock-jwt-token'
    });
  }),

  http.post('/api/user/signup', async ({ request }) => {
    const { email, password, firstName, lastName } = await request.json() as SignupRequest;
  
  return HttpResponse.json({
    user: {
      email,
      firstName: firstName || 'Test',
      lastName: lastName || 'User',
    },
    token: 'mock-jwt-token'
    });
  }),
];

export const server = setupServer(...handlers);