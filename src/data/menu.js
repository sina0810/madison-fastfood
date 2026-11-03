// All menu content lives here. Each dish is an object made from one of the
// classes in src/models/ and goes in a category's `items` list, for example:
//   new MenuItem({ name: 'Chicken Wrap', description: 'Grilled chicken, lettuce, garlic sauce', price: 8.99 })
// Use Meal for meals (it adds the drink and side by itself), Plate for plates,
// and MenuItem for everything else.
// Optional fields:
//   includes: ['...', '...']  -> the "What's included" list in the pop-up
//   image: '/images/...jpg'   -> a picture at the top of the card
// A category can also have an optional `note`, shown under its title.
//
// NOTE: prices and "includes" lists below are SAMPLES. Replace them with the real ones before launch.

import MenuItem from '../models/MenuItem.js'
import Plate from '../models/Plate.js'
import Meal from '../models/Meal.js'

// What comes in each rice/salad dish. Plates use these as-is; Meals add a drink and a side.
const dish = {
  chickenOverRice: ['Grilled chicken', 'Yellow rice', 'Lettuce and tomato', 'White sauce', 'Hot sauce (on the side)'],
  lambOverRice: ['Sliced lamb', 'Yellow rice', 'Lettuce and tomato', 'White sauce', 'Hot sauce (on the side)'],
  mixOverRice: ['Grilled chicken and sliced lamb', 'Yellow rice', 'Lettuce and tomato', 'White sauce', 'Hot sauce (on the side)'],
  lambOverSalad: ['Sliced lamb', 'Lettuce, tomato and cucumber', 'Red onion', 'White sauce', 'Hot sauce (on the side)'],
}

export const menu = [
  {
    id: 'meals',
    label: 'Meals',
    note: 'Every meal comes with a drink and your choice of fries or salad.',
    items: [
      new Meal({ name: 'Chicken over Rice', description: 'Grilled chicken served over seasoned rice.', price: 13.99, includes: dish.chickenOverRice }),
      new Meal({ name: 'Lamb over Rice', description: 'Tender lamb served over seasoned rice.', price: 14.99, includes: dish.lambOverRice }),
      new Meal({ name: 'Mix over Rice', description: 'Chicken and lamb together over seasoned rice.', price: 14.99, includes: dish.mixOverRice }),
      new Meal({ name: 'Lamb over Salad', description: 'Tender lamb served over fresh salad.', price: 14.99, includes: dish.lambOverSalad }),
    ],
  },
  {
    id: 'drinks',
    label: 'Drinks',
    items: [
      new MenuItem({ name: 'Coca-Cola', description: 'Ice-cold classic cola.', price: 1.99 }),
      new MenuItem({ name: 'Sprite', description: 'Crisp lemon-lime soda.', price: 1.99 }),
      new MenuItem({ name: 'Bottled Water', description: 'Chilled spring water.', price: 1.49 }),
      new MenuItem({ name: 'Fresh Lemonade', description: 'Squeezed in-house with fresh lemons and mint.', price: 3.49 }),
      new MenuItem({ name: 'Mango Lassi', description: 'Creamy blend of mango and yogurt.', price: 4.49 }),
    ],
  },
  {
    id: 'plates',
    label: 'Plates',
    items: [
      new Plate({ name: 'Chicken over Rice', description: 'Grilled chicken served over seasoned rice.', price: 10.99, includes: dish.chickenOverRice }),
      new Plate({ name: 'Lamb over Rice', description: 'Tender lamb served over seasoned rice.', price: 11.99, includes: dish.lambOverRice }),
      new Plate({ name: 'Mix over Rice', description: 'Chicken and lamb together over seasoned rice.', price: 11.99, includes: dish.mixOverRice }),
      new Plate({ name: 'Lamb over Salad', description: 'Tender lamb served over fresh salad.', price: 11.99, includes: dish.lambOverSalad }),
    ],
  },
  {
    id: 'wraps',
    label: 'Wraps',
    items: [
      new MenuItem({
        name: 'Chicken Wrap',
        description: 'Grilled chicken and fresh salad wrapped in warm bread.',
        price: 8.99,
        includes: ['Grilled chicken', 'Lettuce, tomato and onion', 'White sauce', 'Warm pita bread'],
      }),
      new MenuItem({
        name: 'Lamb Wrap',
        description: 'Tender lamb and fresh salad wrapped in warm bread.',
        price: 9.99,
        includes: ['Sliced lamb', 'Lettuce, tomato and onion', 'White sauce', 'Warm pita bread'],
      }),
    ],
  },
  {
    id: 'sides',
    label: 'Sides',
    items: [
      new MenuItem({ name: 'Fries', description: 'Crispy golden fries.', price: 3.99 }),
      new MenuItem({ name: 'Side Salad', description: 'Small fresh garden salad.', price: 4.49 }),
      new MenuItem({ name: 'Baklava', description: 'Flaky pastry with nuts and honey.', price: 3.99 }),
      new MenuItem({ name: 'Rice Pudding', description: 'Creamy, lightly sweet rice pudding.', price: 3.99 }),
      new MenuItem({ name: 'Chocolate Chip Cookie', description: 'Soft-baked and warm.', price: 2.49 }),
    ],
  },
  {
    id: 'salads',
    label: 'Salads',
    items: [
      new MenuItem({
        name: 'Greek Salad',
        description: 'Tomato, cucumber, olives, red onion and feta.',
        price: 9.49,
        includes: ['Romaine lettuce', 'Tomato and cucumber', 'Kalamata olives', 'Red onion', 'Feta cheese', 'Greek dressing'],
      }),
      new MenuItem({
        name: 'Caesar Salad',
        description: 'Romaine, parmesan, croutons and Caesar dressing.',
        price: 8.99,
        includes: ['Romaine lettuce', 'Parmesan cheese', 'Croutons', 'Caesar dressing'],
      }),
      new MenuItem({
        name: 'Fattoush',
        description: 'Mixed greens, tomato, cucumber, radish and crispy pita.',
        price: 9.49,
        includes: ['Mixed greens', 'Tomato and cucumber', 'Radish', 'Crispy pita chips', 'Lemon and sumac dressing'],
      }),
      new MenuItem({
        name: 'Garden Salad',
        description: 'Lettuce, tomato, cucumber and carrots.',
        price: 7.99,
        includes: ['Lettuce', 'Tomato and cucumber', 'Shredded carrots', 'Choice of dressing'],
      }),
    ],
  },
]
