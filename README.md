# MyTo.Do

A simple and intuitive to-do list that integrates with Google Tasks.

## Features
- Tasks
  - Display's Mark's tasks from one specified task list
- Checkboxes
- Display's Mark's tasks' checkboxes from one specified task list
- Buttons
  - New Task
    - Adds a new task to top of list
    - View only updates upon refresh
  - Edit Task
    - No function
  - Delete Task
    - Deletes the first task and removes from view
- Keys
  - Enter
    - Appears to create a new task on view
    - Doesn't create a new task
  - Backspace
    - Deletes current task when cursor is at [0]
    - Doesn't edit task
    - Subtasks of a deleted task go to bottom upon refresh
  - Delete
    - Deletes next task when cursor is at end
    - Doesn't edit task
    - Subtasks of a deleted task go to bottom upon refresh

## Required
- Node

## Setup Instructions
- npm install
- Type `node server` to run the application
- Terminal will instruct that server runs at: http://0.0.0.0:8080, but you must view from http://localhost:8080/. Why? See [here](https://stackoverflow.com/questions/32041418/google-sign-in-website-error-permission-denied-to-generate-login-hint-for-targ).
- Login

## Task Data
Each task comes with the following data attributes:

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
