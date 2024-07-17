import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri'; // Import eye icons

import { selectLoggedInUser, createUserAsync } from '../features/auth/authSlice';
import { Button, Card, Label, Select, TextInput } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

export default function SuppliersAndDistributers() {
    const history = useNavigate()
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await dispatch(createUserAsync({
      name: data.name,
      email: data.email,
      password: data.password,
      addresses: [],
      role: data.role, // If role is not provided, default to 'user'
    }));
    history('/dashboard?tab=users');
  };

  const nameRegex = /^[a-zA-Z\s]*$/; // Only alphabets and spaces allowed
  if (!nameRegex.test(name)) {
    alert('Name can only contain alphabets and spaces.');
    return;
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-20 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="text-base text-white p-2 font-semibold leading-7 text-center bg-gradient-to-r  from-indigo-500 via-purple-800">
            Create a New Account
          </div>
        </div>

        <Card className="mt-8 sm:mx-auto sm:w-full w-full sm:max-w-sm">
          <form
            noValidate
            className="space-y-3"
            onSubmit={handleSubmit(onSubmit)}
            
          >
           <div>
        <Label
          htmlFor="name"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Name
        </Label>
        <div className="mt-2">
          <TextInput
            id="name"
            {...register('name', {
              required: 'Name is required',
              pattern: {
                value: /^[a-zA-Z\s]*$/, // Only alphabets and spaces allowed
                message: 'Name can only contain alphabets and spaces',
              },
            })}
            type="text"
            className=""
          />
          {errors.name && (
            <p className="text-red-500">{errors.name.message}</p>
          )}
        </div>
      </div>

            <div>
              <Label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </Label>
              <div className="mt-2">
                <TextInput
                  id="email"
                  {...register('email', {
                    required: 'email is required',
                    pattern: {
                      value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                      message: 'email not valid',
                    },
                  })}
                  type="email"
                  className=""
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900 relative" // Add relative class
              >
                Password
              </label>
              <div className="mt-2 relative">
                <input
                  id="password"
                  {...register('password', {
                    required: 'password is required',
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                      message: `- at least 8 characters\n
                      - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                      - Can contain special characters`,
                    },
                  })}
                  type={showPassword ? 'text' : 'password'} // Toggle input type
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility} // Toggle password visibility on click
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer focus:outline-none"
                >
                  {showPassword ? <RiEyeOffFill /> : <RiEyeFill />} {/* Eye icon */}
                </button>
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-gray-900 relative" // Add relative class
              >
                Confirm Password
              </label>
              <div className="mt-2 relative">
                <input
                  id="confirmPassword"
                  {...register('confirmPassword', {
                    required: 'confirm password is required',
                    validate: (value, formValues) =>
                      value === formValues.password || 'password not matching',
                  })}
                  type={showConfirmPassword ? 'text' : 'password'} // Toggle input type
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility} // Toggle confirm password visibility on click
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer focus:outline-none"
                >
                  {showConfirmPassword ? <RiEyeOffFill /> : <RiEyeFill />} {/* Eye icon */}
                </button>
                {errors.confirmPassword && (
                  <p className="text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            {/* Role select field */}
            <div>
              <Label
                htmlFor="role"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Role
              </Label>
              <div className="mt-2">
                <Select
                  id="role"
                  {...register('role', {
                    required: 'Role is required',
                  })}
                  className=""
                >
                  <option value="">Select a role</option>
                  <option value="distributor">distributor</option>
                  <option value="supplier">supplier</option>
                </Select>
                {errors.role && (
                  <p className="text-red-500">{errors.role.message}</p>
                )}
              </div>
            </div>

            <div>
              <Button
              pill
              processingLabel='amen'
              type="submit"
              className="flex w-full justify-center rounded-md bg-gradient-to-b from-indigo-500 to-pink-600 via-purple-600  text-sm font-semibold leading-6 text-white "
              >
                Add Users
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
}
