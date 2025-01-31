import { AuthService } from "../services/AuthService";


describe('AuthService Hello World E2E Test', () => {
  let authService: AuthService;

  beforeAll(() => {
    authService = new AuthService();
  });

  it('should return a hello world message', () => {
    expect(authService).toBeDefined();

    const helloWorldMessage = authService.getHelloWorld();
    expect(helloWorldMessage).toBe("Hello World from AuthService!");
  });
});