import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';

import { selectLoggedInUser, createUserAsync } from '../features/auth/authSlice';
import { Button, Card, Label, Select, TextInput } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

export default function SuppliersAndDistributers() {
    const history = useNavigate()
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  
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
              <Label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </Label>
              <div className="mt-2">
                <TextInput
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
                  type="password"
                  className=""
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </Label>
              <div className="mt-2">
                <TextInput
                  id="confirmPassword"
                  {...register('confirmPassword', {
                    required: 'confirm password is required',
                    validate: (value, formValues) =>
                      value === formValues.password || 'password not matching',
                  })}
                  type="password"
                  className=""
                />
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

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a Member?{' '}
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Log In
            </Link>
          </p>
        </Card>
      </div>
    </>
  );
}
