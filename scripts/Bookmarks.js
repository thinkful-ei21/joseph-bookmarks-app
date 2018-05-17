/* global Store, Api*/

'use strict';

// set bookmarks equal to the array of objects (bookmarks) in Store.js

const Bookmarks = (function(){

  // create HTML for a bookmark object while using the keys to get values
  // RETURNS: a string template for generateBookmarksListString to use
  // logging this function will return the string template with 'undefined' as the values
  const generateBookmarkElement = function(bookmark){
    return `
    <li class="js-bookmark-element" data-item-id="${bookmark.id}">
      <div class="bookmark-container">
        <h3>${bookmark.title}</h3>
        <p>${bookmark.rating}</p>
        <a class="expand" href="${bookmark.url}">${bookmark.url}</a>
        <p class="expand">${bookmark.desc}</p>
        <div class="bookmark-list-utilities">
          <button class="bookmark-delete js-bookmark-delete">
            <span class="button-label">Delete</span>
          </button>
        </div>
      </div>
    </li>
    `;
  };

  // create the above html for each bookmark object in the bookmarks array
  // RETURNS: generateBookmarkElement's html with values filled in for all the items in bookmarks array
  const generateBookmarksListString = function(bookmarksList){ // <--- always needs to receive Store.bookmarks
    const bookmarks = bookmarksList.map(bookmark => generateBookmarkElement(bookmark));
    return bookmarks.join('');
  };

  const render = function(){
    // getBookmarks pre-existing in Api

    // this will populate the 'ul' with html generated from passing in the array bookmarks
    $('.js-bookmarks-list').html(generateBookmarksListString(Store.bookmarks));
    console.log('render ran!');
  };

  function getItemIdFromElement(bookmark) {
    return $(bookmark)
      .closest('.js-bookmark-element')
      .data('item-id');
  }

  // when user submits form, check form values and create an AJAX request filling in the request parameters
  // listen for form submission, handle what to do when user submits form
  const handleNewBookmarkSubmit = function(){
    $('#js-add-bookmark-form').submit(function(event){
      event.preventDefault();

      const bookmarkObject = {
        title: $('.js-bookmark-title-entry').val(),
        url: $('.js-bookmark-url-entry').val(),
        desc: $('.js-bookmark-description-entry').val(),
        rating: $('.js-bookmark-rating-entry').val(),
        expand: false,
        editable: false
      };

      if (bookmarkObject.title.length > 0) {
        Api.addBookmark(bookmarkObject, (newBookmark) => {
          Store.addBookmark(newBookmark);
          render();
        });
      } else {
        alert('Title must not be blank.');
      }
      this.reset();
    });
  };

  // when user clicks delete button, check value of list item and send a delete request to Api
  // delete from store
  const handleBookmarkDeleteClicked = function(){
    $('.js-bookmarks-list').on('click', '.js-bookmark-delete', event => {
      const id = getItemIdFromElement(event.currentTarget);

      Api.deleteBookmark(id, () => {
        Store.findAndDelete(id);
        render();
      });
    });
  };

  const handleBookmarkClicked = function(){
    $('.js-bookmarks-list').on('click', '.js-bookmark-element', event => {
      $('.expand').toggle();
    });
  };

  const bindEventListeners = function(){
    // Add HANDLERS here
    handleNewBookmarkSubmit();
    handleBookmarkDeleteClicked();
    handleBookmarkClicked();
  };

  return {
    bindEventListeners,
    render,
  };

}());