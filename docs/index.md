# Documentation

Thalos is a application that makes it easy for users to stream blockchain data from an Antelope SHIP node.

It handles all the technical stuff for you:

 * Decoding of antelope's binary format.
 * Websocket connection (with reconnection)
 * Decoding of action data according to contract ABI
 * Message routing, Only get the data you actually care about.

Thalos utilizes [Redis](https://redis.io) as its messaging platform. This empowers developers with a streamlined and swift approach to receiving messages in real-time.

Se the [examples](/docs/api/examples) page to see how easy this can be done!

Come and chat on [Telegram](https://t.me/antelopethalos) if you have questions.
