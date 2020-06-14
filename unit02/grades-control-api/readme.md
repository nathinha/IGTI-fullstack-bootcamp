# Grades Control API

## Objectives

Create a backend application named "grades-control-api" that provides an API that allows user to control grades from students in subjects of a course.

To exercise some concepts as:
* Backend application development with
  * Node.js and
  * Express
 * Create endpoints

## Requirements

* Develop endpoints to
  * create grade;
  * update grade;
  * delete grade; and
  * read grade.
* A file (named grades.json) containing some grades shall be downloaded from '[https://igti.instructure.com/courses/2936/files/193818/download?wrap=1](https://igti.instructure.com/courses/2936/files/193818/download?wrap=1)' and will be used as database for this challenge.
* A grade object will contain the following tags:
  * id (integer): a unique identifier for the grade. Backend application will be responsible to guarantee no duplicates will be added to the file.
  * student (string): student name (e.g., 'Nathalia Rippel').
  * subject (string): the name of the subject the grade is related to (e.g., 'Math').
  * type (string): activity type (e.g., 'Final Test').
  * value (float): activity grade (e.g., 10).
  * timestamp (string): time the grade was saved into the database (e.g., '2020-05-19T18:21:24.964Z'). This value will be added/updated by the backend application.
 * The 'grades.json' file will contain two objects:
  * nextId (integer): a helper to the backend to know the next available identifier value.
  * grades (array): an array containing all grades.
* The following endpoints shall be developed:
  * create (POST /grades): shal receive the tags 'student', 'subject', 'type' and 'value' with their related values as JSON in the request body. These values shall be joined with an unique ID and timestamp before saving to the database. The created object shall be returned in the response.
  * update (PUT /grades/:id): shall receive the tags 'student', 'subject', 'type' and 'value' with their related values as JSON in the request body. The grade 'id' will be provided as parameter in the request. If the grade with given 'id' exists, data shall be updated, otherwise an error shall be returned (404).
  * delete (DELETE /grades/:id): shall receive the grade 'id' as parameter in the request and, if the grade with given 'id' exists, delete data from database, otherwise an error shal be returned (404).
  * read (GET /grades/:id): shall receive the grade 'id' as parameter in the request and, if the grade with given 'id' exists, return the grade information in the response, otherwise an error shal be returned (404).
  * read (GET /student): shall receive the tags 'student' and 'subject' with their related values as JSON in the request body. The backend application shall return the sum of all activities related to the given 'student' and 'subject' in the response.
  * read (GET /subject/average): shall receive the tags 'subject' and 'type' with their related values as JSON in the request body. The backend application shall return the average grade of given 'subject' and 'type' in the response.
  * read (GET /subject/top3): shall receive the tags 'subject' and 'type' with their related values as JSON in the request body. The backend application shall return an array containing the best three grades of given 'subject' and 'type' in the response.

## Development Tips
* The JavaScript class Date can return the date in the format presented above. Usage:
  ```javascript
  new Date().toISOString()
  ```
