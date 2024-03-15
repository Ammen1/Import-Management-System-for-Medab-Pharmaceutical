import { useState, Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchBrandsAsync,
  fetchCategoriesAsync,
  fetchProductsByFiltersAsync,
  selectAllProducts,
  selectBrands,
  selectCategories,
  selectTotalItems,
} from '../features/product/productSlice'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from '@heroicons/react/20/solid';
import { ITEMS_PER_PAGE } from '../app/constants'

const sortOptions = [
  { name: 'Best Rating', sort: 'rating', order: 'desc', current: false },
  { name: 'Price: Low to High', sort: 'discountPrice', order: 'asc', current: false },
  { name: 'Price: High to Low', sort: 'discountPrice', order: 'desc', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function ProductTable({ products }) {
    return (
        <div className="bg-white table-auto overflow-hidden lg:mt-12 overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
        <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8 ml-20">
          <table className="min-w-full divide-y ml-16  divide-gray-200">
            <thead className="bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Regulatory Info</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Specifications</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Safety Info</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch Number</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thumbnail</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edit</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Edit</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{product.brand}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.regulatoryInfo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.productSpecifications}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.safetyInfo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.batchNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(product.expiryDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img className="h-10 w-10 rounded-full" src={product.thumbnail} alt={product.title} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={`/admin/product-form/edit/${product.id}`} className="text-indigo-600 hover:text-indigo-900">Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  
  }
export default function AdminProductList() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const totalItems = useSelector(selectTotalItems);
  const filters = [
    {
      id: 'category',
      name: 'Category',
      options: categories,
    },
    {
      id: 'brand',
      name: 'Brands',
      options: brands,
    },
  ];

  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [page, setPage] = useState(1);

  const handleFilter = (e, section, option) => {
    const newFilter = { ...filter };
    if (e.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      const index = newFilter[section.id].findIndex(
        (el) => el === option.value
      );
      newFilter[section.id].splice(index, 1);
    }
    setFilter(newFilter);
  };

  const handleSort = (e, option) => {
    const sort = { _sort: option.sort, _order: option.order };
    setSort(sort);
  };

  const handlePage = (page) => {
    setPage(page);
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchProductsByFiltersAsync({ filter, sort, pagination, admin:true }));
  }, [dispatch, filter, sort, page]);

  useEffect(() => {
    setPage(1);
  }, [totalItems, sort]);

  useEffect(() => {
    dispatch(fetchBrandsAsync());
    dispatch(fetchCategoriesAsync());
  }, []);

  return (
    <div className="bg-white w-screen">
      <div>
        <main className="mx-auto max-w-7xl  px-4 sm:px-6 lg:px-8 ">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
          </div>
            <div className="lg:col-span-3">
              <div>
                <Link
                  to="/dashboard?tab=add-product"
                  className="rounded-md  mx-10  bg-green-700 px-3 py-2 text-sm font-semibold ml-56 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add New Product
                </Link>
              </div>
              <ProductTable products={products} />
            </div>
          <Pagination
            page={page}
            setPage={setPage}
            handlePage={handlePage}
            totalItems={totalItems}
          ></Pagination>
        </main>
      </div>
    </div>
  );
}


function Pagination({ page, setPage, handlePage, totalItems }) {
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  return (
    <nav
      className="border-t ml-96 border-gray-200 px-4 flex items-center justify-between sm:px-0 mt-6"
      aria-label="Pagination"
    >
      <div className="-mt-px w-0 flex-1 flex">
        <button
          onClick={() => handlePage(page - 1)}
          disabled={page === 1}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </button>
      </div>
      <div className="hidden md:-mt-px md:flex">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={classNames(
              i + 1 === page
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50',
              'relative inline-flex items-center px-4 py-2 border text-sm font-medium'
            )}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <div className="-mt-px w-0 flex-1 flex justify-end">
        <button
          onClick={() => handlePage(page + 1)}
          disabled={page === totalPages}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </button>
      </div>
    </nav>
  );
}
