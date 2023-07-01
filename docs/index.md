# Documentation

Thalos is a application that makes it easy for users to stream blockchain data from an Antelope SHIP node.

It handles all the technical stuff for you:

 * Decoding of antelope's binary format.
 * Websocket connection (with reconnection)
 * Decoding of action data according to contract ABI

And then sends the data over redis in plain json (or other popular formats if you want!)