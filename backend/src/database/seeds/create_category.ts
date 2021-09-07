import knex from 'knex';

export async function seed(knex: knex){
  await knex('category').insert([
    {name:  'All', image: 'All.svg'},
    {name:  'Animação',image: 'animacao.svg'},
    {name:  'Comedia' ,image: 'comedia.svg'},
    {name:  'Cult',image: 'cult.svg'},
    {name:  'Documentario',image: 'documentario.svg'},
    {name:  'Drama',image: 'drama.svg'},
    {name:  'Guerra',image: 'guerra.svg'},
    {name:  'Romace',image: 'romace.svg'},
    {name:  'Brasil',image: 'brasil.svg'},
    {name:  'Suspense',image: 'suspense.svg'},
    {name:  'Terror',image: 'terror.svg'},
    {name:  'THIS IS SONO',image: 'sono.svg'},
  ]);
}