/* global Bookmarks, Api, Store*/

'use strict';

$(document).ready(function(){
  Bookmarks.bindEventListeners();
  Bookmarks.render();

  Api.getBookmarks((bookmarks) => {
    bookmarks.forEach((bookmark) => Store.addBookmark(bookmark));
    Bookmarks.render();
  });
});


