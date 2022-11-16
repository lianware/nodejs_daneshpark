# *DaneshPark*
 
In this document we introduce ***DaneshPark*** API

## Authentication
- POST `/user/authenticate`
- Body `{
  "email": {email}<String>,
  "password": {password}<Integer>
}`

##  Books

#### Add a book : 
- POST`/add/book`
- Headers `{
  "token": {token}
}`
- Body `{
  "name": {bookname}<String>,
  "about": {description}<String>,
  "price": {price}<Integer>,
  "status": {status}<Integer>,
  "image_url": {image_url}<String>
}`

#### Buy a book : 
- POST`/buy/book?id={bookid}&token={token}`

#### Get user's books : 
- GET`/get/book?token={token}`

#### Get All of the books : 
- GET`/get/books`

#### Get book's authors :
- GET`/get/author/book?id={id}`

##  Tours

#### Add a tour : 
- POST`/add/tour`
- Body `{
  "name": {bookname}<String>,
  "place": {place}<String>,
  "time": {time}<String>,
  "price": {price}<Integer>,
  "about": {about}<String>,
  "capacity_max": {capacity_max}<Integer>,
  "capacity_min": {capacity_min}<Integer>,
  "organizer": {organizer}<String>,
  "image_url": {image_url}<String>
}`

#### Buy a tour : 
- POST`/buy/tour?id={bookid}&token={token}`

#### Get All of the tours : 
- GET`/get/tours`

#### Get a tour :
- GET`/get/tour?id={id}`


## Users

#### User Register :
- POST`/user/new`
- Body `{
  "firstname": {firstname}<String>,
  "lastname": {lastname}<String>",
  "code": {national_number}<String>,
  "birthday": {birthday}<String>,
  "gender": {gender}<String>,
  "phone": {phone_number}<String>,
  "address": {address}<String>,
  "email": {email}<String>,
  "password": {password}<String>,
  "amount": {amount}<Integer>
}`
