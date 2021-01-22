#! /bin/bash

set -xe

. .env

cd vue-client

rm -rf dist/

yarn build

TAR_FILE="musical-calculations_$(date +%s).tgz"

tar -zcf "${TAR_FILE}" ./dist

scp "${TAR_FILE}" "${DEPLOY_TARGET}:"

../unpack.expect ${DEPLOY_TARGET} ${DEPLOY_DIR} ${TAR_FILE}

unlink "${TAR_FILE}"
