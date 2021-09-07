import knex from 'knex'

export async function up(knex: knex){
  return knex.schema.createTable('category', table =>{
    table.increments('id').primary(); 
    table.string('name').notNullable();
    table.string('image').notNullable();
  })
}

export async function down(knex: knex){
  return knex.schema.dropTable('category');
}