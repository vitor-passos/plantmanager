# plantmanager
<p>
Esse projeto tem o intuito de gerenciar plantas que possam ter em sua casa, ele utiliza uma api local com plantas pré-cadastradas. </br>  
Com ele é possível criar uma lista de plantas, e gerar notificações como lembretes de regar suas plantas.</p>

Esse projeto utiliza o yarn como gerenciador de pacotes </br> 
```console 
npm install --global yarn
```

## Instalar dependências
Entrar no diretório do projeto </br>
```console
yarn add expo-cli
yarn install
npm install -g json-server
```
## Como executar o servidor
```console
json-server src/services/server.json --host 'seu ip' --port 3333
```

## Como executar o projeto
```console
expo start
```

#
Aplicativo desenvolvido no evento "Next Level Week #5" da Rocketseat.
