# BYOB
-

This API provides access to the database of unofficial Holidays throughout the year. Each Holiday provides a Holiday Name, Full Date, Month and a Holiday Type category.


# Endpoints
-

### POST Authenticate

```
POST Authenticate

```

#### Description:
* Issues the user a JWT according to authorization level.
* User will need to submit email and application name in order to be issued a JWT.
* Only users with a valid email ending in @turing.io will be granted "Admin" privileges to be able to POST, PUT, PATCH, DELETE

#### Example:
```
'/api/v1/authenticate'
```

#### Return:
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuYUB0dXJpbmcuaW8iLCJhcHBOYW1lIjoibXlBUFAiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTA3OTE2ODEwfQ.FF12hQgW-NT-sOCIBRRoQJpmp5wXwL3RwJuYoWP1qH0"
}
```

-

### GET Types

```
GET Types
```

#### Description
* Returns all types of Holidays

#### Example
```
'/api/v1/types'
```

#### Return
```
[
    {
        "id": 17,
        "type": "career",
        "created_at": "2017-10-12T21:46:50.470Z",
        "updated_at": "2017-10-12T21:46:50.470Z"
    },
    {
        "id": 18,
        "type": "activity",
        "created_at": "2017-10-12T21:46:50.469Z",
        "updated_at": "2017-10-12T21:46:50.469Z"
    },
    {
        "id": 19,
        "type": "cause",
        "created_at": "2017-10-12T21:46:50.470Z",
        "updated_at": "2017-10-12T21:46:50.470Z"
    },
    {
        "id": 20,
        "type": "drinking",
        "created_at": "2017-10-12T21:46:50.476Z",
        "updated_at": "2017-10-12T21:46:50.476Z"
    },
    {
        "id": 21,
        "type": "environmental",
        "created_at": "2017-10-12T21:46:50.484Z",
        "updated_at": "2017-10-12T21:46:50.484Z"
    }
]
```

-

### GET Holidays

```
GET Holidays

```

#### Description
* Get all Holidays, user may also specify a query param of full date which will return all holidays with that date, or by month which will return all holidays within a given month.
* Month must be capitalized in both full date and month params.
* User must include a space between month and day when entering a full month.


#### Example
```
'/api/v1/holidays'
'/api/v1/holidays/?fullDate=March 4' *note space between month-day
'/api/v1/holidays/?month=November'
```

#### Return
```
[
    {
        "id": 347,
        "name": "Community Manager Appreciation Day",
        "fullDate": "January 23",
        "month": "January",
        "type_id": 17,
        "created_at": "2017-10-12T21:46:50.524Z",
        "updated_at": "2017-10-12T21:46:50.524Z"
    },
    {
        "id": 348,
        "name": "National Weatherperson’s Day",
        "fullDate": "February 5",
        "month": "February",
        "type_id": 17,
        "created_at": "2017-10-12T21:46:50.524Z",
        "updated_at": "2017-10-12T21:46:50.524Z"
    },
    {
        "id": 349,
        "name": "National Inventors’ Day",
        "fullDate": "February 11",
        "month": "February",
        "type_id": 17,
        "created_at": "2017-10-12T21:46:50.524Z",
        "updated_at": "2017-10-12T21:46:50.524Z"
    },
    {
        "id": 350,
        "name": "National Dentist’s Day",
        "fullDate": "March 6",
        "month": "March",
        "type_id": 17,
        "created_at": "2017-10-12T21:46:50.536Z",
        "updated_at": "2017-10-12T21:46:50.536Z"
    },
    {
        "id": 351,
        "name": "National Mom and Pop Business Owners Day",
        "fullDate": "March 29",
        "month": "March",
        "type_id": 17,
        "created_at": "2017-10-12T21:46:50.537Z",
        "updated_at": "2017-10-12T21:46:50.537Z"
    }
]
```

-

### GET Holidays by ID

```
GET holidays:id

