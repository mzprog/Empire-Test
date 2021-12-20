# Empire Test

## How To Run
open Terminal for each back end and front end, and go to directory for each one
#### Laravel
install `composer` packages:

    composer install

create databae and go to `.env` file and edit the `mysql` connection

allow read the session, add the following line to `.env`:

    SANCTUM_STATEFUL_DOMAINS=localhost:8000
    SPA_URL=http://localhost:3000
    SESSION_DOMAIN=localhost
assume that laravel will run on port `8000`, and node will run on port `3000`

migrate the database:

    php artisan migrate

and finaly run your server

    php artisan serve


#### Next.JS
install `dependencies`:

    npm install

run the app:

    npm run dev