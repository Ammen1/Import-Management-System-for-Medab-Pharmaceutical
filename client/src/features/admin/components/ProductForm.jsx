import { useDispatch, useSelector } from 'react-redux';
import {
  clearSelectedProduct,
  createProductAsync,
  fetchProductByIdAsync,
  selectBrands,
  selectCategories,
  selectProductById,
  updateProductAsync,
} from '../../product/productSlice';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Modal from '../../common/Modal';
import { useAlert } from 'react-alert';
import { Button, Card, Label, Select, TextInput, Textarea } from 'flowbite-react';

import { selectUsers } from '../../user/userSlice';


function ProductForm() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();
  const params = useParams();
  const selectedProduct = useSelector(selectProductById);
  const [openModal, setOpenModal] = useState(null);
  const alert = useAlert();
  const userInfo = useSelector(selectUsers);
  console.log(userInfo)
  

  const colors = [
    {
      name: 'White',
      class: 'bg-white',
      selectedClass: 'ring-gray-400',
      id: 'white',
    },
    {
      name: 'Gray',
      class: 'bg-gray-200',
      selectedClass: 'ring-gray-400',
      id: 'gray',
    },
    {
      name: 'Black',
      class: 'bg-gray-900',
      selectedClass: 'ring-gray-900',
      id: 'black',
    },
  ];

  const sizes = [
    { name: 'XXS', inStock: true, id: 'xxs' },
    { name: 'XS', inStock: true, id: 'xs' },
    { name: 'S', inStock: true, id: 's' },
    { name: 'M', inStock: true, id: 'm' },
    { name: 'L', inStock: true, id: 'l' },
    { name: 'XL', inStock: true, id: 'xl' },
    { name: '2XL', inStock: true, id: '2xl' },
    { name: '3XL', inStock: true, id: '3xl' },
  ];

  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductByIdAsync(params.id));
    } else {
      dispatch(clearSelectedProduct());
    }
  }, [params.id, dispatch]);

  useEffect(() => {
    if (selectedProduct && params.id) {
      setValue('title', selectedProduct.title);
      setValue('user', selectedProduct.user);
      setValue('description', selectedProduct.description);
      setValue('price', selectedProduct.price);
      setValue('discountPercentage', selectedProduct.discountPercentage);
      setValue('regulatoryInfo', selectedProduct.regulatoryInfo);
      setValue('productSpecifications', selectedProduct.productSpecifications);
      setValue('safetyInfo', selectedProduct.safetyInfo);
      setValue('batchNumber', selectedProduct.batchNumber);
      setValue('expiryDate', selectedProduct.expiryDate);
      setValue('thumbnail', selectedProduct.thumbnail);
      setValue('stock', selectedProduct.stock);
      setValue('image1', selectedProduct.images[0]);
      setValue('image2', selectedProduct.images[1]);
      setValue('image3', selectedProduct.images[2]);
      setValue('brand', selectedProduct.brand);
      setValue('category', selectedProduct.category);
      setValue('highlight1', selectedProduct.highlights[0]);
      setValue('highlight2', selectedProduct.highlights[1]);
      setValue('highlight3', selectedProduct.highlights[2]);
      setValue('highlight4', selectedProduct.highlights[3]);
      setValue(
        'sizes',
        selectedProduct.sizes.map((size) => size.id)
      );
      setValue(
        'colors',
        selectedProduct.colors.map((color) => color.id)
      );
    }
  }, [selectedProduct, params.id, setValue]);

  const handleDelete = () => {
    const product = { ...selectedProduct };
    product.deleted = true;
    dispatch(updateProductAsync(product));
  };

  return (
    <>
      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          console.log(data);
          const product = { ...data };
          product.images = [
            product.image1,
            product.image2,
            product.image3,
            product.thumbnail,
          ];
          product.highlights = [
            product.highlight1,
            product.highlight2,
            product.highlight3,
            product.highlight4,
          ];
          product.user = userInfo
          product.rating = 0;
          if (product.colors) {
            product.colors = product.colors.map((color) =>
              colors.find((clr) => clr.id === color)
            );
          }
          if (product.sizes) {
            product.sizes = product.sizes.map((size) =>
              sizes.find((sz) => sz.id === size)
            );
          }

          delete product['image1'];
          delete product['image2'];
          delete product['image3'];
          product.price = +product.price;
          product.stock = +product.stock;
          product.discountPercentage = +product.discountPercentage;
          console.log(product);
          if (params.id) {
            product.id = params.id;
            product.rating = selectedProduct.rating || 0;
            dispatch(updateProductAsync(product));
            alert.success('Product Updated');

            reset();
          } else {
            dispatch(createProductAsync(product));
            alert.success('Product Created');
            reset();
          }
        })}
      >
        <Card className="space-y-4 bg-white p-10 lg:ml-44 ">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="text-base text-white p-2 font-semibold leading-7 text-center bg-gradient-to-r  from-indigo-500 via-purple-800">
              Add Product
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {selectedProduct && selectedProduct.deleted && (
                <h2 className="text-red-500 sm:col-span-6">
                  This product is deleted
                </h2>
              )}

              <div className="sm:col-span-6">
                <Label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Name
                </Label>
                <div className="mt-2">
                  <div className=" ">
                    <TextInput
                      type="text"
                      {...register('title', {
                        required: 'name is required',
                      })}
                      id="title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              
              <div className="sm:col-span-6">
                <Label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  regulatoryInfo
                </Label>
                <div className="mt-2 border">
                  <div className=" ">
                    <Textarea
                      type="text"
                      {...register('regulatoryInfo', {
                        required: 'regulatory Info is required',
                      })}
                      id="regulatoryInfo"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-6">
                <Label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  product Specifications
                </Label>
                <div className="mt-2 border">
                  <div className=" ">
                    <Textarea
                      {...register('productSpecifications', {
                        required: 'product Specifications is required',
                      })}
                      id="productSpecifications"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-6">
                <Label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                safety Info
                </Label>
                <div className="mt-2 border">
                  <div className="">
                    <Textarea
                      {...register('safetyInfo', {
                        required: 'safety Info is required',
                      })}
                      id="safetyInfo"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-6">
                <Label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                batch Number
                </Label>
                <div className="mt-2">
                  <div className=" ">
                    <TextInput
                      type="number"
                      {...register('batchNumber', {
                        required: 'batch Number is required',
                      })}
                      id="batchNumber"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-6">
                <Label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                expiryDate
                </Label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <TextInput
                      type="date"
                      {...register('expiryDate', {
                        required: 'batch Number is required',
                      })}
                      id="expiryDate"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <Label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </Label>
                <div className="mt-2">
                  <Textarea
                    id="description"
                    {...register('description', {
                      required: 'description is required',
                    })}
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={''}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about product.
                </p>
              </div>

              <div className="col-span-full">
                <Label
                  htmlFor="brand"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Brand
                </Label>
                <div className="mt-2">
                  <Select
                    {...register('brand', {
                      required: 'brand is required',
                    })}
                  >
                    <option value="">--choose brand--</option>
                    {brands.map((brand) => (
                      <option key={brand.value} value={brand.value}>
                        {brand.label}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="col-span-full">
                <Label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Category
                </Label>
                <div className="mt-2">
                  <Select
                    {...register('category', {
                      required: 'category is required',
                    })}
                  >
                    <option value="">--choose category--</option>
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              <div className="sm:col-span-2">
                <Label
                  htmlFor="price"
                  className=""
                >
                  Price
                </Label>
                <div className="mt-2">
                  <div className=" ">
                    <TextInput
                      type="number"
                      {...register('price', {
                        required: 'price is required',
                        min: 1,
                        max: 10000,
                      })}
                      id="price"
                      className=""
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-2">
                <Label
                  htmlFor="discountPercentage"
                  className=""
                >
                  Discount Percentage
                </Label>
                <div className="mt-2">
                  <div className="">
                    <TextInput
                      type="number"
                      {...register('discountPercentage', {
                        required: 'discountPercentage is required',
                        min: 0,
                        max: 100,
                      })}
                      id="discountPercentage"
                      className=""
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-2">
                <Label
                  htmlFor="stock"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Stock
                </Label>
                <div className="mt-2">
                  <div className=" ">
                    <TextInput
                      type="number"
                      {...register('stock', {
                        required: 'stock is required',
                        min: 0,
                      })}
                      id="stock"
                      className=""
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-6">
                <Label
                  htmlFor="thumbnail"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Thumbnail
                </Label>
                <div className="mt-2">
                  <div className=" ">
                    <TextInput
                      type="text"
                      {...register('thumbnail', {
                        required: 'thumbnail is required',
                      })}
                      id="thumbnail"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-6">
                <Label
                  htmlFor="image1"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 1
                </Label>
                <div className="mt-2">
                  <div className=" ">
                    <TextInput
                      type="text"
                      {...register('image1', {
                        required: 'image1 is required',
                      })}
                      id="image1"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-6">
                <Label
                  htmlFor="image2"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 2
                </Label>
                <div className="mt-2">
                  <div className="">
                    <TextInput
                      type="text"
                      {...register('image2', {
                        required: 'image is required',
                      })}
                      id="image2"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-6">
                <Label
                  htmlFor="image2"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 3
                </Label>
                <div className="mt-2">
                  <div className=" ">
                    <TextInput
                      type="text"
                      {...register('image3', {
                        required: 'image is required',
                      })}
                      id="image3"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-6">
                <Label
                  htmlFor="highlight1"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Highlight 1
                </Label>
                <div className="mt-2">
                  <div className="">
                    <TextInput
                      type="text"
                      {...register('highlight1', {})}
                      id="highlight1"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-6">
                <Label
                  htmlFor="highlight2"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Highlight 2
                </Label>
                <div className="mt-2">
                  <div className=" ">
                    <TextInput
                      type="text"
                      {...register('highlight2', {})}
                      id="highlight2"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-6">
                <Label
                  htmlFor="highlight3"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Highlight 3
                </Label>
                <div className="mt-2">
                  <div className=" ">
                    <TextInput
                      type="text"
                      {...register('highlight3', {})}
                      id="highlight3"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-6">
                <Label
                  htmlFor="highlight4"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Highlight 4
                </Label>
                <div className="mt-2">
                  <div className=" ">
                    <TextInput
                      type="text"
                      {...register('highlight4', {})}
                      id="highlight4"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-full">
                <Label
                  htmlFor="colors"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Colors
                </Label>
                <div className="mt-2 space-x-6">
                  {colors.map((color) => (
                    <>
                      <input
                        type="checkbox"
                        {...register('colors', {})}
                        key={color.id}
                        value={color.id}
                        className=' rounded-full w-9 h-9 space-x-9'
                      />{' '}
                      {color.name}
                      cla
                    </>
                  ))}
                </div>
              </div>
{/* 
              <div className="col-span-full">
                <Label
                  htmlFor="sizes"
                  className=""
                >
                  Sizes
                </Label>
                <div className="mt-2 space-x-6">
                  {sizes.map((size) => (
                    <>
                      <input
                        type="checkbox"
                        {...register('sizes', {})}
                        key={size.id}
                        value={size.id}
                        className=' rounded-full w-9 h-9'
                      />{' '}
                      {size.name}
                    </>
                  ))}
                </div>
              </div> */}
            </div>
          </div>
          </Card>
          <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </Button>

          {selectedProduct && !selectedProduct.deleted && (
            <Button
              onClick={(e) => {
                e.preventDefault();
                setOpenModal(true);
              }}
              className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Delete
            </Button>
          )}

          <Button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </Button>
        </div>
      </form>
      {selectedProduct && (
        <Modal
          title={`Delete ${selectedProduct.title}`}
          message="Are you sure you want to delete this Product ?"
          dangerOption="Delete"
          cancelOption="Cancel"
          dangerAction={handleDelete}
          cancelAction={() => setOpenModal(null)}
          showModal={openModal}
        ></Modal>
      )}
    </>
  );
}

export default ProductForm;
