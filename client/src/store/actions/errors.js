import {ADD_ERROR,REMOVE_ERROR} from "../actionTypes"

export const addError = errors => (
   {
    type : ADD_ERROR,
    errors
  })

export const removeError = () => (
    {
     type : REMOVE_ERROR
   })
 
 