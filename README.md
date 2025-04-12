# cs_chatbot

ai powered chatbot app 

## Database and app setup

  - Rename .env_sample to .env and fill in your openAI key

  - Start the app

    docker-compose down -v      # Stop and remove volumes (important to reload SQL init)
    docker-compose up --build   # Start fresh and rebuild if needed

  - Check the loaded extensions and data:

    - Find the db container and attach a shell to it

      Run:
      psql -h localhost -U myuser -d docs

      After that run:

      // show tables in schema
      \dt docs.*

      // get all records
      SELECT * FROM docs.documents;

      //should see vector listed as installed.
      \dx

Notes: 
  add logging
  add params validation
  add embeddings check at startup