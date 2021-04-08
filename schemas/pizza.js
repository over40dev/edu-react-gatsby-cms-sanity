import { MdLocalPizza as icon } from 'react-icons/md';
import PriceInput from '../components/PriceInput';

export default {
  // computer name
  name: 'pizza',
  // visible title
  title: 'pizzas',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Pizza Name',
      type: 'string',
      description: 'Name of the pizza',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price of the pizza in cents',
      validation: (Rule) => Rule.min(1000).max(50000),
      // Custom input component
      inputComponent: PriceInput,
    },
    {
      name: 'toppings',
      title: 'Toppings',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'topping',
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      topping0: 'toppings.0.name',
      topping1: 'toppings.1.name',
      topping2: 'toppings.2.name',
      topping3: 'toppings.3.name',
      veg0: 'toppings.0.vegetarian',
      veg1: 'toppings.1.vegetarian',
      veg2: 'toppings.2.vegetarian',
      veg3: 'toppings.3.vegetarian',
    },
    prepare: ({ title, media, veg, ...toppings }) => {
      // 1. filter undefined toppings out
      const tops = Object.values(toppings).filter(
        (top) => typeof top === 'string'
      );
      const isVeg = Object.values(toppings)
        .filter((top) => typeof top === 'boolean')
        .filter(Boolean);
      // 2. return the preview object for the pizza
      return {
        title: `${title} ${isVeg.length === tops.length ? ' 🌱' : ''}`,
        media,
        subtitle: tops.join(', '),
      };
    },
  },
};
