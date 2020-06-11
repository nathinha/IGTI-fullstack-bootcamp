# City-State
## Objectives

Create a Node.js backend application that is dumb, does not acts as a server and just executes file processing activities.

To exercise some concepts learnt in 'Unit 02' as:
- Node.js
  - project creation;
  - file system;
  - JSON objects.

## Requirements
- Download files Cidades.json and Estados.json from https://github.com/felipefdl/cidades-estados-brasil-json to use within the project.
  - **Estados.json:** contains a list of all brazilian states, using the following JSON object:
  ```json
  {
    "ID": "number",
    "Sigla": "string",
    "Nome": "string"
  }
  ```
  - **Cidades.json:** contains a list of all brazilian cities, using the following JSON object:
  ```json
  {
    "ID": "number",
    "Nome": "string",
    "Estado": "number" 
  }
  ```
- The cities listed in the "Cidades.json" file are "linked" to the states by the "Estado" name/value pair, where its value shall be one of the "ID"s present in the "Estados.json" file.
- The following functions shall be created:
  - A funtion that creates a JSON file for each state present in the "Estados.json" file and its content will be a JSON object containing all cities from "Cidades.json" that have "Estado" value equal to the state ID. The file created shall be named "Sigla.json".
  - A function that, given a state "sigla", retrieves the number of cities present in the related file.
  - A function that logs in the concole an array containing the 5 states that have more cities (ordered desc by number of cities).
  - A function that logs in the concole an array containing the 5 states that have less cities (ordered desc by number of cities).
  - A function that logs in the console an array containing the longest city name for each state, followed by the state "sigla" value (order aphabetically and return first entry in case of tie).
  - A function that logs in the console an array containing the shortest city name for each state, followed by the state "sigla" value (order aphabetically and return first entry in case of tie).
  - A function that logs in the console the longest city name, followed by the state "sigla" value (order aphabetically and return first entry in case of tie).
  - A function that logs in the console the shortest city name, followed by the state "sigla" value (order aphabetically and return first entry in case of tie).
- The project execution consists in running all methods in sequence and exiting.
