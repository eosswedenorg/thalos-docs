
## Go

```go
package main

import (
	"context"
	"fmt"
	"os"
	"os/signal"

	"github.com/eosswedenorg/thalos/api"
	"github.com/eosswedenorg/thalos/api/message"
	_ "github.com/eosswedenorg/thalos/api/message/json"
	api_redis "github.com/eosswedenorg/thalos/api/redis"
	"github.com/redis/go-redis/v9"
)

func main() {
	// Create redis client
	rdb := redis.NewClient(&redis.Options{})

	sub := api_redis.NewSubscriber(context.Background(), rdb, api_redis.Namespace{
		Prefix:  "ship",
		ChainID: "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4", // Wax mainnet.
	})

    // Create client
	codec, err := message.GetCodec("json")
	if err != nil {
		fmt.Println("Failed to get json codec")
		return
	}

	client := api.NewClient(sub, codec.Decoder)

    // Subscribe to some channels.
	err = client.Subscribe(
		api.TransactionChannel,
		api.ActionChannel{Contract: "eosio"}.Channel(),
		api.ActionChannel{Name: "mine"}.Channel(),
		api.HeartbeatChannel,
		api.TableDeltaChannel{}.Channel(),
	)

	if err != nil {
		fmt.Println(err)
		return
	}

    // Wait for interrupt in a go routine and close the client.
	go func() {
		sig := make(chan os.Signal)
		signal.Notify(sig, os.Interrupt)

		<-sig
		fmt.Println("Got interrupt")

		client.Close()
	}()

    // Read messages
	for t := range client.Channel() {
		switch msg := t.(type) {
		case error:
			fmt.Println("Error:", msg)
		case message.TransactionTrace:
			fmt.Println("Transaction", msg.BlockNum, msg.ID)
			fmt.Println(msg)
			fmt.Println("---")
		case message.HeartBeat :
			fmt.Println("Heartbeat")
			fmt.Println(msg)
			fmt.Println("---")
		}
	}
}
```

## Nodejs

install the thalos client library:

`npm install -D thalos-nodejs`

::: code-group

```ts [TypeScript]
import * as thalos from 'thalos-nodejs';

// Create client.
const client = thalos.createRedisClient({
    // url: "redis://localhost:6379",
    // prefix: "ship",
    ns: "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4" // wax mainnet
})

client.onAction({contract: "atomicassets", name: "logtransfer"}, (action:thalos.ActionTrace) => {
    console.log("Transfer", "From/To:", action.data['from'], "->", action.data['to'], "Assets:", action.data['asset_ids'], action.data['memo']);
});

```

```js [JavaScript]

const thalos = require('thalos-nodejs');

// Create client.
const client = thalos.createRedisClient({
    // url: "redis://localhost:6379",
    // prefix: "ship",
    ns: "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4" // wax mainnet
})

client.onAction({contract: "atomicassets", name: "logtransfer"}, action => {
    console.log("Transfer", "From/To:", action.data['from'], "->", action.data['to'], "Assets:", action.data['asset_ids'], action.data['memo']);
});

```
:::

```
Transfer From/To: dtknw.c.wam -> farmersworld Assets: [ '1099900831604' ] feed_animal:1099885261718
Transfer From/To: atomicmarket -> xk5qu.wam Assets: [ '1099519946844' ] AtomicMarket Cancelled Auction - ID # 1238572
Transfer From/To: xk5qu.wam -> atomicmarket Assets: [ '1099519946844' ] auction
Transfer From/To: ponyslaystat -> wombatmaster Assets: [ '1099880264627' ]
```

## Python

This example will listen for new atomicasset transfers and print them to standard output.
You can specify multiple channels to listen to by adding them to the `redis_channels` list.
Before you start this script, make sure you have the redis-server running.

::: info NOTE
You need to have the redis-py library installed for this to work

You can install it with pip:

`pip3 install redis`
:::

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import redis
import json

redis_ip = '127.0.0.1'
redis_port = 6379
redis_db = 0

redis_channels = ['ship::1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4::actions/contract/atomicassets/name/logtransfer']
redis_connection = redis.Redis(host=redis_ip, port=redis_port, db=redis_db)
pubsub = redis_connection.pubsub()
pubsub.subscribe(redis_channels)

for message in pubsub.listen():
    if message['type'] == "message":
        payload = json.loads(message['data'])
        data = payload['data']
        print("Transfer", "From/To:", data['from'], "->",
            data['to'], "Assets:", data['asset_ids'], data['memo'])
```
Output
```
Transfer From/To: agy2a.c.wam -> w4mwy.wam Assets: ['1099546474727', '1099515237687', '1099528028558']
Transfer From/To: fzzm..c.wam -> lstm4.c.wam Assets: ['1099535666180', '1099514473189', '1099524729561']
Transfer From/To: 2ahmc.c.wam -> mmklu.c.wam Assets: ['1099538558402', '1099514074361', '1099514699356']
Transfer From/To: atomicmarket -> xk5qu.wam Assets: ['1099541038508'] AtomicMarket Cancelled Auction - ID # 1238125
```
