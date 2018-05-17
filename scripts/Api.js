/* global */

'use strict';

/*eslint-disable-next-line*/
const Api = (function(){

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/joseph';

  // CRUD -> GET //
  const getBookmarks = function(callback){
    $.getJSON(`${BASE_URL}/bookmarks/`, callback);
  };

  // CRUD -> POST //
  const addBookmark = function(bookmark, callback){
    $.ajax({
      url: `${BASE_URL}/bookmarks/`,
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(bookmark),
      success: callback,
    });
  };

  // CRUD -> PATCH //
  const editBookmark = function(id, newData, callback){
    $.ajax({
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'PATCH',
      contentType: 'application/json',
      data: JSON.stringify(newData), // newData should be an object
      success: callback,
    });
  };

  // CRUD -> DELETE //
  const deleteBookmark = function(id, callback){
    $.ajax({
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'DELETE',
      success: callback,
    });
  };

  return {
    getBookmarks, addBookmark, editBookmark, deleteBookmark,
  };

}());