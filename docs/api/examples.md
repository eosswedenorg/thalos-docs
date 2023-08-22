
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

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# This example will listen for new actions on the specified channel and log them to a file
# You can specify multiple channels to listen to by adding them to the redis_channels list
# You need to have the redis-py library installed for this to work
# You can install it with pip: pip3 install redis
# Before you start this script, make sure you have the redis-server running

import redis
import logging
import os

abs_path = os.path.dirname(__file__)

# Redis connection options
redis_ip = '127.0.0.1'
redis_port = 6379
redis_db = 0

# Channels to subscribe to, can specify multiple
redis_channels = ['ship::1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4::actions/name/transfer']

# Redis connection
redis_connection = redis.Redis(host=redis_ip, port=redis_port, db=redis_db)
pubsub = redis_connection.pubsub()
pubsub.subscribe(redis_channels)

# Logging options
logging.basicConfig(
        filename=f'/{abs_path}/output.log',
        level=logging.INFO,
        format='%(asctime)s - %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S'
    )

# Listen for new actions
for message in pubsub.listen():
    try:
        # Filter out non-message events
        if message['type'] == 'message':
            # Log and print the message
            logging.info(message['data'].decode('utf-8'))
            print(message['data'].decode('utf-8'))
    except:
        # Log if the message failed to decode
        logging.info("failed_decode",message['data'])
```