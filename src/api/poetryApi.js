import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const poetryApi = createApi({
  reducerPath: 'poetryApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://poetrydb.org' }), //url base
  endpoints: (builder) => ({
    getPoemsByAuthor: builder.query({
      // por defeito Shakespeare — aceita outros autores
      query: (author = 'Shakespeare') => `/author/${encodeURIComponent(author)}`,
    }),
    getPoemByTitle: builder.query({
      query: (title) => `/title/${encodeURIComponent(title)}`,
      // PoetryDB devolve array, retornar o primeiro
      transformResponse: (response) => (Array.isArray(response) ? response[0] : response), //recebe o primeiro obj do poema e nao um array
    }),
    getRandomPoem: builder.query({
      query: () => '/random',
      transformResponse: (res) => (Array.isArray(res) ? res[0] : res), //poema aleatorio, algo que ainda nao integrei
    }),
  }),
})

export const {
  useGetPoemsByAuthorQuery,
  useGetPoemByTitleQuery,
  useGetRandomPoemQuery,
} = poetryApi