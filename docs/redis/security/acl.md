# ACL

By default, Redis does not impose any restrictions on the commands that clients can execute. This lack of
restrictions raises security concerns, especially when dealing with clients that may not be fully trusted.
However, there is no need to worry as Redis offers a solution in the form of [Access Control Lists (ACL)](https://en.wikipedia.org/wiki/Access-control_list).

ACL in Redis enables the establishment of limited access for connections to the server, specifying which
commands they are allowed to execute. In Thalos, this feature is crucial for maintaining security, ensuring
that clients can only access specific channels within Thalos.

The special account called `default` serves as the default account for unauthorized users, provided it is
configured with a password. Connections can authenticate against this account without specifying a username.
Thalos utilizes this account as the default user account.

Additionally, it is advisable to restrict the Thalos server account as an added precaution against any unauthorized actions it may inadvertently perform, although such occurrences are highly unlikely.

The ACL in thalos is simple and uses 2 accounts:

* `default` account (user account, used by clients. only allowed to read from thalos specific channels)
* `thalos-server` account (is allowed to publish to channels and also write to it's cache)

there is also the `admin` account that is use for redis mangement. has access to everything.

::: danger IMPORTANT
Make sure you replace the passwords with a secure ones.

It is recommended to use [ACL GENPASS](https://redis.io/commands/acl-genpass) to generate strong passwords.
:::

`redis.conf`

```
user default on >client_password resetchannels &ship::* +@connection +subscribe
user admin on >admin_password ~* &* +@all
user thalos on >server_password resetchannels &ship::* ~thalos::* +@connection +@read +@write +publish

```

## External file

It is possible to use external config files to define users in redis.

Just place the configuration above in an external file for example: `/etc/redis/users.acl` and then add this in `/etc/redis/redis.conf`

```
aclfile /etc/redis/users.acl
```

## Thalos tools

There is also a tool to create the config lines for you.

```sh
$ thalos-tools redis-acl

# Created by thalos-tools on Thu Jul 13 08:06:37 CEST 2023
user default off
user admin on <e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 ~* &* +@all
user thalos on <e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 resetchannels &ship::* ~thalos::* +@connection +@read +@write +publish
user thalos-client on <e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 resetchannels &ship::* +@connection +subscribe
```

## Test the accounts permissions

It is a good idea to test if the configurationg works.

```sh
$ redis-cli --pass mypassword
127.0.0.1:6379> SUBSCRIBE some_channel
Reading messages... (press Ctrl-C to quit)
(error) NOPERM this user has no permissions to access one of the channels used as arguments
127.0.0.1:6379> SET random_key value
(error) NOPERM this user has no permissions to run the 'set' command or its subcommand
127.0.0.1:6379> SUBSCRIBE ship::1234
Reading messages... (press Ctrl-C to quit)
1) "subscribe"
2) "ship::1234"
3) (integer) 1

```

## Thalos config

After you have setup ACL, make sure to update your `config.yml` with the account and password.

```yaml
redis:
  user: thalos
  password: p4ssw0rd
```

## Other ACL Configurations

### No user password

While not recommended, it is possible to have the default (user) account without password. that way the user does not need to authenticate (but still has limited access). just remove the password from `user default` line:

```
user default on resetchannels &ship::* +@connection +subscribe
```

### Thalos users with a different account

It is also possible to provide a different account for users

```
user thalos-client on >client_password resetchannels &ship::* +@connection +subscribe
```

## Useful links

* [Config File Example](https://redis.io/docs/management/config-file)
* [Official ACL Documentation](https://redis.io/docs/management/security/acl)