## Get token balance by token contract address and account address

```
https://api-ropsten.etherscan.io/api
    ?module=account
    &action=tokenbalance
    &contractaddress=0xcad680287ee517cfae13c6956f035f07294d975d
    &address=0xc94718097f52c7cd48272fa0f232543b1659107c
    &tag=latest
    &apikey=${process.env.Token_Api}
```

copy and paste:

```
https://api-ropsten.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0xcad680287ee517cfae13c6956f035f07294d975d&address=0xc94718097f52c7cd48272fa0f232543b1659107c&tag=latest&apikey=${process.env.Token_Api}
```

## Get transactions by token contract address and account address

```
https://api-ropsten.etherscan.io/api
   ?module=account
   &action=tokentx
   &contractaddress=0xcad680287ee517cfae13c6956f035f07294d975d
   &address=0xc94718097f52c7cd48272fa0f232543b1659107c
   &page=1
   &offset=100
   &startblock=0
   &endblock=27025780
   &sort=asc
   &apikey=${process.env.Token_Api}
```

copy and paste:
```
https://api-ropsten.etherscan.io/api?module=account&action=tokentx&contractaddress=0xcad680287ee517cfae13c6956f035f07294d975d&address=0xc94718097f52c7cd48272fa0f232543b1659107c&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=${process.env.Token_Api}
```

## Get total tokens in circulation

```
https://api-ropsten.etherscan.io/api
    ?module=stats&action=tokensupply
    &contractaddress=0xcad680287ee517cfae13c6956f035f07294d975d
    &apikey=${process.env.Token_Api}
```


copy and paste:

```
https://api-ropsten.etherscan.io/api?module=stats&action=tokensupply&contractaddress=0xcad680287ee517cfae13c6956f035f07294d975d&apikey=${process.env.Token_Api}
```



# Ropsten Ether

## Transactions

```
https://api-ropsten.etherscan.io/api?module=account&action=txlist&address=0xc94718097f52c7cd48272fa0f232543b1659107c&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${process.env.Token_Api}
```

## Balance

```
https://api-ropsten.etherscan.io/api?module=account&action=balance&address=0xc94718097f52c7cd48272fa0f232543b1659107c&tag=latest&apikey=${process.env.Token_Api}
```

##### Token values must be divided by 1000000000000000000