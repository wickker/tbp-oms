#!/usr/bin/env bash -e

yarn install && \
yarn test && \
yarn build --mode generic
