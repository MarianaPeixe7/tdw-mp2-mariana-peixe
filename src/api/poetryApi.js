import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const poetryApi = createApi({
  reducerPath: 'poetryApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://poetrydb.org' }),
  endpoints: (builder) => ({
    getPoemsByAuthor: builder.query({
      // por defeito usamos Shakespeare — aceita outro autor
      query: (author = 'Shakespeare') => `/author/${encodeURIComponent(author)}`,
    }),
    getPoemByTitle: builder.query({
      query: (title) => `/title/${encodeURIComponent(title)}`,
      // PoetryDB devolve array, retornamos o primeiro
      transformResponse: (response) => (Array.isArray(response) ? response[0] : response),
    }),
    getRandomPoem: builder.query({
      query: () => '/random',
      transformResponse: (res) => (Array.isArray(res) ? res[0] : res),
    }),
  }),
})

export const {
  useGetPoemsByAuthorQuery,
  useGetPoemByTitleQuery,
  useGetRandomPoemQuery,
} = poetryApi