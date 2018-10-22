import React, { Component } from 'react';
import { fromJS } from 'immutable';
import fetch from 'isomorphic-fetch';
import { isEmpty } from 'lodash';
import { apiKey } from '../auth/apiKey';

export const SET_BOOKS = 'SET_BOOKS'
export const SET_QUERY = 'SET_QUERY'

export function setBooks (value) {
  return {
    type: SET_BOOKS,
    payload: value
  }
}

export function setQuery (query) {
  return {
    type: SET_QUERY,
    payload: query
  }
}

export const getBooks = (query) => {
  return (dispatch, getState) => {
    dispatch(setQuery(query))
    !isEmpty(query) ? fetch('https://www.googleapis.com/books/v1/volumes?q=' + query + '&key=' + apiKey)
    .then(response => {
      if (response.status >= 400) {
        throw new Error('Error. Try your query again.')
      }
      return response.json()
    }).then(books => {
      dispatch(setBooks(books.items))
    }).catch(error => {
      console.log(error)
    }) : dispatch(setBooks([]))
  }
}

export const actions = {
  getBooks
}

const ACTION_HANDLERS = {
  [SET_BOOKS]: (state, {payload: books}) => {
    return state.set('books', fromJS(books))
  },
  [SET_QUERY]: (state, {payload: query}) => {
    return state.set('query', fromJS(query))
  }
}

const initialState = fromJS({})
export default (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]
  return handler? handler(state,action) : state
}
