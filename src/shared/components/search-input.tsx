'use client';

import { useProductFilters } from '@/features/products/hooks/use-product-filters';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from "use-debounce";

interface ClassNameProps{
    className: string,

}

export default function SearchInput({className}: ClassNameProps) {
    const t = useTranslations('homeHeader')

  const { search, setFilter } = useProductFilters();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);


  const [inputValue , setInputValue] = useState(search || '')

useEffect(() => {
  function handleClickOutside(event: MouseEvent) {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }
  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);

  useEffect(() => {
      setInputValue(search || '')
  },[search])

  const debounceSetFilter = useDebouncedCallback((value: string) =>{
    setFilter('search', value ? value : undefined)
  }, 300)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value)
    debounceSetFilter(value)
  };

  return (
    <div className="relative flex-1 max-w-md">
      <input
        type="text"
        value={inputValue}
        onChange={handleSearchChange}
        className={className}
        placeholder={t('inputPlaceholder')}
      />
    </div>
  );
}

// 'use client';

// import { useProductFilters } from '@/features/products/hooks/use-product-filters';
// import { useTranslations } from 'next-intl';
// import React, { useEffect, useRef, useState } from 'react';
// import { useDebouncedCallback } from "use-debounce";
// import { useRouter } from 'next/navigation';
// import { Link } from '@/i18n/navigation';

// interface Product {
//   id: string;
//   name: string;
//   category: string;
//   slug: string;
//   price?: number;
// }

// interface ClassNameProps {
//   className?: string;
// }

// // قائمة اقتراحات افتراضية لـ "Products You May Like"
// const SUGGESTIONS: Product[] = [
//   { id: '1', name: 'Garden Wedding Mixed Flowers', category: 'Flowers', slug: 'Flowers' },
//   { id: '2', name: 'Sweetheart Floral Gift', category: 'Gift', slug: 'Gift' },
//   { id: '3', name: 'Sweetheart Floral Gift', category: 'Roses', slug: 'Roses' },
// ];

// // مكون فرعي لتظليل النص المطابق للبحث
// function HighlightText({ text, query }: { text: string; query: string }) {
//   if (!query.trim()) return <>{text}</>;
  
//   // const escapedQuery = query.replace(/[-[\]{}()*+?.:\\^$|#\s]/g, '\\$&');
//   // const parts = text.split(new RegExp(`(${escapedQuery})`, 'gi'));

//   // return (
//   //   <span>
//   //     {parts.map((part, index) =>
//   //       part.toLowerCase() === query.toLowerCase() ? (
//   //         <mark key={index} className="bg-yellow-200 text-black font-semibold rounded px-0.5">
//   //           {part}
//   //         </mark>
//   //       ) : (
//   //         <React.Fragment key={index}>{part}</React.Fragment>
//   //       )
//   //     )}
//   //   </span>
//   // );
// }

// export default function SearchInput({ className }: ClassNameProps) {
//   const t = useTranslations('homeHeader');
//   const router = useRouter();
//   const { search, setFilter } = useProductFilters();

//   const [inputValue, setInputValue] = useState(search || '');
//   const [results, setResults] = useState<Product[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
  
//   const wrapperRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     setInputValue(search || '');
//   }, [search]);

//   // إغلاق القائمة المنسدلة عند الضغط خارج المكون
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // جلب النتائج بعد التهدئة (Debounce 300ms) وتجاوز شرط الحرفين
//   const fetchSearchResults = useDebouncedCallback(async (query: string) => {
//     const trimmed = query.trim();
//     if (trimmed.length < 2) {
//       setResults([]);
//       setIsLoading(false);
//       return;
//     }