```

#### Description
* Get a specific Holiday by ID


#### Example
```
'/api/v1/holidays:id'
```

#### Return
```
[
    {
        "id": 364,
        "name": "National Hugging Day",
        "fullDate": "January 21",
        "month": "January",
        "type_id": 18,
        "created_at": "2017-10-12T21:46:50.557Z",
        "updated_at": "2017-10-12T21:46:50.557Z"
    }
]

```

-


### GET Holidays corresponding to a specific type

```
GET types/:id/holidays

```

#### Description
* Get all holidays with a specified type ID.


#### Example
```
'/api/v1/types/:id/holidays'
```

#### Return
```
[
    {
        "id": 347,
        "name": "Community Manager Appreciation Day",
        "fullDate": "January 23",
        "month": "January",
        "type_id": 17,
        "created_at": "2017-10-12T21:46:50.524Z",
        "updated_at": "2017-10-12T21:46:50.524Z"
    },
    {
        "id": 348,
        "name": "National Weatherperson’s Day",
        "fullDate": "February 5",
        "month": "February",
        "type_id": 17,
        "created_at": "2017-10-12T21:46:50.524Z",
        "updated_at": "2017-10-12T21:46:50.524Z"
    },
    {
        "id": 349,
        "name": "National Inventors’ Day",
        "fullDate": "February 11",
        "month": "February",
        "type_id": 17,
        "created_at": "2017-10-12T21:46:50.524Z",
        "updated_at": "2017-10-12T21:46:50.524Z"
    },
    {
        "id": 350,
        "name": "National Dentist’s Day",
        "fullDate": "March 6",
        "month": "March",
        "type_id": 17,
        "created_at": "2017-10-12T21:46:50.536Z",
        "updated_at": "2017-10-12T21:46:50.536Z"
    },
    {
        "id": 351,
        "name": "National Mom and Pop Business Owners Day",
        "fullDate": "March 29",
        "month": "March",
        "type_id": 17,
        "created_at": "2017-10-12T21:46:50.537Z",
        "updated_at": "2017-10-12T21:46:50.537Z"
    },
    {
        "id": 352,
        "name": "National Doctors’ Day",
        "fullDate": "March 30",
        "month": "March",
        "type_id": 17,
        "created_at": "2017-10-12T21:46:50.538Z",
        "updated_at": "2017-10-12T21:46:50.538Z"
    },
    {
        "id": 353,
        "name": "National Hug a Newsperson Day",
        "fullDate": "April 4",
        "month": "April",
        "type_id": 17,
        "created_at": "2017-10-12T21:46:50.540Z",
        "updated_at": "2017-10-12T21:46:50.540Z"
    },
    {
        "id": 354,
        "name": "National Teacher’s Day",
        "fullDate": "May 2",
        "month": "May",
        "type_id": 17,
        "created_at": "2017-10-12T21:46:50.540Z",
        "updated_at": "2017-10-12T21:46:50.540Z"
    },
    {
        "id": 355,
        "name": "National Nurses Day",
        "fullDate": "May 6",
        "month": "May",
        "type_id": 17,
        "created_at": "2017-10-12T21:46:50.545Z",
        "updated_at": "2017-10-12T21:46:50.545Z"
    },
    {
        "id": 356,
        "name": "National Receptionists Day",
        "fullDate": "May 10",
        "month": "May",
        "type_id": 17,
        "created_at": "2017-10-12T21:46:50.549Z",
        "updated_at": "2017-10-12T21:46:50.549Z"
    },
    {
        "id": 357,
        "name": "National Be a Millionaire Day",
        "fullDate": "May 20",
        "month": "May",
        "type_id": 17,
        "created_at": "2017-10-12T21:46:50.549Z",
        "updated_at": "2017-10-12T21:46:50.549Z"
    },
    {
        "id": 358,
        "name": "National Waiters and Waitresses Day",
        "fullDate": "May 21",
        "month": "May",
        "type_id": 17,
        "created_at": "2017-10-12T21:46:50.552Z",
        "updated_at": "2017-10-12T21:46:50.552Z"
    },
    {
        "id": 359,
        "name": "National Maritime Day",
        "fullDate": "May 23",
        "month": "May",
        "type_id": 17,
        "created_at": "2017-10-12T21:46:50.553Z",
        "updated_at": "2017-10-12T21:46:50.553Z"
    },
    {
        "id": 360,
        "name": "National Farmers Day",
        "fullDate": "October 12",
        "month": "October",
        "type_id": 17,
        "created_at": "2017-10-12T21:46:50.555Z",
        "updated_at": "2017-10-12T21:46:50.555Z"
    },
    {
        "id": 361,
        "name": "National Author’s Day",
        "fullDate": "November 1",
        "month": "November",
        "type_id": 17,
        "created_at": "2017-10-12T21:46:50.555Z",
        "updated_at": "2017-10-12T21:46:50.555Z"
    },
    {
        "id": 362,
        "name": "National Entrepreneur’s Day",
        "fullDate": "November 15",
        "month": "November",
        "type_id": 17,
        "created_at": "2017-10-12T21:46:50.556Z",
        "updated_at": "2017-10-12T21:46:50.556Z"
    }
]
```

-

### POST a new Type of Holiday

```
POST types

