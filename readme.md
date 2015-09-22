# Frontend Bootstrap

## How to: Setup development environment
1. Make sure the following is installed on your machine:
    - [Node.js](http://nodejs.org/)
2. Run this command to install the global dependencies:

    ```
    npm install -g gulp
    ```
3. Run these commands to install the project-specific dependencies:

    ```
    npm install
    ```
4. Done! You can now start your development server.

## How to: Start the development server
```
gulp dev
```

Then point your browser to `http://localhost:3000/`

## How to: Build, test and upload
```
gulp dist
```
### Upload
Add a .env file to the project root with your FTP credentials (host, user and password).   
```
gulp dist
```
