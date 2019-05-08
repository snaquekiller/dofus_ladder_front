
dev: ## springboot run
	yarn start

fix:
	node_modules/.bin/eslint --ext .jsx --ext .js --fix src	

update:
	scp docker-compose-release.yml perso:/tmp
	ssh perso -C "docker stack deploy -c /tmp/docker-compose-release.yml dofus-front"
