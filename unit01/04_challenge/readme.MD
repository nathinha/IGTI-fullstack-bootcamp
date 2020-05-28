# User Search
## Objectives

Create an application that filters a given list of users by name and show statistics over the filtered data.

To exercise some concepts as:
* HTML elements
* CSS
* 'Vanilla' JavaScript
  * DOM handling
  * Value formatting (Intl)
  * Array methods
    * map
    * filter
    * reduce
    * find
    * sort
  * HTTP requests using the fetch command.

## Requirements
* Get data from 'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo' on application load
* Load this data into an array
* Filter the array based on the user input
  * User can type 'enter' to trigger the filter
  * User can press 'enter' to trigger the filter
  * User can press 'SEARCH' button to trigger the filter
  * Empty input shall not be evaluated and 'SEARCH' button shall be disabled
* Prepare two containers side-by-side to show the filter results
  * Left container
    * List of users containing the following data:
      * Photo
      * Name
      * Age
    * List of statistics based on filtered data:
      * Number of users which are male
      * Number of users which are female
      * Sum of ages
      * Age average

## Development Tips

* Data to be mapped from the API
  * name: name.first + name.last
  * photo: picture.thumbnail
  * age: dob.age
  * gender
* Events to be listened:
  * 'load' on window
  * 'keyup' on input
  * 'click' on button

> You can improve searching by considering all 'keyup' events, so every character typed will trigger the filter.

* Use toLowerCase or toUpperCase on both input value and user name to get as the indexOf function is case sensitive. This will allow to filter the input data from any part of the name.
* Do not create long functions. Prefer to insulate small tasks into their own functions.
* To handle DOM document, prefer to use the functions instead of filling the innerHTML with a huge HTML code and template literals. Writing the HTML by yourself is very error prone.

> To have a better UI, use [Materialize](https://materializecss.com) or [Bootstrap](https://getbootstrap.com)
>> I've never said easier to handle UI.
