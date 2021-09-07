import knex from 'knex'

export async function up(knex: knex){
  return knex.schema.createTable('category_movie', table =>{
    table.increments('id').primary();
    
    table.integer('movies_id')
    .notNullable()
    .references('id')
    .inTable('movies');
    
    table.integer('category_id')
    .notNullable()
    .references('id')
    .inTable('category');
  })
}

export async function down(knex: knex){
  return knex.schema.dropTable('category_movie');
}



