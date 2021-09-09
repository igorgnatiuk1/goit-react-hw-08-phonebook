import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
    reducerPath: 'contactsApi',
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
    tagTypes: ['Contacts'],
    endpoints: builder => ({
        getContacts: builder.query({
            query: () => '/contacts',
            providesTags: ['Contacts'],
        }),
        addContact: builder.mutation({
            query: ({ name, number }) => ({
                url: '/contacts',
                method: 'POST',
                body: {
                    name,
                    number,
                },
            }),
            invalidatesTags: ['Contacts'],
        }),
        deleteContact: builder.mutation({
            query: id => ({
                url: `/contacts/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Contacts'],
        }),
    }),
});

export const {
    useGetContactsQuery,
    useAddContactMutation,
    useDeleteContactMutation,
} = contactsApi;