# shells/standalone

Launches Apollo Client Devtools in a standalone electron app. The app
runs a websocket server to communicate with the apollo-client page or app.
Instead of using postMessage (how the Chrome extension works), communication
between the devtools and the page-with-apollo-client (backend) is done
over WebSocket. This appraoch is modelled on react-devtools' standalone
app.

## To set up backend

- cd to the root of this repo (not shells/standalone)
- Run `npm run standalone:backend`
- Copy `backend-module` into your app's node_modules as "backend"
- Copy the built shells/standalone/build/\* into the "node_modules/backend" folder
- Build your app

## To run the devtools

- Build devtools: `npm run standalone:devtools:build`
  - Use `-- --watch` if you want to watch; you can Cmd+R to refresh most
    changes in the devtools.
- Run devtools: `npm run standalone:devtools:start`

# Notes

- As of devtools 2.2.3, you need to use `apollo-link@1.2.0^` instead of the
  default "1.0.7^" Otherwise you'll get strange `_super.call is undefined` errors
  on the backend side due to some incompatibiliies in zen-observable &
  ObservableQuery. This should already be in package.json
