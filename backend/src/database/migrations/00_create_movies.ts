import Knex from 'knex';

//Criar a tabela no sqlite3
export async function up(knex: Knex){
 return knex.schema.createTable('movies' , table =>{
    table.increments('id').primary();
    table.string('title').notNullable();
    table.string('teaser').notNullable();
    table.string('description').notNullable();
    table.decimal('rating', 2).notNullable();
    table.string('age').notNullable();
    table.string('cover').notNullable();
    table.string('image').notNullable();
    table.string('screenshots').notNullable();
  })
}

//Voltar a tras na tabela por que errou
export async function down(knex: Knex){
  return knex.schema.dropTable('movies');
}