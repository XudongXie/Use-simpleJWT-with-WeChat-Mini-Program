# Use-simpleJWT-with-WeChat-Mini-Program
Python Django and WeChat Mini Program

Recently, I am doing a project with Python/Django for backend to support WeChat Mini Program as front end. I am using this to record

something might be valuable to share here. So...



Tokens:



To use simplejwt tokens, we need to deal with 3 cases:

1. Generate new tokens (access_token,refresh_token) for new user.

2. Using refresh_token to refresh a new access_token for an exsiting user.

3. Generate new tokens (access_token,refresh_token) for exsiting user in case the user's refresh_token is also expeired.



almost every request made to backend, you need to take good care of these Tokens, so I put it into a single js for refrence.
