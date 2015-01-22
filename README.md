# Teacup Password Reset

Adding this repo so we have versioning of these files.

---

The purpose of these files is described here:
https://github.com/spark/rfcs/blob/master/services/product-users.md#4-password-reset

The proof of concept versions in that spec have been made to fit Teacup's style guide.

Also the messages have been made more production ready rather than helpful for debugging.

The files are hosted in an AWS S3 bucket called `k-connect`:

- https://s3.amazonaws.com/k-connect/index.html
- https://s3.amazonaws.com/k-connect/reset-password.js

The Reader font is also hosted there.

Teacup will host the actual `index.html` file on their own server.