//     setIsLoading(true);
//     try {
//       // قم بتغيير هذا الـ Endpoint بحسب الـ API الخاص بطلب البحث المباشر لديك
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search?q=${encodeURIComponent(trimmed)}`);
//       if (response.ok) {
//         const data = await response.json();
//         setResults(data.products || data || []);
//       }
//     } catch (error) {
//       console.error('Failed to fetch search results:', error);
//       setResults([]);
//     } finally {
//       setIsLoading(false);
//     }
//   }, 300);

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setInputValue(value);
    
//     if (value.trim().length >= 2) {
//       setIsLoading(true);
//     }
//     fetchSearchResults(value);
//   };

//   // يتم الانتقال أو التصفية بالكامل فقط عند الـ Submit (Enter)
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const trimmed = inputValue.trim();
//     setIsOpen(false);
    
//     // إرسال الفلتر و تحديث الـ URL فقط عند الضغط على Enter
//     setFilter('search', trimmed ? trimmed : undefined);
//   };

//   const isBelowThreshold = inputValue.trim().length < 2;

//   return (
//     <div ref={wrapperRef} className="relative flex-1 max-w-md">
//       <form onSubmit={handleSubmit} className="relative">
//         <input
//           type="text"
//           value={inputValue}
//           onChange={handleSearchChange}
//           onFocus={() => setIsOpen(true)}
//           className={className}
//           placeholder={t('inputPlaceholder')}
//         />
//         {inputValue && (
//           <button
//             type="button"
//             onClick={() => {
//               setInputValue('');
//               setResults([]);
//               setFilter('search', undefined);
//             }}
//             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
//           >
//             ✕
//           </button>
//         )}
//       </form>

//       {/* Live Search Dropdown */}
//       {isOpen && (
//         <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
//           {/* 1. Less than 2 characters: Show "Products You May Like" */}
//           {isBelowThreshold && (
//             <div className="p-3">
//               <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
//                 Products You May Like
//               </p>
//               <ul className="space-y-1">
//                 {SUGGESTIONS.map((product) => (
//                   <li key={product.id}>
//                     <Link
//                       href={`/products/${product.slug}`}
//                       onClick={() => setIsOpen(false)}
//                       className="block p-2 hover:bg-gray-50 rounded text-sm text-gray-700"
//                     >
//                       {product.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* 2. Loading State */}
//           {!isBelowThreshold && isLoading && (
//             <div className="p-4 text-center text-sm text-gray-500">
//               Loading...
//             </div>
//           )}

//           {/* 3. Results List with Match Highlight */}
//           {!isBelowThreshold && !isLoading && results.length > 0 && (
//             <div className="p-2">
//               <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 py-1">
//                 Search Results ({results.length})
//               </p>
//               <ul>
//                 {results.map((product) => (
//                   <li key={product.id}>
//                     <Link
//                       href={`/products/${product.slug}`}
//                       onClick={() => setIsOpen(false)}
//                       className="flex flex-col p-2 hover:bg-gray-50 rounded text-sm"
//                     >
//                       <span className="text-gray-900 font-medium">
//                         <HighlightText text={product.name} query={inputValue.trim()} />
//                       </span>
//                       {product.category && (
//                         <span className="text-xs text-gray-500">
//                           In <HighlightText text={product.category} query={inputValue.trim()} />
//                         </span>
//                       )}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* 4. Empty State */}
//           {!isBelowThreshold && !isLoading && results.length === 0 && (
//             <div className="p-6 text-center text-sm text-gray-500">
//               No results found for &quot;<span className="font-semibold">{inputValue}</span>&quot;
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }


// 'use client';

// import { useProductFilters } from '@/features/products/hooks/use-product-filters';
// import { useTranslations } from 'next-intl';
// import React, { useEffect, useRef, useState } from 'react';
// import { useDebouncedCallback } from "use-debounce";

// // ⚠️ استورد الـ Dropdown الخاص بك هنا
// // import SearchDropdown from './search-dropdown'; 

// interface ClassNameProps {
//   className?: string;
// }

// export default function SearchInput({ className }: ClassNameProps) {
//   const t = useTranslations('homeHeader');
  
//   // نستخدم setFilter فقط عند تنفيذ البحث النهائي (Enter / Form Submit)
//   const { search, setFilter } = useProductFilters();

//   const [inputValue, setInputValue] = useState(search || '');
//   const [debouncedQuery, setDebouncedQuery] = useState('');
//   const [isOpen, setIsOpen] = useState(false);
//   const wrapperRef = useRef<HTMLDivElement>(null);

//   // مزامنة المدخلات لو القيمة اتغيرت من الـ URL
//   useEffect(() => {
//     setInputValue(search || '');
//   }, [search]);

//   // إغلاق القائمة المنسدلة عند الضغط خارج المكون
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // تحديث نص البحث الموجه للـ Dropdown بعد 300ms دون تغيير الـ URL
//   const updateDebouncedQuery = useDebouncedCallback((value: string) => {
//     setDebouncedQuery(value.trim());
//   }, 300);

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setInputValue(value);
//     setIsOpen(true);
    
//     // إرسال النص لـ Debounce للـ Dropdown فقط
//     updateDebouncedQuery(value);
//   };

//   // التنقل وتغيير الـ URL يتم فقط عند الضغط على Enter (Form Submit)
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const trimmed = inputValue.trim();
//     setIsOpen(false);
    
//     // هنا فقط نغير الـ URL عبر الهوك الخاص بك
//     setFilter('search', trimmed ? trimmed : undefined);
//   };

//   return (
//     <div ref={wrapperRef} className="relative flex-1 max-w-md">
//       <form onSubmit={handleSubmit} className="relative">
//         <input
//           type="text"
//           value={inputValue}
//           onChange={handleSearchChange}
//           onFocus={() => setIsOpen(true)}
//           className={className}
//           placeholder={t('inputPlaceholder')}
//         />
//       </form>

//       {/* الـ Dropdown الخاص بك يتم إظهاره مرر له القيمة بعد الـ Debounce */}
//       {isOpen && (
//         <div className="absolute top-full left-0 right-0 mt-1 z-50">
//           {/* 
//             مرر debouncedQuery للـ Dropdown الجاهز عندك 
//             ليقوم بالبحث وعرض النتائج أو عرض "Products You May Like" لو كان أقل من حرفين
//             مثال:
//             <SearchDropdown 
//               query={debouncedQuery} 
//               onClose={() => setIsOpen(false)} 
//             />
//           */}
//         </div>
//       )}
//     </div>
//   );
// }



// 'use client';

// import { useProductFilters } from '@/features/products/hooks/use-product-filters';
// import { useTranslations } from 'next-intl';
// import React, { useEffect, useRef, useState } from 'react';
// import { useDebouncedCallback } from "use-debounce";
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';

// interface Product {
//   id: string;
//   name: string;
//   category: string;
//   slug: string;
//   price?: number;
// }

// interface ClassNameProps {
//   className?: string;
// }

// // قائمة اقتراحات افتراضية لـ "Products You May Like"
// const SUGGESTIONS: Product[] = [
//   { id: '1', name: 'Wireless Headphones', category: 'Electronics', slug: 'wireless-headphones' },
//   { id: '2', name: 'Smart Watch Series 7', category: 'Gadgets', slug: 'smart-watch' },
//   { id: '3', name: 'Running Shoes', category: 'Fashion', slug: 'running-shoes' },
// ];

// // مكون فرعي لتظليل النص المطابق للبحث
// function HighlightText({ text, query }: { text: string; query: string }) {
//   if (!query.trim()) return <>{text}</>;
  
//   const escapedQuery = query.replace(/[-[\]{}()*+?.:\\^$|#\s]/g, '\\$&');
//   const parts = text.split(new RegExp(`(${escapedQuery})`, 'gi'));

//   return (
//     <span>
//       {parts.map((part, index) =>
//         part.toLowerCase() === query.toLowerCase() ? (
//           <mark key={index} className="bg-yellow-200 text-black font-semibold rounded px-0.5">
//             {part}
//           </mark>
//         ) : (
//           <React.Fragment key={index}>{part}</React.Fragment>
//         )
//       )}
//     </span>
//   );
// }

// export default function SearchInput({ className }: ClassNameProps) {
//   const t = useTranslations('homeHeader');
//   const router = useRouter();
//   const { search, setFilter } = useProductFilters();

//   const [inputValue, setInputValue] = useState(search || '');
//   const [results, setResults] = useState<Product[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
  
//   const wrapperRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     setInputValue(search || '');
//   }, [search]);

//   // إغلاق القائمة المنسدلة عند الضغط خارج المكون
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // جلب النتائج بعد التهدئة (Debounce 300ms) وتجاوز شرط الحرفين
//   const fetchSearchResults = useDebouncedCallback(async (query: string) => {
//     const trimmed = query.trim();
//     if (trimmed.length < 2) {
//       setResults([]);
//       setIsLoading(false);
//       return;
//     }

//     setIsLoading(true);
//   }, 300);

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setInputValue(value);
    
//     if (value.trim().length >= 2) {
//       setIsLoading(true);
//     }
//     fetchSearchResults(value);
//   };

//   // يتم الانتقال أو التصفية بالكامل فقط عند الـ Submit (Enter)
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const trimmed = inputValue.trim();
//     setIsOpen(false);
    
//     // إرسال الفلتر و تحديث الـ URL فقط عند الضغط على Enter
//     setFilter('search', trimmed ? trimmed : undefined);
//   };

//   const isBelowThreshold = inputValue.trim().length < 2;

//   return (
//     <div ref={wrapperRef} className="relative flex-1 max-w-md">
//       <form onSubmit={handleSubmit} className="relative">
//         <input
//           type="text"
//           value={inputValue}
//           onChange={handleSearchChange}
//           onFocus={() => setIsOpen(true)}
//           className={className}
//           placeholder={t('inputPlaceholder')}
//         />
//         {inputValue && (
//           <button
//             type="button"
//             onClick={() => {
//               setInputValue('');
//               setResults([]);
//               setFilter('search', undefined);
//             }}
//             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
//           >
//             ✕
//           </button>
//         )}
//       </form>

//       {/* Live Search Dropdown */}
//       {isOpen && (
//         <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
//           {/* 1. Less than 2 characters: Show "Products You May Like" */}
//           {isBelowThreshold && (
//             <div className="p-3">
//               <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
//                 Products You May Like
//               </p>
//               <ul className="space-y-1">
//                 {SUGGESTIONS.map((product) => (
//                   <li key={product.id}>
//                     <Link
//                       href={`/products/${product.slug}`}
//                       onClick={() => setIsOpen(false)}
//                       className="block p-2 hover:bg-gray-50 rounded text-sm text-gray-700"
//                     >
//                       {product.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* 2. Loading State */}
//           {!isBelowThreshold && isLoading && (
//             <div className="p-4 text-center text-sm text-gray-500">
//               Loading...
//             </div>
//           )}

//           {/* 3. Results List with Match Highlight */}
//           {!isBelowThreshold && !isLoading && results.length > 0 && (
//             <div className="p-2">
//               <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 py-1">
//                 Search Results ({results.length})
//               </p>
//               <ul>
//                 {results.map((product) => (
//                   <li key={product.id}>
//                     <Link
//                       href={`/products/${product.slug}`}
//                       onClick={() => setIsOpen(false)}
//                       className="flex flex-col p-2 hover:bg-gray-50 rounded text-sm"
//                     >
//                       <span className="text-gray-900 font-medium">
//                         <HighlightText text={product.name} query={inputValue.trim()} />
//                       </span>
//                       {product.category && (
//                         <span className="text-xs text-gray-500">
//                           In <HighlightText text={product.category} query={inputValue.trim()} />
//                         </span>
//                       )}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* 4. Empty State */}
//           {!isBelowThreshold && !isLoading && results.length === 0 && (
//             <div className="p-6 text-center text-sm text-gray-500">
//               No results found for &quot;<span className="font-semibold">{inputValue}</span>&quot;
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }