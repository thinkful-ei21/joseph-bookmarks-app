/* global Store, Api*/

'use strict';

// set bookmarks equal to the array of objects (bookmarks) in Store.js

const Bookmarks = (function(){

  // create HTML for a bookmark object while using the keys to get values
  // RETURNS: a string template for generateBookmarksListString to use
  // logging this function will return the string template with 'undefined' as the values
  const generateBookmarkElement = function(bookmark){
    return `

      <div class="panel panel-default js-bookmark-element" data-item-id="${bookmark.id}">
        <div class="panel-heading" role="tab">
          <h4 class="panel-title">
            <a role="button" data-toggle="collapse" data-parent="#accordion" href="#${bookmark.id}" aria-expanded="true" aria-controls="${bookmark.id}">
              ${bookmark.title}
              <span class="bookmark-rating">
                ${renderStars(bookmark.rating)}
              </span>
            </a>
          </h4>
        </div>
        <div id="${bookmark.id}" class="panel-collapse collapse" role="tabpanel">
          <div class="panel-body">
            <p data-id="${bookmark.id}">${bookmark.desc}</p>
            <p><a data-id="${bookmark.id}" target="_blank" href="${bookmark.url}">Visit Site</a></p>
            <button type="button" class="btn btn-danger js-bookmark-delete" data-id="${bookmark.id}">Delete</button>
          </div>
        </div>
      </div>
    `
    ;
  };

  // create the above html for each bookmark object in the bookmarks array
  // RETURNS: generateBookmarkElement's html with values filled in for all the items in bookmarks array
  const generateBookmarksListString = function(bookmarksList){ // <--- always needs to receive Store.bookmarks
    const bookmarks = bookmarksList.map(bookmark => generateBookmarkElement(bookmark));
    return bookmarks.join('');
  };

  // Tried this but failed //
  const renderStars = function(starVal){
    const starHTML = '<span class="glyphicon glyphicon-star"></span>';

    let currentString = '';
    for (let i = 0; i < starVal; i++){
      currentString += starHTML;
    }
    return currentString;
  };

  const render = function(){
    let bookmarks = Store.bookmarks.filter(bookmark => {
      return bookmark.rating >= Store.minimumRating;
    });
    
    // this will populate the 'ul' with html generated from passing in the array bookmarks
    $('.js-bookmarks-list').html(generateBookmarksListString(bookmarks));
  };

  const getItemIdFromElement = function(bookmark) {
    return $(bookmark)
      .closest('.js-bookmark-element')
      .data('item-id');
  };

  // when user submits form, check form values and create an AJAX request filling in the request parameters
  // listen for form submission, handle what to do when user submits form
  const handleNewBookmarkSubmit = function(){
    $('#js-add-bookmark-form').submit(function(event){
      event.preventDefault();

      const bookmarkObject = {
        title: $('.js-bookmark-title-entry').val(),
        url: $('.js-bookmark-url-entry').val(),
        desc: $('.js-bookmark-description-entry').val(),
        rating: $('.js-bookmark-rating').val(),
      };

      Api.addBookmark(bookmarkObject, (newBookmark) => {
        Store.addBookmark(newBookmark);
        render();
      });

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

  const handleMinimumRatingFilter = function() {
    $('.js-bookmark-rating-filter').on('change', event => {
      let rating = $(event.target).val();
      Store.minimumRating = rating;
      render();
    });
  };

  const bindEventListeners = function(){
    // Add HANDLERS here
    handleNewBookmarkSubmit();
    handleBookmarkDeleteClicked();
    handleMinimumRatingFilter();
  };

  return {
    bindEventListeners,
    render,
  };

}());