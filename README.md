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

# To-Do

- Write Test Cases
- Invoke Digital Ocean Spaces API to check if the UUID generated exists for a file.
- Add a component that allows users to configure what they want to do with the image before publishing it.

# Suggestions

- Authorized Image
  - Requires a unique password to access.
  - Add a NSFW tag
- Add a spoiler tag
  - To show NSFW or Spoiler, you can add some background blur effect to it, and then the user clicks it, it will remove the blur effect.
- Add a timer on when to delete the photo
- View only once
- How many people can view the image
- Unlisted

# Done

- Install React Router Dom
- Send the image id to the front-end
- On the front-end we navigate to a route with the image id as the parameter.
  - On this page, we display the image to the user.
- Handle different image types.
- Change Embed & Title & Description
