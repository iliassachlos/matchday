# matchday-api

![Java](https://img.shields.io/badge/Java-25-ED8B00?logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.1-6DB33F?logo=springboot&logoColor=white)
![Spring Cloud Gateway](https://img.shields.io/badge/Spring%20Cloud-Gateway-6DB33F?logo=spring&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-4169E1?logo=postgresql&logoColor=white)
![Flyway](https://img.shields.io/badge/Flyway-migrations-CC0200?logo=flyway&logoColor=white)
![Apache Kafka](https://img.shields.io/badge/Apache%20Kafka-4.3-231F20?logo=apachekafka&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-RS256-000000?logo=jsonwebtokens&logoColor=white)
![Docker Compose](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)
![Testcontainers](https://img.shields.io/badge/Testcontainers-JUnit%205-291A3F?logo=testcontainers&logoColor=white)
![Prometheus](https://img.shields.io/badge/Prometheus-metrics-E6522C?logo=prometheus&logoColor=white)
![Grafana](https://img.shields.io/badge/Grafana-dashboard-F46800?logo=grafana&logoColor=white)
![k6](https://img.shields.io/badge/k6-load%20test-7D64FF?logo=k6&logoColor=white)

Ticket sales for a match where far more fans want a seat than there are seats. The one
rule the whole system protects: **a seat is never sold twice.**

## Run it locally

You need **Docker**, **Java 25** and a **bash** shell (on Windows, Git Bash). Maven is not
needed: the project brings its own (`./mvnw`).

**1. Clone and configure**

```bash
git clone https://github.com/iliassachlos/matchday-api.git
cd matchday-api
cp .env.example .env
```

Open `.env` and set `POSTGRES_USER` and `POSTGRES_PASSWORD` to any values you like. The
other entries can stay empty; they fall back to the default ports.

**2. Create the signing keys**

```bash
bash scripts/generate-keys.sh
```

Logins are signed tokens (JWT, RS256). `user-service` signs them with a private key, and the
other services check them with the matching public key. The keys are not in the repository,
since a private key must never be committed, so each clone creates its own pair. The script
puts both keys in `user-service` and only the public key in `ticket-service` and
`order-service`.

**3. Start the infrastructure**

```bash
docker compose up -d
```

This starts PostgreSQL, Kafka, Mailpit, Prometheus and Grafana. The services create their
own tables on first start (Flyway migrations).

**4. Build and start the services**

```bash
./mvnw install -DskipTests
```

Then start each service in its own terminal. Load `.env` first, so the services use the same
database password as Docker:

```bash
set -a; . ./.env; set +a
./mvnw -pl user-service spring-boot:run      # repeat with ticket-service, order-service, gateway
```

Once everything is up, this is what runs where:

| Component | Address | What it does, and what you will find there |
|---|---|---|
| **gateway** | http://localhost:8000 | The single entry point. Sends each request to the service that owns its path |
| **user-service** | http://localhost:8080 | Register, log in, receive a signed token. API docs: [/swagger-ui.html](http://localhost:8080/swagger-ui.html) |
| **ticket-service** | http://localhost:8081 | Matches, seats, reservations, tickets and the QR scan at the gate. API docs: [/swagger-ui.html](http://localhost:8081/swagger-ui.html) |
| **order-service** | http://localhost:8082 | Orders and payment. API docs: [/swagger-ui.html](http://localhost:8082/swagger-ui.html) |
| **Mailpit** | http://localhost:8025 | An inbox that catches every email the system sends. The ticket emails with the QR code arrive here |
| **Grafana** | http://localhost:3000 | Live dashboard: requests per second, response times, errors. No login needed. Watch it while the load test runs |
| **Prometheus** | http://localhost:9090 | Collects the numbers Grafana draws, from every service every 5 seconds |

**5. See it work**

The demo script plays out real situations against the running system and checks each
outcome. Run it without arguments for a menu, pass scenario numbers (`bash scripts/demo.sh 2 3`),
or `a` for all of them:

```bash
bash scripts/demo.sh
```

| # | Scenario | What it shows |
|---|---|---|
| 1 | Good path | Reserve a seat, pay, the order is `PAID` and the ticket email arrives in Mailpit |
| 2 | Two fans, one seat | Both click at the same moment: exactly one gets the seat, the other a clean "not available" |
| 3 | A crowd for one seat | 1000 simultaneous requests for the same seat: still exactly one winner |
| 4 | Declined card | The payment fails and the seat stays held, so a retry with a good card succeeds |
| 5 | Hold expired | Paying after the 10-minute hold ran out: the seat is not sold and the card is refunded |
| 6 | Someone else's hold | Paying for a seat another fan holds: the seat is safe, but the card is charged and then refunded (known weakness) |
| 7 | No token | Requests without logging in are refused |
| 8 | Forged token | A token edited to claim another user's identity is rejected |
| 9 | Bad input | Invalid requests get a short, readable error, with no internal details exposed |
| 10 | Load test | Many buyers at once for a few seats, then a direct check of the databases that no seat was sold twice (not included in `a`, because it resets seats and orders) |
| 11 | Gateway | The same API through one address, each path reaching its service |
