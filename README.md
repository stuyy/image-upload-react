# Building an Image Hosting Site

Front End

- For the user to upload the image
- Allow drag & drop
- We can show a preview

Back End

- Handle photos/files
- Back-end will call Spaces API to save the image sent from the front-end

Problem:

- Find out how to generate unique code that maps to the image the user uploaded.

# Done

- Install React Router Dom
- Send the image id to the front-end
- On the front-end we navigate to a route with the image id as the parameter.
  - On this page, we display the image to the user.
- Handle different image types.

# To-Do

- Write Test Cases
- Invoke Digital Ocean Spaces API to check if the UUID generated exists for a file.
