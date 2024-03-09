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
