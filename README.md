Esse projeto é um teste para a empresa Forte Solutions. Foi exigido a construção de um sistema FullStack para gerenciar clientes e cartões de crédito, onde o backend seria desenvolvido com Laravel e o frontend com NextJS + TailwindCSS. 

Comandos para iniciar o servidor em development mode:

>> php -S localhost:8000 -t public/
ou
>> php artisen serve






Histórico de desenvolvimento:



BACKEND

Primeiramente, foi necessário fazer a construção da API. Para que o laravel atue como uma API, foi usado o comando abaixo:

>> php artisan install:api

Após a configuração inicial, deveria ser criado os models e schemas de cada entidade envolvida na aplicação (cliente, cartão de crédito). O comando abaixo serviu para criar os Models e Migrations: 

>>php artisan make:model Customer -m
>>php artisan make:model CreditCard -m

Nos arquivos de Model, foram especificados em 'fillable' os atributos(colunas) respectivos a cada tabela. Também foram definidos em migrations os tipos das colunas das tabelas. Em seguida, foi executado o comando para iniciar a migração do novo banco(que por padrão era o SQLite):

>> php artisan migrate

Após criado o banco, com o comando abaixo foi construido os controllers de cliente e de cartão, possuindo as funções index, store, show, update e destroy que representam o CRUD para cada Model:

>> php artisan make:controller CustomerController --api
>> php artisan make:controller CreditCardController --api

No index do controller de clientes foi configurado para opcionalmente receber uma QueryString 'filter' onde contêm o nome do cliente para ser pesquisado, além de também poder receber a QueryString "limit" representando o limite de dados que podem ser retornados por requisição durante a paginação.
Uma observação: Diferentemente do controller index de Cliente, o index do Cartão pode receber uma QueryString 'customer_id' para poder filtrar os cartões pertencentes ao respectivo id do cliente.

Após configurados todos os controllers, devem ser configurados as rotas, adicionando-os no arquivo api.php.
Após todas as rotas serem testadas e bem sucedidas, foi-se iniciado a construção do frontend da aplicação.



FRONTEND





