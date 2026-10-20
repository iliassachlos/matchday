# Creates the RSA key pair that signs and verifies login tokens (JWT, RS256).
# The keys are gitignored, so every clone makes its own.
#
#   bash scripts/generate-keys.sh
#
# user-service gets both keys: it signs tokens with the private one.
# ticket-service and order-service get only the public key: they can check a token,
# never create one.

set -euo pipefail

cd "$(dirname "$0")/.."

USER_KEYS=user-service/src/main/resources/keys

if [[ -f $USER_KEYS/jwt-private.pem ]]; then
    echo "Keys already exist in $USER_KEYS; nothing to do."
    echo "To start over, delete the keys/ folders and run this again (tokens already issued stop working)."
    exit 0
fi

mkdir -p "$USER_KEYS"
openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -out "$USER_KEYS/jwt-private.pem"
openssl pkey -in "$USER_KEYS/jwt-private.pem" -pubout -out "$USER_KEYS/jwt-public.pem"

for service in ticket-service order-service; do
    mkdir -p "$service/src/main/resources/keys"
    cp "$USER_KEYS/jwt-public.pem" "$service/src/main/resources/keys/jwt-public.pem"
done

echo "Created the key pair in $USER_KEYS and copied the public key to ticket-service and order-service."
