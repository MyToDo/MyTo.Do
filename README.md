# MyTo.Do

A simple and intuitive to-do list that integrates with Google Tasks.

## Required
- Node

## Setup Instructions
- npm install
- node server
- Terminal will instruct that server runs at: http://0.0.0.0:8080, but you must view from http://localhost:8080/. For reasoning, see [here](https://stackoverflow.com/questions/32041418/google-sign-in-website-error-permission-denied-to-generate-login-hint-for-targ).
- Login

## Task Data

{
  "kind": "tasks#task",
  "id": string,
  "etag": etag,
  "title": string,
  "updated": datetime,
  "selfLink": string,
  "parent": string,
  "position": string,
  "notes": string,
  "status": string,
  "due": datetime,
  "completed": datetime,
  "deleted": boolean,
  "hidden": boolean,
  "links": [
    {
      "type": string,
      "description": string,
      "link": string
    }
  ]
}

## Useful links
- https://developers.google.com/apis-explorer/#search/tasks/tasks/v1/
- https://developers.google.com/google-apps/tasks/
- https://console.developers.google.com/iam-admin/iam/project?project=thisismytodo