```

#### Authentication:
* JWT is required to be passed in either Header, Request Body or as a Query Param ('/api/v1/holidays/?token=USER_JWT').

#### Description
* Add a new holiday type to the database. User can only add a new type that does not already exist in the database.


#### Example
```
'/api/v1/types'
```

#### Return
```
[
    {
        "id": 33,
        "type": "seasons",
        "created_at": "2017-10-13T17:48:54.623Z",
        "updated_at": "2017-10-13T17:48:54.623Z"
    }
]
```

-

### POST a new Holiday

```
POST holidays

```

#### Authentication:
* JWT is required to be passed in either Header, Request Body or as a Query Param ('/api/v1/holidays/?token=USER_JWT').

#### Description
* Post a new holiday to the database.


#### Example
```
'/api/v1/holidays'
```

#### Return
```
[
    {
        "id": 693,
        "name": "National Friends Day",
        "fullDate": "March 11",
        "month": "March",
        "type_id": 24,
        "created_at": "2017-10-13T17:47:42.164Z",
        "updated_at": "2017-10-13T17:47:42.164Z"
    }
]
```

-

### PATCH Holidays by ID

```
PATCH holidays/:id

```

#### Authentication:
* JWT is required to be passed in either Header, Request Body or as a Query Param ('/api/v1/holidays/?token=USER_JWT').

#### Description
* Make a change to a portion/all of the information about a holiday already existing within the database that matches given ID.


#### Example
```
'/api/v1/types/:id/holidays'
```

#### Return
```
User will not see a return object for a successful PATCH - instead will have a successful 204 response. New changes will be reflected in the database.
```

-

### PATCH Types by ID

```
PATCH types/:id

```

#### Authentication:
* JWT is required to be passed in either Header, Request Body or as a Query Param ('/api/v1/holidays/?token=USER_JWT').

#### Description
* Make a change to a type of holiday already existing within the database that matches given ID.


#### Example
```
'/api/v1/types/:id'
```

#### Return
```
User will not see a return object for a successful PATCH - instead will have a successful 204 response. New changes will be reflected in the database.
```

-

### DELETE a Type of Holiday

```
DELETE types

```
#### Authentication:
* JWT is required to be passed in either Header or a Query Param ('/api/v1/holidays/?token=USER_JWT').

#### Description
* Delete a type of holiday matching a specified ID, and all holidays associated with that type.


#### Example
```
'/api/v1/types/:id'
```

#### Return
```
User will not see a return object for a successful PATCH - instead will have a successful 204 response. New changes will be reflected in the database.
```

-

### DELETE a Holiday

```
DELETE holidays

```

#### Authentication:
* JWT is required to be passed in either Header or a Query Param ('/api/v1/holidays/?token=USER_JWT').

#### Description
* Delete a holiday matching a specified ID.


#### Example
```
'/api/v1/holiday/:id'
```

#### Return
```
User will not see a return object for a successful PATCH - instead will have a successful 204 response. New changes will be reflected in the database.
```
