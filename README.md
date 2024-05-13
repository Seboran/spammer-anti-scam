# Anti scam spammer

Ce projet permet d'innonder de données inutiles des sites de scam, pour empêcher les scammeurs de faire leur "travail".

Ce projet target spécifiquement un signe ressemblant à "info consignes . quelquechose"

## Comment lancer

D'abord modifier l'URL du projet qui est scam en allant dans `test-1.spec.ts` et en modifiant la ligne 104 pour mettre l'url du site que vous voulez flood.

### Avec docker

L'image est là, tout se passe tout seul normalement

### En local

```sh
pnpm i
npx playwright install
npx playwright test
```
