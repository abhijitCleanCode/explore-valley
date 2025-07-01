// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

export type RootState = {
    auth: {
        isAuthenticated: boolean;
        user: any | null;
    }
}
