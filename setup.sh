alias y='docker compose run -v ${PWD}:${PWD} node yarn'
alias ydlx='docker compose run -v ${PWD}:${PWD} node yarn dlx'
alias yp='docker compose run -v ${PWD}:${PWD} node yarn prisma'
alias yd='docker compose run -v ${PWD}:${PWD} -p 3000:3000 node yarn dev'
alias yps='docker compose run -v ${PWD}:${PWD} -p 5555:5555 node yarn prisma studio'
alias ysb='docker compose run -v ${PWD}:${PWD} -p 5555:6006 node yarn storybook '
alias npx='docker compose run -v ${PWD}:${PWD} node npx'

cat <<EOF
Now following commands are available:
- "y" for yarn
- "yp" for yarn prisma
- "yd" for yarn dev
- "yps" for yarn prisma studio
EOF

