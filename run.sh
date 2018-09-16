#!/bin/bash

export $(cat .env)
PORT=4000 nodemon server.js
