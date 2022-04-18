### Deploy na Heroku
- monorepo deploy - https://elements.heroku.com/buildpacks/lstoll/heroku-buildpack-monorepo
- nest problém 503 - https://dev.to/rosyshrestha/deploy-nestjs-typescript-app-to-heroku-27e
- automaticky spustit migrace při úspěšném deployi - https://devcenter.heroku.com/articles/release-phase#specifying-release-phase-tasks
- deploy přes github actions https://www.split.io/blog/node-js-continuous-deployment-jenkins-heroku/

### Postgres
- pgAdmin4 - vyfiltrovat jen používanou DB - https://stackoverflow.com/questions/12663639/how-to-hide-databases-that-i-am-not-allowed-to-access/13298802#13298802
- throw new Error('SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string')
    - Znamená to, že se nejde připojit na databázi.
    - pokud postgres hlásí `Port in use`, pak:
        - `sudo launchctl list | fgrep postg` zjístím číslo procesu, např `349`
        - `sudo kill 349`, příp. `kill -9 349`