#!/bin/bash
set -euo pipefail
umask 077
cd "$(dirname "$0")"
if ! command -v node >/dev/null 2>&1 || ! command -v npx >/dev/null 2>&1; then
  echo 'Instale o Node.js LTS em https://nodejs.org e execute este arquivo novamente.'
  exit 1
fi
if ! node -e 'process.exit(Number(process.versions.node.split(".")[0])>=22?0:1)'; then
  echo 'Atualize para Node.js 22 ou superior em https://nodejs.org.'
  exit 1
fi
mkdir -p .vercel
cat > .vercel/project.json <<'JSON'
{"projectId":"prj_q7NGHozosJYLhohTIEj5jch9VL8u","orgId":"team_k4qTEGwSoCgnza2OzkbfAjm1","projectName":"mapa-fiscal-rafael"}
JSON
echo 'Entre na sua conta oficial da Vercel para publicar o projeto existente.'
npx --yes vercel@65.2.0 login
study_password="$(node -e 'process.stdout.write(require("node:crypto").randomBytes(18).toString("base64url"))')"
study_secret="$(node -e 'process.stdout.write(require("node:crypto").randomBytes(48).toString("base64url"))')"
printf '%s' "$study_password" | npx --yes vercel@65.2.0 env add STUDY_ACCESS_PASSWORD --environment production --sensitive --force --yes --scope team_k4qTEGwSoCgnza2OzkbfAjm1
printf '%s' "$study_secret" | npx --yes vercel@65.2.0 env add STUDY_SESSION_SECRET --environment production --sensitive --force --yes --scope team_k4qTEGwSoCgnza2OzkbfAjm1
echo 'Publicando a versão com senha...'
npx --yes vercel@65.2.0 deploy --prod --yes --scope team_k4qTEGwSoCgnza2OzkbfAjm1
printf 'Senha de acesso ao Mapa de Estudos: %s\n' "$study_password" > SENHA-DE-ACESSO.txt
echo
echo 'PUBLICAÇÃO CONCLUÍDA. Guarde a senha e compartilhe apenas com seus convidados:'
printf '%s\n' "$study_password"
echo 'Uma cópia foi gravada no arquivo SENHA-DE-ACESSO.txt, apenas neste computador.'
echo 'Executar este arquivo novamente gera uma nova senha e encerra as sessões anteriores.'
