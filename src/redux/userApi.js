import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://connections-api.herokuapp.com/',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Users'],
    endpoints: builder => ({
        getCurrentUser: builder.query({
            query: () => '/users/current',
            providesTags: ['Users'],
        }),
        signupUser: builder.mutation({
            query: ({ name, email, password }) => ({
                url: '/users/signup',
                method: 'POST',
                body: {
                    name: name,
                    email: email,
                    password: password,
                },
                transformResponse: response => response.data,
            }),
            invalidatesTags: ['Users'],
        }),
        loginUser: builder.mutation({
            query: ({ email, password }) => ({
                url: '/users/login',
                method: 'POST',
                body: {
                    email,
                    password,
                },
            }),
            invalidatesTags: ['Users'],
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: 'users/logout',
                method: 'POST',
            }),
            invalidatesTags: ['Users'],
        }),
    }),
});

export const {
    useGetCurrentUserQuery,
    useSignupUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
} = usersApi;