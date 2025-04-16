
// import { hoodies, jeans, products, shirts, shoes } from '@/constants/data';
// import { unstable_cache as nextCashe } from 'next/cache'
// import {cashe as reactCashe } from 'react'

// export function cashe(cb, keyParts, options){
// return nextCashe(reactCashe(cb), keyParts, options)
// }

// export const CATEGORY_MAP = ['hoodies', 'jeans', 'shirts', 'shoes'];

// export const sortOptions = ['Alphabetically, A-Z', 'Alphabetically, Z-A', 'Price: Low to High', 'Price: High to Low', 'Date: Old to New', 'Date: New to Old'];

//   // Fetch category data
//   export const getCategoryData = (title) => {
//       switch (title) {
//         case 'hoodies':
//           return hoodies;
//         case 'shirts':
//           return shirts;
//         case 'jeans':
//           return jeans;
//         case 'shoes':
//           return shoes;
//         default:
//           return products;
//       }
//   };

//   // sorted function
//   export const sortProducts = (products, sortOption) => {
//         return [...products].sort((a, b) => {
//             const priceA = parseFloat(a.price);
//             const priceB = parseFloat(b.price);
//             const dateA = new Date(a.date);
//             const dateB = new Date(b.date);
    
//             switch (sortOption) {
//                 case 'Alphabetically, A-Z':
//                     return a.name.localeCompare(b.name);
//                 case 'Alphabetically, Z-A':
//                     return b.name.localeCompare(a.name);
//                 case 'Price: Low to High':
//                     return priceA - priceB;
//                 case 'Price: High to Low':
//                     return priceB - priceA;
//                 case 'Date: Old to New':
//                     return dateA - dateB;
//                 case 'Date: New to Old':
//                     return dateB - dateA;
//                 default:
//                     return 0;
//             }
//         });
//   };

//   // Paginate products
//   export const paginateProducts = (products, page, itemsPerPage) => {
//        const startIndex = (page - 1) * itemsPerPage;
//        return products.slice(startIndex, startIndex + itemsPerPage);
//   };
    