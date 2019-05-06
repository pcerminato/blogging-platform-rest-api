# blogging-platform-rest-api

A RESTful API for a blog entries

## To get started :rocket:

You need to have installed

- nodejs
- mongodb running locally -or- remote (you'll need to change the config)

Checkout the repo and then run

- `npm install / yarn`
- `npm run dev / yarn dev`

By default the application will run on http://localhost:3000

## Using the API

1. POST /signin to get a valid token.

> Use a body like this

```
{
"email": "myemail@nothere.com",
"password": "abracadabra"
}
```

2. Add the returned token in the Authorization header for every /post and /user. Use Bearer Token authorization type.

3. Start making requests!

- Get public and private(\*) posts `GET /api/post`
- Get drafts(\*) `GET /api/post/drafts`
- Create a post `POST /api/post`. Use this basic model

```
{ title: String, body: String, state: String }
```

Valid values for `state` are _draft_ (default), _public_ or _private_.

- Delete a post `DELETE /api/post/:post_id`
- Text search `GET /api/post/search?words=:text`. The search will be performed only over _public_ posts.

\*Only those created by the authenticated user
