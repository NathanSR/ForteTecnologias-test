Esse projeto é um teste para a empresa Forte Solutions. Foi exigido a construção de um sistema FullStack para gerenciar clientes e cartões de crédito, onde o backend seria desenvolvido com Laravel e o frontend com NextJS + TailwindCSS. 



Histórico de desenvolvimento:

Primeiramente, foi necessário a construção da API. Para isso, deveria ser criado os models e schemas de cada entidade (cliente, cartão de crédito, endereço e telefone) rodando o comando abaixo para criar cada uma: 

>>php artisan make:model Entidade -m

Depois, foi configurado cada esquema adicionando as colunas necessárias para cada tipo de tabela da entidade. Em seguida, foi executado o comando para iniciar a migração do novo banco(sqlite):

>> php artisan migrate