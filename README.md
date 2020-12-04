# Ryze's Crypto Arbitrage Bot

---> IN DEVELOPMENT <---

This bot watches token pair prices across multiple decentralized exchanges,
when a pair has price discrepancies on different exchanges that would
make the arbitrage possible, it does the following:

1. Takes flash loan of token A
2. Buys token B with token A in exchange X
3. Sells token B for token A in exchange Y
4. Returns loan of token A

The only investment required to run this bot is the transaction fee,
you can take millions in flash loans without any collateral.

## Installation

1. `npm i`
2. `cp .env.example .env`
3. Edit the `.env` file by adding your desired values.

## Development steps
 
1. Price Watcher  
Module that creates websocket connections to monitor crypto prices between
multiple decentralized exchanges.

2. Fee Calculator   
Module for estimating fees to determine if arbitrage will be profitable.  

3. Arbitrage  
Module for buying token from exchange X and selling on exchange Y.
 
4. Flash Loans  
Module for taking and returning flash loans.

5. Integration  
Integrate modules to make the bot work properly.
