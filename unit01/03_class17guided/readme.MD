# Favorite Countries Picker

## Objectives
Create an application that lists all countries and allow the user to select its favorites into another list.

## Requirements
### User Stories
* As a user I want to be able to click a button so that I can add a country to my favorite list
* As a user I want to be able to click a button so that I can remove a country from my favorite list

### Specification
* Fetch countries list from 'https://restcountries.eu/rest/v2/all'
* UI shall present the total number of countries 
* UI shall present the total number of favorite countries
* UI shall present the sum of the population of all countries listed
* UI shall present the sum of the population of all favorite countries listed
* UI shall present the population of each country alone
* Country names shall be presented in portuguese (pt-BR)
* Population values shall be presented in portuguese (pt-BR) format
* Countries shall be sorted alphabetically

## Development Tips
* After retrieving the countries data, map only necessary data: id, name (use the portuguese one), population and flag
* When mapping the information, use the number formatter to keep the country population formatted as additional data
* Remember to render the lists after each operation
