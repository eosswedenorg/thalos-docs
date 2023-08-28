
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

	codec, err := message.GetCodec("json")
	if err != nil {
		fmt.Println("Failed to get json codec")
		return
	}

	client := api.NewClient(sub, codec.Decoder)

	client.OnAction = func(act message.ActionTrace) {
		fmt.Println("ActionTrace")
		fmt.Println(act)
		fmt.Println("---")
	}

	client.OnHeartbeat = func(hb message.HeartBeat) {
		fmt.Println("HeartBeat -- block:", hb.BlockNum, "head:", hb.HeadBlockNum, "lib:", hb.LastIrreversibleBlockNum)
	}

	// Subscribe to some stuffs.
	client.Subscribe(api.ActionChannel{Contract: "eosio"}.Channel())
	client.Subscribe(api.ActionChannel{Name: "mine"}.Channel())
	client.Subscribe(api.HeartbeatChannel)

	go func() {
		sig := make(chan os.Signal, 1)
		signal.Notify(sig, os.Interrupt)

		<-sig
		fmt.Println("Got interrupt")
		client.Close()
	}()

	// Read stuff.
	client.Run()
}

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
```