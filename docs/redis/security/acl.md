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

```
$ thalos-tools redis-acl
Passwords
default: NgCseRB8QcxdHwcwmg43OOjxZW0YbngN
thalos: kmJIi1kP5bp2MHQeSj925otWnxTvfRe5
thalos-client: WBGP9mXuUIIv11KhLgbuaTcl1NnRmhWn

# Created by thalos-tools on Mon Feb 12 15:56:26 CET 2024
user default on #3c0745d926021292a521267d803b9c20f3570bee30697e401920151d2593d1e4 ~* &* +@all
user thalos on #cf2b3e36521b0e67cb50fcc1f931f577384bb84ad7d0492d00e07beb4660ff1d resetchannels ~ship::* &ship::* -@all +get +publish +set
user thalos-client on #06d88f1e91d8bc82a5074223fd380006395b80a7b41dcd1318be1dd288282e4a resetchannels &ship::* -@all +subscribe
```

## Test the accounts permissions

It is a good idea to test if the configuration works.

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