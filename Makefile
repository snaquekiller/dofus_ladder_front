help: ## Show this help.
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

dev: ## springboot run
	yarn start

install: ## for install depency
	yarn install

fix: ## for fix lint automatically if you need
	node_modules/.bin/eslint --ext .jsx --ext .js --fix src

lint:
	yarn lint

update:
	scp docker-compose-release.yml perso:/tmp
	ssh perso -C "docker stack deploy -c /tmp/docker-compose-release.yml dofus-front"
