# Backend-Express Next Online Shop

## About

The backend for Next Online Shop app built in NodeJS (Express).

## Development

1. Clone the repo
2. `npm i`: install all the dependencies required for the project.
3. `yarn dev`: opens a local server which enables you to see the project.

## Deployment

1. SSH into VPS `3.72.85.68` as user `ubuntu`. Full command: `ssh -i C:\Users\Andrei\.ssh\aws-andreib.pem ubuntu@3.72.85.68`.
2. `cd` to `backend-next-online-shop` from home directory.
3. `pull` changes from git (`git pull origin main`)
4. `yarn build`
5. `pm2 restart api` (`--update-env` if any environment changes have been made)
