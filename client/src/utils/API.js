import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()
});

export const getMe = async (token) => {
  const response = await client.query({
    query: gql`
      query {
        me {
          _id
          username
          email
          savedBooks {
            bookId
            authors
            description
            image
            link
            title
          }
        }
      }
    `,
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  });

  return response.data;
};

export const createUser = async (userData) => {
  const response = await client.mutate({
    mutation: gql`
      mutation createUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
          token
          user {
            _id
            username
            email
          }
        }
      }
    `,
    variables: userData,
  });

  return response.data.createUser;
};

export const loginUser = async (userData) => {
  const response = await client.query({
    query: gql`
      query loginUser($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
          user {
            _id
            username
            email
          }
        }
      }
    `,
    variables: userData,
  });

  return response.data.login;
};

export const saveBook = async (bookData, token) => {
  const response = await client.mutate({
    mutation: gql`
      mutation saveBook($bookData: BookInput!) {
        saveBook(bookData: $bookData) {
          _id
          username
          email
          savedBooks {
            bookId
            authors
            description
            image
            link
            title
          }
        }
      }
    `,
    variables: { bookData },
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  });

  return response.data.saveBook;
};

export const deleteBook = async (bookId, token) => {
  const response = await client.mutate({
    mutation: gql`
      mutation deleteBook($bookId: ID!) {
        deleteBook(bookId: $bookId) {
          _id
          username
          email
          savedBooks {
            bookId
            authors
            description
            image
            link
            title
          }
        }
      }
    `,
    variables: { bookId },
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  });

  return response.data.deleteBook;
};

export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};