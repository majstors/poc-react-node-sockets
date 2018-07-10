# poc-react-node-sockets
POC React and NodeJS sockets

    cd socket-io-client
    npm start
  
This will launch web browser at http://localhost:3000
...and in another console

    cd socket-io-server
    node array_of_sockets.js
    
... now try to change `value.txt` in the root of the project, it will propagate content to the client instantly.
