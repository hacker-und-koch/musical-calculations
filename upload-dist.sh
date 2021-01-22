#! /bin/bash

set -xe

if [ -n "$(git status --porcelain)" ]; then
    echo "!!! Refusing deployment. Please commit all changes. !!!"
    exit 1
fi

. .env

cd vue-client

rm -rf dist/

yarn build

REVISION="$(git rev-parse HEAD)"

TAR_FILE="musical-calculations_${REVISION}.tgz"

tar -zcf "${TAR_FILE}" ./dist

scp "${TAR_FILE}" "${DEPLOY_TARGET}:"

../unpack.expect ${DEPLOY_TARGET} ${DEPLOY_DIR} ${TAR_FILE} ${REVISION}

unlink "${TAR_FILE}"
