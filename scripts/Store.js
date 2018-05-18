/* global cuid */

'use strict';

/*eslint-disable-next-line*/
const Store = (function(){

  const findById = function(id){
    return this.bookmarks.find(bookmark => bookmark.id === id);
  };
  
  const addBookmark = function(bookmark){
    this.bookmarks = this.bookmarks.concat(bookmark);
  };

  const findAndUpdate = function(id, newData){
    const bookmark = this.findById(id);
    Object.assign(bookmark, newData);
  };

  const findAndDelete = function(id){
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
  };



  return {
    bookmarks: [],
    minimumRating: 0,

    addBookmark,
    findById,
    findAndDelete,
    findAndUpdate,

  };

}());