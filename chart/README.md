# Email Agent Helm Chart

1. Do `docker login registry.gitlab.com`.

2. Copy over your docker config json into the current directory.

```bash
cp ~/.docker/config.json .
```

3. Edit and remove all registries except `registry.gitlab.com`.

4. Create pull secret.

```bash
kubectl create secret generic gitlab-saas --from-file=.dockerconfigjson=./config.json --type=kubernetes.io/dockerconfigjson
```

5. Create .env file secret. (Run from the `chart` folder)

```bash
kubectl create secret generic email-agent-env --from-literal=ENV_FILE="$(cat ../api/.env)" --dry-run=client -o yaml | kubectl apply -f -
```
