export const isBrowser: boolean = (process as any).browser;
export const port: number = parseInt((process as any).env.PORT, 10) || 3000;
export const server: string = 'http://localhost:4000/graphql';
