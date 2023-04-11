alias y="docker compose run -v ${PWD}:${PWD} node yarn"
alias yp="docker compose run -v ${PWD}:${PWD} node yarn prisma"
alias yd="docker compose run -v ${PWD}:${PWD} -p 3000:3000 node yarn dev"
alias yps="docker compose run -v ${PWD}:${PWD} -p 5555:5555 node yarn prisma studio"