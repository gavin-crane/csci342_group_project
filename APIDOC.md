
#API DOC
## All posts have the following fields, this is the schema for the posts collection:
```
    userId:{
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    chipData: {
      type: Object // check 'wwu-csci-forum/src/util/chips/chips.js' to see the structure of this object. chips are just tags
    },
    codeLink: {
      type: String
    },
    replies: {
      type: [] // aray of replies that follow the format: {userID: type: String (mongoDBID), 
                                                           author: type: String (users username)
                                                           content: type: String (text body of reply)}
    }
```
## All users have the following fields, this is the schema for the users collection:
```
 firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  major: {
    type : String,
    required: false
  }, 
  gradYear: {
    type : String,
    required: false
  }, 
  favLang: { // favorite language
    type : String,
    required: false
  } , 
  bio: {
    type : String,
    required: false
  } 
 ```
## Sign up
**Request Format:** /api/signup/

**Request Type:** POST

**Returned Data Format**: JSON

**Description:** adds user to the users collection

**Example Request:**
```
url: proxy + /api/signup
request body:
{
  userName: 'John'
  password: '123abc!',
  confirmPassword: '123abc!',
}
```
successful signup response:
```json
{
  status: 'success',
  message: "User created successfully!",
  data: {
    user
  }
}
```
## Log in
**Request Format:** /api/login/

**Request Type:** POST

**Returned Data Format**: JSON

**Description:** logs in user to the website

**Example Request:**
```
url: proxy + /api/login
request body:
{
  userName: 'John'
  password: '123abc!',
}
```
successful signup response:
```json
{
  status: 'success',
  message:  'Login successful!',
  data: {
    user
  }
}
```
## Submit Post
**Request Format:** /api/submitPost/

**Request Type:** POST

**Returned Data Format**: JSON

**Description:** submits a user post to the database

**Example Request:**
```
url: proxy + /api/submitPost
request body:
{
  userId: '1234523213', 
  userName: 'John', 
  title: 'This is a title',
  body: 'This is a text body',
  chipData: '{ { key: 2, label: 'CS 241' }, { key: 3, label: 'Internship' }}',
  replies: []
}
```
successful post response:
```json
{
 message: "post created successfully"
}
```
## Submit reply
**Request Format:** /api/submitReply/

**Request Type:** POST

**Returned Data Format**: JSON

**Description:** submits a reply to a post

**Example Request:**
```
url: proxy + /api/submitReply
request body:
{
  postID: '1233123123',
  userID: '5442523422',
  author: 'John,
  content: 'hello world'
}
```
successful submit reply response:
```json
{
  "replies":post.replies
}
```
## deletePost
**Request Format:** /api/deletePost/

**Request Type:** POST

**Returned Data Format**: JSON

**Description:** deletes a post

**Example Request:**
```
url: proxy + /api/deletePost
request body:
{
  userId: '12312312'
  _id: '32413212' // the id of the post
}
```
successful post deletion response:
```json
{
  message: "post deleted"
}
```
## get posts
**Request Format:** /api/getPosts/

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** gets all posts for the posts collection

**Example Request:**
```
url: proxy + /api/getPosts
```
successful retrieval of all posts:
```json
{
 posts // lists all of the posts in response
}
```
## get posts by id
**Request Format:** /api/getPostById/

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** gets all posts for the posts collection

**Example Request:**
```
url: proxy + /api/getPostById?postID=123456
```
successful retrieval of post:
```json
{
  post // shows the retrieved post
}
```
## Get replies
**Request Format:** /api/getReplies

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** gets all the replies for a given post id

**Example Request:**
```
url: proxy + /api/getReplies?postID=123456
```
successful retrieval of post replies:
```json
{
  post.replies // shows all of the replies
}
```
## Get user posts
**Request Format:** /api/getUserPosts

**Request Type:** POST

**Returned Data Format**: JSON

**Description:** Gets all the the posts from a given username

**Example Request:**
```
url: proxy + /api/getUserPosts
request body:
{
  username: 'john'
}
```
successful retrieval of posts:
```json
{
  posts // shows all of the posts from user
}
```
## user profile update
**Request Format:** /api/update

**Request Type:** POST

**Returned Data Format**: JSON

**Description:** Gets all the the posts from a given username

**Example Request:**
```
url: proxy + /api/update
request body:
{
  username: 'john';,
  firstName: 'johnny',
  lastName: 'smith',
  password: '123abc!',
  major: 'Computer Science;,
  gradYear: '2023',
  favLang: 'C++',
  bio: 'I like tto code'
}
```
successful update of profile:
```json
{
  status: 'success',
  message: 'User updated successfully',
  data: {       
    user
    },
}
```
## user profile
**Request Format:** /api/profile

**Request Type:** POST

**Returned Data Format**: JSON

**Description:** Gets all user data from a given username in the users collection

**Example Request:**
```
url: proxy + /api/profile
request body:
{
  username: 'john';,
}
```
successful update of profile:
```json
{
  status: 'success',
  message: 'User updated successfully',
  data: {       
    user
  },
}
```
